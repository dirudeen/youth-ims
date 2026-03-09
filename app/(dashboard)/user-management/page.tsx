import { canEditDataHelperFn, getServerSideSession } from "@/lib/auth-helper";
import { redirect } from "next/navigation";
import { UserManagementWrapper } from "./_components/user-management-wrapper";

export default async function UserManagementPage() {
  const session = await getServerSideSession();
  if (!session) redirect("/login");
  const canEditData = canEditDataHelperFn(session.user.role as string);
  return <UserManagementWrapper canEditData={canEditData} />;
}
