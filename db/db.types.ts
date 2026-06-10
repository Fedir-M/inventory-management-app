import { InferSelectModel } from 'drizzle-orm';
import { product, user } from './schema';

// Typification, based on my db schema
export type TProduct = InferSelectModel<typeof product>;

// Extended Relationship-aware type (relations)
export type TProductWithRelations = typeof product.$inferSelect & {
  creator: typeof user.$inferSelect | null;
  updater: typeof user.$inferSelect | null;
};
