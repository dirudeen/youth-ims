import { getCurrentUser } from "@/server/auth-actions";
import { UserProfile } from "./user-profile";

export async function UserProfileWrapper() {
  const res = await getCurrentUser();
  return <UserProfile currentUser={res.user} />;
}
