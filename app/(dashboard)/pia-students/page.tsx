import { getServerSideSession, canEditDataHelperFn } from "@/lib/auth-helper";
import { redirect } from "next/navigation";
import { PiaStudentsWrapper } from "./_components/pia-students-wrapper";

export const revalidate = 60;

export default async function PiaStudentsPage() {
  const session = await getServerSideSession();

  if (!session) {
    redirect("/login");
  }

  const canEditData = canEditDataHelperFn(session.user.role as string);

  return (
    <div className="grid items-center py-10 px-8">
      <div className="mb-4">
        <h1 className="text-3xl font-bold">President&apos;s International Award</h1>
        <p className="text-muted-foreground">
          Skills Training Centre Student Data
        </p>
      </div>
      <PiaStudentsWrapper canEditData={canEditData} />
    </div>
  );
}
