import type React from "react"
import { AuthCheckClient } from "@/components/auth-check-client"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { ActivityProvider } from "@/contexts/activity-context"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { Toaster } from "@/components/ui/toaster"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthCheckClient>
      <ActivityProvider>
        <SidebarProvider>
          <Sidebar />
          <SidebarInset>
            <Header />
            <div className="flex-1 overflow-auto p-4">{children}</div>
          </SidebarInset>
        </SidebarProvider>
        <Toaster />
      </ActivityProvider>
    </AuthCheckClient>
  )
}
