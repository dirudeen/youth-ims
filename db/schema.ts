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

export const youthWithDisabilities = pgTable(
  "youth_with_disabilities",
  {
    id: serial("id").primaryKey(),

    ageGroup: varchar("age_group", { length: 20 }).notNull(),

    total: integer("total").notNull(),
    male: integer("male").notNull(),
    female: integer("female").notNull(),

    urban: integer("urban").notNull(),
    rural: integer("rural").notNull(),

    seeing: integer("seeing").notNull(),
    hearing: integer("hearing").notNull(),
    physical: integer("physical").notNull(),
    learning: integer("learning").notNull(),
    selfcare: integer("selfcare").notNull(),
    speech: integer("speech").notNull(),

    version: integer("version").notNull().default(1),
    ...timestamps,
  },
  (table) => [
    // Age Group integrity
    uniqueIndex("unique_age_group").on(table.ageGroup),
    // Gender integrity
    check("ywd_gender_sum_check", sql`male + female = total`),

    // Location integrity
    check("ywd_location_sum_check", sql`urban + rural = total`),
  ],
);

export const youthWithoutDisabilities = pgTable(
  "youth_without_disabilities",
  {
    id: varchar("id", { length: 50 }).primaryKey(),

    ageGroup: varchar("age_group", { length: 20 }).notNull(),

    total: integer("total").notNull(),
    male: integer("male").notNull(),
    female: integer("female").notNull(),

    urban: integer("urban").notNull(),
    rural: integer("rural").notNull(),

    version: integer("version").notNull().default(1),
  },
  (table) => [
    // Logical uniqueness (same reasoning as previous table)
    uniqueIndex("ywod_unique_age_group").on(table.ageGroup),

    // Gender integrity
    check("ywod_gender_sum_check", sql`male + female = total`),

    // Location integrity
    check("ywod_location_sum_check", sql`urban + rural = total`),
  ],
);

export type YouthWithoutDisabilitiesType =
  typeof youthWithoutDisabilities.$inferSelect;
export type YouthPopulationType = typeof youthPopulation.$inferSelect;
export type YouthWithDisabilitiesType =
  typeof youthWithDisabilities.$inferSelect;
