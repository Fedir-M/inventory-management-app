import { ProductDetailsLines } from '../entities/product/ProductDetailsLines';
import EditProductDetailsPageButton from '../features/product/EditProductDetailsPageButton';
import { TProductWithRelations } from '@/db/db.types';
import { ProductImageUploader } from '../features/product/ProductImageUploader';

export function ProductDetailsPagedWidget({
  product,
}: {
  product: TProductWithRelations;
}) {
  return (
    <div className="w-full max-w-5xl mx-auto p-6">
      <div className="flex justify-end">
        <EditProductDetailsPageButton />
      </div>

      <div className="flex flex-row gap-8 mt-6 items-start">
        <div className="flex flex-col gap-6 w-64 shrink-0">
          {/* --- PICTURE --- */}
          <ProductImageUploader
            productId={product.id}
            initialImage={product.image}
            productName={product.name}
          />

          {/* --- Created By / Updated by --- */}
          <div className="flex flex-col gap-6 p-4 bg-gray-50 rounded-lg">
            <div>
              <ProductDetailsLines
                label="Created By:"
                value={product.creator?.name ?? 'Unknown'}
              />
              <ProductDetailsLines
                label="Created At:"
                value={product.createdAt.toLocaleDateString()}
              />
            </div>

            <div>
              <ProductDetailsLines
                label="Updated By:"
                value={product.updater?.name ?? 'Unknown'}
              />
              <ProductDetailsLines
                label="Updated At: "
                value={product.updatedAt?.toLocaleDateString()}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 flex-1">
          {/* --- Title / SKU / Price --- */}
          <ProductDetailsLines label="Name: " value={product.name} />
          <ProductDetailsLines label="SKU: " value={product.sku ?? 'N/A'} />
          <ProductDetailsLines
            label="Category:"
            value={product.category ?? 'Uncategorized'}
          />
          <ProductDetailsLines label="Price:" value={`$${product.price}`} />

          {/* --- Q-ty / Low stock level --- */}
          <div className="flex flex-wrap gap-x-12 gap-y-4 mt-6">
            <ProductDetailsLines
              label="Quantity:"
              value={product.quantity}
              className="flex-1"
            />
            <ProductDetailsLines
              label="Low Stock level:"
              value={product.lowStock}
              className="flex-1"
            />
          </div>

          {/* --- Description --- */}
          <div className="mt-6 w-full">
            <div className="flex flex-col justify-center items-center  w-full  p-3 border border-brand-border rounded-md text-gray-700 min-h-38 break-all whitespace-pre-wrap wrap-break-word overflow-hidden">
              {product?.description || '*** No description provided ***'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
