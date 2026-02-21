import { AppSidebar } from "@/components/app-sidebar";
import { Header } from "@/components/header";
import { SidebarProvider } from "@/components/ui/sidebar";
import type React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider className="flex">
      <AppSidebar />
      <div className="flex-1">
        <Header />
        <main className="overflow-auto p-4">{children}</main>
      </div>
    </SidebarProvider>
  );
}
