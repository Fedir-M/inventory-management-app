'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ProductRow } from '@/components/entities/inventory/product-row';
import { InferSelectModel } from 'drizzle-orm';
import { product } from '@/db/schema';

// Типизация, основанная на схеме базы данных
type Product = InferSelectModel<typeof product>;

interface InventoryProductTableProps {
  products: Product[];
}

export function InventoryProductTable({
  products,
}: InventoryProductTableProps) {
  return (
    <div className="border border-gray-200 rounded-xl bg-white shadow-sm overflow-hidden">
      <Table>
        <TableHeader className="bg-brand-bg-dark font-semibold text-[16px]">
          <TableRow className="hover:bg-transparent border-b-0">
            <TableHead>Title</TableHead>
            <TableHead>SKU</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Qty</TableHead>
            <TableHead>Low stock</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.length > 0 ? (
            products.map((item) => <ProductRow key={item.id} product={item} />)
          ) : (
            <TableRow>
              <TableCell
                colSpan={6}
                className="h-24 text-center text-muted-foreground"
              >
                No products found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
