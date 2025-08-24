# HealthWise AI - Database Setup Guide

## Overview

This guide provides step-by-step instructions for setting up the HealthWise AI database schema in Supabase, including security configuration, data migration, and application integration.

## Prerequisites

- Supabase account and project
- Node.js and npm installed
- Supabase CLI installed (`npm install -g supabase`)
- Git repository access

## Quick Start

### 1. Environment Setup

Create a `.env.local` file in your project root:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU

# Optional: For local development
SUPABASE_DB_URL=postgresql://postgres:password@localhost:54322/postgres
```

### 2. Supabase CLI Setup

Initialize Supabase in your project:

```bash
cd wise-health-assist
supabase login
supabase init
supabase start
```

### 3. Database Migration

Run the migration files in sequence:

```bash
# Apply comprehensive schema
supabase db push

# Or run individual migrations
psql $SUPABASE_DB_URL -f supabase/migrations/20250822000000_comprehensive_schema.sql
psql $SUPABASE_DB_URL -f supabase/migrations/20250822000001_rls_policies.sql
psql $SUPABASE_DB_URL -f supabase/migrations/20250822000002_indexes.sql
psql $SUPABASE_DB_URL -f supabase/migrations/20250822000003_sample_data.sql
```

## Detailed Setup Process

### Step 1: Supabase Project Configuration

1. **Create New Project**:

   - Go to [Supabase Dashboard](https://supabase.com/dashboard)
   - Click "New Project"
   - Enter project name: "healthwise-ai"
   - Choose database password
   - Select region (closest to your users)
   - Wait for project initialization

2. **Configure Authentication**:

   ```sql
   -- Enable email authentication
   -- Enable social providers (optional)
   -- Configure email templates
   -- Set up redirect URLs
   ```

3. **API Settings**:
   - Note down your Project URL
   - Copy the `anon` public key
   - Copy the `service_role` secret key
   - Configure CORS settings if needed

### Step 2: Database Schema Implementation

1. **Run Base Schema Migration**:

   ```bash
   supabase db reset
   ```

2. **Verify Table Creation**:

   ```sql
   -- Check all tables are created
   SELECT table_name
   FROM information_schema.tables
   WHERE table_schema = 'public'
   ORDER BY table_name;
   ```

3. **Verify Row Level Security**:
   ```sql
   -- Check RLS is enabled
   SELECT schemaname, tablename, rowsecurity
   FROM pg_tables
   WHERE schemaname = 'public' AND rowsecurity = true;
   ```

### Step 3: Security Configuration

1. **RLS Policies Verification**:

   ```sql
   -- List all policies
   SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
   FROM pg_policies
   WHERE schemaname = 'public'
   ORDER BY tablename, policyname;
   ```

2. **Test User Isolation**:

   ```typescript
   // Test that users can only see their own data
   const { data: profiles } = await supabase.from("profiles").select("*");

   console.log("Should only return current user profile:", profiles);
   ```

### Step 4: Performance Optimization

1. **Verify Indexes**:

   ```sql
   -- Check index usage
   SELECT schemaname, tablename, indexname, indexdef
   FROM pg_indexes
   WHERE schemaname = 'public'
   ORDER BY tablename, indexname;
   ```

2. **Query Performance Test**:

   ```sql
   -- Test key query performance
   EXPLAIN ANALYZE
   SELECT * FROM profiles WHERE user_id = 'test-uuid';

   EXPLAIN ANALYZE
   SELECT * FROM health_records
   WHERE user_id = 'test-uuid'
   ORDER BY created_at DESC
   LIMIT 10;
   ```

### Step 5: Sample Data Population

1. **Load Test Data**:

   ```bash
   # Sample data is loaded via the migration
   # Verify sample doctors
   SELECT count(*) FROM doctors WHERE is_active = true;

   # Verify sample health tips
   SELECT count(*) FROM health_tips WHERE is_active = true;

   # Verify sample medical facilities
   SELECT count(*) FROM medical_facilities WHERE is_active = true;
   ```

## Application Integration

### Step 1: Update Supabase Client

The client configuration is already updated in:

- `src/integrations/supabase/client.ts`
- `src/integrations/supabase/types.ts`

### Step 2: Environment Variables

Update your environment configuration:

```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# .env.production
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### Step 3: Authentication Setup

1. **Configure Auth Providers**:

   ```typescript
   // In Supabase Dashboard → Authentication → Providers
   // Enable Email/Password
   // Configure redirect URLs:
   // - http://localhost:3000/auth/callback (development)
   // - https://yourdomain.com/auth/callback (production)
   ```

2. **Email Templates**:
   ```html
   <!-- Customize in Dashboard → Authentication → Email Templates -->
   <!-- Confirm signup, Magic Link, Reset Password -->
   ```

### Step 4: Test Database Connection

```typescript
// Test connection in your app
import { supabase } from "@/integrations/supabase/client";

async function testConnection() {
  try {
    // Test public data access
    const { data: healthTips, error: tipsError } = await supabase
      .from("health_tips")
      .select("id, title")
      .limit(5);

    console.log("Health tips:", healthTips);

    // Test authenticated data access (after user login)
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .single();

    console.log("User profile:", profile);
  } catch (error) {
    console.error("Database connection error:", error);
  }
}
```

## Verification Checklist

### Database Structure

- [ ] All 15 tables created successfully
- [ ] Foreign key constraints in place
- [ ] Check constraints validated
- [ ] Triggers functioning correctly

### Security

- [ ] RLS enabled on all tables
- [ ] User isolation policies working
- [ ] Public data accessible without auth
- [ ] Anonymous feedback working

### Performance

- [ ] All indexes created
- [ ] Query performance acceptable (<100ms for user queries)
- [ ] Connection pooling configured
- [ ] Statistics updated

### Integration

- [ ] Supabase client connecting
- [ ] Authentication working
- [ ] CRUD operations functional
- [ ] Error handling in place

## Common Issues and Solutions

### Issue 1: Migration Failures

**Problem**: Migration fails with permission errors
**Solution**:

```bash
# Reset database and retry
supabase db reset
supabase db push
```

### Issue 2: RLS Blocking Queries

**Problem**: Queries return empty results
**Solution**:

```sql
-- Check if user is authenticated
SELECT auth.uid();

-- Verify RLS policies
SELECT * FROM pg_policies WHERE tablename = 'your_table';
```

### Issue 3: Slow Query Performance

**Problem**: Queries taking too long
**Solution**:

```sql
-- Check if indexes are being used
EXPLAIN ANALYZE SELECT * FROM your_table WHERE condition;

-- Update table statistics
ANALYZE your_table;
```

### Issue 4: Connection Issues

**Problem**: Cannot connect to database
**Solution**:

- Verify Supabase URL and keys
- Check network connectivity
- Validate environment variables
- Check Supabase project status

## Monitoring and Maintenance

### Regular Checks

1. **Daily**:

   - Monitor query performance
   - Check error logs
   - Verify backup completion

2. **Weekly**:

   - Review slow queries
   - Update table statistics
   - Check storage usage

3. **Monthly**:
   - Security audit
   - Performance optimization
   - Cleanup old data

### Performance Monitoring

```sql
-- Query performance monitoring
SELECT query, calls, total_time, mean_time, rows
FROM pg_stat_statements
WHERE query LIKE '%health%'
ORDER BY mean_time DESC
LIMIT 10;

-- Index usage statistics
SELECT schemaname, tablename, indexname, idx_scan, idx_tup_read, idx_tup_fetch
FROM pg_stat_user_indexes
WHERE schemaname = 'public'
ORDER BY idx_scan DESC;
```

## Backup and Recovery

### Automated Backups

Supabase provides:

- Daily automatic backups
- Point-in-time recovery (7 days)
- Manual backup creation

### Manual Backup

```bash
# Create manual backup
pg_dump $SUPABASE_DB_URL > backup_$(date +%Y%m%d_%H%M%S).sql

# Restore from backup
psql $SUPABASE_DB_URL < backup_file.sql
```

## Security Best Practices

### Environment Security

- Never commit API keys to version control
- Use different keys for development/production
- Rotate keys regularly
- Monitor API usage

### Database Security

- Regular security audits
- Monitor unusual access patterns
- Keep Supabase updated
- Review RLS policies regularly

### Application Security

- Validate all user inputs
- Use prepared statements
- Implement rate limiting
- Log security events

## Production Deployment

### Pre-deployment Checklist

- [ ] All migrations tested
- [ ] Environment variables configured
- [ ] SSL certificates in place
- [ ] Monitoring configured
- [ ] Backup strategy implemented

### Go-live Steps

1. Apply final migrations
2. Update DNS records
3. Monitor initial traffic
4. Verify all features working
5. Set up alerts

## Support Resources

### Documentation

- [Supabase Documentation](https://supabase.com/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [RLS Guide](https://supabase.com/docs/guides/auth/row-level-security)

### Community

- [Supabase Discord](https://discord.supabase.com/)
- [GitHub Discussions](https://github.com/supabase/supabase/discussions)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/supabase)

### Emergency Contacts

- Supabase Support: support@supabase.io
- Database Administrator: [Your DBA contact]
- Development Team: [Your team contact]

---

**Last Updated**: August 22, 2025
**Version**: 1.0.0
**Maintainer**: HealthWise AI Development Team
