import { getCurrentProfile } from "@/server/services/profile";
import { ProfileClient } from "./profile-client";

export async function ProfileWrapper() {
  const profile = await getCurrentProfile();
  return <ProfileClient profile={profile} />;
}
