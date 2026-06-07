interface IToggleStockLevelProps {
  active: 'low' | 'out';
  onChange: (v: 'low' | 'out') => void;
  isPending: boolean;
  className?: string;
}

export function ToggleStockLevel({
  active,
  onChange,
  isPending,
  className,
}: IToggleStockLevelProps) {
  const btnClass = (val: 'low' | 'out') =>
    `px-3 py-1 text-xs font-medium rounded-md transition-all ${
      active === val
        ? 'bg-white shadow-sm'
        : 'text-gray-500 hover:text-gray-700'
    } ${
      active === val && val === 'out' ? 'text-destructive' : ''
    } ${isPending ? 'opacity-50 cursor-not-allowed' : ''}`;

  return (
    <div className={`flex bg-gray-100 rounded-lg p-1 w-fit ${className}`}>
      <button
        className={btnClass('low')}
        onClick={() => onChange('low')}
        disabled={isPending}
      >
        Low Stock
      </button>
      <button
        className={btnClass('out')}
        onClick={() => onChange('out')}
        disabled={isPending}
      >
        Out of Stock
      </button>
    </div>
  );
}
