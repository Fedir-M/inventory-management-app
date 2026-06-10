import Link from 'next/link';

interface IStockRowProps {
  id: string;
  name: string;
  quantity: number;
  lowStock?: number | null;
  sku?: string;
  createdAt?: Date;
  showQuantity?: boolean;
  isClickable?: boolean;
}

export function StockRow({
  id,
  name,
  quantity,
  lowStock,
  sku,
  createdAt,
  showQuantity = true,
  isClickable = true,
}: IStockRowProps) {
  // Color's logic: 0 - red, < 10 - yellow, other - green
  const getStatusColor = (qty: number, limit: number | null) => {
    if (qty === 0) return { dot: 'bg-destructive', text: 'text-destructive' };

    const threshold = limit ?? 10;
    if (qty < threshold) return { dot: 'bg-amber-500', text: 'text-amber-600' };
    return { dot: 'bg-emerald-600', text: 'text-emerald-700' };
  };

  const { dot, text } = getStatusColor(quantity, lowStock ?? null);

  const formattedDate = createdAt
    ? new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: '2-digit',
      }).format(createdAt)
    : null;
  const content = (
    <>
      <div className="flex items-center gap-3">
        <div className={`size-2.5 rounded-full ${dot}`} />
        <span className="font-medium text-sm">{name}</span>
        {sku && <span className="text-xs text-gray-400 font-mono">{sku}</span>}
      </div>

      {showQuantity && (
        <span className={`font-bold text-sm ${text}`}>{quantity} units</span>
      )}

      {formattedDate && (
        <span className="text-xs text-gray-400">{formattedDate}</span>
      )}
    </>
  );

  const className =
    'flex justify-between items-center p-2 bg-gray-50 rounded-lg';

  // Если isClickable === false, возвращаем обычный div вместо Link
  if (!isClickable) {
    return <div className={className}>{content}</div>;
  }

  return (
    <Link href={`/product/${id}`} className={className}>
      {content}
    </Link>
  );
}
