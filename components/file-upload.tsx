"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Upload, FileText, AlertCircle, CheckCircle2 } from "lucide-react"
import { readFileAsText, type FileUploadResult } from "@/lib/file-utils"

interface FileUploadProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onUpload: (result: FileUploadResult) => void
  parseFunction: (content: string) => FileUploadResult
  title: string
  description: string
  acceptedFormats?: string
}

export function FileUpload({
  open,
  onOpenChange,
  onUpload,
  parseFunction,
  title,
  description,
  acceptedFormats = ".csv",
}: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [result, setResult] = useState<FileUploadResult | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      setResult(null)
    }
  }

  const handleUpload = async () => {
    if (!file) return

    setUploading(true)
    setResult(null)

    try {
      const content = await readFileAsText(file)
      const uploadResult = parseFunction(content)
      setResult(uploadResult)

      if (uploadResult.success) {
        onUpload(uploadResult)
        setTimeout(() => {
          setFile(null)
          setResult(null)
          onOpenChange(false)
        }, 2000)
      }
    } catch (error) {
      setResult({
        success: false,
        message: `Error reading file: ${error instanceof Error ? error.message : "Unknown error"}`,
      })
    } finally {
      setUploading(false)
    }
  }

  const handleClose = () => {
    setFile(null)
    setResult(null)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="file-upload">Select File ({acceptedFormats})</Label>
            <div className="flex items-center gap-2">
              <Input
                id="file-upload"
                type="file"
                accept={acceptedFormats}
                onChange={handleFileChange}
                disabled={uploading}
              />
              {file && (
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <FileText className="h-4 w-4" />
                  <span className="truncate max-w-[150px]">{file.name}</span>
                </div>
              )}
            </div>
          </div>

          {result && (
            <Alert variant={result.success ? "default" : "destructive"}>
              {result.success ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
              <AlertTitle>{result.success ? "Success" : "Error"}</AlertTitle>
              <AlertDescription>
                <div>{result.message}</div>
                {result.errors && result.errors.length > 0 && (
                  <div className="mt-2">
                    <p className="font-semibold text-sm">Warnings:</p>
                    <ul className="list-disc list-inside text-xs">
                      {result.errors.slice(0, 5).map((error, i) => (
                        <li key={i}>{error}</li>
                      ))}
                      {result.errors.length > 5 && <li>... and {result.errors.length - 5} more</li>}
                    </ul>
                  </div>
                )}
              </AlertDescription>
            </Alert>
          )}

          <div className="bg-muted p-4 rounded-lg">
            <h4 className="text-sm font-semibold mb-2">CSV Format Requirements:</h4>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• File must be in CSV format</li>
              <li>• First row should contain column headers</li>
              <li>• Use commas to separate values</li>
              <li>• Use quotes around values containing commas</li>
              <li>• Ensure all required fields are present</li>
            </ul>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose} disabled={uploading}>
            Cancel
          </Button>
          <Button onClick={handleUpload} disabled={!file || uploading}>
            {uploading ? (
              <>
                <Upload className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Upload File
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
