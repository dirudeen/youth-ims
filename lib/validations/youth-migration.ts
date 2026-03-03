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

export const youthMigrationSchema = z.object({
  year: requiredNumber("Year"),
  total: requiredNumber("Total"),
  male: requiredNumber("Male"),
  female: requiredNumber("Female"),
  origin: z.string().min(1, "Origin is required"),
  destination: z.string().min(1, "Destination is required"),
});

export type YouthMigrationFormValues = z.infer<typeof youthMigrationSchema>;

// Todo : Add specific validation for each field
