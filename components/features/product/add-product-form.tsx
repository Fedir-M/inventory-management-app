'use client';

import { Resolver, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import { addProduct } from '@/app/actions/product';
import {
  productSchema,
  TProductForm,
} from '@/app/lib/validations/productSchema';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface IAddProductFormProps {
  className?: string;
}

export function AddProductForm({ className }: IAddProductFormProps) {
  const getInputStyles = (hasError: boolean | undefined) =>
    cn(
      'transition-all duration-250 outline-none w-full',
      'border bg-transparent px-2.5 py-2 text-base rounded-lg',
      // Hover
      'hover:border-brand-primary',
      // Focus
      'focus:border-brand-primary',
      // Error - destructive
      hasError &&
        'border-destructive focus-visible:border-destructive focus:ring-destructive/20',
    );

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TProductForm>({
    resolver: zodResolver(productSchema) as Resolver<TProductForm>,
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<TProductForm> = async (data) => {
    // preparing our data for server action
    const formData = new FormData();
    Object.entries(data).forEach(([key, val]) => {
      formData.append(key, val?.toString() ?? '');
    });

    try {
      // calling of server action
      const result = await addProduct(formData);

      if (!result.success) {
        if (result.errors) {
          Object.entries(result.errors).forEach(([key, message]) => {
            setError(key as keyof TProductForm, { type: 'manual', message });
          });
        } else {
          // toast - for common server error
          toast.error(result.message);
        }
        return;
      }

      toast.success(result.message);
      reset();
    } catch (error) {
      toast.error('Fatal execution error occurred');
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`bg-white p-8 rounded-xl shadow-lg border border-purple-100 w-full ${className || ''}`}
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Add New Product</h2>

      <div className="space-y-4">
        {/* Title */}
        <div className="space-y-2">
          <Label className="text-gray-700">Title</Label>
          <Input
            {...register('name')}
            className={getInputStyles(!!errors.name)}
          />
          {errors.name && (
            <p className="text-xs text-red-500">{errors.name.message}</p>
          )}
        </div>

        {/* Price & Quantity */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-gray-700">Price</Label>
            <Input
              {...register('price')}
              type="number"
              step="0.01"
              className={getInputStyles(!!errors.price)}
            />
            {errors.price && (
              <p className="text-xs text-red-500">{errors.price.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label className="text-gray-700">Quantity</Label>
            <Input
              {...register('quantity')}
              type="number"
              className={getInputStyles(!!errors.quantity)}
            />
            {errors.quantity && (
              <p className="text-xs text-red-500">{errors.quantity.message}</p>
            )}
          </div>
        </div>

        {/* Category */}
        <div className="space-y-2">
          <Label className="text-gray-700">Category</Label>
          <Input
            {...register('category')}
            className={getInputStyles(!!errors.category)}
          />
          {errors.category && (
            <p className="text-xs text-red-500">{errors.category.message}</p>
          )}
        </div>

        {/* SKU */}
        <div className="space-y-2">
          <Label className="text-gray-700">SKU</Label>
          <Input
            {...register('sku')}
            className={getInputStyles(!!errors.sku)}
          />
          {errors.sku && (
            <p className="text-xs text-red-500">{errors.sku.message}</p>
          )}
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label className="text-gray-700">Description</Label>
          <textarea
            {...register('description')}
            className={cn(
              getInputStyles(!!errors.description),
              'min-h-25 resize-y',
            )}
          />
          {errors.description && (
            <p className="text-xs text-red-500">{errors.description.message}</p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-purple-600 hover:bg-purple-700 mt-2"
        >
          {isSubmitting ? 'Saving...' : 'Save Product'}
        </Button>
      </div>
    </form>
  );
}
