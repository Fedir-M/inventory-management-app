'use client';

import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { KPICard } from '../entities/dashboard/kpi-card';
import { TrendingDown, TrendingUp } from 'lucide-react';
import { ProductChart } from '../entities/dashboard/product-chart';
import { StockRow } from '../entities/dashboard/stock-level-row';
import { InferSelectModel } from 'drizzle-orm';
import { product } from '@/db/schema';
import { getDashboardStockLevels } from '@/db/db-queries';
import { ToggleStockLevel } from '../features/dashboard/toggleStockLevel';
import { useState, useTransition } from 'react';

type TProduct = InferSelectModel<typeof product>;

interface IChartData {
  date: string;
  value: number;
}

interface IDashboardWidgetProps {
  stats: {
    current: { totalProducts: number; totalValue: number; lowStock: number };
    previous: { totalProducts: number; totalValue: number; lowStock: number };
  };
  data: IChartData[];
  products: TProduct[];
  productDiff: number;
  valueDiff: number;
  lowStockDiff: number;
  efficiency: {
    percentage: number;
    diff: number;
  };
}

export function DashboardWidget({
  stats,
  data,
  products: initialProducts,
  productDiff,
  valueDiff,
  lowStockDiff,
  efficiency,
}: IDashboardWidgetProps) {
  // ----- Local states -----
  const [products, setProducts] = useState(initialProducts);
  const [active, setActive] = useState<'low' | 'out'>('low');
  const [isPending, startTransition] = useTransition();

  const { percentage, diff } = efficiency;

  const handleToggle = (val: 'low' | 'out') => {
    startTransition(async () => {
      const data = await getDashboardStockLevels(val);
      setProducts(data);
      setActive(val);
    });
  };
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* ----- 1. Main. Key Metrics ----- */}
        <Card className="border shadow-sm">
          <CardHeader>
            <CardTitle className="font-semibold text-lg p-4">
              Key Metrics
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-3 gap-4">
            <KPICard
              title="Total Products"
              value={stats.current.totalProducts.toString()}
              growth={productDiff >= 0 ? `+${productDiff}` : `${productDiff}`}
              trendDirection="positive"
              icon={
                productDiff >= 0 ? (
                  <TrendingUp size={16} />
                ) : (
                  <TrendingDown size={16} />
                )
              }
            />
            <KPICard
              title="Total Value"
              value={`$${stats.current.totalValue.toLocaleString()}`}
              growth={
                valueDiff >= 0
                  ? `+$${valueDiff.toLocaleString()}`
                  : `-$${Math.abs(valueDiff).toLocaleString()}`
              }
              trendDirection="positive"
              icon={
                valueDiff >= 0 ? (
                  <TrendingUp size={16} />
                ) : (
                  <TrendingDown size={16} />
                )
              }
            />
            <KPICard
              title="Low Stock"
              value={stats.current.lowStock.toString()}
              growth={
                lowStockDiff >= 0 ? `+${lowStockDiff}` : `${lowStockDiff}`
              }
              trendDirection="negative"
              icon={
                lowStockDiff >= 0 ? (
                  <TrendingUp size={16} className="text-destructive" />
                ) : (
                  <TrendingDown size={16} className="text-emerald-600" />
                )
              }
            />
          </CardContent>
        </Card>

        {/* ----- 2. Graph (Placeholder) ----- */}
        <Card className="border shadow-sm">
          <CardHeader>
            <CardTitle className="font-semibold text-lg p-4">
              New products per week
            </CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <ProductChart data={data} />
          </CardContent>
        </Card>

        {/* ---- 3. Stock Levels ----- */}
        <Card className="border shadow-sm">
          <div className="flex items-center justify-between p-4 pb-2">
            <h3 className="font-semibold text-lg px-4">Stock Levels</h3>

            <div className="shrink-0">
              <ToggleStockLevel
                active={active}
                onChange={handleToggle}
                isPending={isPending}
              />
            </div>
          </div>

          <CardContent className="space-y-2">
            {products.map((product) => (
              <StockRow
                key={product.id}
                name={product.name}
                quantity={product.quantity}
                lowStock={product.lowStock}
              />
            ))}
          </CardContent>
        </Card>

        {/* ----- 4. Efficiency ----- */}
        <Card className="border shadow-sm">
          <CardHeader>
            <CardTitle className="font-semibold text-lg p-4">
              Efficiency
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-10">
            <div className="size-32 rounded-full border-8 border-brand-primary flex items-center justify-center">
              <span className="text-2xl font-bold">{percentage}%</span>
            </div>

            <div
              className={`mt-3 flex items-center gap-1 text-sm font-medium 
    ${diff >= 0 ? 'text-emerald-600' : 'text-destructive'}`}
            >
              {diff > 0 ? '▲' : '▼'} {Math.abs(diff)}%
              <span className="text-gray-500 font-normal">vs LAST MONTH</span>
            </div>
            <p className="mt-2 text-sm text-gray-500">In Stock</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
