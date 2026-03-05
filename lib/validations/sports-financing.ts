// c:\Users\aniru\Downloads\youth-data-dashboard\lib\validations\sports-financing.ts
import { z } from "zod";

export const sportsFinancingSchema = z.object({
  associationName: z.string().min(1, "Association name is required"),
  amount: z
    .string()
    .min(1, "Amount is required")
    .refine((val) => !Number.isNaN(val), {
      message: "Amount must be a valid number",
    })
    .refine((val) => Number(val) >= 0, {
      message: "Amount cannot be negative",
    }),
  year: z
    .string()
    .refine(
      (val) =>
        !isNaN(Number(val)) && Number(val) >= 2000 && Number(val) <= 2100,
      {
        message: "Year must be a valid year between 2000 and 2100",
      },
    ),
  period: z.string().min(1, "Period is required"),
});

export type SportsFinancingFormValues = z.infer<typeof sportsFinancingSchema>;
