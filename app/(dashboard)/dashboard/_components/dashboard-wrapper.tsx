import { getDashboardData } from "@/server/services/dashboard";
import { DashboardClient } from "./dashboard-client";

export async function DashboardWrapper() {
  const data = await getDashboardData();
  return <DashboardClient data={data} />;
}
