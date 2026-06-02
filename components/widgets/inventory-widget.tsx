'use client';

import { useState } from 'react';
import { InferSelectModel } from 'drizzle-orm';
import { product } from '@/db/schema';
import { InventoryProductTable } from '@/components/features/inventory/product-table';
import { InventoryInput } from '../features/inventory/inventory-input';

type Product = InferSelectModel<typeof product>;

export function InventoryWidget({
  initialProducts,
}: {
  initialProducts: Product[];
}) {
  const [search, setSearch] = useState('');

  const filteredProducts = initialProducts.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-4">
      <InventoryInput value={search} onChange={setSearch} />

      <InventoryProductTable products={filteredProducts} />
    </div>
  );
}
