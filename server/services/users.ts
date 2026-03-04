import { db } from "@/db";
import { users } from "@/auth-schema";
import { getServerSideSession } from "@/lib/auth-helper";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function getUsers() {
  const session = await getServerSideSession();
  if (!session || session.user.role !== "admin") {
    redirect("/login");
  }
  const res = await auth.api.listUsers({
    query: {
      searchValue: "some name",
      searchField: "name",
      searchOperator: "contains",
      limit: 100,
      offset: 100,
      sortBy: "name",
      sortDirection: "desc",
      filterField: "email",
      filterValue: "hello@example.com",
      filterOperator: "eq",
    },
    // This endpoint requires session cookies.
    headers: await headers(),
  });
  return res.users;
}
