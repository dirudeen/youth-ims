import { z } from "zod";

export const NYSS_YEARS = ["2022", "2023", "2024", "2025"] as const;
export const NYSS_REGIONS = [
  "GBA",
  "KM",
  "WCR",
  "NBR",
  "LRR",
  "CRR",
  "URR",
] as const;

export const nyssProgramSchema = z
  .object({
    programName: z.string().trim().min(1, "Program name is required"),
    institution: z.string().trim().min(1, "Institution is required"),
    year: z
      .string()
      .min(1, "Year is required")
      .refine((value) => new Date().getFullYear() >= Number(value), {
        message: "Year cannot be in the future",
      }),
    region: z
      .string()
      .min(1, "Region is required")
      .refine(
        (value) =>
          NYSS_REGIONS.includes(value as (typeof NYSS_REGIONS)[number]),
        {
          message: "Select a valid region",
        },
      ),
    sector: z.string().trim().min(1, "Sector is required"),
    totalGraduates: z
      .string()
      .refine((value) => !Number.isNaN(Number(value)) && Number(value) >= 0, {
        message: "Total graduates must be a non-negative number",
      }),
    maleGraduates: z
      .string()
      .refine((value) => !Number.isNaN(Number(value)) && Number(value) >= 0, {
        message: "Male graduates must be a non-negative number",
      }),
    femaleGraduates: z
      .string()
      .refine((value) => !Number.isNaN(Number(value)) && Number(value) >= 0, {
        message: "Female graduates must be a non-negative number",
      }),
    employmentRate: z
      .string()
      .refine(
        (value) =>
          !Number.isNaN(Number(value)) &&
          Number(value) >= 0 &&
          Number(value) <= 100,
        {
          message: "Employment rate must be between 0 and 100",
        },
      ),
  })
  .refine(
    (value) =>
      Number(value.maleGraduates) + Number(value.femaleGraduates) <=
      Number(value.totalGraduates),
    {
      path: ["totalGraduates"],
      message:
        "Male + female graduates must be less than or equal to total graduates.",
    },
  );

export type NyssProgramInput = z.infer<typeof nyssProgramSchema>;
