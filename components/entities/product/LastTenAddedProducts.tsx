import { Card, CardContent } from '@/components/ui/card';
import { StockRow } from '../dashboard/stock-level-row';
import { TProduct } from '@/components/widgets/add-product-widget';

interface ILastTenAddedProductsProps {
  products: TProduct[];
  className: string;
}

export function LastTenAddedProducts({
  products,
  className,
}: ILastTenAddedProductsProps) {
  return (
    <Card className={`border shadow-sm ${className}`}>
      <div className="flex items-center justify-between p-4 pb-2">
        <h3 className="font-semibold text-lg px-4">{`Last "10" Added Products`}</h3>
      </div>

      <CardContent className="space-y-2">
        {products.map((product) => (
          <StockRow
            key={product.id}
            id={product.id}
            name={product.name}
            sku={product.sku}
            quantity={product.quantity}
            createdAt={product.createdAt}
            showQuantity={false}
            isClickable={false}
          />
        ))}
      </CardContent>
    </Card>
  );
}
