import { auth } from '@/app/lib/auth';
import { headers } from 'next/headers';
import { CirclePlus } from 'lucide-react';
import { AddProductForm } from '../../../components/features/product/add-product-form';
import { PageHeader } from '@/components/ui/page-header';

export default async function DashboardPage() {
  // Check the session on a server
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) return null;

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 p-8 ">
      <PageHeader
        title="Add product"
        description="Add your new product here."
        icon={<CirclePlus size={58} className="text-brand-bg-sideBar" />}
      />

      <AddProductForm />
    </div>
  );
}
