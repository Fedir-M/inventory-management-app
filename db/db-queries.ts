'use server';

import { db } from '@/db';
import { product as productsTable } from '@/db/schema';
import { count, eq, sql } from 'drizzle-orm';

// =======================================================================
//*                         Info for "Key Metrics"
// =======================================================================
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

// =======================================================================
//*                    Info for "New products per week"
// =======================================================================

export async function getProductChartData() {
  const data = await db.execute(sql`
    WITH weeks AS (
   
      SELECT generate_series(
        DATE_TRUNC('week', NOW() - INTERVAL '7 weeks'),
        DATE_TRUNC('week', NOW()),
        '1 week'::interval
      ) AS week_start
    ),
    product_counts AS (
    
      SELECT 
        DATE_TRUNC('week', ${productsTable.createdAt}) AS week,
        COUNT(${productsTable.id}) AS count
      FROM ${productsTable}
      WHERE ${productsTable.createdAt} >= DATE_TRUNC('week', NOW() - INTERVAL '7 weeks')
      GROUP BY 1
    )
   
    SELECT 
      TO_CHAR(weeks.week_start, 'MM/DD') as date,
      COALESCE(product_counts.count, 0)::int as value
    FROM weeks
    LEFT JOIN product_counts ON weeks.week_start = product_counts.week
    ORDER BY weeks.week_start ASC;
  `);

  return data.rows as { date: string; value: number }[];
}

// =======================================================================
//*                      Info for "Stock Levels"
// =======================================================================

export async function getDashboardStockLevels(type: 'low' | 'out') {
  if (type === 'low') {
    return await db
      .select()
      .from(productsTable)
      .where(sql`${productsTable.quantity} > 0`)
      .orderBy(
        // 1st pool - lowStock (prioritet 0), the rest (prioritet 1)
        sql`CASE WHEN ${productsTable.quantity} < ${productsTable.lowStock} THEN 0 ELSE 1 END ASC`,
        // in short supply - according to the degree of shortage, for the rest - according to the increasing balance
        sql`(${productsTable.lowStock} - ${productsTable.quantity}) DESC`,
        sql`${productsTable.quantity} ASC`,
      )
      .limit(10);
  }

  return await db
    .select()
    .from(productsTable)
    .where(eq(productsTable.quantity, 0))
    .orderBy(sql`LOWER(TRIM(${productsTable.name})) ASC`)
    .limit(10);
}

// =======================================================================
//*                         Info for "Efficiency"
// =======================================================================
export async function getDashboardEfficiency() {
  const oneMonthAgo = new Date();
  oneMonthAgo.setDate(oneMonthAgo.getDate() - 30);

  const result = await db
    .select({
      // Current data
      total: count(productsTable.id),
      inStock: count(
        sql`CASE WHEN ${productsTable.quantity} >= ${productsTable.lowStock} THEN 1 ELSE NULL END`,
      ),
      // Last month data ( createdAt < oneMonthAgo )
      pastTotal: count(
        sql`CASE WHEN ${productsTable.createdAt} < ${oneMonthAgo.toISOString()} THEN 1 ELSE NULL END`,
      ),
      pastInStock: count(
        sql`CASE WHEN ${productsTable.createdAt} < ${oneMonthAgo.toISOString()} AND ${productsTable.quantity} >= ${productsTable.lowStock} THEN 1 ELSE NULL END`,
      ),
    })
    .from(productsTable);

  const stats = result[0];

  const currentPercent =
    stats.total > 0
      ? Math.round((Number(stats.inStock) / Number(stats.total)) * 100)
      : 0;
  const pastPercent =
    stats.pastTotal > 0
      ? Math.round((Number(stats.pastInStock) / Number(stats.pastTotal)) * 100)
      : 0;

  const diff = currentPercent - pastPercent;

  return { percentage: currentPercent, diff };
}
