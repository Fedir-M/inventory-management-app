import { ReactNode } from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface IKPICardProps {
  title: string;
  value: string;
  growth: string;
  icon?: ReactNode;
  trendDirection?: 'positive' | 'negative';
}

export function KPICard({
  title,
  value,
  growth,
  icon,
  trendDirection = 'positive',
}: IKPICardProps) {
  const isPositive = growth.startsWith('+');

  const isGood = trendDirection === 'positive' ? isPositive : !isPositive;
  const colorClass = isGood ? 'text-emerald-600' : 'text-destructive';

  return (
    <Card>
      <CardContent className="p-4 pt-4">
        <div className="flex justify-between items-start mb-4">
          <span className="text-sm font-bold text-gray-500">{title}</span>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-2xl font-bold">{value}</span>

          <div className="flex items-center">
            <span className={`text-xs font-medium ${colorClass} `}>
              {growth}
            </span>
            <span className={`text-xs font-medium ml-8 ${colorClass}`}>
              {icon}
            </span>
          </div>
          <span className={`text-xs font-medium text-gray-500`}>
            from last month
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
