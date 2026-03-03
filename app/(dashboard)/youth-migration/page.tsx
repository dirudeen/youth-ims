import { getServerSideSession, canEditDataHelperFn } from "@/lib/auth-helper";
import { redirect } from "next/navigation";
import { YouthMigrationWrapper } from "./_components/youth-migration-wrapper";

export const revalidate = 60;
export default async function YouthMigrationPage() {
  const session = await getServerSideSession();
  if (!session) redirect("/login");
  const canEditData = canEditDataHelperFn(session.user.role as string);
  return <YouthMigrationWrapper canEditData={canEditData} />;
}
