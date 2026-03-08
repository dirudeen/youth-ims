import { getServerSideSession } from "@/lib/auth-helper";
import { redirect } from "next/navigation";
import { ProfileWrapper } from "./_components/profile-wrapper";

export const revalidate = 0;

export default async function ProfilePage() {
  const session = await getServerSideSession();
  if (!session) {
    redirect("/login");
  }

  return <ProfileWrapper />;
}
