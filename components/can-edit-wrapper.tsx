"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"

interface CanEditWrapperProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

/**
 * Client component that conditionally renders children based on user's edit permissions
 * Shows children only if user is admin or data_entry
 */
export function CanEditWrapper({ children, fallback = null }: CanEditWrapperProps) {
  const [canEdit, setCanEdit] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function checkPermissions() {
      const supabase = createClient()

      if (!supabase) {
        console.log("[v0] CanEditWrapper: Supabase client not available")
        setIsLoading(false)
        return
      }

      const {
        data: { user: authUser },
      } = await supabase.auth.getUser()

      if (!authUser) {
        setIsLoading(false)
        return
      }

      const { data: userData } = await supabase.from("users").select("role").eq("id", authUser.id).single()

      if (userData && (userData.role === "admin" || userData.role === "data_entry")) {
        setCanEdit(true)
      }

      setIsLoading(false)
    }

    checkPermissions()
  }, [])

  if (isLoading) {
    return null
  }

  return canEdit ? <>{children}</> : <>{fallback}</>
}
