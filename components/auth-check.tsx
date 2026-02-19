import type React from "react"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { ShieldCheck } from "lucide-react"
import Link from "next/link"

interface AuthCheckProps {
  children: React.ReactNode
  requireRole?: "admin" | "data_entry" | "viewer"
}

export async function AuthCheck({ children, requireRole }: AuthCheckProps) {
  const supabase = await createClient()

  console.log("[v0] AuthCheck: Starting authentication check")
  console.log("[v0] AuthCheck: Required role:", requireRole || "none")

  const {
    data: { user: authUser },
    error: authError,
  } = await supabase.auth.getUser()

  console.log("[v0] AuthCheck: Auth user check complete")
  console.log("[v0] AuthCheck: Auth user exists:", !!authUser)
  console.log("[v0] AuthCheck: Auth error:", authError?.message || "none")

  if (authError || !authUser) {
    console.log("[v0] AuthCheck: No authenticated user, redirecting to login")
    redirect("/login")
  }

  console.log("[v0] AuthCheck: Fetching user profile from database")
  console.log("[v0] AuthCheck: User ID:", authUser.id)

  // Get user role from database
  const { data: userData, error: dbError } = await supabase.from("users").select("*").eq("id", authUser.id).single()

  console.log("[v0] AuthCheck: Database query complete")
  console.log("[v0] AuthCheck: User data found:", !!userData)
  console.log("[v0] AuthCheck: Database error:", dbError?.message || "none")
  console.log("[v0] AuthCheck: User role:", userData?.role || "none")

  if (dbError) {
    console.error("[v0] AuthCheck: Database error details:", dbError)

    return (
      <div className="flex h-screen flex-col items-center justify-center bg-gray-50 p-4">
        <ShieldCheck className="h-16 w-16 text-red-400 mb-4" />
        <h2 className="text-2xl font-bold text-gray-700">Database Error</h2>
        <p className="text-gray-500 mt-2 text-center max-w-md">Error loading user profile: {dbError.message}</p>
        <p className="text-sm text-gray-400 mt-2">Check the console for more details.</p>
        <div className="flex gap-4 mt-6">
          <Link
            href="/dashboard"
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Return to Dashboard
          </Link>
          <Link
            href="/login"
            className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Login Again
          </Link>
        </div>
      </div>
    )
  }

  if (!userData) {
    console.log("[v0] AuthCheck: No user data found in database, redirecting to login")
    redirect("/login")
  }

  // Check role requirements
  if (requireRole) {
    console.log("[v0] AuthCheck: Checking role requirements")
    const hasRequiredRole =
      userData.role === requireRole ||
      (requireRole === "data_entry" && userData.role === "admin") ||
      (requireRole === "viewer" && (userData.role === "admin" || userData.role === "data_entry"))

    console.log("[v0] AuthCheck: Has required role:", hasRequiredRole)

    if (!hasRequiredRole) {
      console.log("[v0] AuthCheck: Access denied - insufficient permissions")
      return (
        <div className="flex h-screen flex-col items-center justify-center bg-gray-50">
          <ShieldCheck className="h-16 w-16 text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold text-gray-700">Access Denied</h2>
          <p className="text-gray-500 mt-2 text-center max-w-md">
            You need {requireRole === "admin" ? "administrator" : requireRole.replace("_", " ")} privileges to access
            this page.
          </p>
          <p className="text-sm text-gray-400 mt-2">Your current role: {userData.role}</p>
          <Link
            href="/dashboard"
            className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Return to Dashboard
          </Link>
        </div>
      )
    }
  }

  console.log("[v0] AuthCheck: Authentication successful, rendering protected content")
  return <>{children}</>
}
