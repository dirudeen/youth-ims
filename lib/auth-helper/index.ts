import { headers } from "next/headers";
import { auth } from "../auth";
import { cache } from "react";

export const getServerSideSession = cache(async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user.emailVerified) {
    return null;
  }

  return session;
});

export function canEditDataHelperFn(role: string) {
  return role === "admin" || role === "dataEntry" || role === "data_entry";
}
