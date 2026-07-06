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
  baseURL: 'https://inventory-management-app-pearl.vercel.app',

  // 2. cookie settings for security and operation on subdomains.
  cookie: {
    secure: true,
    sameSite: 'Lax', // Standard for preventing CSRF.
    // We specify the domain so that the cookie is available on all paths.
    domain: '.vercel.app',
  },

  // --------------------------
});
