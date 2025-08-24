-- HealthWise AI - Row Level Security Policies
-- This file contains comprehensive RLS policies for all tables

-- =============================================================================
-- PROFILES TABLE POLICIES
-- =============================================================================

-- Users can view and manage their own profile
CREATE POLICY "Users can view their own profile" 
ON public.profiles FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own profile" 
ON public.profiles FOR DELETE 
USING (auth.uid() = user_id);

-- =============================================================================
-- DOCTORS TABLE POLICIES
-- =============================================================================

-- All users can view active and verified doctors
CREATE POLICY "Anyone can view active verified doctors" 
ON public.doctors FOR SELECT 
USING (is_active = true AND is_verified = true);

-- Only doctors can update their own profile (when doctor auth is implemented)
-- For now, this will be managed by admin/backend
CREATE POLICY "Doctors can update their own profile" 
ON public.doctors FOR UPDATE 
USING (false); -- Disabled for now, admin-managed

CREATE POLICY "No direct doctor insertion by users" 
ON public.doctors FOR INSERT 
WITH CHECK (false); -- Admin-managed

-- =============================================================================
-- CONSULTATIONS TABLE POLICIES
-- =============================================================================

-- Users can view their own consultations
CREATE POLICY "Users can view their own consultations" 
ON public.consultations FOR SELECT 
USING (auth.uid() = user_id);

-- Users can create their own consultations
CREATE POLICY "Users can create their own consultations" 
ON public.consultations FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Users can update their own consultations (limited fields)
CREATE POLICY "Users can update their own consultations" 
ON public.consultations FOR UPDATE 
USING (auth.uid() = user_id);

-- Users can cancel their own consultations
CREATE POLICY "Users can delete their own consultations" 
ON public.consultations FOR DELETE 
USING (auth.uid() = user_id);

-- =============================================================================
-- HEALTH RECORDS TABLE POLICIES
-- =============================================================================

-- Users can view their own health records
CREATE POLICY "Users can view their own health records" 
ON public.health_records FOR SELECT 
USING (auth.uid() = user_id);

-- Users can create their own health records
CREATE POLICY "Users can create their own health records" 
ON public.health_records FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Users can update their own health records
CREATE POLICY "Users can update their own health records" 
ON public.health_records FOR UPDATE 
USING (auth.uid() = user_id);

-- Users can delete their own health records
CREATE POLICY "Users can delete their own health records" 
ON public.health_records FOR DELETE 
USING (auth.uid() = user_id);

-- =============================================================================
-- APPOINTMENTS TABLE POLICIES
-- =============================================================================

-- Users can view their own appointments
CREATE POLICY "Users can view their own appointments" 
ON public.appointments FOR SELECT 
USING (auth.uid() = user_id);

-- Users can create their own appointments
CREATE POLICY "Users can create their own appointments" 
ON public.appointments FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Users can update their own appointments
CREATE POLICY "Users can update their own appointments" 
ON public.appointments FOR UPDATE 
USING (auth.uid() = user_id);

-- Users can delete their own appointments
CREATE POLICY "Users can delete their own appointments" 
ON public.appointments FOR DELETE 
USING (auth.uid() = user_id);

-- =============================================================================
-- MEDICATION REMINDERS TABLE POLICIES
-- =============================================================================

-- Users can view their own medication reminders
CREATE POLICY "Users can view their own medication reminders" 
ON public.medication_reminders FOR SELECT 
USING (auth.uid() = user_id);

-- Users can create their own medication reminders
CREATE POLICY "Users can create their own medication reminders" 
ON public.medication_reminders FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Users can update their own medication reminders
CREATE POLICY "Users can update their own medication reminders" 
ON public.medication_reminders FOR UPDATE 
USING (auth.uid() = user_id);

-- Users can delete their own medication reminders
CREATE POLICY "Users can delete their own medication reminders" 
ON public.medication_reminders FOR DELETE 
USING (auth.uid() = user_id);

-- =============================================================================
-- AI CONVERSATIONS TABLE POLICIES
-- =============================================================================

-- Users can view their own conversations
CREATE POLICY "Users can view their own ai conversations" 
ON public.ai_conversations FOR SELECT 
USING (auth.uid() = user_id);

-- Users can create their own conversation messages
CREATE POLICY "Users can create their own ai conversations" 
ON public.ai_conversations FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Users can update their own conversation feedback
CREATE POLICY "Users can update their own ai conversations" 
ON public.ai_conversations FOR UPDATE 
USING (auth.uid() = user_id);

-- Users can delete their own conversation history
CREATE POLICY "Users can delete their own ai conversations" 
ON public.ai_conversations FOR DELETE 
USING (auth.uid() = user_id);

-- =============================================================================
-- SYMPTOM ASSESSMENTS TABLE POLICIES
-- =============================================================================

-- Users can view their own symptom assessments
CREATE POLICY "Users can view their own symptom assessments" 
ON public.symptom_assessments FOR SELECT 
USING (auth.uid() = user_id);

-- Users can create their own symptom assessments
CREATE POLICY "Users can create their own symptom assessments" 
ON public.symptom_assessments FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Users can update their own symptom assessments (for feedback)
CREATE POLICY "Users can update their own symptom assessments" 
ON public.symptom_assessments FOR UPDATE 
USING (auth.uid() = user_id);

-- Users can delete their own symptom assessments
CREATE POLICY "Users can delete their own symptom assessments" 
ON public.symptom_assessments FOR DELETE 
USING (auth.uid() = user_id);

-- =============================================================================
-- PRESCRIPTIONS TABLE POLICIES
-- =============================================================================

-- Users can view their own prescriptions
CREATE POLICY "Users can view their own prescriptions" 
ON public.prescriptions FOR SELECT 
USING (auth.uid() = user_id);

-- Users can create their own prescriptions (AI-generated)
CREATE POLICY "Users can create their own prescriptions" 
ON public.prescriptions FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Users can update their own prescriptions (limited fields)
CREATE POLICY "Users can update their own prescriptions" 
ON public.prescriptions FOR UPDATE 
USING (auth.uid() = user_id);

-- Users can deactivate their own prescriptions
CREATE POLICY "Users can delete their own prescriptions" 
ON public.prescriptions FOR DELETE 
USING (auth.uid() = user_id);

-- =============================================================================
-- FEEDBACK TABLE POLICIES
-- =============================================================================

-- Users can view their own feedback
CREATE POLICY "Users can view their own feedback" 
ON public.feedback FOR SELECT 
USING (auth.uid() = user_id OR user_id IS NULL);

-- Anyone can create feedback (including anonymous)
CREATE POLICY "Anyone can create feedback" 
ON public.feedback FOR INSERT 
WITH CHECK (true);

-- Users can update their own feedback
CREATE POLICY "Users can update their own feedback" 
ON public.feedback FOR UPDATE 
USING (auth.uid() = user_id);

-- Users can delete their own feedback
CREATE POLICY "Users can delete their own feedback" 
ON public.feedback FOR DELETE 
USING (auth.uid() = user_id);

-- =============================================================================
-- HEALTH TIPS TABLE POLICIES
-- =============================================================================

-- Everyone can view active health tips
CREATE POLICY "Anyone can view active health tips" 
ON public.health_tips FOR SELECT 
USING (is_active = true);

-- No user insertion of health tips (admin/doctor managed)
CREATE POLICY "No user creation of health tips" 
ON public.health_tips FOR INSERT 
WITH CHECK (false);

-- No user modification of health tips
CREATE POLICY "No user updates of health tips" 
ON public.health_tips FOR UPDATE 
USING (false);

-- =============================================================================
-- USER HEALTH TIPS TABLE POLICIES
-- =============================================================================

-- Users can view their own health tip interactions
CREATE POLICY "Users can view their own health tip interactions" 
ON public.user_health_tips FOR SELECT 
USING (auth.uid() = user_id);

-- Users can create their own health tip interactions
CREATE POLICY "Users can create their own health tip interactions" 
ON public.user_health_tips FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Users can update their own health tip interactions
CREATE POLICY "Users can update their own health tip interactions" 
ON public.user_health_tips FOR UPDATE 
USING (auth.uid() = user_id);

-- Users can delete their own health tip interactions
CREATE POLICY "Users can delete their own health tip interactions" 
ON public.user_health_tips FOR DELETE 
USING (auth.uid() = user_id);

-- =============================================================================
-- VITAL SIGNS TABLE POLICIES
-- =============================================================================

-- Users can view their own vital signs
CREATE POLICY "Users can view their own vital signs" 
ON public.vital_signs FOR SELECT 
USING (auth.uid() = user_id);

-- Users can create their own vital signs
CREATE POLICY "Users can create their own vital signs" 
ON public.vital_signs FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Users can update their own vital signs
CREATE POLICY "Users can update their own vital signs" 
ON public.vital_signs FOR UPDATE 
USING (auth.uid() = user_id);

-- Users can delete their own vital signs
CREATE POLICY "Users can delete their own vital signs" 
ON public.vital_signs FOR DELETE 
USING (auth.uid() = user_id);

-- =============================================================================
-- MEDICAL FACILITIES TABLE POLICIES
-- =============================================================================

-- Everyone can view active and verified medical facilities
CREATE POLICY "Anyone can view active medical facilities" 
ON public.medical_facilities FOR SELECT 
USING (is_active = true);

-- No user creation of medical facilities (admin managed)
CREATE POLICY "No user creation of medical facilities" 
ON public.medical_facilities FOR INSERT 
WITH CHECK (false);

-- No user modification of medical facilities
CREATE POLICY "No user updates of medical facilities" 
ON public.medical_facilities FOR UPDATE 
USING (false);

-- =============================================================================
-- USER PREFERENCES TABLE POLICIES
-- =============================================================================

-- Users can view their own preferences
CREATE POLICY "Users can view their own preferences" 
ON public.user_preferences FOR SELECT 
USING (auth.uid() = user_id);

-- Users can create their own preferences
CREATE POLICY "Users can create their own preferences" 
ON public.user_preferences FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Users can update their own preferences
CREATE POLICY "Users can update their own preferences" 
ON public.user_preferences FOR UPDATE 
USING (auth.uid() = user_id);

-- Users can delete their own preferences
CREATE POLICY "Users can delete their own preferences" 
ON public.user_preferences FOR DELETE 
USING (auth.uid() = user_id);

-- =============================================================================
-- EMERGENCY CONTACTS TABLE POLICIES
-- =============================================================================

-- Users can view their own emergency contacts
CREATE POLICY "Users can view their own emergency contacts" 
ON public.emergency_contacts FOR SELECT 
USING (auth.uid() = user_id);

-- Users can create their own emergency contacts
CREATE POLICY "Users can create their own emergency contacts" 
ON public.emergency_contacts FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Users can update their own emergency contacts
CREATE POLICY "Users can update their own emergency contacts" 
ON public.emergency_contacts FOR UPDATE 
USING (auth.uid() = user_id);

-- Users can delete their own emergency contacts
CREATE POLICY "Users can delete their own emergency contacts" 
ON public.emergency_contacts FOR DELETE 
USING (auth.uid() = user_id);

-- =============================================================================
-- FUNCTIONS AND TRIGGERS
-- =============================================================================

-- Function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_doctors_updated_at
  BEFORE UPDATE ON public.doctors
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_consultations_updated_at
  BEFORE UPDATE ON public.consultations
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_health_records_updated_at
  BEFORE UPDATE ON public.health_records
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_appointments_updated_at
  BEFORE UPDATE ON public.appointments
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_medication_reminders_updated_at
  BEFORE UPDATE ON public.medication_reminders
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_prescriptions_updated_at
  BEFORE UPDATE ON public.prescriptions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_feedback_updated_at
  BEFORE UPDATE ON public.feedback
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_health_tips_updated_at
  BEFORE UPDATE ON public.health_tips
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_medical_facilities_updated_at
  BEFORE UPDATE ON public.medical_facilities
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_user_preferences_updated_at
  BEFORE UPDATE ON public.user_preferences
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_emergency_contacts_updated_at
  BEFORE UPDATE ON public.emergency_contacts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Function to automatically create user preferences on profile creation
CREATE OR REPLACE FUNCTION public.create_user_preferences()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_preferences (user_id)
  VALUES (NEW.user_id)
  ON CONFLICT (user_id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER create_user_preferences_on_profile
  AFTER INSERT ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.create_user_preferences();