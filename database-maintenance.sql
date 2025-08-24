-- HealthWise AI Database Maintenance Script
-- This script contains maintenance operations that cannot be run in migration transactions
-- Run this script manually after migrations are applied to optimize database performance

-- =============================================================================
-- DATABASE MAINTENANCE OPERATIONS
-- =============================================================================

-- Update table statistics for better query planning
-- Run these after initial data population or significant data changes
ANALYZE public.profiles;
ANALYZE public.doctors;
ANALYZE public.consultations;
ANALYZE public.health_records;
ANALYZE public.appointments;
ANALYZE public.medication_reminders;
ANALYZE public.ai_conversations;
ANALYZE public.symptom_assessments;
ANALYZE public.prescriptions;
ANALYZE public.feedback;
ANALYZE public.health_tips;
ANALYZE public.user_health_tips;
ANALYZE public.vital_signs;
ANALYZE public.medical_facilities;
ANALYZE public.user_preferences;
ANALYZE public.emergency_contacts;

-- Vacuum to reclaim storage space and update statistics
-- Run these periodically for optimal performance
VACUUM ANALYZE public.profiles;
VACUUM ANALYZE public.doctors;
VACUUM ANALYZE public.consultations;
VACUUM ANALYZE public.health_records;
VACUUM ANALYZE public.appointments;
VACUUM ANALYZE public.medication_reminders;
VACUUM ANALYZE public.ai_conversations;
VACUUM ANALYZE public.symptom_assessments;
VACUUM ANALYZE public.prescriptions;
VACUUM ANALYZE public.feedback;
VACUUM ANALYZE public.health_tips;
VACUUM ANALYZE public.user_health_tips;
VACUUM ANALYZE public.vital_signs;
VACUUM ANALYZE public.medical_facilities;
VACUUM ANALYZE public.user_preferences;
VACUUM ANALYZE public.emergency_contacts;

-- =============================================================================
-- USAGE INSTRUCTIONS
-- =============================================================================

-- To run this maintenance script:
-- 1. Connect to your database using psql or another PostgreSQL client
-- 2. Execute this script outside of any transaction
-- 3. Monitor the execution - it may take some time for large tables

-- Recommended schedule:
-- - Run ANALYZE after significant data changes or bulk inserts
-- - Run VACUUM ANALYZE weekly or monthly depending on data volume
-- - Consider using pg_cron for automated scheduling in production

-- Note: PostgreSQL has an autovacuum daemon that handles most maintenance
-- automatically, but manual maintenance may be needed for optimal performance
-- in high-traffic applications.