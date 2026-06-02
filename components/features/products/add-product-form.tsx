'use client';

import { useActionState } from 'react';
import { addProduct } from '@/app/actions/product';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function AddProductForm() {
  const [state, action, isPending] = useActionState(addProduct, null);

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg border border-purple-100 max-w-md w-full">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Add New Product</h2>

      <form action={action} className="space-y-4">
        <div className="space-y-2">
          <Label className="text-gray-700">Title</Label>
          <Input
            name="name"
            required
            className="border-gray-200 focus:border-purple-500 focus:ring-purple-500 rounded-lg"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-gray-700">SKU</Label>
          <Input
            name="sku"
            required
            className="border-gray-200 focus:border-purple-500 focus:ring-purple-500 rounded-lg"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-gray-700">Price</Label>
            <Input
              name="price"
              type="number"
              step="0.01"
              required
              className="border-gray-200 focus:border-purple-500 focus:ring-purple-500 rounded-lg"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-gray-700">Quantity</Label>
            <Input
              name="quantity"
              type="number"
              required
              className="border-gray-200 focus:border-purple-500 focus:ring-purple-500 rounded-lg"
            />
          </div>
        </div>

        <Button
          type="submit"
          disabled={isPending}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2.5 rounded-lg transition-colors mt-2"
        >
          {isPending ? 'Saving...' : 'Save Product'}
        </Button>

        {state?.message && (
          <p
            className={`text-sm text-center ${state.success ? 'text-green-600' : 'text-red-600'}`}
          >
            {state.message}
          </p>
        )}
      </form>
    </div>
  );
}
