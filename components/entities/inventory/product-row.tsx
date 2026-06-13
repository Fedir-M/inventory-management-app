import Link from 'next/link';
import { TableCell, TableRow } from '@/components/ui/table';
import { TProduct } from '@/db/db.types';

interface IProductRowProps {
  product: TProduct;
}

const formatDate = (dateString: string | Date) => {
  const d = new Date(dateString);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = String(d.getFullYear()).slice(-2); // Берем последние 2 цифры года
  return `${day}/${month}/${year}`;
};

export function ProductRow({ product }: IProductRowProps) {
  return (
    <TableRow>
      <TableCell className="font-medium pl-6">{product.name}</TableCell>
      <TableCell>{product.sku}</TableCell>
      <TableCell>{product.category}</TableCell>
      <TableCell>${product.price.toFixed(2)}</TableCell>
      <TableCell>{product.quantity}</TableCell>
      <TableCell className="text-center">{product.lowStock ?? '-'}</TableCell>
      <TableCell>
        {product.updatedAt ? formatDate(product.updatedAt) : 'N/A'}
      </TableCell>
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
