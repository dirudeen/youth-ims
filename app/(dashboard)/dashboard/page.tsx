import { getServerSideSession } from "@/lib/auth-helper";
import { redirect } from "next/navigation";
import { DashboardWrapper } from "./_components/dashboard-wrapper";

export const revalidate = 60;

export default async function DashboardPage() {
  const session = await getServerSideSession();
  if (!session) {
    redirect("/login");
  }

  return <DashboardWrapper />;
}
