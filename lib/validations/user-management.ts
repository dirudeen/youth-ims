import z from "zod";

const passwordForm = z
  .object({
    password: z.string(),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // path of error
  });
export const userSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required"),
  ...passwordForm.shape,
  role: z.enum(["admin", "data_entry", "viewer"]),
});

export type userSchemaType = z.infer<typeof userSchema>;
