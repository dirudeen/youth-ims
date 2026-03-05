import { getServerSideSession, canEditDataHelperFn } from "@/lib/auth-helper";
import { redirect } from "next/navigation";
import { SportsFinancingWrapper } from "./_components/sports-financing-wrapper";

export const revalidate = 60;

export default async function SportsFinancingPage() {
  const session = await getServerSideSession();

  if (!session) {
    redirect("/login");
  }

  const canEditData = canEditDataHelperFn(session.user.role as string);

  return (
    <div className="grid items-center py-10 px-8">
      <div className="mb-4">
        <h1 className="text-3xl font-bold">Sports Financing</h1>
        <p className="text-muted-foreground">
          Support to Sports Associations and Federations
        </p>
      </div>
      <SportsFinancingWrapper canEditData={canEditData} />
    </div>
  );
}
