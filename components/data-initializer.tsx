"use client"

import { useEffect } from "react"
import {
  youthPopulationData,
  youthWithDisabilitiesData,
  youthWithoutDisabilitiesData,
  humanTraffickingData,
  youthMigrationData,
  userData,
  rolesData,
} from "@/lib/data"
import { nediProgramsData } from "@/lib/nedi-data"
import { indicatorData } from "@/lib/indicator-data"
import { allGNYCActivities } from "@/lib/gnyc-data"
import { nycParticipantsData } from "@/lib/nyc-data"
import { saveToLocalStorage, loadFromLocalStorage } from "@/lib/local-storage"

/**
 * DataInitializer component
 * Initializes localStorage with default data if not present
 * This component should be rendered once at the app root level
 */
export function DataInitializer() {
  useEffect(() => {
    // Initialize all data stores with default values if they don't exist
    const dataStores = [
      { key: "youthPopulationData", data: youthPopulationData },
      { key: "youthWithDisabilitiesData", data: youthWithDisabilitiesData },
      { key: "youthWithoutDisabilitiesData", data: youthWithoutDisabilitiesData },
      { key: "humanTraffickingData", data: humanTraffickingData },
      { key: "youthMigrationData", data: youthMigrationData },
      { key: "userData", data: userData },
      { key: "rolesData", data: rolesData },
      { key: "nediProgramsData", data: nediProgramsData },
      { key: "indicatorData", data: indicatorData },
      { key: "gnycActivitiesData", data: allGNYCActivities },
      { key: "nycData", data: nycParticipantsData },
    ]

    dataStores.forEach(({ key, data }) => {
      const existing = loadFromLocalStorage(key, null)
      if (!existing || (Array.isArray(existing) && existing.length === 0)) {
        saveToLocalStorage(key, data)
        console.log(`Initialized ${key} with default data`)
      }
    })
  }, [])

  return null
}
