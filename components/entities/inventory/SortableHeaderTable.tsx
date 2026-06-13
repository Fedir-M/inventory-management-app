import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';

interface ISortableHeaderTableProps {
  label: string;
  column: string;
  onSort: (column: string) => void;
  activeField?: string;
  activeOrder?: 'asc' | 'desc';
}

export function SortableHeaderTable({
  label,
  column,
  onSort,
  activeField,
  activeOrder,
}: ISortableHeaderTableProps) {
  const isActive = activeField === column;

  return (
    <div
      className="group flex items-center gap-1 cursor-pointer hover:text-brand-primary transition-colors"
      onClick={() => onSort(column)}
    >
      {label}
      {isActive ? (
        activeOrder === 'asc' ? (
          <ArrowUp size={14} />
        ) : (
          <ArrowDown size={14} />
        )
      ) : (
        <ArrowUpDown size={14} className="group-hover:text-brand-primary" />
      )}
    </div>
  );
}
