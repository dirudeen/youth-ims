import { createClient } from "@/lib/supabase/server"

export type UserRole = "admin" | "data_entry" | "viewer"

export interface UserPermissions {
  canView: boolean
  canEdit: boolean
  canDelete: boolean
  canManageUsers: boolean
  isAdmin: boolean
}

/**
 * Get user permissions based on their role
 */
export async function getUserPermissions(): Promise<UserPermissions | null> {
  const supabase = await createClient()

  const {
    data: { user: authUser },
  } = await supabase.auth.getUser()

  if (!authUser) {
    return null
  }

  const { data: userData } = await supabase.from("users").select("role").eq("id", authUser.id).single()

  if (!userData) {
    return null
  }

  const role = userData.role as UserRole

  return {
    canView: true, // All authenticated users can view
    canEdit: role === "admin" || role === "data_entry",
    canDelete: role === "admin" || role === "data_entry",
    canManageUsers: role === "admin",
    isAdmin: role === "admin",
  }
}

/**
 * Check if current user can edit data
 */
export async function canEditData(): Promise<boolean> {
  const permissions = await getUserPermissions()
  return permissions?.canEdit ?? false
}

/**
 * Check if current user is admin
 */
export async function isAdmin(): Promise<boolean> {
  const permissions = await getUserPermissions()
  return permissions?.isAdmin ?? false
}

/**
 * Check if current user can manage other users
 */
export async function canManageUsers(): Promise<boolean> {
  const permissions = await getUserPermissions()
  return permissions?.canManageUsers ?? false
}
