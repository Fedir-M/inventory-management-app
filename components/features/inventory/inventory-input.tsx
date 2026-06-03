import { Input } from '@/components/ui/input';

export function InventoryInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  return (
    <div className="border border-gray-200 bg-white p-4 rounded-xl shadow-sm overflow-hidden">
      <Input
        placeholder="Search products..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="max-w-md"
      />
    </div>
  );
}
