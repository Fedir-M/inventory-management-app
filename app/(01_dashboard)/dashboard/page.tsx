import { auth } from '@/app/lib/auth';
import { PageHeader } from '@/components/ui/page-header';
import { headers } from 'next/headers';
import { LayoutDashboard } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProductChart } from '@/components/entities/dashboard/product-chart';
import { KPICard } from '@/components/entities/dashboard/kpi-card';
import { StockRow } from '@/components/entities/dashboard/stock-level-row';
import { product as productsTable } from '@/db/schema';
import { db } from '@/db';

export default async function DashboardPage() {
  // Check the session on a server
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) return null;

  const products = await db.select().from(productsTable).limit(5);

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
        {/* 1. Main. Key Metrics */}
        <Card className="border shadow-sm">
          <CardHeader>
            <CardTitle>Key Metrics</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-3 gap-4">
            <KPICard
              title="Total Products"
              value="25"
              growth="+25"
              icon={null}
            />
            <KPICard
              title="Total Value"
              value="$13724"
              growth="+$13724"
              icon={null}
            />
            <KPICard title="Low Stock" value="10" growth="+10" icon={null} />
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
