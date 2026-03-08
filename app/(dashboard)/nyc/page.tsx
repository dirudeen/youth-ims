import { canEditDataHelperFn, getServerSideSession } from "@/lib/auth-helper";
import { redirect } from "next/navigation";
import { NycWrapper } from "./_components/nyc-wrapper";

export const revalidate = 60;

export default async function NycPage() {
  const session = await getServerSideSession();
  if (!session) {
    redirect("/login");
  }

  const canEditData = canEditDataHelperFn(session.user.role as string);
  return <NycWrapper canEditData={canEditData} />;
}
