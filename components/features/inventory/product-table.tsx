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
import { TProduct } from '@/db/db.types';

interface InventoryProductTableProps {
  products: TProduct[];
}

export function InventoryProductTable({
  products,
}: InventoryProductTableProps) {
  return (
    <div className="border border-gray-200 rounded-xl bg-white shadow-sm overflow-hidden">
      <Table className="w-full">
        <TableHeader className="bg-brand-bg-dark font-semibold text-[16px] [&_tr]:border-none  ">
          <TableRow className="hover:bg-transparent border-b-0">
            <TableHead className="pl-6">Title</TableHead>
            <TableHead>SKU</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Q-ty</TableHead>
            <TableHead>Low stock</TableHead>
            <TableHead className="text-right pr-6">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="[&_tr]:border-none">
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
