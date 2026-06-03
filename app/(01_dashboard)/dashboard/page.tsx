import { auth } from '@/app/lib/auth';
import { PageHeader } from '@/components/ui/page-header';
import { headers } from 'next/headers';
import { LayoutDashboard } from 'lucide-react';

export default async function DashboardPage() {
  // Check the session on a server
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) return null;

  // 3. If authorized - show this
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
    </div>
  );
}
