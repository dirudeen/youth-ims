import { getServerSideSession } from "@/lib/auth-helper/get-serverside-session";
import { redirect } from "next/navigation";
import YouthPopulationTableWrapper from "./_components/youth-population-table-wrapper";
import { canEditDataHelperFn } from "@/lib/auth-helper/can-edit-data-helper";

export const revalidate = 60;
export default async function YouthPopulationPage() {
  const session = await getServerSideSession();
  if (!session) redirect("/login");
  const canEditData = canEditDataHelperFn(session.user.role as string);
  return <YouthPopulationTableWrapper canEditData={canEditData} />;
}
