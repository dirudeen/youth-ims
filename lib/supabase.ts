import { createClient } from "@supabase/supabase-js"

// Client-side Supabase client (uses anon key, safe for browser)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Supabase environment variables are not set. Using localStorage fallback.")
}

// Singleton pattern for client-side Supabase client
let supabaseClient: ReturnType<typeof createClient> | null = null

export function getSupabaseClient() {
  if (!supabaseClient && supabaseUrl && supabaseAnonKey) {
    supabaseClient = createClient(supabaseUrl, supabaseAnonKey)
  }
  return supabaseClient
}

// Test Supabase connection
export async function testSupabaseConnection(): Promise<{
  connected: boolean
  message: string
  error?: string
}> {
  try {
    const client = getSupabaseClient()

    if (!client) {
      return {
        connected: false,
        message: "Supabase client not initialized. Environment variables may be missing.",
      }
    }

    // Try a simple query to test connection
    const { data, error } = await client.from("_test_connection").select("*").limit(1)

    // Even if the table doesn't exist, a proper connection will return a specific error
    if (error) {
      const errorMsg = error.message.toLowerCase()
      // Check for various "table doesn't exist" error formats
      const isTableNotFoundError =
        (errorMsg.includes("relation") && errorMsg.includes("does not exist")) ||
        errorMsg.includes("schema cache") ||
        errorMsg.includes("could not find the table")

      if (isTableNotFoundError) {
        return {
          connected: true,
          message: "Supabase connection successful! Database is ready.",
        }
      }

      return {
        connected: false,
        message: "Supabase connection failed.",
        error: error.message,
      }
    }

    return {
      connected: true,
      message: "Supabase connection successful!",
    }
  } catch (error) {
    return {
      connected: false,
      message: "Failed to connect to Supabase.",
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}

// Export the client for use in components
export const supabase = getSupabaseClient()
