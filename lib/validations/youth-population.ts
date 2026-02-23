import z from "zod";
const requiredNumber = (fieldName: string) =>
  z
    .string()
    .min(1, `${fieldName} is required`)
    .refine((val) => !Number.isNaN(val), {
      message: `${fieldName} must be a valid number`,
    })
    .refine((val) => Number(val) >= 0, {
      message: `${fieldName} cannot be negative`,
    });

export const youthPopulationSchema = z.object({
  lga: z.string().min(1, "LGA is required"),

  totalPopulation: requiredNumber("Total Population"),
  youthPopulation: requiredNumber("Youth Population"),
  year: requiredNumber("Year"),
  maleYouth: requiredNumber("Male Youth"),
  femaleYouth: requiredNumber("Female Youth"),
  urbanYouth: requiredNumber("Urban Youth"),
  ruralYouth: requiredNumber("Rural Youth"),
});

export type YouthPopulationFormValues = z.infer<typeof youthPopulationSchema>;

// Todo : Add specific validation for each field
