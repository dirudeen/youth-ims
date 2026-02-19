"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    const checkAuth = () => {
      try {
        const currentUser = localStorage.getItem("currentUser")

        if (currentUser) {
          console.log("[v0] User found, redirecting to dashboard")
          router.push("/dashboard")
        } else {
          console.log("[v0] No user found, redirecting to login")
          router.push("/login")
        }
      } catch (error) {
        console.error("[v0] Error checking auth:", error)
        router.push("/login")
      } finally {
        setIsChecking(false)
      }
    }

    checkAuth()
  }, [router])

  if (!isChecking) {
    return null
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>
  )
}
