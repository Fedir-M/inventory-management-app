import { PageHeader } from '@/components/ui/page-header';
import { InventoryWidget } from '@/components/widgets/inventory-widget';
import { db } from '@/db';
import { product } from '@/db/schema';
import { ilike, sql, asc, desc } from 'drizzle-orm';
import { ShelvingUnit } from 'lucide-react';
import { AnyColumn } from 'drizzle-orm';

export type TSortOrder = 'asc' | 'desc';

interface IInventoryPageProps {
  searchParams: Promise<{
    page?: string;
    q?: string;
    sort?: string;
    order?: TSortOrder;
  }>;
}

export default async function InventoryPage({
  searchParams,
}: IInventoryPageProps) {
  const paramsFromPromise = await searchParams;

  // ----- Sorting. Default values -----
  const sortField = paramsFromPromise.sort || 'createdAt';
  const sortOrder = paramsFromPromise.order || 'desc';

  // 'AnyColumn' - a built-in type in drizzle-orm
  const sortColumns: Record<string, AnyColumn> = {
    createdAt: product.createdAt,
    price: product.price,
    name: product.name,
    quantity: product.quantity,
    updatedAt: product.updatedAt,
  };

  const column = sortColumns[sortField] || product.createdAt;

  // ----- Server and Pagination -----
  // gets products from the db
  const query = paramsFromPromise.q || '';
  const pageSize = 20;
  const page = Number(paramsFromPromise.page) || 1;
  const offset = (page - 1) * pageSize;

  const result = await db
    .select({
      id: product.id,
      name: product.name,
      sku: product.sku,
      price: product.price,
      quantity: product.quantity,
      category: product.category,
      description: product.description,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
      lowStock: product.lowStock,
      createdBy: product.createdBy,
      updatedBy: product.updatedBy,
      // add totalCount for page pagination, using 'window function'
      totalCount: sql<number>`count(*) OVER()`.as('totalCount'),
    })
    .from(product)
    // if query 'is', searching for query
    .where(query ? ilike(product.name, `%${query}%`) : undefined)
    .orderBy(sortOrder === 'asc' ? asc(column) : desc(column))
    .limit(pageSize)
    .offset(offset);

  const products = result;
  const totalCount = result[0]?.totalCount ?? 0;
  const totalPages = Math.ceil(totalCount / pageSize);
  return (
    <div className="p-8 space-y-6">
      <PageHeader
        title="Inventory"
        description="Manage your products and track inventory levels."
        icon={<ShelvingUnit size={58} className="text-brand-bg-sideBar" />}
      />

      <InventoryWidget
        initialProducts={products}
        totalPages={totalPages}
        currentPage={page}
        sortField={sortField}
        sortOrder={sortOrder}
      />
    </div>
  );
}
