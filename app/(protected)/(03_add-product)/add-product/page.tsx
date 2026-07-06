import { CirclePlus } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { AddProductWidget } from '@/components/widgets/add-product-widget';
import { db } from '@/db';
import { product } from '@/db/schema';
import { desc } from 'drizzle-orm';

export default async function AddProductPage() {
  const products = await db
    .select()
    .from(product)
    .orderBy(desc(product.createdAt))
    .limit(10);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 p-8 ">
      <PageHeader
        title="Add product"
        description="Add your new product here."
        icon={<CirclePlus size={58} className="text-brand-bg-sideBar" />}
      />
      <AddProductWidget initialProducts={products} />
    </div>
  );
}
