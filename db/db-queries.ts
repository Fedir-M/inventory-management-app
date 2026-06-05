import { db } from '@/db';
import { product as productsTable } from '@/db/schema';
import { count, sql } from 'drizzle-orm';

export async function getDashboardStats() {
  const oneMonthAgo = new Date();
  oneMonthAgo.setDate(oneMonthAgo.getDate() - 30);

  const result = await db
    .select({
      // Current
      currentTotalProducts: count(productsTable.id),
      currentTotalValue: sql<number>`COALESCE(SUM(${productsTable.price} * ${productsTable.quantity}), 0)`,
      currentLowStock: count(
        sql`CASE WHEN ${productsTable.quantity} < ${productsTable.lowStock} THEN 1 ELSE NULL END`,
      ),

      // 1 month ago
      pastTotalProducts: count(
        sql`CASE WHEN ${productsTable.createdAt} < ${oneMonthAgo.toISOString()} THEN 1 ELSE NULL END`,
      ),
      pastTotalValue: sql<number>`COALESCE(SUM(CASE WHEN ${productsTable.createdAt} < ${oneMonthAgo.toISOString()} THEN ${productsTable.price} * ${productsTable.quantity} ELSE 0 END), 0)`,

      pastLowStock: count(
        sql`CASE WHEN ${productsTable.createdAt} < ${oneMonthAgo.toISOString()} AND ${productsTable.quantity} < ${productsTable.lowStock} THEN 1 ELSE NULL END`,
      ),
    })
    .from(productsTable);

  const stats = result[0];

  return {
    current: {
      totalProducts: Number(stats.currentTotalProducts),
      totalValue: Number(stats.currentTotalValue),
      lowStock: Number(stats.currentLowStock),
    },
    previous: {
      totalProducts: Number(stats.pastTotalProducts),
      totalValue: Number(stats.pastTotalValue),
      lowStock: Number(stats.pastLowStock),
    },
  };
}
