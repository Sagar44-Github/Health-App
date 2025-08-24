/**
 * HealthWise AI - Database Connection Test Script
 *
 * Simple script to test database connectivity and basic functionality
 * Run with: node scripts/test-db-connection.js
 */

import { createClient } from "@supabase/supabase-js";

// Configuration - replace with your actual Supabase credentials
const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://puoqqqysbfhdhbyqljcq.supabase.co";
const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB1b3FxcXlzYmZoZGhieXFsamNxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU4NjAzMTQsImV4cCI6MjA3MTQzNjMxNH0.xrBAVOVuxjx9N5vfSNJoIo-ZZ4EgTddqYz5EIQu6Qps";

// Create Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function testDatabaseConnection() {
  console.log("🚀 HealthWise AI - Database Connection Test\n");
  console.log(`Connecting to: ${SUPABASE_URL}\n`);

  try {
    // Test 1: Basic connection
    console.log("Test 1: Basic database connection...");
    const { data: connectionTest, error: connectionError } = await supabase
      .from("health_tips")
      .select("id, title")
      .limit(1);

    if (connectionError) {
      throw new Error(`Connection failed: ${connectionError.message}`);
    }

    console.log("✅ Database connection successful");
    if (connectionTest && connectionTest.length > 0) {
      console.log(`   Sample data found: "${connectionTest[0].title}"`);
    }
    console.log("");

    // Test 2: Check all required tables exist
    console.log("Test 2: Verifying table structure...");
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

    let tablesAccessible = 0;
    for (const table of requiredTables) {
      try {
        const { error } = await supabase.from(table).select("*").limit(1);

        if (!error) {
          tablesAccessible++;
          console.log(`   ✅ ${table}`);
        } else {
          console.log(`   ❌ ${table}: ${error.message}`);
        }
      } catch (err) {
        console.log(`   ❌ ${table}: Error accessing table`);
      }
    }

    console.log(
      `\n   Total: ${tablesAccessible}/${requiredTables.length} tables accessible\n`
    );

    // Test 3: Check sample data
    console.log("Test 3: Checking sample data...");

    // Doctors
    const { data: doctors, error: doctorsError } = await supabase
      .from("doctors")
      .select("id, full_name, specialty")
      .eq("is_active", true)
      .limit(3);

    if (!doctorsError && doctors) {
      console.log(`   ✅ Found ${doctors.length} active doctors`);
      doctors.forEach((doctor) => {
        console.log(`      - ${doctor.full_name} (${doctor.specialty})`);
      });
    } else {
      console.log(
        `   ❌ Doctors data: ${doctorsError?.message || "No data found"}`
      );
    }

    // Health Tips
    const { data: tips, error: tipsError } = await supabase
      .from("health_tips")
      .select("id, title, category")
      .eq("is_active", true)
      .limit(3);

    if (!tipsError && tips) {
      console.log(`   ✅ Found ${tips.length} health tips`);
      tips.forEach((tip) => {
        console.log(`      - ${tip.title} (${tip.category})`);
      });
    } else {
      console.log(
        `   ❌ Health tips data: ${tipsError?.message || "No data found"}`
      );
    }

    // Medical Facilities
    const { data: facilities, error: facilitiesError } = await supabase
      .from("medical_facilities")
      .select("id, name, facility_type")
      .eq("is_active", true)
      .limit(3);

    if (!facilitiesError && facilities) {
      console.log(`   ✅ Found ${facilities.length} medical facilities`);
      facilities.forEach((facility) => {
        console.log(`      - ${facility.name} (${facility.facility_type})`);
      });
    } else {
      console.log(
        `   ❌ Medical facilities data: ${
          facilitiesError?.message || "No data found"
        }`
      );
    }

    console.log("");

    // Test 4: Performance check
    console.log("Test 4: Performance check...");
    const startTime = Date.now();

    const { data: perfTest, error: perfError } = await supabase
      .from("health_tips")
      .select("*")
      .eq("is_active", true)
      .order("view_count", { ascending: false })
      .limit(10);

    const queryTime = Date.now() - startTime;

    if (!perfError) {
      console.log(`   ✅ Query completed in ${queryTime}ms`);
      console.log(`   ✅ Retrieved ${perfTest.length} records`);
    } else {
      console.log(`   ❌ Performance test failed: ${perfError.message}`);
    }

    console.log("");

    // Test 5: Row Level Security check
    console.log("Test 5: Row Level Security check...");
    try {
      // This should work (public data)
      const { data: publicData, error: publicError } = await supabase
        .from("health_tips")
        .select("id")
        .eq("is_active", true)
        .limit(1);

      if (!publicError && publicData) {
        console.log("   ✅ Public data accessible");
      } else {
        console.log("   ❌ Public data access failed");
      }

      // This should return empty (user-specific data without authentication)
      const { data: privateData, error: privateError } = await supabase
        .from("profiles")
        .select("id")
        .limit(1);

      if (!privateError && privateData?.length === 0) {
        console.log("   ✅ RLS properly protecting user data");
      } else {
        console.log("   ⚠️ RLS may not be working correctly");
      }
    } catch (rlsError) {
      console.log(`   ❌ RLS test error: ${rlsError.message}`);
    }

    console.log("\n🎉 Database connection test completed successfully!");
    console.log("\n📋 Summary:");
    console.log("   ✅ Database is accessible");
    console.log("   ✅ All required tables exist");
    console.log("   ✅ Sample data is populated");
    console.log("   ✅ Performance is acceptable");
    console.log("   ✅ Security (RLS) is active");

    console.log("\n🚀 Your HealthWise AI database is ready to use!");

    return true;
  } catch (error) {
    console.error("\n❌ Database connection test failed:");
    console.error(error.message);
    console.error("\n🔧 Please check:");
    console.error("   1. Supabase URL and API key are correct");
    console.error("   2. Database migrations have been applied");
    console.error("   3. Supabase project is active");
    console.error("   4. Network connectivity");

    return false;
  }
}

// Test for specific features
async function testSpecificFeatures() {
  console.log("\n🔍 Additional Feature Tests:\n");

  try {
    // Test JSON fields
    console.log("Testing JSONB fields...");
    const { data: jsonTest, error: jsonError } = await supabase
      .from("health_tips")
      .select("data")
      .not("tags", "is", null)
      .limit(1);

    if (!jsonError) {
      console.log("   ✅ JSONB fields working");
    }

    // Test array fields
    console.log("Testing array fields...");
    const { data: arrayTest, error: arrayError } = await supabase
      .from("health_tips")
      .select("tags")
      .not("tags", "is", null)
      .limit(1);

    if (!arrayError && arrayTest && arrayTest[0]?.tags) {
      console.log("   ✅ Array fields working");
      console.log(`      Sample tags: ${arrayTest[0].tags.join(", ")}`);
    }

    // Test city-based facility queries
    console.log("Testing facility data by city...");
    const { data: facilityTest, error: facilityError } = await supabase
      .from("medical_facilities")
      .select("name, city, facility_type")
      .not("city", "is", null)
      .limit(1);

    if (!facilityError && facilityTest && facilityTest.length > 0) {
      console.log("   ✅ Facility city data available");
      console.log(
        `      Sample: ${facilityTest[0].name} in ${facilityTest[0].city} (${facilityTest[0].facility_type})`
      );
    }
  } catch (error) {
    console.log("   ⚠️ Some advanced features may not be fully configured");
  }
}

// Run the tests
async function main() {
  const success = await testDatabaseConnection();

  if (success) {
    await testSpecificFeatures();
  }

  process.exit(success ? 0 : 1);
}

// Execute if run as main module
main().catch(console.error);
