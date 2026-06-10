'use client';

import { useState } from 'react';
import { InventoryProductTable } from '@/components/features/inventory/product-table';
import { InventoryInput } from '../features/inventory/inventory-input';
import { TProduct } from '@/db/db.types';

export function InventoryWidget({
  initialProducts,
}: {
  initialProducts: TProduct[];
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
