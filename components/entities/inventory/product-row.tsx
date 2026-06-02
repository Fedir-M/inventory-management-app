import { TableCell, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { InferSelectModel } from 'drizzle-orm';
import { product } from '@/db/schema';

// === stupid component ===
type Product = InferSelectModel<typeof product>;

interface ProductRowProps {
  product: Product;
}

export function ProductRow({ product }: ProductRowProps) {
  return (
    <TableRow>
      <TableCell className="font-medium">{product.name}</TableCell>
      <TableCell>{product.sku}</TableCell>
      <TableCell>${product.price.toFixed(2)}</TableCell>
      <TableCell>{product.quantity}</TableCell>
      <TableCell>{product.lowStock ?? '-'}</TableCell>
      <TableCell className="text-right">
        <Button variant="ghost" size="sm">
          Edit
        </Button>
      </TableCell>
    </TableRow>
  );
}
