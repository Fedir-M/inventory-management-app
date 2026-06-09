interface IStockRowProps {
  name: string;
  quantity: number;
  lowStock?: number | null;
  sku?: string;
  createdAt?: Date;
}

export function StockRow({
  name,
  quantity,
  lowStock,
  sku,
  createdAt,
}: IStockRowProps) {
  // Color's logic: 0 - red, < 10 - yellow, other - green
  const getStatusColor = (qty: number, limit: number | null) => {
    if (qty === 0) return { dot: 'bg-destructive', text: 'text-destructive' };

    const threshold = limit ?? 10;
    if (qty < threshold) return { dot: 'bg-amber-500', text: 'text-amber-600' };
    return { dot: 'bg-emerald-600', text: 'text-emerald-700' };
  };

  const { dot } = getStatusColor(quantity, lowStock ?? null);
  const formattedDate = createdAt
    ? new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: '2-digit',
      }).format(createdAt)
    : '';

  return (
    <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
      <div className="flex items-center gap-3">
        <div className={`size-2.5 rounded-full ${dot}`} />
        <span className="font-medium text-sm">{name}</span>

        {sku && <span className="text-xs text-gray-400 font-mono ">{sku}</span>}
      </div>

      <span className="text-sm text-gray-500 font-medium">{formattedDate}</span>
    </div>
  );
}
