import { headers } from "next/headers";
import { auth } from "../auth";
import { cache } from "react";

export const getServerSideSession = cache(async () => {
  return await auth.api.getSession({
    headers: await headers(),
  });
});

export function canEditDataHelperFn(role: string) {
  return role === "admin" || role === "dataEntry";
}
