"use client"

import { useState } from "react"
import { createBrowserClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, CheckCircle2, XCircle, Upload } from "lucide-react"

export default function ImportUsersPage() {
  const [importing, setImporting] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null)

  const importFromLocalStorage = async () => {
    setImporting(true)
    setResult(null)

    try {
      const supabase = createBrowserClient()

      if (!supabase) {
        setResult({
          success: false,
          message: "Database connection not available. Please publish to Vercel to use this feature.",
        })
        setImporting(false)
        return
      }

      // Check if there's a user in localStorage
      const localUser = localStorage.getItem("currentUser")

      if (!localUser) {
        setResult({
          success: false,
          message: "No user found in localStorage. Please create a user in Supabase Dashboard first.",
        })
        setImporting(false)
        return
      }

      const userData = JSON.parse(localUser)
      console.log("[v0] Found localStorage user:", userData)

      // Check if user already exists in Supabase Auth
      const { data: authData } = await supabase.auth.getUser()

      if (authData.user) {
        // User is already authenticated, just update their profile
        const { data: profile, error: profileError } = await supabase
          .from("users")
          .select("*")
          .eq("id", authData.user.id)
          .single()

        if (profile) {
          setResult({
            success: true,
            message: `User ${profile.email} already exists in Supabase with role: ${profile.role}`,
          })
        } else {
          setResult({
            success: false,
            message: "User authenticated but profile not found. Please run the SQL script to fix roles.",
          })
        }
      } else {
        setResult({
          success: false,
          message: "Please create the user in Supabase Dashboard first, then run the SQL script to set admin role.",
        })
      }
    } catch (error) {
      console.error("[v0] Import error:", error)
      setResult({
        success: false,
        message: `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
      })
    } finally {
      setImporting(false)
    }
  }

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Import Users from localStorage</CardTitle>
          <CardDescription>Migrate user data from browser localStorage to Supabase database</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert>
            <AlertDescription>
              <strong>Current Issue:</strong> Your user has "viewer" role instead of "admin".
              <br />
              <br />
              <strong>Quick Fix:</strong>
              <ol className="list-decimal ml-4 mt-2 space-y-1">
                <li>Go to Supabase Dashboard → SQL Editor</li>
                <li>
                  Run the script: <code className="bg-muted px-1 py-0.5 rounded">scripts/008_fix_admin_role.sql</code>
                </li>
                <li>Refresh this page and login again</li>
              </ol>
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            <Button onClick={importFromLocalStorage} disabled={importing} className="w-full">
              {importing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Checking Users...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Check localStorage Users
                </>
              )}
            </Button>

            {result && (
              <Alert variant={result.success ? "default" : "destructive"}>
                {result.success ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                <AlertDescription className="ml-2">{result.message}</AlertDescription>
              </Alert>
            )}
          </div>

          <div className="border-t pt-4">
            <h3 className="font-semibold mb-2">Instructions:</h3>
            <ol className="list-decimal ml-4 space-y-2 text-sm text-muted-foreground">
              <li>Your user exists in Supabase but has the wrong role</li>
              <li>
                Run the SQL script <code>008_fix_admin_role.sql</code> in Supabase SQL Editor
              </li>
              <li>This will update your role from "viewer" to "admin"</li>
              <li>After running the script, logout and login again</li>
              <li>You should now have full admin access to the system</li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
