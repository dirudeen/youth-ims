import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().min(1),
    SUPABASE_JWT_SECRET: z.string().min(1),
    SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
    SUPABASE_URL: z.string().min(1),
    SUPABASE_ANON_KEY: z.string().min(1),
    SUPABASE_POSTGRES_URL_NON_POOLING: z.string().min(1),
    SUPABASE_POSTGRES_PRISMA_URL: z.string().min(1),
    SUPABASE_POSTGRES_URL: z.string().min(1),
    SUPABASE_POSTGRES_HOST: z.string().min(1),
    SUPABASE_POSTGRES_DATABASE: z.string().min(1),
    SUPABASE_POSTGRES_PASSWORD: z.string().min(1),
    SUPABASE_POSTGRES_USER: z.string().min(1),
    BETTER_AUTH_SECRET: z.string().min(1),
    BETTER_AUTH_URL: z.string().min(1),
    RESEND_API_KEY: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_BETTER_AUTH_URL: z.string().min(1),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
    NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL: z.string().min(1),
    NEXT_PUBLIC_SUPABASE_URL: z.string().min(1),
  },
  // If you're using Next.js < 13.4.4, you'll need to specify the runtimeEnv manually
  runtimeEnv: {
    SUPABASE_JWT_SECRET: process.env.SUPABASE_JWT_SECRET,
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
    SUPABASE_POSTGRES_URL_NON_POOLING:
      process.env.SUPABASE_POSTGRES_URL_NON_POOLING,
    SUPABASE_POSTGRES_PRISMA_URL: process.env.SUPABASE_POSTGRES_PRISMA_URL,
    SUPABASE_POSTGRES_URL: process.env.SUPABASE_POSTGRES_URL,
    SUPABASE_POSTGRES_HOST: process.env.SUPABASE_POSTGRES_HOST,
    SUPABASE_POSTGRES_DATABASE: process.env.SUPABASE_POSTGRES_DATABASE,
    SUPABASE_POSTGRES_PASSWORD: process.env.SUPABASE_POSTGRES_PASSWORD,
    SUPABASE_POSTGRES_USER: process.env.SUPABASE_POSTGRES_USER,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL:
      process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    DATABASE_URL: process.env.DATABASE_URL,
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
    BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
    NEXT_PUBLIC_BETTER_AUTH_URL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
  },

  // For Next.js >= 13.4.4, you only need to destructure client variables:
  // experimental__runtimeEnv: {
  //   NEXT_PUBLIC_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_PUBLISHABLE_KEY,
  // }
});
