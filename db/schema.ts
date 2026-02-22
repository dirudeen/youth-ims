import { sql } from "drizzle-orm";
import {
  check,
  decimal,
  integer,
  pgTable,
  serial,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";

const timestamps = {
  createdAt: timestamp("created_at", {
    mode: "date",
    precision: 3,
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", {
    mode: "date",
    precision: 3,
    withTimezone: true,
  })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
};

export const youthPopulation = pgTable(
  "youth_population",
  {
    id: serial("id").primaryKey(),

    lga: varchar("lga", { length: 255 }).notNull(),
    year: integer("year").notNull(),

    totalPopulation: integer("total_population").notNull(),
    youthPopulation: integer("youth_population").notNull(),

    youthShare: decimal("youth_share", {
      precision: 5,
      scale: 2,
    }).generatedAlwaysAs(
      sql`ROUND(
            CASE 
              WHEN total_population = 0 THEN 0
              ELSE (youth_population::decimal / total_population) * 100
            END,
          2)`,
    ),

    maleYouth: integer("male_youth").notNull(),
    femaleYouth: integer("female_youth").notNull(),
    urbanYouth: integer("urban_youth").notNull(),
    ruralYouth: integer("rural_youth").notNull(),

    // ✅ Optimistic Locking
    version: integer("version").notNull().default(1),
    ...timestamps,
  },
  (table) => [
    uniqueIndex("unique_lga_year").on(table.lga, table.year),

    check(
      "youth_less_than_total",
      sql`${table.youthPopulation} <= ${table.totalPopulation}`,
    ),

    check(
      "gender_sum_check",
      sql`${table.maleYouth} + ${table.femaleYouth} = ${table.youthPopulation}`,
    ),

    check(
      "residence_sum_check",
      sql`${table.urbanYouth} + ${table.ruralYouth} = ${table.youthPopulation}`,
    ),
  ],
);

export type YouthPopulationType = typeof youthPopulation.$inferSelect;
