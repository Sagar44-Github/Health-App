-- HealthWise AI - Database Indexes for Performance Optimization
-- This file contains indexes to improve query performance across all tables

-- =============================================================================
-- PROFILES TABLE INDEXES
-- =============================================================================

-- Index for user_id lookups (most common query pattern)
CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON public.profiles(user_id);

-- Index for profile completion queries
CREATE INDEX IF NOT EXISTS idx_profiles_completed ON public.profiles(profile_completed) WHERE profile_completed = true;

-- Index for searching by full name
CREATE INDEX IF NOT EXISTS idx_profiles_full_name ON public.profiles USING gin(to_tsvector('english', full_name)) WHERE full_name IS NOT NULL;

-- =============================================================================
-- DOCTORS TABLE INDEXES
-- =============================================================================

-- Index for active and verified doctors (most common query)
CREATE INDEX IF NOT EXISTS idx_doctors_active_verified ON public.doctors(is_active, is_verified) WHERE is_active = true AND is_verified = true;

-- Index for specialty searches
CREATE INDEX IF NOT EXISTS idx_doctors_specialty ON public.doctors(specialty) WHERE is_active = true;

-- Index for rating queries
CREATE INDEX IF NOT EXISTS idx_doctors_rating ON public.doctors(rating DESC) WHERE is_active = true AND is_verified = true;

-- Index for name searches
CREATE INDEX IF NOT EXISTS idx_doctors_name_search ON public.doctors USING gin(to_tsvector('english', full_name)) WHERE is_active = true;

-- =============================================================================
-- CONSULTATIONS TABLE INDEXES
-- =============================================================================

-- Index for user consultations
CREATE INDEX IF NOT EXISTS idx_consultations_user_id ON public.consultations(user_id, scheduled_at DESC);

-- Index for doctor consultations
CREATE INDEX IF NOT EXISTS idx_consultations_doctor_id ON public.consultations(doctor_id, scheduled_at DESC);

-- Index for consultation status
CREATE INDEX IF NOT EXISTS idx_consultations_status ON public.consultations(status, scheduled_at);

-- Index for upcoming consultations
CREATE INDEX IF NOT EXISTS idx_consultations_upcoming ON public.consultations(scheduled_at) WHERE status IN ('scheduled', 'confirmed');

-- Index for consultation type queries
CREATE INDEX IF NOT EXISTS idx_consultations_type ON public.consultations(consultation_type, status);

-- =============================================================================
-- HEALTH RECORDS TABLE INDEXES
-- =============================================================================

-- Index for user health records
CREATE INDEX IF NOT EXISTS idx_health_records_user_id ON public.health_records(user_id, created_at DESC);

-- Index for record type queries
CREATE INDEX IF NOT EXISTS idx_health_records_type ON public.health_records(record_type, created_at DESC);

-- Index for severity queries
CREATE INDEX IF NOT EXISTS idx_health_records_severity ON public.health_records(severity) WHERE severity IS NOT NULL;

-- Index for chronic conditions
CREATE INDEX IF NOT EXISTS idx_health_records_chronic ON public.health_records(is_chronic) WHERE is_chronic = true;

-- Index for doctor-related records
CREATE INDEX IF NOT EXISTS idx_health_records_doctor_id ON public.health_records(doctor_id) WHERE doctor_id IS NOT NULL;

-- Index for consultation-related records
CREATE INDEX IF NOT EXISTS idx_health_records_consultation_id ON public.health_records(consultation_id) WHERE consultation_id IS NOT NULL;

-- GIN index for tags array
CREATE INDEX IF NOT EXISTS idx_health_records_tags ON public.health_records USING gin(tags) WHERE tags IS NOT NULL;

-- =============================================================================
-- APPOINTMENTS TABLE INDEXES
-- =============================================================================

-- Index for user appointments
CREATE INDEX IF NOT EXISTS idx_appointments_user_id ON public.appointments(user_id, appointment_date DESC);

-- Index for doctor appointments
CREATE INDEX IF NOT EXISTS idx_appointments_doctor_id ON public.appointments(doctor_id, appointment_date) WHERE doctor_id IS NOT NULL;

-- Index for appointment status
CREATE INDEX IF NOT EXISTS idx_appointments_status ON public.appointments(status, appointment_date);

-- Index for upcoming appointments
CREATE INDEX IF NOT EXISTS idx_appointments_upcoming ON public.appointments(appointment_date) WHERE status IN ('scheduled', 'confirmed');

-- Index for appointment type
CREATE INDEX IF NOT EXISTS idx_appointments_type ON public.appointments(appointment_type, appointment_date);

-- =============================================================================
-- MEDICATION REMINDERS TABLE INDEXES
-- =============================================================================

-- Index for user medications
CREATE INDEX IF NOT EXISTS idx_medication_reminders_user_id ON public.medication_reminders(user_id, created_at DESC);

-- Index for active medications
CREATE INDEX IF NOT EXISTS idx_medication_reminders_active ON public.medication_reminders(is_active, user_id) WHERE is_active = true;

-- Index for medication reminders by date
CREATE INDEX IF NOT EXISTS idx_medication_reminders_dates ON public.medication_reminders(start_date, end_date) WHERE is_active = true;

-- Index for medication name searches
CREATE INDEX IF NOT EXISTS idx_medication_name_search ON public.medication_reminders USING gin(to_tsvector('english', medication_name));

-- Index for as-needed medications
CREATE INDEX IF NOT EXISTS idx_medication_as_needed ON public.medication_reminders(is_as_needed, user_id) WHERE is_as_needed = true;

-- =============================================================================
-- AI CONVERSATIONS TABLE INDEXES
-- =============================================================================

-- Index for user conversations
CREATE INDEX IF NOT EXISTS idx_ai_conversations_user_id ON public.ai_conversations(user_id, created_at DESC);

-- Index for session-based queries
CREATE INDEX IF NOT EXISTS idx_ai_conversations_session ON public.ai_conversations(session_id, created_at);

-- Index for conversation type
CREATE INDEX IF NOT EXISTS idx_ai_conversations_type ON public.ai_conversations(conversation_type, created_at DESC);

-- Index for message role
CREATE INDEX IF NOT EXISTS idx_ai_conversations_role ON public.ai_conversations(message_role, created_at);

-- Index for feedback queries
CREATE INDEX IF NOT EXISTS idx_ai_conversations_feedback ON public.ai_conversations(feedback_rating) WHERE feedback_rating IS NOT NULL;

-- =============================================================================
-- SYMPTOM ASSESSMENTS TABLE INDEXES
-- =============================================================================

-- Index for user symptom assessments
CREATE INDEX IF NOT EXISTS idx_symptom_assessments_user_id ON public.symptom_assessments(user_id, created_at DESC);

-- Index for urgency level
CREATE INDEX IF NOT EXISTS idx_symptom_assessments_urgency ON public.symptom_assessments(urgency_level, created_at DESC);

-- Index for session-based queries
CREATE INDEX IF NOT EXISTS idx_symptom_assessments_session ON public.symptom_assessments(session_id);

-- Index for follow-up required
CREATE INDEX IF NOT EXISTS idx_symptom_assessments_followup ON public.symptom_assessments(follow_up_required) WHERE follow_up_required = true;

-- Index for emergency cases
CREATE INDEX IF NOT EXISTS idx_symptom_assessments_emergency ON public.symptom_assessments(emergency_care_suggested) WHERE emergency_care_suggested = true;

-- GIN index for symptoms array
CREATE INDEX IF NOT EXISTS idx_symptom_assessments_symptoms ON public.symptom_assessments USING gin(symptoms_reported);

-- =============================================================================
-- PRESCRIPTIONS TABLE INDEXES
-- =============================================================================

-- Index for user prescriptions
CREATE INDEX IF NOT EXISTS idx_prescriptions_user_id ON public.prescriptions(user_id, created_at DESC);

-- Index for doctor prescriptions
CREATE INDEX IF NOT EXISTS idx_prescriptions_doctor_id ON public.prescriptions(doctor_id) WHERE doctor_id IS NOT NULL;

-- Index for prescription type
CREATE INDEX IF NOT EXISTS idx_prescriptions_type ON public.prescriptions(prescription_type, created_at DESC);

-- Index for verification status
CREATE INDEX IF NOT EXISTS idx_prescriptions_verification ON public.prescriptions(verification_status, created_at);

-- Index for active prescriptions
CREATE INDEX IF NOT EXISTS idx_prescriptions_active ON public.prescriptions(is_active, user_id) WHERE is_active = true;

-- Index for expiry date
CREATE INDEX IF NOT EXISTS idx_prescriptions_expiry ON public.prescriptions(expiry_date) WHERE is_active = true AND expiry_date IS NOT NULL;

-- =============================================================================
-- FEEDBACK TABLE INDEXES
-- =============================================================================

-- Index for user feedback
CREATE INDEX IF NOT EXISTS idx_feedback_user_id ON public.feedback(user_id, created_at DESC) WHERE user_id IS NOT NULL;

-- Index for feedback type
CREATE INDEX IF NOT EXISTS idx_feedback_type ON public.feedback(feedback_type, created_at DESC);

-- Index for feedback status
CREATE INDEX IF NOT EXISTS idx_feedback_status ON public.feedback(status, created_at);

-- Index for priority
CREATE INDEX IF NOT EXISTS idx_feedback_priority ON public.feedback(priority, created_at) WHERE priority IN ('high', 'urgent');

-- Index for rating
CREATE INDEX IF NOT EXISTS idx_feedback_rating ON public.feedback(rating) WHERE rating IS NOT NULL;

-- =============================================================================
-- HEALTH TIPS TABLE INDEXES
-- =============================================================================

-- Index for active health tips
CREATE INDEX IF NOT EXISTS idx_health_tips_active ON public.health_tips(is_active, created_at DESC) WHERE is_active = true;

-- Index for category
CREATE INDEX IF NOT EXISTS idx_health_tips_category ON public.health_tips(category, created_at DESC) WHERE is_active = true;

-- Index for verified tips
CREATE INDEX IF NOT EXISTS idx_health_tips_verified ON public.health_tips(is_verified, created_at DESC) WHERE is_active = true;

-- Index for view count (popular tips)
CREATE INDEX IF NOT EXISTS idx_health_tips_popular ON public.health_tips(view_count DESC) WHERE is_active = true;

-- GIN index for tags
CREATE INDEX IF NOT EXISTS idx_health_tips_tags ON public.health_tips USING gin(tags) WHERE is_active = true;

-- GIN index for target conditions
CREATE INDEX IF NOT EXISTS idx_health_tips_conditions ON public.health_tips USING gin(target_conditions) WHERE is_active = true;

-- Index for content search
CREATE INDEX IF NOT EXISTS idx_health_tips_content_search ON public.health_tips USING gin(to_tsvector('english', title || ' ' || content)) WHERE is_active = true;

-- =============================================================================
-- USER HEALTH TIPS TABLE INDEXES
-- =============================================================================

-- Index for user interactions
CREATE INDEX IF NOT EXISTS idx_user_health_tips_user_id ON public.user_health_tips(user_id, created_at DESC);

-- Index for tip interactions
CREATE INDEX IF NOT EXISTS idx_user_health_tips_tip_id ON public.user_health_tips(tip_id, interaction_type);

-- Index for interaction type
CREATE INDEX IF NOT EXISTS idx_user_health_tips_interaction ON public.user_health_tips(interaction_type, created_at);

-- =============================================================================
-- VITAL SIGNS TABLE INDEXES
-- =============================================================================

-- Index for user vital signs
CREATE INDEX IF NOT EXISTS idx_vital_signs_user_id ON public.vital_signs(user_id, measured_at DESC);

-- Index for measurement type
CREATE INDEX IF NOT EXISTS idx_vital_signs_type ON public.vital_signs(measurement_type, measured_at DESC);

-- Index for recent measurements
CREATE INDEX IF NOT EXISTS idx_vital_signs_recent ON public.vital_signs(measured_at DESC, user_id);

-- Index for manual vs automatic entries
CREATE INDEX IF NOT EXISTS idx_vital_signs_manual ON public.vital_signs(is_manual_entry, user_id, measured_at);

-- =============================================================================
-- MEDICAL FACILITIES TABLE INDEXES
-- =============================================================================

-- Index for active facilities
CREATE INDEX IF NOT EXISTS idx_medical_facilities_active ON public.medical_facilities(is_active, facility_type) WHERE is_active = true;

-- Index for facility type
CREATE INDEX IF NOT EXISTS idx_medical_facilities_type ON public.medical_facilities(facility_type) WHERE is_active = true;



-- Index for city-based searches
CREATE INDEX IF NOT EXISTS idx_medical_facilities_city ON public.medical_facilities(city, state) WHERE is_active = true;

-- Index for emergency services
CREATE INDEX IF NOT EXISTS idx_medical_facilities_emergency ON public.medical_facilities(emergency_services) WHERE is_active = true AND emergency_services = true;

-- Index for rating
CREATE INDEX IF NOT EXISTS idx_medical_facilities_rating ON public.medical_facilities(rating DESC) WHERE is_active = true AND rating IS NOT NULL;

-- GIN index for services
CREATE INDEX IF NOT EXISTS idx_medical_facilities_services ON public.medical_facilities USING gin(services) WHERE is_active = true;

-- Index for name search
CREATE INDEX IF NOT EXISTS idx_medical_facilities_name_search ON public.medical_facilities USING gin(to_tsvector('english', name)) WHERE is_active = true;

-- =============================================================================
-- USER PREFERENCES TABLE INDEXES
-- =============================================================================

-- Index for user preferences (already unique on user_id)
CREATE INDEX IF NOT EXISTS idx_user_preferences_user_id ON public.user_preferences(user_id);

-- Index for notification settings
CREATE INDEX IF NOT EXISTS idx_user_preferences_notifications ON public.user_preferences(notifications_enabled, user_id) WHERE notifications_enabled = true;

-- =============================================================================
-- EMERGENCY CONTACTS TABLE INDEXES
-- =============================================================================

-- Index for user emergency contacts
CREATE INDEX IF NOT EXISTS idx_emergency_contacts_user_id ON public.emergency_contacts(user_id, priority_order);

-- Index for primary contacts
CREATE INDEX IF NOT EXISTS idx_emergency_contacts_primary ON public.emergency_contacts(is_primary, user_id) WHERE is_primary = true;

-- =============================================================================
-- COMPOSITE INDEXES FOR COMPLEX QUERIES
-- =============================================================================

-- Comprehensive user health dashboard query
CREATE INDEX IF NOT EXISTS idx_user_health_dashboard ON public.health_records(user_id, record_type, created_at DESC);

-- Medication adherence tracking
CREATE INDEX IF NOT EXISTS idx_medication_adherence ON public.medication_reminders(user_id, is_active, start_date, end_date) WHERE is_active = true;

-- Doctor consultation history
CREATE INDEX IF NOT EXISTS idx_doctor_consultation_history ON public.consultations(doctor_id, status, scheduled_at DESC) WHERE status = 'completed';

-- User activity timeline
CREATE INDEX IF NOT EXISTS idx_user_activity_timeline ON public.ai_conversations(user_id, conversation_type, created_at DESC);

-- Emergency preparedness
CREATE INDEX IF NOT EXISTS idx_emergency_preparedness ON public.emergency_contacts(user_id, is_primary, priority_order) WHERE is_primary = true;

-- =============================================================================
-- PARTIAL INDEXES FOR SPECIFIC USE CASES
-- =============================================================================

-- Only active appointments (future filtering will be done at query time)
CREATE INDEX IF NOT EXISTS idx_active_appointments ON public.appointments(user_id, appointment_date, status) 
WHERE status IN ('scheduled', 'confirmed');

-- Only active medications with reminders
CREATE INDEX IF NOT EXISTS idx_active_medication_reminders ON public.medication_reminders(user_id, reminder_times) 
WHERE is_active = true AND array_length(reminder_times, 1) > 0;

-- Only high-priority symptom assessments
CREATE INDEX IF NOT EXISTS idx_high_priority_symptoms ON public.symptom_assessments(user_id, created_at DESC) 
WHERE urgency_level IN ('high', 'emergency');

-- Only unread AI conversations (if we add read status)
-- CREATE INDEX IF NOT EXISTS idx_unread_ai_conversations ON public.ai_conversations(user_id, created_at DESC) 
-- WHERE read_status = false;

-- =============================================================================
-- MIGRATION COMPLETED
-- =============================================================================

-- Note: Table statistics will be automatically updated by PostgreSQL
-- ANALYZE commands are not needed in migrations as they cannot run in transactions
-- PostgreSQL will automatically gather statistics as tables are used