import { auth } from '@/app/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { SidebarWidget } from '@/components/widgets/sidebar-widget';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect('/sign-in');
  }

  return (
    <div className="h-screen flex flex-row overflow-hidden">
      <SidebarWidget session={session} />
      <main className="flex-1 overflow-y-auto bg-brand-bgMain-pages">
        {children}
      </main>
    </div>
  );
}
