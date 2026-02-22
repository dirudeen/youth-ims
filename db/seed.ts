import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import { youthPopulation } from "./schema";

import {} from "./schema";
import dotenv from "dotenv";

dotenv.config();

export const youthPopulationData = [
  {
    year: 2022,
    lga: "Banjul",
    totalPopulation: 26461,
    youthPopulation: 10817,
    maleYouth: 5123,
    femaleYouth: 5694,
    urbanYouth: 10817,
    ruralYouth: 0,
  },
  {
    year: 2022,
    lga: "Kanifing",
    totalPopulation: 379348,
    youthPopulation: 156992,
    maleYouth: 74123,
    femaleYouth: 82869,
    urbanYouth: 156992,
    ruralYouth: 0,
  },
  {
    year: 2022,
    lga: "Brikama",
    totalPopulation: 1151128,
    youthPopulation: 459860,
    maleYouth: 220731,
    femaleYouth: 239129,
    urbanYouth: 321902,
    ruralYouth: 137958,
  },
  {
    year: 2022,
    lga: "Mansakonko",
    totalPopulation: 90624,
    youthPopulation: 31093,
    maleYouth: 14925,
    femaleYouth: 16168,
    urbanYouth: 9328,
    ruralYouth: 21765,
  },
  {
    year: 2022,
    lga: "Kerewan",
    totalPopulation: 248475,
    youthPopulation: 81598,
    maleYouth: 39167,
    femaleYouth: 42431,
    urbanYouth: 16320,
    ruralYouth: 65278,
  },
  {
    year: 2022,
    lga: "Kuntaur",
    totalPopulation: 118104,
    youthPopulation: 38429,
    maleYouth: 18446,
    femaleYouth: 19983,
    urbanYouth: 7686,
    ruralYouth: 30743,
  },
  {
    year: 2022,
    lga: "Janjanbureh",
    totalPopulation: 147412,
    youthPopulation: 50523,
    maleYouth: 24251,
    femaleYouth: 26272,
    urbanYouth: 15157,
    ruralYouth: 35366,
  },
  {
    year: 2022,
    lga: "Basse",
    totalPopulation: 261160,
    youthPopulation: 89034,
    maleYouth: 42736,
    femaleYouth: 46298,
    urbanYouth: 22585,
    ruralYouth: 66449,
  },
];

const client = new Client({
  connectionString: process.env.DATABASE_URL!,
});

async function main() {
  await client.connect();
  const db = drizzle(client);

  console.log("🌱 Seeding database...");

  const data = await db
    .insert(youthPopulation)
    .values(youthPopulationData)
    .returning();
  console.log("✔ Youth population inserted:", data.length);

  console.log("🎉 DONE SEEDING!");

  await client.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
