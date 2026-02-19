"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Upload, FileSpreadsheet, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { parseCSV, importDataToTable, TABLE_SCHEMAS, type ColumnMapping } from "@/lib/data-import"
import { useToast } from "@/hooks/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CanEditWrapper } from "@/components/can-edit-wrapper"

interface DataImportDialogProps {
  tableName: string
  onImportComplete?: () => void
}

export function DataImportDialog({ tableName, onImportComplete }: DataImportDialogProps) {
  const [open, setOpen] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [csvData, setCsvData] = useState<Record<string, string>[]>([])
  const [csvHeaders, setCsvHeaders] = useState<string[]>([])
  const [columnMapping, setColumnMapping] = useState<ColumnMapping[]>([])
  const [isImporting, setIsImporting] = useState(false)
  const [importProgress, setImportProgress] = useState(0)
  const [importResult, setImportResult] = useState<{
    success: boolean
    imported: number
    failed: number
    errors: string[]
  } | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const schema = TABLE_SCHEMAS[tableName]

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (!selectedFile) return

    if (!selectedFile.name.endsWith(".csv")) {
      toast({
        title: "Invalid File",
        description: "Please select a CSV file",
        variant: "destructive",
      })
      return
    }

    setFile(selectedFile)
    setImportResult(null)

    // Read and parse CSV
    const reader = new FileReader()
    reader.onload = (event) => {
      const content = event.target?.result as string
      const parsed = parseCSV(content)

      if (parsed.length === 0) {
        toast({
          title: "Empty File",
          description: "The CSV file is empty",
          variant: "destructive",
        })
        return
      }

      setCsvData(parsed)
      const headers = Object.keys(parsed[0])
      setCsvHeaders(headers)

      // Auto-map columns with matching names
      const autoMapping: ColumnMapping[] = schema.columns
        .map((dbCol) => {
          const matchingHeader = headers.find(
            (h) => h.toLowerCase().replace(/[_\s]/g, "") === dbCol.toLowerCase().replace(/[_\s]/g, ""),
          )
          return matchingHeader ? { csvColumn: matchingHeader, dbColumn: dbCol } : null
        })
        .filter((m): m is ColumnMapping => m !== null)

      setColumnMapping(autoMapping)
    }

    reader.readAsText(selectedFile)
  }

  const handleColumnMappingChange = (dbColumn: string, csvColumn: string) => {
    setColumnMapping((prev) => {
      const existing = prev.find((m) => m.dbColumn === dbColumn)
      if (existing) {
        return prev.map((m) => (m.dbColumn === dbColumn ? { ...m, csvColumn } : m))
      } else {
        return [...prev, { csvColumn, dbColumn }]
      }
    })
  }

  const handleImport = async () => {
    if (csvData.length === 0) {
      toast({
        title: "No Data",
        description: "Please select a file first",
        variant: "destructive",
      })
      return
    }

    // Validate required columns are mapped
    const missingRequired = schema.required.filter((req) => !columnMapping.find((m) => m.dbColumn === req))

    if (missingRequired.length > 0) {
      toast({
        title: "Missing Required Columns",
        description: `Please map: ${missingRequired.join(", ")}`,
        variant: "destructive",
      })
      return
    }

    setIsImporting(true)
    setImportProgress(0)

    try {
      const result = await importDataToTable(tableName, csvData, columnMapping)
      setImportResult(result)
      setImportProgress(100)

      if (result.success) {
        toast({
          title: "Import Successful",
          description: `Imported ${result.imported} records successfully`,
        })

        if (onImportComplete) {
          onImportComplete()
        }
      } else {
        toast({
          title: "Import Completed with Errors",
          description: `Imported ${result.imported} records, ${result.failed} failed`,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Import Failed",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      })
    } finally {
      setIsImporting(false)
    }
  }

  const resetDialog = () => {
    setFile(null)
    setCsvData([])
    setCsvHeaders([])
    setColumnMapping([])
    setImportResult(null)
    setImportProgress(0)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <CanEditWrapper>
      <Dialog
        open={open}
        onOpenChange={(newOpen) => {
          setOpen(newOpen)
          if (!newOpen) {
            resetDialog()
          }
        }}
      >
        <DialogTrigger asChild>
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Import Data
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Import Data from CSV</DialogTitle>
            <DialogDescription>Upload a CSV file and map columns to import data into {tableName}</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* File Upload */}
            <div className="space-y-2">
              <Label>Select CSV File</Label>
              <div className="flex items-center gap-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="csv-upload"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full"
                >
                  <FileSpreadsheet className="mr-2 h-4 w-4" />
                  {file ? file.name : "Choose CSV File"}
                </Button>
              </div>
            </div>

            {/* Column Mapping */}
            {csvHeaders.length > 0 && (
              <div className="space-y-3">
                <Label>Map CSV Columns to Database Fields</Label>
                <div className="border rounded-lg p-4 space-y-3 max-h-[300px] overflow-y-auto">
                  {schema.columns.map((dbColumn) => (
                    <div key={dbColumn} className="flex items-center gap-2">
                      <Label className="w-1/3 text-sm">
                        {dbColumn}
                        {schema.required.includes(dbColumn) && <span className="text-red-500 ml-1">*</span>}
                      </Label>
                      <Select
                        value={columnMapping.find((m) => m.dbColumn === dbColumn)?.csvColumn || "skip"}
                        onValueChange={(value) => handleColumnMappingChange(dbColumn, value)}
                      >
                        <SelectTrigger className="w-2/3">
                          <SelectValue placeholder="Select CSV column" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="skip">-- Skip --</SelectItem>
                          {csvHeaders.map((header) => (
                            <SelectItem key={header} value={header}>
                              {header}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-500">* Required fields must be mapped</p>
              </div>
            )}

            {/* Preview */}
            {csvData.length > 0 && (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>Found {csvData.length} rows in the CSV file</AlertDescription>
              </Alert>
            )}

            {/* Import Progress */}
            {isImporting && (
              <div className="space-y-2">
                <Label>Importing...</Label>
                <Progress value={importProgress} />
              </div>
            )}

            {/* Import Result */}
            {importResult && (
              <div className="space-y-2">
                {importResult.success ? (
                  <Alert className="bg-green-50 border-green-200">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-800">
                      Successfully imported {importResult.imported} records
                    </AlertDescription>
                  </Alert>
                ) : (
                  <Alert variant="destructive">
                    <XCircle className="h-4 w-4" />
                    <AlertDescription>
                      Imported {importResult.imported} records, {importResult.failed} failed
                      {importResult.errors.length > 0 && (
                        <details className="mt-2">
                          <summary className="cursor-pointer">View errors</summary>
                          <ul className="mt-2 text-xs space-y-1">
                            {importResult.errors.slice(0, 10).map((error, i) => (
                              <li key={i}>{error}</li>
                            ))}
                            {importResult.errors.length > 10 && <li>... and {importResult.errors.length - 10} more</li>}
                          </ul>
                        </details>
                      )}
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Close
            </Button>
            <Button onClick={handleImport} disabled={isImporting || csvData.length === 0}>
              {isImporting ? "Importing..." : "Import Data"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </CanEditWrapper>
  )
}
