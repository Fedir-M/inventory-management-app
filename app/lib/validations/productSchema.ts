import { z } from 'zod';

// 1. The validation scheme itself
export const productSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(24, 'Name is too long'),

  sku: z
    .string()
    .min(6, 'SKU must be at least 6 characters')
    .regex(
      /^[a-z0-9-]+$/,
      'SKU can only contain lowercase letters, numbers and hyphens',
    ),

  price: z.coerce.number().min(0.01, 'Price must be greater than 0'),

  quantity: z.coerce
    .number()
    .int('Quantity must be a whole number')
    .nonnegative('Quantity cannot be negative'),

  lowStock: z.coerce.number().int().optional().nullable(),

  category: z.string().min(2, 'Category is required'),

  description: z.string().max(500, 'Description is too long').optional(),
});

// 2. TypeScript type, gotten out of the scheme (auto)
export type TProductForm = z.infer<typeof productSchema>;

// z.coerce.number()
// input - always is/are string
export type TProductFormIn = z.input<typeof productSchema>;
// output - always is/are numbers
export type TProductFormOut = z.output<typeof productSchema>;
