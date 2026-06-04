import { ReactNode } from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface IKPICardProps {
  title: string;
  value: string;
  growth: string;
  icon: ReactNode;
}

export function KPICard({ title, value, growth, icon }: IKPICardProps) {
  const isPositive = growth.startsWith('+');
  return (
    <Card>
      <CardContent className="p-4 pt-4">
        <div className="flex justify-between items-start mb-4">
          <span className="text-sm font-medium text-gray-500">{title}</span>
          <div className="text-gray-400">{icon}</div>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-2xl font-bold">{value}</span>

          <span
            className={`text-xs font-medium ${isPositive ? 'text-emerald-600' : 'text-destructive'}`}
          >
            {growth}
          </span>
          <span
            className={`text-xs font-medium ${isPositive ? 'text-emerald-600' : 'text-destructive'}`}
          >
            from last month
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
