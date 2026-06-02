import { auth } from '@/app/lib/auth';
import { headers } from 'next/headers';
import { AddProductForm } from '../../../components/features/product/add-product-form';

export default async function DashboardPage() {
  // Check the session on a server
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) return null;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Inventory Management Dashboard
        </h1>
        <p className="text-gray-600 mb-6">
          Welcome,{' '}
          <span className="font-semibold text-purple-600">
            {session.user.email}
          </span>
          !
        </p>

        <div className="border-t pt-4">
          <p className="text-sm text-gray-500">
            Analitics and list of the products.
          </p>
        </div>

        <AddProductForm />
      </div>
    </div>
  );
}
