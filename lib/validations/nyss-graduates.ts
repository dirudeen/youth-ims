import { z } from "zod";

export const NYSS_GENDER_VALUES = ["Male", "Female"] as const;
export const NYSS_EMPLOYMENT_STATUS_VALUES = [
  "Employed",
  "Self-Employed",
  "Seeking Employment",
  "Further Education",
] as const;

export const nyssGraduateSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  age: z
    .string()
    .refine((value) => !Number.isNaN(Number(value)) && Number(value) >= 0, {
      message: "Age must be a non-negative number",
    }),
  gender: z.enum(NYSS_GENDER_VALUES, { message: "Gender is required" }),
  region: z.string().trim().min(1, "Region is required"),
  trainingProgram: z.string().trim().min(1, "Training program is required"),
  graduationYear: z
    .string()
    .refine((value) => !Number.isNaN(Number(value)) && Number(value) >= 2000, {
      message: "Graduation year is invalid",
    }),
  employmentStatus: z.enum(NYSS_EMPLOYMENT_STATUS_VALUES, {
    message: "Employment status is required",
  }),
  sector: z.string().trim().min(1, "Sector is required"),
});

export type NyssGraduateFormValues = z.infer<typeof nyssGraduateSchema>;

