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
import { SortableHeaderTable } from '@/components/entities/inventory/SortableHeaderTable';
import { TSortOrder } from '@/app/(02_inventory)/inventory/page';

interface IInventoryProductTableProps {
  products: TProduct[];
  onSort: (column: string) => void;
  sortField?: string;
  sortOrder?: TSortOrder;
}

export function InventoryProductTable({
  products,
  onSort,
  sortField,
  sortOrder,
}: IInventoryProductTableProps) {
  return (
    <div className="border border-gray-200 rounded-xl bg-white shadow-sm overflow-hidden">
      <Table className="w-full">
        <TableHeader className="bg-brand-bg-dark font-semibold text-[16px] [&_tr]:border-none  ">
          <TableRow className="hover:bg-transparent border-b-0">
            <TableHead className="pl-6">
              <SortableHeaderTable
                label="Title"
                column="name"
                onSort={onSort}
                activeField={sortField}
                activeOrder={sortOrder}
              />
            </TableHead>

            <TableHead>SKU</TableHead>

            <TableHead>
              <SortableHeaderTable
                label="Category"
                column="category"
                onSort={onSort}
                activeField={sortField}
                activeOrder={sortOrder}
              />
            </TableHead>

            <TableHead>
              <SortableHeaderTable
                label="Price"
                column="price"
                onSort={onSort}
                activeField={sortField}
                activeOrder={sortOrder}
              />
            </TableHead>

            <TableHead>
              <SortableHeaderTable
                label="Q-ty"
                column="quantity"
                onSort={onSort}
                activeField={sortField}
                activeOrder={sortOrder}
              />
            </TableHead>

            <TableHead>
              <SortableHeaderTable
                label="Low stock"
                column="lowStock"
                onSort={onSort}
                activeField={sortField}
                activeOrder={sortOrder}
              />
            </TableHead>

            <TableHead>
              <SortableHeaderTable
                label="UDate"
                column="updatedAt"
                onSort={onSort}
                activeField={sortField}
                activeOrder={sortOrder}
              />
            </TableHead>

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
