/**
 * Utility functions for working with localStorage
 */

// Check if we're in a browser environment
const isBrowser = typeof window !== "undefined"

/**
 * Save data to localStorage with error handling
 */
export function saveToLocalStorage<T>(key: string, data: T): boolean {
  if (!isBrowser) return false

  try {
    const serializedData = JSON.stringify(data)
    localStorage.setItem(key, serializedData)
    console.log(`Successfully saved ${key} to localStorage:`, data)
    return true
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error)
    return false
  }
}

/**
 * Load data from localStorage with error handling
 */
export function loadFromLocalStorage<T>(key: string, defaultValue: T): T {
  if (!isBrowser) return defaultValue

  try {
    const serializedData = localStorage.getItem(key)
    if (serializedData === null) {
      console.log(`No ${key} found in localStorage, using default value`)
      return defaultValue
    }

    const parsedData = JSON.parse(serializedData) as T
    console.log(`Successfully loaded ${key} from localStorage:`, parsedData)
    return parsedData
  } catch (error) {
    console.error(`Error loading ${key} from localStorage:`, error)
    return defaultValue
  }
}

/**
 * Remove data from localStorage with error handling
 */
export function removeFromLocalStorage(key: string): boolean {
  if (!isBrowser) return false

  try {
    localStorage.removeItem(key)
    console.log(`Successfully removed ${key} from localStorage`)
    return true
  } catch (error) {
    console.error(`Error removing ${key} from localStorage:`, error)
    return false
  }
}

/**
 * Clear all data from localStorage with error handling
 */
export function clearLocalStorage(): boolean {
  if (!isBrowser) return false

  try {
    localStorage.clear()
    console.log("Successfully cleared localStorage")
    return true
  } catch (error) {
    console.error("Error clearing localStorage:", error)
    return false
  }
}

/**
 * Check if localStorage is available
 */
export function isLocalStorageAvailable(): boolean {
  if (!isBrowser) return false

  try {
    const testKey = "__test__"
    localStorage.setItem(testKey, testKey)
    localStorage.removeItem(testKey)
    return true
  } catch (error) {
    console.error("localStorage is not available:", error)
    return false
  }
}
