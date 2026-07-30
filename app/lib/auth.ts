import { db } from '@/db';
import { account, session, user } from '@/db/schema';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: {
      user: user,
      session: session,
      account: account,
    },
  }),
  emailAndPassword: {
    enabled: true,
  },

  //  1. The full URL of your production application.
  // Better Auth uses this to configure cookie paths.
  baseURL: process.env.BETTER_AUTH_URL || 'http://localhost:3000',

  // 2. cookie settings for security and operation on subdomains.
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Lax',
    // Домен для кук нужен только на продакшене
    domain: process.env.NODE_ENV === 'production' ? '.vercel.app' : undefined,
  },

  // --------------------------
});
