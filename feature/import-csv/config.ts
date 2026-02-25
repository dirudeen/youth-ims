import { z } from "zod";
import { youthPopulation } from "@/db/schema";
import { ImportConfig } from "@/lib/importer/types";

export const youthPopulationImportConfig: ImportConfig<any> = {
  table: youthPopulation,

  conflictStrategy: "error",

  columns: {
    lga: { type: "required" },

    year: {
      type: "computed-if-missing",
      compute: () => new Date().getFullYear(),
    },

    totalPopulation: { type: "required" },
    youthPopulation: { type: "required" },

    maleYouth: { type: "required" },
    femaleYouth: { type: "required" },
    urbanYouth: { type: "required" },
    ruralYouth: { type: "required" },

    youthShare: {
      type: "computed",
      compute: (row: any) => {
        if (!row.totalPopulation) return 0;
        return ((row.youthPopulation / row.totalPopulation) * 100).toFixed(2);
      },
    },
  },

  schema: z.object({
    lga: z.string(),
    year: z.int(),
    totalPopulation: z.int(),
    youthPopulation: z.int(),
    maleYouth: z.int(),
    femaleYouth: z.int(),
    urbanYouth: z.int(),
    ruralYouth: z.int(),
  }),
};

// todo implement a more robust validation for this youth import config
