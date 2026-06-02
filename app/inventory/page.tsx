import { InventoryWidget } from '@/components/widgets/inventory-widget';
import { db } from '@/db';
import { product } from '@/db/schema';

export default async function InventoryPage() {
  // gets products from the db
  const products = await db.select().from(product);

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Inventory</h1>
        <p className="text-muted-foreground">
          Manage your products and track inventory levels.
        </p>
      </div>

      <InventoryWidget initialProducts={products} />
    </div>
  );
}
