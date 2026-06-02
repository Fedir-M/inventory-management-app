'use client';

import { useActionState } from 'react';
import { addProduct } from '@/app/actions/product';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function AddProductForm() {
  const [state, action, isPending] = useActionState(addProduct, null);

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Add product</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={action} className="space-y-4">
          <div className="space-y-2">
            <Label>Title</Label>
            <Input name="name" required />
          </div>
          <div className="space-y-2">
            <Label>SKU</Label>
            <Input name="sku" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Price</Label>
              <Input name="price" type="number" step="0.01" required />
            </div>
            <div className="space-y-2">
              <Label>Quantity</Label>
              <Input name="quantity" type="number" required />
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? 'Adding...' : 'Save'}
          </Button>
          {state?.message && (
            <p
              className={`text-sm ${state.success ? 'text-green-600' : 'text-red-600'}`}
            >
              {state.message}
            </p>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
