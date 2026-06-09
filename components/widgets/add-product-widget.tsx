import { InferSelectModel } from 'drizzle-orm';
import { LastTenAddedProducts } from '../entities/product/LastTenAddedProducts';
import { AddProductForm } from '../features/product/add-product-form';
import { product } from '@/db/schema';

export type TProduct = InferSelectModel<typeof product>;

interface IAddProductWidgetProps {
  initialProducts: TProduct[];
}

export function AddProductWidget({ initialProducts }: IAddProductWidgetProps) {
  return (
    <div className="flex gap-6 w-full">
      <AddProductForm className="flex-1" />
      <LastTenAddedProducts products={initialProducts} className="flex-2" />
    </div>
  );
}
