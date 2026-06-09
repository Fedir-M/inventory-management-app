'use client';

import { useActionState, useEffect } from 'react';
import { addProduct, TActionResponse } from '@/app/actions/product';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface IAddProductFormProps {
  className: string;
}

export function AddProductForm({ className }: IAddProductFormProps) {
  const [state, action, isPending] = useActionState<
    TActionResponse | null,
    FormData
  >(addProduct, null);

  // =====================================================================
  //*                         UseEffects
  // =====================================================================
  useEffect(() => {
    if (state?.success === true) {
      toast.success(state.message); // green toast
    } else if (state?.success === false) {
      toast.error(state.message); // red toast
    }
  }, [state]);

  return (
    <div
      className={`bg-white p-8 rounded-xl shadow-lg border border-purple-100 w-full ${className}`}
    >
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

        <div className="space-y-2">
          <Label className="text-gray-700">SKU</Label>
          <Input
            name="sku"
            required
            className="border-gray-200 focus:border-purple-500 focus:ring-purple-500 rounded-lg"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-gray-700">Low stck at</Label>
          <Input
            name="lowStock"
            className="border-gray-200 focus:border-purple-500 focus:ring-purple-500 rounded-lg"
          />
        </div>

        <Button
          type="submit"
          disabled={isPending}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2.5 rounded-lg transition-colors mt-2"
        >
          {isPending ? 'Saving...' : 'Save Product'}
        </Button>
      </form>
    </div>
  );
}
