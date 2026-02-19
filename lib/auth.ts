import { createClient as createServerClient } from "@/lib/supabase/server"

export type UserRole = "admin" | "data_entry" | "viewer"

export interface User {
  id: string
  email: string
  name: string | null
  role: UserRole
  created_at: string
  updated_at: string
}

/**
 * Get the current authenticated user with their role
 */
export async function getCurrentUser(): Promise<User | null> {
  const supabase = await createServerClient()

  const {
    data: { user: authUser },
  } = await supabase.auth.getUser()

  if (!authUser) {
    return null
  }

  const { data: userData } = await supabase.from("users").select("*").eq("id", authUser.id).single()

  return userData
}

/**
 * Check if user has required role
 */
export async function hasRole(requiredRole: UserRole | UserRole[]): Promise<boolean> {
  const user = await getCurrentUser()
  if (!user) return false

  const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole]
  return roles.includes(user.role)
}

/**
 * Check if user can edit data (admin or data_entry)
 */
export async function canEditData(): Promise<boolean> {
  return hasRole(["admin", "data_entry"])
}

/**
 * Check if user is admin
 */
export async function isAdmin(): Promise<boolean> {
  return hasRole("admin")
}
