"use server";

import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { getServerSideSession } from "@/lib/auth-helper";
import { fail, ok } from "@/lib/action-result-helper";

type CreateUserInput = {
  name: string;
  email: string;
  role: "admin" | "data_entry" | "viewer";
  password: string;
  confirmPassword: string;
};

export async function createUser(data: CreateUserInput) {
  const session = await getServerSideSession();

  if (!session) {
    throw new Error("Unauthorized");
  }

  if (session.user.role !== "admin") {
    throw new Error("Unauthorized");
  }

  try {
    const newUser = await auth.api.createUser({
      body: {
        email: data.email,
        password: data.password,
        name: data.name,
        role: data.role,
      },
    });
    console.log(newUser);
    revalidatePath("/user-management");
    return ok(newUser);
  } catch (error) {
    console.error(error);
    return fail("An error occurred while creating the user.");
  }
}
