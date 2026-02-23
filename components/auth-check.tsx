import { getServerSideSession } from "@/lib/auth-helper";
import { redirect } from "next/navigation";
import type React from "react";

interface AuthCheckProps {
  children: React.ReactNode;
  requireRole?: "admin" | "data_entry" | "viewer";
}

export async function AuthCheck({ children, requireRole }: AuthCheckProps) {
  const session = await getServerSideSession();
  if (!session) {
    redirect("/login");
  }

  return <>{children}</>;
}
