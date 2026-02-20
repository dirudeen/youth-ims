"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { z } from "zod";
import { fail } from "./helper";

const loginSchema = z.object({
  email: z.email("Invalid email format").trim().toLowerCase().max(255),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(128),
});

export async function loginAction(data: z.infer<typeof loginSchema>) {
  const parsed = loginSchema.safeParse(data);

  if (!parsed.success) {
    console.error("[AUTH] Validation failed:", parsed.error);
    return fail("Invalid email or password");
  }

  const { email, password } = parsed.data;
  const supabase = await createClient();

  const { error, data: userData } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error("[AUTH] Supabase auth error:", error.message);
    return fail("Invalid email or password");
  }

  if (!userData?.session) {
    console.error("[AUTH] No session returned from Supabase");
    return fail("Authentication failed. Please try again");
  }

  redirect("/dashboard");
}
