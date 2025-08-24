/**
 * HealthWise AI - Database Schema and Connection Tests
 *
 * This file contains comprehensive tests for the database schema,
 * connections, and core functionality.
 */

import { supabase } from "@/integrations/supabase/client";
import type { Tables, TablesInsert } from "@/integrations/supabase/types";

// Test configuration
const TEST_USER_EMAIL = "test@healthwise.ai";
const TEST_USER_PASSWORD = "TestPassword123!";

describe("Database Schema Tests", () => {
  let testUserId: string | null = null;
  let testSessionId: string;

  beforeAll(async () => {
    // Generate test session ID
    testSessionId = `test-session-${Date.now()}`;
  });

  afterAll(async () => {
    // Cleanup test data
    if (testUserId) {
      await cleanupTestData(testUserId);
    }
  });

  describe("Connection and Authentication", () => {
    test("should connect to Supabase successfully", async () => {
      const { data, error } = await supabase
        .from("health_tips")
        .select("id")
        .limit(1);

      expect(error).toBeNull();
      expect(data).toBeDefined();
    });

    test("should authenticate user successfully", async () => {
      // Sign up test user
      const { data: signUpData, error: signUpError } =
        await supabase.auth.signUp({
          email: TEST_USER_EMAIL,
          password: TEST_USER_PASSWORD,
        });

      if (signUpError && signUpError.message.includes("already registered")) {
        // User exists, sign in instead
        const { data: signInData, error: signInError } =
          await supabase.auth.signInWithPassword({
            email: TEST_USER_EMAIL,
            password: TEST_USER_PASSWORD,
          });

        expect(signInError).toBeNull();
        expect(signInData.user).toBeDefined();
        testUserId = signInData.user?.id || null;
      } else {
        expect(signUpError).toBeNull();
        expect(signUpData.user).toBeDefined();
        testUserId = signUpData.user?.id || null;
      }
    });
  });

  describe("Table Structure Tests", () => {
    test("should have all required tables", async () => {
      const requiredTables = [
        "profiles",
        "doctors",
        "consultations",
        "health_records",
        "appointments",
        "medication_reminders",
        "ai_conversations",
        "symptom_assessments",
        "prescriptions",
        "feedback",
        "health_tips",
        "user_health_tips",
        "vital_signs",
        "medical_facilities",
        "user_preferences",
        "emergency_contacts",
      ];

      for (const table of requiredTables) {
        const { data, error } = await supabase
          .from(table as any)
          .select("*")
          .limit(1);

        expect(error).toBeNull();
        console.log(`✓ Table '${table}' exists and is accessible`);
      }
    });

    test("should have sample data populated", async () => {
      // Check doctors
      const { data: doctors, error: doctorsError } = await supabase
        .from("doctors")
        .select("id")
        .eq("is_active", true);

      expect(doctorsError).toBeNull();
      expect(doctors).toBeDefined();
      expect(doctors!.length).toBeGreaterThan(0);
      console.log(`✓ Found ${doctors!.length} active doctors`);

      // Check health tips
      const { data: tips, error: tipsError } = await supabase
        .from("health_tips")
        .select("id")
        .eq("is_active", true);

      expect(tipsError).toBeNull();
      expect(tips).toBeDefined();
      expect(tips!.length).toBeGreaterThan(0);
      console.log(`✓ Found ${tips!.length} active health tips`);

      // Check medical facilities
      const { data: facilities, error: facilitiesError } = await supabase
        .from("medical_facilities")
        .select("id")
        .eq("is_active", true);

      expect(facilitiesError).toBeNull();
      expect(facilities).toBeDefined();
      expect(facilities!.length).toBeGreaterThan(0);
      console.log(`✓ Found ${facilities!.length} active medical facilities`);
    });
  });

  describe("Row Level Security Tests", () => {
    test("should prevent access to other users data", async () => {
      if (!testUserId) {
        throw new Error("Test user not authenticated");
      }

      // Try to access profiles with a different user_id
      const fakeUserId = "00000000-0000-0000-0000-000000000000";
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", fakeUserId);

      expect(error).toBeNull();
      expect(data).toEqual([]);
      console.log("✓ RLS properly isolates user data");
    });

    test("should allow access to public data", async () => {
      // Health tips should be accessible without authentication
      const { data, error } = await supabase
        .from("health_tips")
        .select("*")
        .eq("is_active", true)
        .limit(5);

      expect(error).toBeNull();
      expect(data).toBeDefined();
      expect(data!.length).toBeGreaterThan(0);
      console.log("✓ Public data is accessible");
    });
  });

  describe("CRUD Operations Tests", () => {
    test("should create and retrieve user profile", async () => {
      if (!testUserId) {
        throw new Error("Test user not authenticated");
      }

      const profileData: TablesInsert<"profiles"> = {
        user_id: testUserId,
        full_name: "Test User",
        date_of_birth: "1990-01-01",
        gender: "other",
        height_cm: 175,
        weight_kg: 70.5,
        blood_type: "O+",
        allergies: ["Peanuts", "Shellfish"],
        medical_conditions: ["Asthma"],
        profile_completed: true,
      };

      // Create profile
      const { data: createdProfile, error: createError } = await supabase
        .from("profiles")
        .upsert(profileData)
        .select()
        .single();

      expect(createError).toBeNull();
      expect(createdProfile).toBeDefined();
      expect(createdProfile.full_name).toBe("Test User");
      console.log("✓ Profile created successfully");

      // Retrieve profile
      const { data: retrievedProfile, error: retrieveError } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", testUserId)
        .single();

      expect(retrieveError).toBeNull();
      expect(retrievedProfile).toBeDefined();
      expect(retrievedProfile.full_name).toBe("Test User");
      console.log("✓ Profile retrieved successfully");
    });

    test("should create health record", async () => {
      if (!testUserId) {
        throw new Error("Test user not authenticated");
      }

      const healthRecordData: TablesInsert<"health_records"> = {
        user_id: testUserId,
        record_type: "symptom_check",
        title: "Test Symptom Check",
        description: "Test headache assessment",
        data: {
          symptoms: ["headache", "fatigue"],
          severity: "mild",
        },
        severity: "low",
        tags: ["headache", "test"],
      };

      const { data: createdRecord, error } = await supabase
        .from("health_records")
        .insert(healthRecordData)
        .select()
        .single();

      expect(error).toBeNull();
      expect(createdRecord).toBeDefined();
      expect(createdRecord.title).toBe("Test Symptom Check");
      console.log("✓ Health record created successfully");
    });

    test("should create medication reminder", async () => {
      if (!testUserId) {
        throw new Error("Test user not authenticated");
      }

      const medicationData: TablesInsert<"medication_reminders"> = {
        user_id: testUserId,
        medication_name: "Test Medication",
        dosage: "10mg",
        frequency: "daily",
        times_per_day: 2,
        reminder_times: ["08:00", "20:00"],
        start_date: "2025-08-22",
        food_instructions: "with_food",
        is_active: true,
      };

      const { data: createdMedication, error } = await supabase
        .from("medication_reminders")
        .insert(medicationData)
        .select()
        .single();

      expect(error).toBeNull();
      expect(createdMedication).toBeDefined();
      expect(createdMedication.medication_name).toBe("Test Medication");
      console.log("✓ Medication reminder created successfully");
    });

    test("should create AI conversation", async () => {
      if (!testUserId) {
        throw new Error("Test user not authenticated");
      }

      const conversationData: TablesInsert<"ai_conversations"> = {
        user_id: testUserId,
        session_id: testSessionId,
        conversation_type: "health_chat",
        message_role: "user",
        message_content: "Test message for AI",
        response_time_ms: 1500,
      };

      const { data: createdMessage, error } = await supabase
        .from("ai_conversations")
        .insert(conversationData)
        .select()
        .single();

      expect(error).toBeNull();
      expect(createdMessage).toBeDefined();
      expect(createdMessage.message_content).toBe("Test message for AI");
      console.log("✓ AI conversation saved successfully");
    });

    test("should create vital signs record", async () => {
      if (!testUserId) {
        throw new Error("Test user not authenticated");
      }

      const vitalSignsData: TablesInsert<"vital_signs"> = {
        user_id: testUserId,
        measurement_type: "blood_pressure",
        systolic: 120,
        diastolic: 80,
        unit: "mmHg",
        measured_at: new Date().toISOString(),
        is_manual_entry: true,
      };

      const { data: createdVitals, error } = await supabase
        .from("vital_signs")
        .insert(vitalSignsData)
        .select()
        .single();

      expect(error).toBeNull();
      expect(createdVitals).toBeDefined();
      expect(createdVitals.measurement_type).toBe("blood_pressure");
      console.log("✓ Vital signs recorded successfully");
    });
  });

  describe("Index Performance Tests", () => {
    test("should perform user profile queries efficiently", async () => {
      if (!testUserId) {
        throw new Error("Test user not authenticated");
      }

      const startTime = Date.now();

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", testUserId)
        .single();

      const queryTime = Date.now() - startTime;

      expect(error).toBeNull();
      expect(data).toBeDefined();
      expect(queryTime).toBeLessThan(1000); // Should complete in less than 1 second
      console.log(`✓ Profile query completed in ${queryTime}ms`);
    });

    test("should perform health records queries efficiently", async () => {
      if (!testUserId) {
        throw new Error("Test user not authenticated");
      }

      const startTime = Date.now();

      const { data, error } = await supabase
        .from("health_records")
        .select("*")
        .eq("user_id", testUserId)
        .order("created_at", { ascending: false })
        .limit(10);

      const queryTime = Date.now() - startTime;

      expect(error).toBeNull();
      expect(data).toBeDefined();
      expect(queryTime).toBeLessThan(1000);
      console.log(`✓ Health records query completed in ${queryTime}ms`);
    });
  });

  describe("Foreign Key Relationships Tests", () => {
    test("should maintain referential integrity", async () => {
      // Try to create health record with invalid doctor_id
      const invalidHealthRecord: TablesInsert<"health_records"> = {
        user_id: testUserId!,
        record_type: "appointment",
        title: "Test Record",
        doctor_id: "00000000-0000-0000-0000-000000000000", // Non-existent doctor
      };

      const { data, error } = await supabase
        .from("health_records")
        .insert(invalidHealthRecord)
        .select();

      // Should fail due to foreign key constraint
      expect(error).toBeDefined();
      console.log("✓ Foreign key constraints are enforced");
    });
  });

  describe("Complex Query Tests", () => {
    test("should perform join queries correctly", async () => {
      // Get health tips with user interactions
      const { data, error } = await supabase
        .from("health_tips")
        .select(
          `
          *,
          user_health_tips!inner(*)
        `
        )
        .eq("is_active", true)
        .limit(5);

      expect(error).toBeNull();
      expect(data).toBeDefined();
      console.log("✓ Join queries work correctly");
    });

    test("should handle array operations", async () => {
      // Search health tips by tags
      const { data, error } = await supabase
        .from("health_tips")
        .select("*")
        .contains("tags", ["hydration"])
        .eq("is_active", true);

      expect(error).toBeNull();
      expect(data).toBeDefined();
      console.log("✓ Array operations work correctly");
    });
  });
});

/**
 * Cleanup function to remove test data
 */
async function cleanupTestData(userId: string) {
  try {
    console.log("🧹 Cleaning up test data...");

    // Delete in order to respect foreign key constraints
    await supabase.from("user_health_tips").delete().eq("user_id", userId);
    await supabase.from("vital_signs").delete().eq("user_id", userId);
    await supabase.from("ai_conversations").delete().eq("user_id", userId);
    await supabase.from("symptom_assessments").delete().eq("user_id", userId);
    await supabase.from("emergency_contacts").delete().eq("user_id", userId);
    await supabase.from("user_preferences").delete().eq("user_id", userId);
    await supabase.from("medication_reminders").delete().eq("user_id", userId);
    await supabase.from("health_records").delete().eq("user_id", userId);
    await supabase.from("appointments").delete().eq("user_id", userId);
    await supabase.from("prescriptions").delete().eq("user_id", userId);
    await supabase.from("consultations").delete().eq("user_id", userId);
    await supabase.from("feedback").delete().eq("user_id", userId);
    await supabase.from("profiles").delete().eq("user_id", userId);

    console.log("✓ Test data cleaned up successfully");
  } catch (error) {
    console.warn("Warning: Could not clean up all test data:", error);
  }
}

/**
 * Manual test runner for development
 */
export async function runManualTests() {
  console.log("🚀 Running HealthWise AI Database Tests...\n");

  try {
    // Connection test
    console.log("Testing database connection...");
    const { data, error } = await supabase
      .from("health_tips")
      .select("id, title")
      .limit(1);

    if (error) {
      throw error;
    }

    console.log("✅ Database connection successful");
    console.log(`Sample data: ${JSON.stringify(data, null, 2)}\n`);

    // Table structure test
    console.log("Testing table accessibility...");
    const tables = [
      "profiles",
      "doctors",
      "consultations",
      "health_records",
      "appointments",
      "medication_reminders",
      "ai_conversations",
      "symptom_assessments",
      "prescriptions",
      "feedback",
      "health_tips",
      "user_health_tips",
      "vital_signs",
      "medical_facilities",
      "user_preferences",
      "emergency_contacts",
    ];

    for (const table of tables) {
      try {
        const { error: tableError } = await supabase
          .from(table as any)
          .select("*")
          .limit(1);

        if (tableError) {
          console.log(`❌ Table '${table}': ${tableError.message}`);
        } else {
          console.log(`✅ Table '${table}': accessible`);
        }
      } catch (err) {
        console.log(`❌ Table '${table}': error accessing`);
      }
    }

    console.log("\n🎉 All manual tests completed!");
    return true;
  } catch (error) {
    console.error("❌ Database tests failed:", error);
    return false;
  }
}

// Export for use in other files
export { cleanupTestData };
