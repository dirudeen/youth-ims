"use client"

import type { Activity } from "./activity-data"

// Check if we're in a browser environment
const isBrowser = typeof window !== "undefined"

// Simulated current user information
let currentUser = {
  id: "1",
  name: "John Doe",
}

// Function to set the current user
export const setCurrentUser = (userId: string, userName: string) => {
  currentUser = {
    id: userId,
    name: userName,
  }
}

// Function to track user activity
export const trackActivity = (
  action: string,
  target: string,
  details: string,
  activities: Activity[],
  setActivities: (activities: Activity[]) => void,
) => {
  // Generate random IP for demo purposes
  const ipBlocks = Array.from({ length: 4 }, () => Math.floor(Math.random() * 256))
  const ipAddress = `192.168.${ipBlocks[2]}.${ipBlocks[3]}`

  const newActivity: Activity = {
    id: (activities.length + 1).toString(),
    userId: currentUser.id,
    userName: currentUser.name,
    action,
    target,
    details,
    timestamp: new Date().toISOString(),
    ipAddress,
  }

  // Add to activities state
  setActivities([newActivity, ...activities])

  // In a real application, you would also send this to the server
  if (isBrowser) {
    console.log("Activity tracked:", newActivity)
  }

  return newActivity
}

// Function to get activities for a specific user
export const getUserActivities = (userId: string, activities: Activity[]) => {
  return activities.filter((activity) => activity.userId === userId)
}

// Function to get activities for a specific action
export const getActionActivities = (action: string, activities: Activity[]) => {
  return activities.filter((activity) => activity.action === action)
}

// Function to get activities for a specific target
export const getTargetActivities = (target: string, activities: Activity[]) => {
  return activities.filter((activity) => activity.target === target)
}
