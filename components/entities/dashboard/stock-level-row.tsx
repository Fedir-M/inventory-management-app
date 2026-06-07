interface IStockRowProps {
  name: string;
  quantity: number;
  lowStock: number | null;
}

export function StockRow({ name, quantity, lowStock }: IStockRowProps) {
  // Color's logic: 0 - red, < 10 - yellow, other - green
  const getStatusColor = (qty: number, limit: number | null) => {
    if (qty === 0) return { dot: 'bg-destructive', text: 'text-destructive' };

    const threshold = limit ?? 10;
    if (qty < threshold) return { dot: 'bg-amber-500', text: 'text-amber-600' };
    return { dot: 'bg-emerald-600', text: 'text-emerald-700' };
  };

  const { dot, text } = getStatusColor(quantity, lowStock);

  return (
    <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
      <div className="flex items-center gap-3">
        <div className={`size-2.5 rounded-full ${dot}`} />
        <span className="font-medium text-sm">{name}</span>
      </div>
      <span className={`font-bold text-sm ${text}`}>{quantity} units</span>
    </div>
  );
}
