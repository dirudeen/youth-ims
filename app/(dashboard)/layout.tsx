import type React from "react";
import { AuthCheck } from "@/components/auth-check";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { ActivityProvider } from "@/contexts/activity-context";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthCheck>
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
    </AuthCheck>
  );
}
