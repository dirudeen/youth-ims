import { getServerSideSession, canEditDataHelperFn } from "@/lib/auth-helper";
import { redirect } from "next/navigation";
import { YouthWithDisabilitiesWrapper } from "./_components/youth-with-disabilities-wrapper";

export const revalidate = 60;
export default async function YouthWithDisabilitiesPage() {
  const session = await getServerSideSession();
  if (!session) redirect("/login");
  const canEditData = canEditDataHelperFn(session.user.role as string);
  return <YouthWithDisabilitiesWrapper canEditData={canEditData} />;
}
