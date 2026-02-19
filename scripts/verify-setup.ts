/**
 * Database Setup Verification Script
 *
 * This script verifies that all database tables, RLS policies, and functions
 * are properly set up for the Youth IMS application.
 *
 * Run this after executing all SQL setup scripts to ensure everything is configured correctly.
 */

import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

interface VerificationResult {
  category: string
  test: string
  passed: boolean
  message: string
}

const results: VerificationResult[] = []

async function verifyTableExists(tableName: string): Promise<boolean> {
  try {
    const { error } = await supabase.from(tableName).select("*").limit(1)
    return !error || error.code !== "PGRST204"
  } catch {
    return false
  }
}

async function verifyRLSEnabled(tableName: string): Promise<boolean> {
  try {
    const { data, error } = await supabase.rpc("pg_tables").select("*").eq("tablename", tableName).single()

    return !error && data?.rowsecurity === true
  } catch {
    return false
  }
}

async function runVerification() {
  console.log("🔍 Starting Database Setup Verification...\n")

  // 1. Verify Core Tables Exist
  console.log("📋 Checking Core Tables...")
  const coreTables = [
    "users",
    "nyc_activities",
    "nsc_participants",
    "nyss_programs",
    "nyss_graduates",
    "registered_youth_orgs",
    "indicator_data",
    "human_trafficking",
    "youth_migration",
    "youth_population",
    "youth_with_disabilities",
    "youth_without_disabilities",
  ]

  for (const table of coreTables) {
    const exists = await verifyTableExists(table)
    results.push({
      category: "Tables",
      test: `Table '${table}' exists`,
      passed: exists,
      message: exists ? "Found" : "Missing - run setup scripts",
    })
  }

  // 2. Verify RLS is Enabled
  console.log("\n🔒 Checking Row Level Security...")
  for (const table of coreTables) {
    const rlsEnabled = await verifyRLSEnabled(table)
    results.push({
      category: "RLS",
      test: `RLS enabled on '${table}'`,
      passed: rlsEnabled,
      message: rlsEnabled ? "Enabled" : "Not enabled - run RLS script",
    })
  }

  // 3. Verify Helper Functions Exist
  console.log("\n⚙️  Checking Helper Functions...")
  const functions = ["can_edit_data", "is_authenticated"]

  for (const func of functions) {
    try {
      const { error } = await supabase.rpc(func as any)
      const exists = !error || error.code !== "42883"
      results.push({
        category: "Functions",
        test: `Function '${func}' exists`,
        passed: exists,
        message: exists ? "Found" : "Missing - run RLS script",
      })
    } catch {
      results.push({
        category: "Functions",
        test: `Function '${func}' exists`,
        passed: false,
        message: "Error checking function",
      })
    }
  }

  // 4. Print Results
  console.log("\n" + "=".repeat(80))
  console.log("VERIFICATION RESULTS")
  console.log("=".repeat(80) + "\n")

  const categories = [...new Set(results.map((r) => r.category))]

  for (const category of categories) {
    const categoryResults = results.filter((r) => r.category === category)
    const passed = categoryResults.filter((r) => r.passed).length
    const total = categoryResults.length

    console.log(`\n${category}: ${passed}/${total} passed`)
    console.log("-".repeat(80))

    for (const result of categoryResults) {
      const icon = result.passed ? "✅" : "❌"
      console.log(`${icon} ${result.test}`)
      if (!result.passed) {
        console.log(`   → ${result.message}`)
      }
    }
  }

  // 5. Summary
  const totalPassed = results.filter((r) => r.passed).length
  const totalTests = results.length
  const allPassed = totalPassed === totalTests

  console.log("\n" + "=".repeat(80))
  console.log(`SUMMARY: ${totalPassed}/${totalTests} tests passed`)
  console.log("=".repeat(80))

  if (allPassed) {
    console.log("\n✨ All checks passed! Your database is properly configured.")
  } else {
    console.log("\n⚠️  Some checks failed. Please review the errors above and run the necessary setup scripts.")
  }

  return allPassed
}

// Run verification
runVerification()
  .then((success) => {
    process.exit(success ? 0 : 1)
  })
  .catch((error) => {
    console.error("❌ Verification failed with error:", error)
    process.exit(1)
  })
