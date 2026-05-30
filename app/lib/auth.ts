import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { PrismaClient } from '../generated/prisma';

// Init of custom Prisma Client
const prisma = new PrismaClient();

export const auth = betterAuth({
  // 1. Tell to Better Auth to use Prisma to store sessions and users.
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),

  // 2. The ways to enter (Email + Password)
  emailAndPassword: {
    enabled: true,
  },
});
