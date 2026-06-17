'use server';

import { headers } from 'next/headers';
import { auth } from '../lib/auth';
import { TActionResponse } from './product';
import { db } from '@/db';
import { product } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function DeleteProductImage(
  productId: string,
): Promise<TActionResponse> {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return {
        success: false,
        message: 'You must be logged in to delete images',
      };
    }

    await db
      .update(product)
      .set({
        image: null,
        updatedBy: session.user.id,
      })
      .where(eq(product.id, productId));

    revalidatePath(`/product/${productId}`);

    return {
      success: true,
      message: 'Image removed successfully!',
    };
  } catch (error) {
    console.error('Error deleting image:', error);
    return {
      success: false,
      message: `Delete failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
    };
  }
}
