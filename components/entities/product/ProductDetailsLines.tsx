interface IProductDetailsProps {
  label: string;
  value: string | number | null | undefined;
  className?: string;
}

export function ProductDetailsLines({
  label,
  value,
  className,
}: IProductDetailsProps) {
  return (
    <div
      className={`flex items-center justify-between py-2 border-b border-gray-100 ${className}`}
    >
      <span className="text-sm text-gray-500">{label}</span>
      <span className="text-sm font-medium text-gray-900">{value ?? '-'}</span>
    </div>
  );
}
