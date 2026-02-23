import z from "zod";

export const youthPopulationSchema = z.object({
  lga: z.string().min(1, "LGA is required"),
  totalPopulation: z.string().min(1, "Total Population is required"),
  youthPopulation: z.string().min(1, "Youth Population is required"),
  year: z.string().min(1, "Year is required"),
  maleYouth: z.string().min(1, "Male Youth is required"),
  femaleYouth: z.string().min(1, "Female Youth is required"),
  urbanYouth: z.string().min(1, "Urban Youth is required"),
  ruralYouth: z.string().min(1, "Rural Youth is required"),
});

export type YouthPopulationFormValues = z.infer<typeof youthPopulationSchema>;
