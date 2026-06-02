import { auth } from '@/app/lib/auth';
import { headers } from 'next/headers';

export default async function DashboardPage() {
  // Check the session on a server
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) return null;

  // 3. If authorized - show this
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1>Dashboard draft page</h1>
    </div>
  );
}
