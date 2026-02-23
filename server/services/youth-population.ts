import { db } from "@/db";
import { youthPopulation } from "@/db/schema";
import { getServerSideSession } from "@/lib/auth-helper/get-serverside-session";
import { asc } from "drizzle-orm";
import { redirect } from "next/navigation";

export const getYouthPopulation = async () => {
  const session = await getServerSideSession();
  if (!session) {
    redirect("/login");
  }
  const res = await db
    .select()
    .from(youthPopulation)
    .orderBy(asc(youthPopulation.year));
  return res;
};
