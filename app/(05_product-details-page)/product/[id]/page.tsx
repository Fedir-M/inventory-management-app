import { notFound } from 'next/navigation';
import { getProductById } from '@/db/db-queries';
import { PageHeader } from '@/components/ui/page-header';
import { Captions } from 'lucide-react';
import { ProductDetailsPagedWidget } from '@/components/widgets/product-details-paged-widget';

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = await getProductById(id);
  if (!product) notFound();

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <PageHeader
        title="Product Details Page"
        description={
          <>
            Details of ID:{' '}
            <span className="font-semibold text-brand-primary">
              {product.id}
            </span>
          </>
        }
        icon={<Captions size={58} className="text-brand-bg-sideBar" />}
      />

      <ProductDetailsPagedWidget product={product} />
    </div>
  );
}
