-- HealthWise AI - Comprehensive Database Schema
-- This migration creates a complete database structure for the health application

-- Drop existing tables if they exist (for fresh setup)
DROP TABLE IF EXISTS public.user_preferences CASCADE;
DROP TABLE IF EXISTS public.medical_facilities CASCADE;
DROP TABLE IF EXISTS public.vital_signs CASCADE;
DROP TABLE IF EXISTS public.health_tips CASCADE;
DROP TABLE IF EXISTS public.feedback CASCADE;
DROP TABLE IF EXISTS public.prescriptions CASCADE;
DROP TABLE IF EXISTS public.symptom_assessments CASCADE;
DROP TABLE IF EXISTS public.ai_conversations CASCADE;
DROP TABLE IF EXISTS public.emergency_contacts CASCADE;
DROP TABLE IF EXISTS public.consultations CASCADE;
DROP TABLE IF EXISTS public.doctors CASCADE;

-- Enhanced profiles table (replacing existing one)
DROP TABLE IF EXISTS public.profiles CASCADE;
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  avatar_url TEXT,
  date_of_birth DATE,
  gender TEXT CHECK (gender IN ('male', 'female', 'other', 'prefer_not_to_say')),
  height_cm INTEGER,
  weight_kg DECIMAL(5,2),
  blood_type TEXT CHECK (blood_type IN ('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')),
  emergency_contact_name TEXT,
  emergency_contact_phone TEXT,
  emergency_contact_relationship TEXT,
  medical_conditions TEXT[],
  allergies TEXT[],
  current_medications TEXT[],
  insurance_provider TEXT,
  insurance_policy_number TEXT,
  preferred_language TEXT DEFAULT 'en',
  timezone TEXT DEFAULT 'UTC',
  profile_completed BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Doctors table for telehealth functionality
CREATE TABLE public.doctors (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT UNIQUE,
  specialty TEXT NOT NULL,
  license_number TEXT UNIQUE NOT NULL,
  experience_years INTEGER DEFAULT 0,
  bio TEXT,
  avatar_url TEXT,
  consultation_fee DECIMAL(10,2),
  rating DECIMAL(3,2) DEFAULT 0.00,
  total_reviews INTEGER DEFAULT 0,
  languages TEXT[] DEFAULT ARRAY['en'],
  available_hours JSONB, -- Store availability schedule
  is_verified BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  hospital_affiliation TEXT,
  education TEXT[],
  certifications TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Consultations table for telehealth sessions
CREATE TABLE public.consultations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  doctor_id UUID NOT NULL REFERENCES public.doctors(id) ON DELETE RESTRICT,
  consultation_type TEXT NOT NULL CHECK (consultation_type IN ('video', 'phone', 'chat', 'ai_triage')),
  status TEXT NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'in_progress', 'completed', 'cancelled', 'no_show')),
  scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
  started_at TIMESTAMP WITH TIME ZONE,
  ended_at TIMESTAMP WITH TIME ZONE,
  duration_minutes INTEGER,
  chief_complaint TEXT,
  notes TEXT,
  diagnosis TEXT,
  recommendations TEXT,
  prescription_id UUID,
  follow_up_required BOOLEAN DEFAULT false,
  follow_up_date DATE,
  consultation_fee DECIMAL(10,2),
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'refunded', 'failed')),
  meeting_link TEXT,
  session_recording_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enhanced health_records table (replacing existing)
DROP TABLE IF EXISTS public.health_records CASCADE;
CREATE TABLE public.health_records (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  record_type TEXT NOT NULL CHECK (record_type IN ('vitals', 'symptom_check', 'appointment', 'medication', 'lab_result', 'vaccination', 'surgery', 'allergy', 'diagnosis')),
  title TEXT NOT NULL,
  description TEXT,
  data JSONB,
  attachments TEXT[],
  doctor_id UUID REFERENCES public.doctors(id),
  consultation_id UUID REFERENCES public.consultations(id),
  severity TEXT CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  is_chronic BOOLEAN DEFAULT false,
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enhanced appointments table (replacing existing)
DROP TABLE IF EXISTS public.appointments CASCADE;
CREATE TABLE public.appointments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  doctor_id UUID REFERENCES public.doctors(id),
  consultation_id UUID REFERENCES public.consultations(id),
  appointment_type TEXT NOT NULL CHECK (appointment_type IN ('consultation', 'follow_up', 'lab_test', 'surgery', 'vaccination', 'checkup')),
  doctor_name TEXT NOT NULL,
  specialty TEXT,
  facility_name TEXT,
  appointment_date TIMESTAMP WITH TIME ZONE NOT NULL,
  duration_minutes INTEGER DEFAULT 30,
  location TEXT,
  notes TEXT,
  preparation_instructions TEXT,
  status TEXT NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'confirmed', 'completed', 'cancelled', 'rescheduled', 'no_show')),
  reminder_sent BOOLEAN DEFAULT false,
  cancellation_reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enhanced medication_reminders table (replacing existing)
DROP TABLE IF EXISTS public.medication_reminders CASCADE;
CREATE TABLE public.medication_reminders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  medication_name TEXT NOT NULL,
  generic_name TEXT,
  brand_name TEXT,
  dosage TEXT NOT NULL,
  dosage_form TEXT CHECK (dosage_form IN ('tablet', 'capsule', 'liquid', 'injection', 'cream', 'drops', 'inhaler', 'patch')),
  strength TEXT,
  frequency TEXT NOT NULL,
  times_per_day INTEGER NOT NULL DEFAULT 1,
  reminder_times TEXT[] NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE,
  prescribed_by TEXT,
  prescription_id UUID,
  instructions TEXT,
  side_effects TEXT[],
  interactions TEXT[],
  notes TEXT,
  food_instructions TEXT CHECK (food_instructions IN ('with_food', 'without_food', 'before_food', 'after_food', 'any_time')),
  storage_instructions TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  is_as_needed BOOLEAN DEFAULT false,
  refill_reminder_days INTEGER DEFAULT 7,
  quantity_remaining INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- AI conversations table for chat history
CREATE TABLE public.ai_conversations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  session_id UUID NOT NULL,
  conversation_type TEXT NOT NULL CHECK (conversation_type IN ('health_chat', 'symptom_analysis', 'prescription_ai', 'general_inquiry')),
  message_role TEXT NOT NULL CHECK (message_role IN ('user', 'assistant')),
  message_content TEXT NOT NULL,
  message_metadata JSONB,
  response_time_ms INTEGER,
  feedback_rating INTEGER CHECK (feedback_rating >= 1 AND feedback_rating <= 5),
  feedback_comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Symptom assessments table for detailed symptom checker results
CREATE TABLE public.symptom_assessments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  session_id UUID NOT NULL,
  symptoms_reported TEXT[] NOT NULL,
  symptoms_data JSONB, -- Store detailed symptom information
  ai_analysis TEXT,
  possible_conditions JSONB, -- Array of conditions with likelihood scores
  urgency_level TEXT NOT NULL CHECK (urgency_level IN ('low', 'medium', 'high', 'emergency')),
  recommendations TEXT[],
  follow_up_required BOOLEAN DEFAULT false,
  doctor_consultation_suggested BOOLEAN DEFAULT false,
  emergency_care_suggested BOOLEAN DEFAULT false,
  user_feedback TEXT,
  accuracy_rating INTEGER CHECK (accuracy_rating >= 1 AND accuracy_rating <= 5),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Prescriptions table for AI-generated prescriptions
CREATE TABLE public.prescriptions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  doctor_id UUID REFERENCES public.doctors(id),
  consultation_id UUID REFERENCES public.consultations(id),
  prescription_type TEXT NOT NULL CHECK (prescription_type IN ('ai_generated', 'doctor_prescribed', 'pharmacy_verified')),
  prescription_data JSONB NOT NULL, -- Store complete prescription details
  medications JSONB NOT NULL, -- Array of prescribed medications
  diagnosis TEXT,
  symptoms TEXT,
  patient_data JSONB, -- Patient info at time of prescription
  generated_by TEXT, -- AI model or doctor name
  verification_status TEXT DEFAULT 'pending' CHECK (verification_status IN ('pending', 'verified', 'rejected', 'modified')),
  verified_by UUID REFERENCES public.doctors(id),
  verification_notes TEXT,
  is_active BOOLEAN DEFAULT true,
  expiry_date DATE,
  refills_allowed INTEGER DEFAULT 0,
  refills_used INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Feedback table for user feedback system
CREATE TABLE public.feedback (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  feedback_type TEXT NOT NULL CHECK (feedback_type IN ('general', 'feature_request', 'bug_report', 'ai_accuracy', 'user_experience')),
  category TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  is_anonymous BOOLEAN DEFAULT false,
  contact_email TEXT,
  device_info JSONB,
  app_version TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'reviewed', 'in_progress', 'resolved', 'closed')),
  admin_response TEXT,
  responded_at TIMESTAMP WITH TIME ZONE,
  responded_by UUID,
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Health tips table for personalized health content
CREATE TABLE public.health_tips (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('nutrition', 'exercise', 'mental_health', 'preventive_care', 'medication', 'general_wellness', 'emergency')),
  tags TEXT[],
  target_conditions TEXT[],
  target_age_group TEXT,
  target_gender TEXT,
  difficulty_level TEXT CHECK (difficulty_level IN ('easy', 'moderate', 'challenging')),
  estimated_time_minutes INTEGER,
  external_link TEXT,
  image_url TEXT,
  author TEXT,
  source TEXT,
  is_ai_generated BOOLEAN DEFAULT false,
  is_verified BOOLEAN DEFAULT false,
  verified_by UUID REFERENCES public.doctors(id),
  view_count INTEGER DEFAULT 0,
  like_count INTEGER DEFAULT 0,
  share_count INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- User health tips interactions
CREATE TABLE public.user_health_tips (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  tip_id UUID NOT NULL REFERENCES public.health_tips(id) ON DELETE CASCADE,
  interaction_type TEXT NOT NULL CHECK (interaction_type IN ('viewed', 'liked', 'saved', 'shared', 'completed')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, tip_id, interaction_type)
);

-- Vital signs table for tracking health measurements
CREATE TABLE public.vital_signs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  measurement_type TEXT NOT NULL CHECK (measurement_type IN ('blood_pressure', 'heart_rate', 'temperature', 'weight', 'height', 'blood_sugar', 'oxygen_saturation', 'steps', 'sleep_hours')),
  value_numeric DECIMAL(10,3),
  value_text TEXT,
  unit TEXT NOT NULL,
  systolic INTEGER, -- For blood pressure
  diastolic INTEGER, -- For blood pressure
  notes TEXT,
  measured_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  device_used TEXT,
  is_manual_entry BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Medical facilities table for nearby hospitals/pharmacies
CREATE TABLE public.medical_facilities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  facility_type TEXT NOT NULL CHECK (facility_type IN ('hospital', 'clinic', 'pharmacy', 'urgent_care', 'laboratory', 'specialist')),
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT,
  country TEXT NOT NULL DEFAULT 'US',
  postal_code TEXT,

  phone TEXT,
  website TEXT,
  email TEXT,
  opening_hours JSONB,
  services TEXT[],
  specialties TEXT[],
  insurance_accepted TEXT[],
  rating DECIMAL(3,2),
  total_reviews INTEGER DEFAULT 0,
  emergency_services BOOLEAN DEFAULT false,
  accepts_walk_ins BOOLEAN DEFAULT false,
  parking_available BOOLEAN DEFAULT false,
  wheelchair_accessible BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- User preferences table for app settings
CREATE TABLE public.user_preferences (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  theme TEXT DEFAULT 'light' CHECK (theme IN ('light', 'dark', 'system')),
  language TEXT DEFAULT 'en',
  timezone TEXT DEFAULT 'UTC',
  notifications_enabled BOOLEAN DEFAULT true,
  medication_reminders BOOLEAN DEFAULT true,
  appointment_reminders BOOLEAN DEFAULT true,
  health_tips_frequency TEXT DEFAULT 'daily' CHECK (health_tips_frequency IN ('daily', 'weekly', 'monthly', 'never')),
  emergency_contacts_enabled BOOLEAN DEFAULT true,
  data_sharing_analytics BOOLEAN DEFAULT false,
  data_sharing_research BOOLEAN DEFAULT false,
  privacy_level TEXT DEFAULT 'standard' CHECK (privacy_level IN ('minimal', 'standard', 'enhanced')),
  measurement_units TEXT DEFAULT 'metric' CHECK (measurement_units IN ('metric', 'imperial')),
  ai_suggestions_enabled BOOLEAN DEFAULT true,
  symptom_tracking_enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Emergency contacts table (separate from profile for multiple contacts)
CREATE TABLE public.emergency_contacts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  relationship TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  address TEXT,
  is_primary BOOLEAN DEFAULT false,
  priority_order INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consultations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.health_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medication_reminders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.symptom_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prescriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.health_tips ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_health_tips ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vital_signs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medical_facilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.emergency_contacts ENABLE ROW LEVEL SECURITY;