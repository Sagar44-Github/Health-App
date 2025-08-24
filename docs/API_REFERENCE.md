# HealthWise AI - API Reference

## Overview

This document provides comprehensive API reference for interacting with the HealthWise AI database through Supabase client. All examples use TypeScript and the official Supabase JavaScript client.

## Table of Contents

1. [Authentication](#authentication)
2. [User Profiles](#user-profiles)
3. [Health Records](#health-records)
4. [Medications](#medications)
5. [Appointments](#appointments)
6. [AI Interactions](#ai-interactions)
7. [Telehealth](#telehealth)
8. [Health Tips](#health-tips)
9. [Emergency Features](#emergency-features)
10. [Utilities](#utilities)

## Authentication

### Sign Up

```typescript
import { supabase } from "@/integrations/supabase/client";

async function signUp(email: string, password: string, userData: any) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: userData.fullName,
        // Additional metadata
      },
    },
  });

  if (error) throw error;
  return data;
}
```

### Sign In

```typescript
async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
}
```

### Get Current User

```typescript
async function getCurrentUser() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error) throw error;
  return user;
}
```

## User Profiles

### Create Profile

```typescript
import type { TablesInsert } from "@/integrations/supabase/types";

async function createProfile(profileData: TablesInsert<"profiles">) {
  const { data, error } = await supabase
    .from("profiles")
    .insert(profileData)
    .select()
    .single();

  if (error) throw error;
  return data;
}
```

### Get User Profile

```typescript
async function getUserProfile(userId: string) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error) throw error;
  return data;
}
```

### Update Profile

```typescript
import type { TablesUpdate } from "@/integrations/supabase/types";

async function updateProfile(
  userId: string,
  updates: TablesUpdate<"profiles">
) {
  const { data, error } = await supabase
    .from("profiles")
    .update(updates)
    .eq("user_id", userId)
    .select()
    .single();

  if (error) throw error;
  return data;
}
```

### Check Profile Completion

```typescript
async function getProfileCompleteness(userId: string) {
  const { data: profile, error } = await supabase
    .from("profiles")
    .select(
      "full_name, date_of_birth, gender, height_cm, weight_kg, allergies, medical_conditions"
    )
    .eq("user_id", userId)
    .single();

  if (error) throw error;

  const requiredFields = ["full_name", "date_of_birth", "gender"];
  const completedFields = requiredFields.filter((field) => profile[field]);

  return {
    percentage: (completedFields.length / requiredFields.length) * 100,
    missingFields: requiredFields.filter((field) => !profile[field]),
  };
}
```

## Health Records

### Create Health Record

```typescript
async function createHealthRecord(recordData: TablesInsert<"health_records">) {
  const { data, error } = await supabase
    .from("health_records")
    .insert(recordData)
    .select()
    .single();

  if (error) throw error;
  return data;
}
```

### Get Health Records

```typescript
async function getHealthRecords(
  userId: string,
  options?: {
    recordType?: string;
    limit?: number;
    offset?: number;
  }
) {
  let query = supabase
    .from("health_records")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (options?.recordType) {
    query = query.eq("record_type", options.recordType);
  }

  if (options?.limit) {
    query = query.limit(options.limit);
  }

  if (options?.offset) {
    query = query.range(
      options.offset,
      options.offset + (options.limit || 10) - 1
    );
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
}
```

### Search Health Records

```typescript
async function searchHealthRecords(userId: string, searchTerm: string) {
  const { data, error } = await supabase
    .from("health_records")
    .select("*")
    .eq("user_id", userId)
    .or(`title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}
```

## Medications

### Add Medication Reminder

```typescript
async function addMedicationReminder(
  medicationData: TablesInsert<"medication_reminders">
) {
  const { data, error } = await supabase
    .from("medication_reminders")
    .insert(medicationData)
    .select()
    .single();

  if (error) throw error;
  return data;
}
```

### Get Active Medications

```typescript
async function getActiveMedications(userId: string) {
  const { data, error } = await supabase
    .from("medication_reminders")
    .select("*")
    .eq("user_id", userId)
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}
```

### Get Medication Due Today

```typescript
async function getMedicationsDueToday(userId: string) {
  const today = new Date().toISOString().split("T")[0];

  const { data, error } = await supabase
    .from("medication_reminders")
    .select("*")
    .eq("user_id", userId)
    .eq("is_active", true)
    .lte("start_date", today)
    .or(`end_date.is.null,end_date.gte.${today}`);

  if (error) throw error;
  return data;
}
```

### Update Medication Status

```typescript
async function updateMedicationStatus(medicationId: string, isActive: boolean) {
  const { data, error } = await supabase
    .from("medication_reminders")
    .update({ is_active: isActive })
    .eq("id", medicationId)
    .select()
    .single();

  if (error) throw error;
  return data;
}
```

## Appointments

### Schedule Appointment

```typescript
async function scheduleAppointment(
  appointmentData: TablesInsert<"appointments">
) {
  const { data, error } = await supabase
    .from("appointments")
    .insert(appointmentData)
    .select()
    .single();

  if (error) throw error;
  return data;
}
```

### Get Upcoming Appointments

```typescript
async function getUpcomingAppointments(userId: string) {
  const now = new Date().toISOString();

  const { data, error } = await supabase
    .from("appointments")
    .select("*")
    .eq("user_id", userId)
    .gte("appointment_date", now)
    .in("status", ["scheduled", "confirmed"])
    .order("appointment_date", { ascending: true });

  if (error) throw error;
  return data;
}
```

### Cancel Appointment

```typescript
async function cancelAppointment(appointmentId: string, reason?: string) {
  const { data, error } = await supabase
    .from("appointments")
    .update({
      status: "cancelled",
      cancellation_reason: reason,
    })
    .eq("id", appointmentId)
    .select()
    .single();

  if (error) throw error;
  return data;
}
```

## AI Interactions

### Save AI Conversation

```typescript
async function saveAIMessage(messageData: TablesInsert<"ai_conversations">) {
  const { data, error } = await supabase
    .from("ai_conversations")
    .insert(messageData)
    .select()
    .single();

  if (error) throw error;
  return data;
}
```

### Get Conversation History

```typescript
async function getConversationHistory(userId: string, sessionId: string) {
  const { data, error } = await supabase
    .from("ai_conversations")
    .select("*")
    .eq("user_id", userId)
    .eq("session_id", sessionId)
    .order("created_at", { ascending: true });

  if (error) throw error;
  return data;
}
```

### Save Symptom Assessment

```typescript
async function saveSymptomAssessment(
  assessmentData: TablesInsert<"symptom_assessments">
) {
  const { data, error } = await supabase
    .from("symptom_assessments")
    .insert(assessmentData)
    .select()
    .single();

  if (error) throw error;
  return data;
}
```

### Get Recent Assessments

```typescript
async function getRecentAssessments(userId: string, limit: number = 10) {
  const { data, error } = await supabase
    .from("symptom_assessments")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data;
}
```

## Telehealth

### Get Available Doctors

```typescript
async function getAvailableDoctors(specialty?: string) {
  let query = supabase
    .from("doctors")
    .select("*")
    .eq("is_active", true)
    .eq("is_verified", true)
    .order("rating", { ascending: false });

  if (specialty) {
    query = query.eq("specialty", specialty);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
}
```

### Book Consultation

```typescript
async function bookConsultation(
  consultationData: TablesInsert<"consultations">
) {
  const { data, error } = await supabase
    .from("consultations")
    .insert(consultationData)
    .select(
      `
      *,
      doctors (
        full_name,
        specialty,
        avatar_url
      )
    `
    )
    .single();

  if (error) throw error;
  return data;
}
```

### Get User Consultations

```typescript
async function getUserConsultations(userId: string, status?: string) {
  let query = supabase
    .from("consultations")
    .select(
      `
      *,
      doctors (
        full_name,
        specialty,
        avatar_url
      )
    `
    )
    .eq("user_id", userId)
    .order("scheduled_at", { ascending: false });

  if (status) {
    query = query.eq("status", status);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
}
```

## Health Tips

### Get Health Tips

```typescript
async function getHealthTips(options?: {
  category?: string;
  targetConditions?: string[];
  limit?: number;
}) {
  let query = supabase
    .from("health_tips")
    .select("*")
    .eq("is_active", true)
    .eq("is_verified", true)
    .order("view_count", { ascending: false });

  if (options?.category) {
    query = query.eq("category", options.category);
  }

  if (options?.targetConditions?.length) {
    query = query.overlaps("target_conditions", options.targetConditions);
  }

  if (options?.limit) {
    query = query.limit(options.limit);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
}
```

### Track Health Tip Interaction

```typescript
async function trackHealthTipInteraction(
  userId: string,
  tipId: string,
  interactionType: "viewed" | "liked" | "saved" | "shared"
) {
  const { data, error } = await supabase
    .from("user_health_tips")
    .upsert({
      user_id: userId,
      tip_id: tipId,
      interaction_type: interactionType,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}
```

### Get User's Saved Tips

```typescript
async function getUserSavedTips(userId: string) {
  const { data, error } = await supabase
    .from("user_health_tips")
    .select(
      `
      *,
      health_tips (*)
    `
    )
    .eq("user_id", userId)
    .eq("interaction_type", "saved")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}
```

## Emergency Features

### Get Emergency Contacts

```typescript
async function getEmergencyContacts(userId: string) {
  const { data, error } = await supabase
    .from("emergency_contacts")
    .select("*")
    .eq("user_id", userId)
    .order("priority_order", { ascending: true });

  if (error) throw error;
  return data;
}
```

### Add Emergency Contact

```typescript
async function addEmergencyContact(
  contactData: TablesInsert<"emergency_contacts">
) {
  const { data, error } = await supabase
    .from("emergency_contacts")
    .insert(contactData)
    .select()
    .single();

  if (error) throw error;
  return data;
}
```

### Get Medical Facilities

```typescript
async function getMedicalFacilities(facilityType?: string, city?: string) {
  let query = supabase
    .from("medical_facilities")
    .select("*")
    .eq("is_active", true);

  if (facilityType) {
    query = query.eq("facility_type", facilityType);
  }

  if (city) {
    query = query.eq("city", city);
  }

  const { data, error } = await query.order("name");
  if (error) throw error;

  return data;
}
```

## Utilities

### Record Vital Signs

```typescript
async function recordVitalSigns(vitalData: TablesInsert<"vital_signs">) {
  const { data, error } = await supabase
    .from("vital_signs")
    .insert(vitalData)
    .select()
    .single();

  if (error) throw error;
  return data;
}
```

### Get Vital Signs History

```typescript
async function getVitalSignsHistory(
  userId: string,
  measurementType: string,
  days: number = 30
) {
  const fromDate = new Date();
  fromDate.setDate(fromDate.getDate() - days);

  const { data, error } = await supabase
    .from("vital_signs")
    .select("*")
    .eq("user_id", userId)
    .eq("measurement_type", measurementType)
    .gte("measured_at", fromDate.toISOString())
    .order("measured_at", { ascending: true });

  if (error) throw error;
  return data;
}
```

### Submit Feedback

```typescript
async function submitFeedback(feedbackData: TablesInsert<"feedback">) {
  const { data, error } = await supabase
    .from("feedback")
    .insert(feedbackData)
    .select()
    .single();

  if (error) throw error;
  return data;
}
```

### Get/Update User Preferences

```typescript
async function getUserPreferences(userId: string) {
  const { data, error } = await supabase
    .from("user_preferences")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error) throw error;
  return data;
}

async function updateUserPreferences(
  userId: string,
  preferences: TablesUpdate<"user_preferences">
) {
  const { data, error } = await supabase
    .from("user_preferences")
    .upsert({ user_id: userId, ...preferences })
    .select()
    .single();

  if (error) throw error;
  return data;
}
```

## Real-time Subscriptions

### Subscribe to Health Records Changes

```typescript
function subscribeToHealthRecords(
  userId: string,
  callback: (payload: any) => void
) {
  return supabase
    .channel("health_records_changes")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "health_records",
        filter: `user_id=eq.${userId}`,
      },
      callback
    )
    .subscribe();
}
```

### Subscribe to Appointment Updates

```typescript
function subscribeToAppointments(
  userId: string,
  callback: (payload: any) => void
) {
  return supabase
    .channel("appointments_changes")
    .on(
      "postgres_changes",
      {
        event: "UPDATE",
        schema: "public",
        table: "appointments",
        filter: `user_id=eq.${userId}`,
      },
      callback
    )
    .subscribe();
}
```

## Error Handling

### Standard Error Handler

```typescript
interface DatabaseError {
  message: string;
  code?: string;
  details?: string;
}

function handleDatabaseError(error: any): DatabaseError {
  console.error("Database error:", error);

  // Handle specific error types
  if (error.code === "PGRST301") {
    return { message: "Record not found" };
  }

  if (error.code === "23505") {
    return { message: "This record already exists" };
  }

  if (error.code === "42501") {
    return { message: "Permission denied" };
  }

  return {
    message: error.message || "An unexpected error occurred",
    code: error.code,
    details: error.details,
  };
}
```

### Retry Logic

```typescript
async function withRetry<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      if (attempt === maxRetries) {
        throw error;
      }

      console.warn(`Attempt ${attempt} failed, retrying in ${delay}ms...`);
      await new Promise((resolve) => setTimeout(resolve, delay));
      delay *= 2; // Exponential backoff
    }
  }

  throw new Error("Max retries exceeded");
}
```

## Type Safety Examples

### Using Typed Queries

```typescript
import type {
  Tables,
  TablesInsert,
  TablesUpdate,
} from "@/integrations/supabase/types";

// Type-safe profile operations
type Profile = Tables<"profiles">;
type ProfileInsert = TablesInsert<"profiles">;
type ProfileUpdate = TablesUpdate<"profiles">;

async function createTypedProfile(profile: ProfileInsert): Promise<Profile> {
  const { data, error } = await supabase
    .from("profiles")
    .insert(profile)
    .select()
    .single();

  if (error) throw error;
  return data;
}
```

### Custom Type Guards

```typescript
function isValidMedicationReminder(
  data: any
): data is TablesInsert<"medication_reminders"> {
  return (
    typeof data.medication_name === "string" &&
    typeof data.dosage === "string" &&
    typeof data.frequency === "string" &&
    Array.isArray(data.reminder_times) &&
    typeof data.start_date === "string"
  );
}
```

---

**Last Updated**: August 22, 2025
**Version**: 1.0.0
**Maintainer**: HealthWise AI Development Team
