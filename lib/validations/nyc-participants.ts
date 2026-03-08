import z from "zod";
import {
  NYC_CATEGORIES,
  NYC_GENDERS,
  NYC_LEVELS,
  NYC_REGIONS,
  NYC_STATUSES,
} from "@/lib/schema/nyc-participants";

export const nycParticipantSchema = z.object({
  name: z.string().min(2, "Name is required."),
  age: z
    .string()
    .regex(/^\d+$/, "Age must be a valid non-negative number."),
  gender: z.enum(NYC_GENDERS),
  region: z.enum(NYC_REGIONS),
  category: z.enum(NYC_CATEGORIES),
  sport: z.string().min(2, "Sport is required."),
  level: z.enum(NYC_LEVELS),
  status: z.enum(NYC_STATUSES),
  achievements: z.string(),
  dateRegistered: z.string().min(1, "Date registered is required."),
  contact: z.string(),
});

export const nycParticipantImportSchema = z.object({
  name: z.string().min(1),
  age: z.number().int().min(0),
  gender: z.enum(NYC_GENDERS),
  region: z.string().min(1),
  category: z.string().min(1),
  sport: z.string().min(1),
  level: z.string().min(1),
  status: z.enum(NYC_STATUSES),
  achievements: z.string().nullable().optional(),
  dateRegistered: z.string().min(1),
  contact: z.string().nullable().optional(),
});

export type NycParticipantFormValues = z.infer<typeof nycParticipantSchema>;
