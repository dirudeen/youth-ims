"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, CheckCircle2, AlertCircle, Database, FileJson } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useToast } from "@/hooks/use-toast"
import { loadFromLocalStorage } from "@/lib/local-storage"
import { Badge } from "@/components/ui/badge"

type ImportStatus = "idle" | "importing" | "success" | "error"

interface ImportResult {
  table: string
  status: ImportStatus
  count: number
  error?: string
}

export default function DataImportPage() {
  const [importing, setImporting] = useState(false)
  const [results, setResults] = useState<ImportResult[]>([])
  const { toast } = useToast()
  const supabase = createClient()

  const importTables = [
    { key: "nycData", table: "nyc_activities", label: "NYC Activities" },
    { key: "nscData", table: "nsc_participants", label: "NSC Participants" },
    { key: "nyssGraduatesData", table: "nyss_graduates", label: "NYSS Graduates" },
    { key: "nyssProgramsData", table: "nyss_programs", label: "NYSS Programs" },
    { key: "indicatorData", table: "indicator_data", label: "Indicator Data" },
    { key: "gnycActivitiesData", table: "gnyc_activities", label: "GNYC Activities" },
    { key: "nediProgramsData", table: "nedi_programs", label: "NEDI" }, // Changed label from "NEDI Programs" to "NEDI"
  ]

  const handleImport = async () => {
    setImporting(true)
    setResults([])
    const importResults: ImportResult[] = []

    for (const { key, table, label } of importTables) {
      try {
        // Load data from localStorage
        const localData = loadFromLocalStorage(key, [])

        if (!localData || localData.length === 0) {
          importResults.push({
            table: label,
            status: "idle",
            count: 0,
            error: "No data found in localStorage",
          })
          continue
        }

        // Transform data based on table structure
        const transformedData = localData.map((item: any) => {
          // Remove any undefined or null values
          const cleaned: any = {}
          Object.keys(item).forEach((key) => {
            if (item[key] !== undefined && item[key] !== null) {
              // Convert camelCase to snake_case for database columns
              const snakeKey = key.replace(/([A-Z])/g, "_$1").toLowerCase()
              cleaned[snakeKey] = item[key]
            }
          })
          return cleaned
        })

        // Insert data into Supabase
        const { data, error } = await supabase.from(table).upsert(transformedData, {
          onConflict: "id",
        })

        if (error) {
          importResults.push({
            table: label,
            status: "error",
            count: 0,
            error: error.message,
          })
        } else {
          importResults.push({
            table: label,
            status: "success",
            count: transformedData.length,
          })
        }
      } catch (error) {
        importResults.push({
          table: label,
          status: "error",
          count: 0,
          error: error instanceof Error ? error.message : "Unknown error",
        })
      }
    }

    setResults(importResults)
    setImporting(false)

    const successCount = importResults.filter((r) => r.status === "success").length
    const errorCount = importResults.filter((r) => r.status === "error").length

    if (errorCount === 0) {
      toast({
        title: "Import Complete",
        description: `Successfully imported data from ${successCount} tables.`,
      })
    } else {
      toast({
        title: "Import Completed with Errors",
        description: `${successCount} successful, ${errorCount} failed.`,
        variant: "destructive",
      })
    }
  }

  const getStatusIcon = (status: ImportStatus) => {
    switch (status) {
      case "success":
        return <CheckCircle2 className="h-5 w-5 text-green-600" />
      case "error":
        return <AlertCircle className="h-5 w-5 text-red-600" />
      default:
        return <Database className="h-5 w-5 text-gray-400" />
    }
  }

  const getStatusBadge = (status: ImportStatus) => {
    switch (status) {
      case "success":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
            Success
          </Badge>
        )
      case "error":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
            Error
          </Badge>
        )
      case "importing":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
            Importing...
          </Badge>
        )
      default:
        return (
          <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-200">
            Pending
          </Badge>
        )
    }
  }

  return (
    <div className="container mx-auto py-10">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Data Import Tool</h1>
          <p className="text-gray-600 mt-1">Import data from localStorage to Supabase database</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileJson className="h-5 w-5" />
              Import from LocalStorage
            </CardTitle>
            <CardDescription>
              This tool will import all data stored in your browser's localStorage into the Supabase database. This is
              useful for migrating from the old localStorage-based system to the new database-backed system.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex gap-2">
                <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-yellow-800">
                  <p className="font-medium">Important Notes:</p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>This will import data from your browser's localStorage</li>
                    <li>Existing records with the same ID will be updated</li>
                    <li>Make sure you have the necessary permissions to import data</li>
                    <li>The import process may take a few moments</li>
                  </ul>
                </div>
              </div>
            </div>

            <Button onClick={handleImport} disabled={importing} size="lg" className="w-full">
              {importing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Importing Data...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Start Import
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {results.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Import Results</CardTitle>
              <CardDescription>Status of data import for each table</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {results.map((result, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      {getStatusIcon(result.status)}
                      <div>
                        <div className="font-medium">{result.table}</div>
                        {result.error && <div className="text-sm text-red-600">{result.error}</div>}
                        {result.status === "success" && (
                          <div className="text-sm text-gray-600">{result.count} records imported</div>
                        )}
                      </div>
                    </div>
                    {getStatusBadge(result.status)}
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">Summary</span>
                  <div className="flex gap-4">
                    <span className="text-green-600">
                      {results.filter((r) => r.status === "success").length} successful
                    </span>
                    <span className="text-red-600">{results.filter((r) => r.status === "error").length} failed</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Available Tables</CardTitle>
            <CardDescription>Data tables that will be imported</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {importTables.map((table, index) => (
                <div key={index} className="flex items-center gap-2 p-3 border rounded-lg">
                  <Database className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium">{table.label}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
