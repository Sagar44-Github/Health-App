-- HealthWise AI - Sample Data for Testing and Demonstration
-- This file contains sample data to populate the database for testing

-- =============================================================================
-- SAMPLE DOCTORS DATA
-- =============================================================================

INSERT INTO public.doctors (
  full_name, email, specialty, license_number, experience_years, bio, 
  consultation_fee, rating, total_reviews, languages, available_hours,
  is_verified, is_active, hospital_affiliation, education, certifications
) VALUES 
(
  'Dr. Sarah Johnson',
  'sarah.johnson@healthwise.com',
  'General Practitioner',
  'MD123456789',
  15,
  'Dr. Sarah Johnson is a dedicated family medicine physician with over 15 years of experience providing comprehensive healthcare to patients of all ages.',
  50.00,
  4.9,
  127,
  ARRAY['en', 'es'],
  '{"monday": {"start": "09:00", "end": "17:00"}, "tuesday": {"start": "09:00", "end": "17:00"}, "wednesday": {"start": "09:00", "end": "17:00"}, "thursday": {"start": "09:00", "end": "17:00"}, "friday": {"start": "09:00", "end": "15:00"}}'::jsonb,
  true,
  true,
  'City General Hospital',
  ARRAY['MD from Harvard Medical School', 'Residency at Johns Hopkins'],
  ARRAY['Board Certified Family Medicine', 'Advanced Cardiac Life Support']
),
(
  'Dr. Michael Chen',
  'michael.chen@healthwise.com',
  'Cardiologist',
  'MD987654321',
  12,
  'Dr. Michael Chen specializes in cardiovascular medicine with expertise in preventive cardiology and heart disease management.',
  75.00,
  4.8,
  89,
  ARRAY['en', 'zh'],
  '{"monday": {"start": "08:00", "end": "16:00"}, "tuesday": {"start": "08:00", "end": "16:00"}, "wednesday": {"start": "08:00", "end": "16:00"}, "thursday": {"start": "08:00", "end": "16:00"}, "friday": {"start": "08:00", "end": "14:00"}}'::jsonb,
  true,
  true,
  'Heart Care Medical Center',
  ARRAY['MD from Stanford Medical School', 'Cardiology Fellowship at Mayo Clinic'],
  ARRAY['Board Certified Cardiology', 'Interventional Cardiology Certification']
),
(
  'Dr. Emily Rodriguez',
  'emily.rodriguez@healthwise.com',
  'Dermatologist',
  'MD456789123',
  10,
  'Dr. Emily Rodriguez is a board-certified dermatologist specializing in medical and cosmetic dermatology with a focus on skin cancer prevention.',
  60.00,
  4.9,
  156,
  ARRAY['en', 'es'],
  '{"monday": {"start": "10:00", "end": "18:00"}, "tuesday": {"start": "10:00", "end": "18:00"}, "wednesday": {"start": "10:00", "end": "18:00"}, "thursday": {"start": "10:00", "end": "18:00"}, "friday": {"start": "10:00", "end": "16:00"}}'::jsonb,
  true,
  true,
  'Skin Health Institute',
  ARRAY['MD from UCLA Medical School', 'Dermatology Residency at UCSF'],
  ARRAY['Board Certified Dermatology', 'Mohs Surgery Certification']
),
(
  'Dr. James Wilson',
  'james.wilson@healthwise.com',
  'Psychiatrist',
  'MD789123456',
  8,
  'Dr. James Wilson is a compassionate psychiatrist specializing in anxiety, depression, and trauma-informed care.',
  80.00,
  4.7,
  73,
  ARRAY['en'],
  '{"monday": {"start": "09:00", "end": "17:00"}, "tuesday": {"start": "09:00", "end": "17:00"}, "wednesday": {"start": "09:00", "end": "17:00"}, "thursday": {"start": "09:00", "end": "17:00"}, "friday": {"start": "09:00", "end": "15:00"}}'::jsonb,
  true,
  true,
  'Mental Health Associates',
  ARRAY['MD from Columbia Medical School', 'Psychiatry Residency at Mount Sinai'],
  ARRAY['Board Certified Psychiatry', 'Trauma-Informed Care Certification']
);

-- =============================================================================
-- SAMPLE HEALTH TIPS DATA
-- =============================================================================

INSERT INTO public.health_tips (
  title, content, category, tags, target_conditions, target_age_group,
  difficulty_level, estimated_time_minutes, author, source, is_verified
) VALUES 
(
  'Daily Hydration: Your Key to Better Health',
  'Staying properly hydrated is crucial for optimal body function. Aim for 8-10 glasses of water daily, more if you exercise or live in a hot climate. Signs of good hydration include pale yellow urine and rarely feeling thirsty. Benefits include better energy, clearer skin, improved digestion, and enhanced cognitive function.',
  'general_wellness',
  ARRAY['hydration', 'water', 'energy', 'health'],
  ARRAY['dehydration', 'fatigue'],
  'all',
  'easy',
  2,
  'Dr. Sarah Johnson',
  'HealthWise Medical Team',
  true
),
(
  '10-Minute Morning Stretch Routine',
  'Start your day with this simple stretch routine: 1) Neck rolls (30 seconds each direction), 2) Shoulder shrugs (1 minute), 3) Arm circles (1 minute), 4) Torso twists (1 minute), 5) Forward fold (2 minutes), 6) Cat-cow pose (2 minutes), 7) Child''s pose (2 minutes). This routine improves flexibility, reduces morning stiffness, and energizes your body.',
  'exercise',
  ARRAY['stretching', 'morning', 'flexibility', 'routine'],
  ARRAY['back pain', 'stiffness'],
  'adult',
  'easy',
  10,
  'Certified Physical Therapist',
  'HealthWise Wellness Team',
  true
),
(
  'Managing Stress Through Deep Breathing',
  'Practice the 4-7-8 breathing technique: Inhale through your nose for 4 counts, hold your breath for 7 counts, exhale through your mouth for 8 counts. Repeat 4 times. This activates your parasympathetic nervous system, reducing stress hormones and promoting relaxation. Use this technique during stressful moments or before sleep.',
  'mental_health',
  ARRAY['stress', 'breathing', 'relaxation', 'anxiety'],
  ARRAY['anxiety', 'stress', 'insomnia'],
  'all',
  'easy',
  5,
  'Dr. James Wilson',
  'Mental Health Associates',
  true
),
(
  'Heart-Healthy Diet Essentials',
  'Incorporate these foods for cardiovascular health: 1) Fatty fish (salmon, mackerel) 2x/week, 2) Leafy greens daily, 3) Berries and nuts as snacks, 4) Whole grains instead of refined, 5) Olive oil for cooking, 6) Limit processed foods and excess sodium. These choices can reduce heart disease risk by up to 30%.',
  'nutrition',
  ARRAY['heart health', 'diet', 'cardiovascular', 'nutrition'],
  ARRAY['heart disease', 'high cholesterol', 'hypertension'],
  'adult',
  'moderate',
  15,
  'Dr. Michael Chen',
  'Heart Care Medical Center',
  true
),
(
  'Medication Safety: Essential Tips',
  'Follow these medication safety guidelines: 1) Take as prescribed - never skip or double doses, 2) Set reminders or use pill organizers, 3) Store medications properly, 4) Check expiration dates regularly, 5) Inform all healthcare providers about current medications, 6) Never share prescription medications, 7) Report side effects to your doctor.',
  'medication',
  ARRAY['medication safety', 'prescriptions', 'dosage', 'side effects'],
  ARRAY['medication adherence'],
  'all',
  'easy',
  5,
  'Hospital Pharmacist',
  'HealthWise Pharmacy Team',
  true
);

-- =============================================================================
-- SAMPLE MEDICAL FACILITIES DATA
-- =============================================================================

INSERT INTO public.medical_facilities (
  name, facility_type, address, city, state, country, postal_code,
  phone, website, services, specialties,
  emergency_services, accepts_walk_ins, parking_available, wheelchair_accessible,
  is_active, verified, rating, total_reviews
) VALUES 
(
  'City General Hospital',
  'hospital',
  '123 Wellness Avenue',
  'Springfield',
  'IL',
  'US',
  '62701',
  '+1-217-555-0123',
  'https://citygeneralhospital.com',
  ARRAY['Emergency Care', 'Surgery', 'Cardiology', 'Oncology', 'Maternity'],
  ARRAY['Emergency Medicine', 'General Surgery', 'Cardiology'],
  true,
  true,
  true,
  true,
  true,
  true,
  4.2,
  234
),
(
  'Sunrise Medical Center',
  'hospital',
  '456 Care Boulevard',
  'Springfield',
  'IL',
  'US',
  '62702',
  '+1-217-555-0456',
  'https://sunrisemedical.com',
  ARRAY['Urgent Care', 'Family Medicine', 'Pediatrics', 'Radiology'],
  ARRAY['Family Medicine', 'Pediatrics', 'Internal Medicine'],
  false,
  true,
  true,
  true,
  true,
  true,
  4.1,
  189
),
(
  'HealthPlus Pharmacy',
  'pharmacy',
  '789 Wellness Street',
  'Springfield',
  'IL',
  'US',
  '62703',
  '+1-217-555-0789',
  'https://healthpluspharmacy.com',
  ARRAY['Prescription Filling', 'Vaccinations', 'Health Screenings', 'Medication Consultation'],
  ARRAY['Pharmacy Services'],
  false,
  true,
  true,
  true,
  true,
  true,
  4.5,
  156
),
(
  'QuickCare Urgent Care',
  'urgent_care',
  '321 Health Drive',
  'Springfield',
  'IL',
  'US',
  '62704',
  '+1-217-555-0321',
  'https://quickcareurgent.com',
  ARRAY['Urgent Care', 'X-Ray', 'Lab Services', 'Minor Surgery'],
  ARRAY['Urgent Care', 'Emergency Medicine'],
  false,
  true,
  true,
  true,
  true,
  true,
  4.3,
  98
),
(
  'MediLab Diagnostics',
  'laboratory',
  '654 Science Park Way',
  'Springfield',
  'IL',
  'US',
  '62705',
  '+1-217-555-0654',
  'https://medilabdiagnostics.com',
  ARRAY['Blood Tests', 'Imaging', 'Pathology', 'Genetic Testing'],
  ARRAY['Laboratory Medicine', 'Pathology'],
  false,
  false,
  true,
  true,
  true,
  true,
  4.4,
  67
);

-- =============================================================================
-- SAMPLE MEDICAL CONDITIONS AND COMMON QUERIES
-- =============================================================================

-- Insert some common health tips for specific conditions
INSERT INTO public.health_tips (
  title, content, category, tags, target_conditions,
  difficulty_level, estimated_time_minutes, is_ai_generated, is_verified
) VALUES 
(
  'Managing Type 2 Diabetes: Blood Sugar Control',
  'Key strategies for blood sugar management: 1) Monitor blood glucose regularly, 2) Follow a consistent meal schedule, 3) Choose complex carbohydrates over simple sugars, 4) Include fiber-rich foods, 5) Stay physically active, 6) Take medications as prescribed, 7) Stay hydrated, 8) Manage stress levels.',
  'preventive_care',
  ARRAY['diabetes', 'blood sugar', 'glucose', 'management'],
  ARRAY['diabetes', 'prediabetes'],
  'moderate',
  10,
  false,
  true
),
(
  'Hypertension: Lifestyle Modifications',
  'Natural ways to help lower blood pressure: 1) Reduce sodium intake to less than 2,300mg daily, 2) Increase potassium-rich foods (bananas, spinach), 3) Exercise regularly (30 min, 5 days/week), 4) Maintain healthy weight, 5) Limit alcohol, 6) Quit smoking, 7) Manage stress, 8) Get adequate sleep.',
  'preventive_care',
  ARRAY['blood pressure', 'hypertension', 'lifestyle', 'prevention'],
  ARRAY['hypertension', 'high blood pressure'],
  'moderate',
  15,
  false,
  true
),
(
  'Migraine Prevention and Management',
  'Migraine management strategies: 1) Identify and avoid triggers, 2) Maintain regular sleep schedule, 3) Stay hydrated, 4) Eat regular meals, 5) Manage stress through relaxation techniques, 6) Consider preventive medications if frequent, 7) Use cold or heat therapy, 8) Keep a headache diary.',
  'preventive_care',
  ARRAY['migraine', 'headache', 'prevention', 'management'],
  ARRAY['migraine', 'headache'],
  'moderate',
  12,
  false,
  true
);

-- =============================================================================
-- ANALYTICS AND USAGE STATISTICS UPDATES
-- =============================================================================

-- Update view counts for health tips to simulate usage
UPDATE public.health_tips SET 
  view_count = FLOOR(RANDOM() * 1000 + 100),
  like_count = FLOOR(RANDOM() * 200 + 10),
  share_count = FLOOR(RANDOM() * 50 + 1)
WHERE id IS NOT NULL;

-- Add some opening hours for medical facilities
UPDATE public.medical_facilities SET 
  opening_hours = '{"monday": {"open": "08:00", "close": "18:00"}, "tuesday": {"open": "08:00", "close": "18:00"}, "wednesday": {"open": "08:00", "close": "18:00"}, "thursday": {"open": "08:00", "close": "18:00"}, "friday": {"open": "08:00", "close": "18:00"}, "saturday": {"open": "09:00", "close": "15:00"}, "sunday": {"closed": true}}'::jsonb
WHERE facility_type IN ('hospital', 'clinic');

UPDATE public.medical_facilities SET 
  opening_hours = '{"monday": {"open": "09:00", "close": "21:00"}, "tuesday": {"open": "09:00", "close": "21:00"}, "wednesday": {"open": "09:00", "close": "21:00"}, "thursday": {"open": "09:00", "close": "21:00"}, "friday": {"open": "09:00", "close": "21:00"}, "saturday": {"open": "09:00", "close": "18:00"}, "sunday": {"open": "10:00", "close": "16:00"}}'::jsonb
WHERE facility_type = 'pharmacy';

-- =============================================================================
-- TRIGGER FOR UPDATING SEARCH VECTORS (if using full-text search)
-- =============================================================================

-- Function to update search vectors for health tips
CREATE OR REPLACE FUNCTION update_health_tips_search_vector()
RETURNS TRIGGER AS $$
BEGIN
  -- This could be used for advanced search functionality
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- =============================================================================
-- SAMPLE DATA INSERTION COMPLETED
-- =============================================================================

-- Note: PostgreSQL will automatically update statistics and optimize storage
-- VACUUM and ANALYZE commands cannot be run within migration transactions
-- These operations should be performed manually after migration if needed