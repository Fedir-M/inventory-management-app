import { TableCell, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { InferSelectModel } from 'drizzle-orm';
import { product } from '@/db/schema';

// === stupid component ===
type Product = InferSelectModel<typeof product>;

interface IProductRowProps {
  product: Product;
}

export function ProductRow({ product }: IProductRowProps) {
  return (
    <TableRow>
      <TableCell className="font-medium pl-6">{product.name}</TableCell>
      <TableCell>{product.sku}</TableCell>
      <TableCell>${product.price.toFixed(2)}</TableCell>
      <TableCell>{product.quantity}</TableCell>
      <TableCell>{product.lowStock ?? '-'}</TableCell>
      <TableCell className="text-right pr-6">
        <Button variant="ghost" size="sm">
          Edit
        </Button>
      </TableCell>
    </TableRow>
  );
}
