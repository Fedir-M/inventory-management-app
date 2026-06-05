import { auth } from '@/app/lib/auth';
import { PageHeader } from '@/components/ui/page-header';
import { headers } from 'next/headers';
import { LayoutDashboard, TrendingDown, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProductChart } from '@/components/entities/dashboard/product-chart';
import { KPICard } from '@/components/entities/dashboard/kpi-card';
import { StockRow } from '@/components/entities/dashboard/stock-level-row';
import { product as productsTable } from '@/db/schema';
import { db } from '@/db';
import { getDashboardStats } from '@/db/db-queries';

export default async function DashboardPage() {
  // Check the session on a server
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) return null;

  const [stats, products] = await Promise.all([
    getDashboardStats(),
    db.select().from(productsTable).limit(10),
  ]);

  // Calculate the dynamic of growth
  const productDiff =
    stats.current.totalProducts - stats.previous.totalProducts;
  const valueDiff = stats.current.totalValue - stats.previous.totalValue;
  const lowStockDiff = stats.current.lowStock - stats.previous.lowStock;
  // If authorized - show this
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <PageHeader
        title="Inventory Management Dashboard"
        description={
          <>
            Welcome,{' '}
            <span className="font-semibold text-brand-primary">
              {session.user.name}
            </span>
            !
          </>
        }
        icon={<LayoutDashboard size={58} className="text-brand-bg-sideBar" />}
      />

      {/* Main grid of Dashboard 2x2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* ----- 1. Main. Key Metrics ----- */}
        <Card className="border shadow-sm">
          <CardHeader>
            <CardTitle>Key Metrics</CardTitle>
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

        {/* 2. Graph (Placeholder) */}
        <Card className="border-none shadow-none">
          <CardHeader>
            <CardTitle>New products per week</CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <ProductChart />
          </CardContent>
        </Card>

        {/* ---- 3. Stock Levels ----- */}
        <Card className="border-none shadow-none">
          <CardHeader>
            <CardTitle>Stock Levels</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {products.map((product) => (
              <StockRow
                key={product.id}
                name={product.name}
                quantity={product.quantity}
              />
            ))}
          </CardContent>
        </Card>

        {/* ----- 4. Efficiency ----- */}
        <Card className="border shadow-sm">
          <CardHeader>
            <CardTitle>Efficiency</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center">
            <div className="size-32 rounded-full border-8 border-brand-primary flex items-center justify-center">
              <span className="text-2xl font-bold">60%</span>
            </div>
            <p className="mt-2 text-sm text-gray-500">In Stock</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
