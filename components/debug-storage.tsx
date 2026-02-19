"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { loadFromLocalStorage, removeFromLocalStorage } from "@/lib/local-storage"

export function DebugStorage() {
  const [userData, setUserData] = useState<string>("Loading...")
  const [rolesData, setRolesData] = useState<string>("Loading...")
  const [youthPopulationData, setYouthPopulationData] = useState<string>("Loading...")
  const [youthWithDisabilitiesData, setYouthWithDisabilitiesData] = useState<string>("Loading...")
  const [youthWithoutDisabilitiesData, setYouthWithoutDisabilitiesData] = useState<string>("Loading...")
  const [humanTraffickingData, setHumanTraffickingData] = useState<string>("Loading...")
  const [youthMigrationData, setYouthMigrationData] = useState<string>("Loading...")
  const [showDebug, setShowDebug] = useState(false)

  const loadAllData = () => {
    if (typeof window !== "undefined") {
      const users = loadFromLocalStorage("userData", "No user data found")
      const roles = loadFromLocalStorage("rolesData", "No roles data found")
      const youthPop = loadFromLocalStorage("youthPopulationData", "No youth population data found")
      const youthWithDis = loadFromLocalStorage("youthWithDisabilitiesData", "No youth with disabilities data found")
      const youthWithoutDis = loadFromLocalStorage(
        "youthWithoutDisabilitiesData",
        "No youth without disabilities data found",
      )
      const humanTraff = loadFromLocalStorage("humanTraffickingData", "No human trafficking data found")
      const youthMig = loadFromLocalStorage("youthMigrationData", "No youth migration data found")

      setUserData(typeof users === "string" ? users : JSON.stringify(users, null, 2))
      setRolesData(typeof roles === "string" ? roles : JSON.stringify(roles, null, 2))
      setYouthPopulationData(typeof youthPop === "string" ? youthPop : JSON.stringify(youthPop, null, 2))
      setYouthWithDisabilitiesData(
        typeof youthWithDis === "string" ? youthWithDis : JSON.stringify(youthWithDis, null, 2),
      )
      setYouthWithoutDisabilitiesData(
        typeof youthWithoutDis === "string" ? youthWithoutDis : JSON.stringify(youthWithoutDis, null, 2),
      )
      setHumanTraffickingData(typeof humanTraff === "string" ? humanTraff : JSON.stringify(humanTraff, null, 2))
      setYouthMigrationData(typeof youthMig === "string" ? youthMig : JSON.stringify(youthMig, null, 2))
    }
  }

  useEffect(() => {
    loadAllData()
  }, [])

  const clearAllStorage = () => {
    if (typeof window !== "undefined") {
      removeFromLocalStorage("userData")
      removeFromLocalStorage("rolesData")
      removeFromLocalStorage("youthPopulationData")
      removeFromLocalStorage("youthWithDisabilitiesData")
      removeFromLocalStorage("youthWithoutDisabilitiesData")
      removeFromLocalStorage("humanTraffickingData")
      removeFromLocalStorage("youthMigrationData")
      loadAllData()
    }
  }

  if (!showDebug) {
    return (
      <div className="fixed bottom-4 right-4">
        <Button variant="outline" size="sm" onClick={() => setShowDebug(true)}>
          Debug
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Card className="w-96 max-h-96 overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between py-2">
          <CardTitle className="text-sm">LocalStorage Debug</CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={loadAllData}>
              Refresh
            </Button>
            <Button variant="outline" size="sm" onClick={clearAllStorage}>
              Clear All
            </Button>
            <Button variant="outline" size="sm" onClick={() => setShowDebug(false)}>
              Close
            </Button>
          </div>
        </CardHeader>
        <CardContent className="py-2 overflow-auto max-h-80">
          <Tabs defaultValue="users" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="youth">Youth</TabsTrigger>
              <TabsTrigger value="other">Other</TabsTrigger>
            </TabsList>
            <TabsContent value="users" className="space-y-2">
              <div>
                <h3 className="text-sm font-medium">User Data:</h3>
                <pre className="mt-1 max-h-32 overflow-auto rounded bg-gray-100 p-2 text-xs">{userData}</pre>
              </div>
              <div>
                <h3 className="text-sm font-medium">Roles Data:</h3>
                <pre className="mt-1 max-h-32 overflow-auto rounded bg-gray-100 p-2 text-xs">{rolesData}</pre>
              </div>
            </TabsContent>
            <TabsContent value="youth" className="space-y-2">
              <div>
                <h3 className="text-sm font-medium">Youth Population:</h3>
                <pre className="mt-1 max-h-20 overflow-auto rounded bg-gray-100 p-2 text-xs">{youthPopulationData}</pre>
              </div>
              <div>
                <h3 className="text-sm font-medium">Youth with Disabilities:</h3>
                <pre className="mt-1 max-h-20 overflow-auto rounded bg-gray-100 p-2 text-xs">
                  {youthWithDisabilitiesData}
                </pre>
              </div>
              <div>
                <h3 className="text-sm font-medium">Youth without Disabilities:</h3>
                <pre className="mt-1 max-h-20 overflow-auto rounded bg-gray-100 p-2 text-xs">
                  {youthWithoutDisabilitiesData}
                </pre>
              </div>
            </TabsContent>
            <TabsContent value="other" className="space-y-2">
              <div>
                <h3 className="text-sm font-medium">Human Trafficking:</h3>
                <pre className="mt-1 max-h-20 overflow-auto rounded bg-gray-100 p-2 text-xs">
                  {humanTraffickingData}
                </pre>
              </div>
              <div>
                <h3 className="text-sm font-medium">Youth Migration:</h3>
                <pre className="mt-1 max-h-20 overflow-auto rounded bg-gray-100 p-2 text-xs">{youthMigrationData}</pre>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
