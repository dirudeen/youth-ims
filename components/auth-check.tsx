import type React from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ShieldCheck } from "lucide-react";
import Link from "next/link";
import { getServerSideSession } from "@/lib/auth-helper/get-serverside-session";

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
