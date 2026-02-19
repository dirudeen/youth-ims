"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ShieldCheck } from "lucide-react"
import Link from "next/link"
import { loadFromLocalStorage } from "@/lib/local-storage"

interface AuthCheckClientProps {
  children: React.ReactNode
  requireRole?: "admin" | "data_entry" | "viewer"
}

interface UserData {
  id: string
  email: string
  role: "admin" | "data_entry" | "viewer"
  name: string
  created_at: string
}

export function AuthCheckClient({ children, requireRole }: AuthCheckClientProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [hasAccess, setHasAccess] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [userRole, setUserRole] = useState<string>("")
  const router = useRouter()

  useEffect(() => {
    try {
      const currentUser = loadFromLocalStorage<UserData | null>("currentUser", null)

      if (!currentUser) {
        setIsLoading(false)
        router.push("/login")
        return
      }

      if (!currentUser.id || !currentUser.email || !currentUser.role) {
        setIsLoading(false)
        router.push("/login")
        return
      }

      setIsAuthenticated(true)
      setUserRole(currentUser.role)

      if (requireRole) {
        const hasRequiredRole =
          currentUser.role === requireRole ||
          (requireRole === "data_entry" && currentUser.role === "admin") ||
          (requireRole === "viewer" && (currentUser.role === "admin" || currentUser.role === "data_entry"))

        setHasAccess(hasRequiredRole)
      } else {
        setHasAccess(true)
      }

      setIsLoading(false)
    } catch (error) {
      console.error("[v0] AuthCheckClient: Error during authentication check:", error)
      setIsLoading(false)
      router.push("/login")
    }
  }, [requireRole, router])

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  if (!hasAccess) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-gray-50">
        <ShieldCheck className="h-16 w-16 text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold text-gray-700">Access Denied</h2>
        <p className="text-gray-500 mt-2 text-center max-w-md">
          You need {requireRole === "admin" ? "administrator" : requireRole?.replace("_", " ")} privileges to access
          this page.
        </p>
        <p className="text-sm text-gray-400 mt-2">Your role: {userRole}</p>
        <Link
          href="/dashboard"
          className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Return to Dashboard
        </Link>
      </div>
    )
  }

  return <>{children}</>
}
