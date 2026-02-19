"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, XCircle, Loader2, Database } from "lucide-react"
import { testSupabaseConnection } from "@/lib/supabase"

export function SupabaseConnectionTest() {
  const [status, setStatus] = useState<{
    connected: boolean | null
    message: string
    error?: string
    testing: boolean
  }>({
    connected: null,
    message: "Not tested yet",
    testing: false,
  })

  const testConnection = async () => {
    setStatus({ connected: null, message: "Testing connection...", testing: true })

    const result = await testSupabaseConnection()

    setStatus({
      connected: result.connected,
      message: result.message,
      error: result.error,
      testing: false,
    })
  }

  useEffect(() => {
    testConnection()
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          Supabase Connection Status
        </CardTitle>
        <CardDescription>Check the connection status to your Supabase database</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Connection Status:</span>
          {status.testing ? (
            <Badge variant="secondary">
              <Loader2 className="h-3 w-3 mr-1 animate-spin" />
              Testing...
            </Badge>
          ) : status.connected === true ? (
            <Badge variant="default" className="bg-green-500">
              <CheckCircle2 className="h-3 w-3 mr-1" />
              Connected
            </Badge>
          ) : status.connected === false ? (
            <Badge variant="destructive">
              <XCircle className="h-3 w-3 mr-1" />
              Disconnected
            </Badge>
          ) : (
            <Badge variant="secondary">Unknown</Badge>
          )}
        </div>

        <div className="text-sm">
          <p className="font-medium mb-1">Message:</p>
          <p className="text-muted-foreground">{status.message}</p>
        </div>

        {status.error && (
          <div className="text-sm">
            <p className="font-medium mb-1 text-red-600">Error:</p>
            <p className="text-red-500 text-xs font-mono bg-red-50 p-2 rounded">{status.error}</p>
          </div>
        )}

        <Button onClick={testConnection} disabled={status.testing} className="w-full">
          {status.testing ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Testing Connection...
            </>
          ) : (
            <>
              <Database className="h-4 w-4 mr-2" />
              Test Connection Again
            </>
          )}
        </Button>

        <div className="text-xs text-muted-foreground border-t pt-4">
          <p className="font-medium mb-2">Environment Variables:</p>
          <ul className="space-y-1">
            <li>
              • NEXT_PUBLIC_SUPABASE_URL:{" "}
              {process.env.NEXT_PUBLIC_SUPABASE_URL ? (
                <span className="text-green-600">✓ Set</span>
              ) : (
                <span className="text-red-600">✗ Missing</span>
              )}
            </li>
            <li>
              • NEXT_PUBLIC_SUPABASE_ANON_KEY:{" "}
              {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? (
                <span className="text-green-600">✓ Set</span>
              ) : (
                <span className="text-red-600">✗ Missing</span>
              )}
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
