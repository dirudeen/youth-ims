// import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getServerSideSession } from "@/lib/auth-helper/get-serverside-session";

export default async function Home() {
  const session = await getServerSideSession();
  if (!session) redirect("/login");

  redirect("/dashboard");
}
