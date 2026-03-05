import { z } from "zod";
import { requiredNumber } from "./validation-helper";

export const piaStudentsSchema = z
  .object({
    department: z.string().min(1, "Department is required"),
    year: z.string().min(1, "Academic Year is required"),
    male: requiredNumber("Male"),
    female: requiredNumber("Female"),
    enrolled: requiredNumber("Enrolled"),
    graduated: requiredNumber("Graduated"),
  })
  .refine(
    (data) => Number(data.male) + Number(data.female) === Number(data.enrolled),
    {
      message: "Male + Female must equal Enrolled",
      path: ["enrolled"],
    },
  )
  .refine((data) => Number(data.graduated) <= Number(data.enrolled), {
    message: "Graduated cannot exceed Enrolled",
    path: ["graduated"],
  });

export type PiaStudentsFormValues = z.infer<typeof piaStudentsSchema>;

export const PIA_DEPARTMENTS = [
  "Tailoring & Fashion Design",
  "Auto Mechanics",
  "Metal Work",
  "Carpentry",
  "Plumbing",
  "Construction",
  "Electrical",
  "Hair Dressing",
  "Home Science",
] as const;
