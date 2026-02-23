import { getServerSideSession } from "@/lib/auth-helper";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSideSession();
  if (!session) redirect("/login");

  redirect("/dashboard");
}
