# HealthWise AI - Environment Configuration Guide

## Overview

This guide explains how to configure environment variables for the HealthWise AI application across different environments (development, staging, production).

## 📁 Environment Files

| File                       | Purpose                     | When to Use                           |
| -------------------------- | --------------------------- | ------------------------------------- |
| `.env.example`             | Complete reference template | Reference for all available variables |
| `.env.local.template`      | Development template        | Local development setup               |
| `.env.production.template` | Production template         | Production deployment                 |
| `.env.local`               | Your local config           | Created by you for development        |

## 🚀 Quick Setup

### 1. Development Setup

```bash
# Copy the development template
cp .env.local.template .env.local

# Edit with your actual values
nano .env.local  # or use your preferred editor
```

### 2. Required Supabase Variables

Get these from your Supabase Dashboard (`Settings > API`):

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU
```

### 3. Verify Setup

```bash
# Test database connection
node scripts/test-db-connection.js

# Start development server
npm run dev
```

## 🔧 Variable Categories

### Core Supabase Configuration

```env
# Project connection
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...

# Server-side operations (keep secret!)
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU

# Edge Functions
NEXT_PUBLIC_SUPABASE_AI_FUNCTION_URL=https://your-project.supabase.co/functions/v1/ai-health-assistant
```

### Authentication Settings

```env
# Redirect URLs
NEXT_PUBLIC_AUTH_REDIRECT_URL=http://localhost:3000/auth/callback
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Additional auth providers (optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

### Storage Configuration

```env
# File uploads
NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET=health-documents
NEXT_PUBLIC_MAX_FILE_SIZE=10485760
NEXT_PUBLIC_ALLOWED_FILE_TYPES=image/jpeg,image/png,application/pdf
```

### Feature Flags

```env
# AI Features
NEXT_PUBLIC_ENABLE_AI_CHAT=true
NEXT_PUBLIC_ENABLE_SYMPTOM_CHECKER=true
NEXT_PUBLIC_ENABLE_PRESCRIPTION_AI=true

# Telehealth Features
NEXT_PUBLIC_ENABLE_TELEHEALTH=true
NEXT_PUBLIC_ENABLE_VIDEO_CALLS=true

# Health Tracking
NEXT_PUBLIC_ENABLE_MEDICATION_REMINDERS=true
NEXT_PUBLIC_ENABLE_VITAL_SIGNS_TRACKING=true
```

### External Integrations

```env
# OpenAI (for enhanced AI)
OPENAI_API_KEY=your-openai-key
AI_MODEL_NAME=gpt-4

# Email notifications
SMTP_HOST=smtp.gmail.com
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
```

## 🌍 Environment-Specific Setup

### Development (.env.local)

```env
NODE_ENV=development
NEXT_PUBLIC_DEBUG=true
NEXT_PUBLIC_SITE_URL=http://localhost:3000
RATE_LIMIT_REQUESTS_PER_MINUTE=60
```

### Production (.env.production)

```env
NODE_ENV=production
NEXT_PUBLIC_DEBUG=false
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
RATE_LIMIT_REQUESTS_PER_MINUTE=30

# Additional production settings
NEXT_PUBLIC_CDN_URL=https://cdn.yourdomain.com
SENTRY_DSN=your-sentry-dsn
```

## 🔒 Security Best Practices

### Environment Variable Security

1. **Never commit `.env.local` or `.env.production`** to version control
2. **Use different keys** for development and production
3. **Rotate keys regularly** in production
4. **Limit service role key usage** to server-side operations only

### Variable Naming Conventions

- `NEXT_PUBLIC_*` - Safe for client-side (exposed to browser)
- `SUPABASE_SERVICE_ROLE_KEY` - Server-side only (never expose)
- `*_URL` - API endpoints and URLs
- `*_KEY` - API keys and secrets

### .gitignore Setup

Ensure your `.gitignore` includes:

```gitignore
# Environment files
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
.env.production

# Keep templates
!.env.example
!.env.*.template
```

## 🛠️ Supabase-Specific Configuration

### Database Connection

```env
# For direct database access (if needed)
DATABASE_URL=postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres

# For connection pooling
SUPABASE_DB_URL=postgresql://postgres:[password]@db.[project-ref].supabase.co:6543/postgres
```

### Edge Functions

```env
# AI Health Assistant
NEXT_PUBLIC_SUPABASE_AI_FUNCTION_URL=https://[project-ref].supabase.co/functions/v1/ai-health-assistant

# Custom functions (add as needed)
NEXT_PUBLIC_SUPABASE_CUSTOM_FUNCTION_URL=https://[project-ref].supabase.co/functions/v1/custom-function
```

### Storage Buckets

```env
# Main storage bucket
NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET=health-documents

# Additional buckets
NEXT_PUBLIC_AVATAR_STORAGE_BUCKET=avatars
NEXT_PUBLIC_TEMP_STORAGE_BUCKET=temp-uploads
```

### Realtime Configuration

```env
# Realtime subscriptions
NEXT_PUBLIC_SUPABASE_REALTIME_URL=wss://[project-ref].supabase.co/realtime/v1/websocket

# Realtime channels
NEXT_PUBLIC_ENABLE_REALTIME=true
NEXT_PUBLIC_REALTIME_HEARTBEAT_INTERVAL=30000
```

## 📝 Common Configuration Patterns

### Healthcare Compliance

```env
# HIPAA compliance settings
HIPAA_AUDIT_LOGGING=true
DATA_RETENTION_DAYS=2555
ENCRYPTION_AT_REST=true
ENCRYPTION_IN_TRANSIT=true
```

### Performance Optimization

```env
# Database performance
DB_POOL_SIZE=20
DB_POOL_TIMEOUT=30000

# Caching
CACHE_TTL=3600
REDIS_URL=redis://localhost:6379

# CDN
NEXT_PUBLIC_CDN_URL=https://cdn.yourdomain.com
```

### Monitoring and Analytics

```env
# Error tracking
SENTRY_DSN=your-sentry-dsn
NEXT_PUBLIC_SENTRY_DSN=your-public-sentry-dsn

# Analytics
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX

# Performance monitoring
NEW_RELIC_LICENSE_KEY=your-license-key
```

## 🚀 Deployment Instructions

### Vercel Deployment

1. **Add environment variables** in Vercel dashboard
2. **Use production values** for all environments
3. **Set preview environment** variables for staging

### Docker Deployment

```dockerfile
# Copy environment file
COPY .env.production .env

# Or use build args
ARG SUPABASE_URL
ENV NEXT_PUBLIC_SUPABASE_URL=$SUPABASE_URL
```

### CI/CD Pipeline

```yaml
# GitHub Actions example
env:
  NEXT_PUBLIC_SUPABASE_URL: ${{ secrets.SUPABASE_URL }}
  NEXT_PUBLIC_SUPABASE_ANON_KEY: ${{ secrets.SUPABASE_ANON_KEY }}
  SUPABASE_SERVICE_ROLE_KEY: ${{ secrets.SUPABASE_SERVICE_ROLE_KEY }}
```

## 🔍 Troubleshooting

### Common Issues

1. **Connection Errors**

   - Check Supabase URL and keys
   - Verify project is active
   - Check network connectivity

2. **Authentication Issues**

   - Verify redirect URLs
   - Check CORS settings
   - Validate JWT configuration

3. **Environment Variables Not Loading**
   - Restart development server
   - Check file naming (`.env.local`)
   - Verify variable syntax

### Debugging Commands

```bash
# Test Supabase connection
node scripts/test-db-connection.js

# Check environment variables
npm run env:check

# Validate configuration
npm run config:validate
```

## 📋 Checklist

### Development Setup

- [ ] `.env.local` file created
- [ ] Supabase URL and keys configured
- [ ] Database connection tested
- [ ] Authentication working
- [ ] Feature flags set appropriately

### Production Setup

- [ ] Production environment variables configured
- [ ] Security keys rotated from development
- [ ] Monitoring and analytics configured
- [ ] Backup and recovery settings in place
- [ ] Compliance settings enabled

---

**Last Updated**: August 22, 2025
**Version**: 1.0.0
**Maintainer**: HealthWise AI Development Team
