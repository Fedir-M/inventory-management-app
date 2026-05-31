import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { Pool } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
import { PrismaClient } from '@/prisma/client';

const connectionString =
  'postgresql://neondb_owner:npg_pTmEyo3F7DiM@ep-steep-smoke-algkp36f-pooler.c-3.eu-central-1.aws.neon.tech/neondb?sslmode=require';

const pool = new Pool({ connectionString });
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const adapter = new PrismaNeon(pool as any);

// Пробиваем баг Prisma 7: силой заталкиваем строку подключения в обход строгих типов generator
const prisma = new PrismaClient({
  adapter,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as any);

// Прописываем строку во внутреннее свойство, которое WASM-движок ищет при выполнении queryRaw
// @ts-expect-error forced move
prisma._datasourceUrl = connectionString;

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  emailAndPassword: {
    enabled: true,
  },
});
