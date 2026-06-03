import { PageHeader } from '@/components/ui/page-header';
import { InventoryWidget } from '@/components/widgets/inventory-widget';
import { db } from '@/db';
import { product } from '@/db/schema';
import { ShelvingUnit } from 'lucide-react';

export default async function InventoryPage() {
  // gets products from the db
  const products = await db.select().from(product);

  return (
    <div className="p-8 space-y-6">
      <PageHeader
        title="Inventory"
        description="Manage your products and track inventory levels."
        icon={<ShelvingUnit size={58} className="text-brand-bg-sideBar" />}
      />

      <InventoryWidget initialProducts={products} />
    </div>
  );
}
