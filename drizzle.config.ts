import { defineConfig } from "drizzle-kit";
import { env } from "./env";

export default defineConfig({
  out: "./drizzle",
  schema: ["db/schema.ts", "auth-schema.ts"],
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
});
