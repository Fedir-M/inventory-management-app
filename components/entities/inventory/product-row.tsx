import Link from 'next/link';
import { TableCell, TableRow } from '@/components/ui/table';
import { TProduct } from '@/db/db.types';

interface IProductRowProps {
  product: TProduct;
}

export function ProductRow({ product }: IProductRowProps) {
  return (
    <TableRow>
      <TableCell className="font-medium pl-6">{product.name}</TableCell>
      <TableCell>{product.sku}</TableCell>
      <TableCell>{product.category}</TableCell>
      <TableCell>${product.price.toFixed(2)}</TableCell>
      <TableCell>{product.quantity}</TableCell>
      <TableCell className="text-center">{product.lowStock ?? '-'}</TableCell>
      <TableCell className="text-right pr-6">
        <Link
          href={`/product/${product.id}`}
          className="border border-brand-accent-hover px-2 py-1 rounded-md  transition-colors hover:bg-brand-accent-hover  text-brand-border hover:text-brand-primary hover:border-brand-primary"
        >
          Open
        </Link>
      </TableCell>
    </TableRow>
  );
}
