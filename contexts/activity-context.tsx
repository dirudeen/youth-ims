"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useCallback } from "react"
import { type Activity, activityData } from "@/lib/activity-data"
import { trackActivity as trackActivityUtil } from "@/lib/activity-tracker"
import { loadFromLocalStorage, saveToLocalStorage } from "@/lib/local-storage"

type ActivityContextType = {
  activities: Activity[]
  trackActivity: (action: string, target: string, details: string) => void
  logActivity: (action: string, target: string, details: string) => void
}

const ActivityContext = createContext<ActivityContextType | undefined>(undefined)

export function ActivityProvider({ children }: { children: React.ReactNode }) {
  const [activities, setActivities] = useState<Activity[]>(activityData)

  // Load activities from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedActivities = loadFromLocalStorage("activities", activityData)
      setActivities(storedActivities)
    }
  }, [])

  // Save activities to localStorage when they change
  useEffect(() => {
    if (typeof window !== "undefined" && activities.length > 0) {
      saveToLocalStorage("activities", activities)
    }
  }, [activities])

  const trackActivity = useCallback(
    (action: string, target: string, details: string) => {
      trackActivityUtil(action, target, details, activities, setActivities)
    },
    [activities],
  )

  return (
    <ActivityContext.Provider
      value={{
        activities,
        trackActivity,
        logActivity: trackActivity,
      }}
    >
      {children}
    </ActivityContext.Provider>
  )
}

export function useActivity() {
  const context = useContext(ActivityContext)
  if (context === undefined) {
    throw new Error("useActivity must be used within an ActivityProvider")
  }
  return context
}

// Export alias for backward compatibility
export const useActivityTracker = useActivity
