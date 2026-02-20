import type React from "react";
import { canEditData } from "@/lib/auth";

interface CanEditWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

/**
 * Server component that conditionally renders children based on user's edit permissions
 * Shows children only if user is admin or data_entry
 */
export async function CanEditWrapper({
  children,
  fallback = null,
}: CanEditWrapperProps) {
  const hasPermission = await canEditData();

  return hasPermission ? <>{children}</> : <>{fallback}</>;
}
