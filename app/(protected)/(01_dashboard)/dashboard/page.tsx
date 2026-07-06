import { auth } from '@/app/lib/auth';
import { PageHeader } from '@/components/ui/page-header';
import { headers } from 'next/headers';
import { LayoutDashboard } from 'lucide-react';
import {
  getDashboardEfficiency,
  getDashboardStats,
  getDashboardStockLevels,
  getProductChartData,
} from '@/db/db-queries';
import { DashboardWidget } from '@/components/widgets/dashboard-widget';

export default async function DashboardPage() {
  // Check the session on a server
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) return null;

  const [stats, data, initialProducts, efficiency] = await Promise.all([
    getDashboardStats(),
    getProductChartData(),
    getDashboardStockLevels('low'),
    getDashboardEfficiency(),
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
      <DashboardWidget
        stats={stats}
        data={data}
        products={initialProducts}
        productDiff={productDiff}
        valueDiff={valueDiff}
        lowStockDiff={lowStockDiff}
        efficiency={efficiency}
      />
    </div>
  );
}
