import { relations } from 'drizzle-orm';
import {
  boolean,
  doublePrecision,
  index,
  integer,
  pgTable,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';

export const user = pgTable('user', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').unique().notNull(),
  emailVerified: boolean('emailVerified').default(false).notNull(),
  image: text('image'),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().notNull(),
});

export const session = pgTable(
  'session',
  {
    id: text('id').primaryKey(),
    expiresAt: timestamp('expiresAt').notNull(),
    token: text('token').unique().notNull(),
    ipAddress: text('ipAddress'),
    userAgent: text('userAgent'),
    createdAt: timestamp('createdAt').defaultNow().notNull(),
    updatedAt: timestamp('updatedAt').defaultNow().notNull(),
    userId: text('userId')
      .notNull()
      .references(() => user.id),
  },
  (t) => ({
    userIdIdx: index('session_userId_idx').on(t.userId),
  }),
);

export const account = pgTable('account', {
  id: text('id').primaryKey(),
  accountId: text('accountId').notNull(),
  providerId: text('providerId').notNull(),
  userId: text('userId')
    .notNull()
    .references(() => user.id),
  accessToken: text('accessToken'),
  refreshToken: text('refreshToken'),
  idToken: text('idToken'),
  accessTokenExpiresAt: timestamp('accessTokenExpiresAt'),
  refreshTokenExpiresAt: timestamp('refreshTokenExpiresAt'),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().notNull(),
});

export const product = pgTable(
  'product',
  {
    id: text('id')
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    name: text('name').notNull(),
    sku: text('sku').unique().notNull(),
    price: doublePrecision('price').notNull(),
    quantity: integer('quantity').default(0).notNull(),
    lowStock: integer('lowStock').default(10),
    category: text('category'),
    description: text('description'),
    createdBy: text('created_by').references(() => user.id),
    createdAt: timestamp('createdAt').defaultNow().notNull(),
    updatedBy: text('updated_by').references(() => user.id),
    updatedAt: timestamp('updatedAt').defaultNow().notNull(),
  },
  (table) => ({
    skuIdx: index('product_sku_idx').on(table.sku),
    categoryIdx: index('product_category_idx').on(table.category),
  }),
);

export const productRelations = relations(product, ({ one }) => ({
  creator: one(user, {
    fields: [product.createdBy],
    references: [user.id],
    relationName: 'product_creator',
  }),
  updater: one(user, {
    fields: [product.updatedBy],
    references: [user.id],
    relationName: 'product_updater',
  }),
}));
