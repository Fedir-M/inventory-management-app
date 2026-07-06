import { CirclePlus } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { AddProductWidget } from '@/components/widgets/add-product-widget';
import { db } from '@/db';
import { product } from '@/db/schema';
import { desc } from 'drizzle-orm';
import { requireSession } from '@/app/lib/session';

export default async function AddProductPage() {
  // Check the session on a server
  const session = await requireSession();
  console.log(`User accessing to add the product: ${session.user.id}`);

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
