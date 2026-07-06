'use server';

import { eq } from 'drizzle-orm';
import { put } from '@vercel/blob';
import { TActionResponse } from './product';
import { auth } from '../lib/auth';
import { headers } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { db } from '@/db';
import { product } from '@/db/schema';

export async function UploadProductImage(
  formData: FormData,
): Promise<TActionResponse> {
  try {
    // --- 1. Authorization check ---
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return {
        success: false,
        message: 'You must be logged in to upload images',
      };
    }

    // --- 2. Extract basic data from FormData ---
    const productId = formData.get('productId') as string | null;
    const remove = formData.get('remove') as string | null;

    if (!productId) {
      return {
        success: false,
        message: 'Missing product ID',
      };
    }

    // --- 3. Scenario: Remove Image ---
    if (remove === 'true') {
      await db
        .update(product)
        .set({
          image: null,
          updatedBy: session.user.id,
        })
        .where(eq(product.id, productId));

      // Clear Next.js cache for affected routes to display up-to-date data
      revalidatePath(`/product/${productId}`);
      revalidatePath('/inventory');

      return {
        success: true,
        message: 'Image removed successfully!',
      };
    }

    // --- 4. Scenario: Upload Image ---
    const file = formData.get('file') as File | null;

    if (!file) {
      return {
        success: false,
        message: 'Missing file',
      };
    }

    // --- 5. Server-side file validation ---
    // Size limitation: 3 MB (3 * 1024 * 1024 bytes)
    const MAX_FILE_SIZE = 3 * 1024 * 1024;
    if (file.size > MAX_FILE_SIZE) {
      return {
        success: false,
        message: 'File size exceeds the 3MB limit',
      };
    }

    // Mime-type check
    if (!file.type.startsWith('image/')) {
      return {
        success: false,
        message: 'Only image files are allowed',
      };
    }

    // --- 6. Uploading directly to Vercel Blob cloud storage ---
    // Construct a unique path inside the bucket using timestamps to avoid name collisions
    const cloudPath = `products/${productId}-${Date.now()}-${file.name}`;

    const blob = await put(cloudPath, file, {
      access: 'public', // Makes the file publicly accessible via a direct URL
    });

    // The secure web URL provided by Vercel storage (https://...)
    const imageUrl = blob.url;

    // --- 7. Updating database record via Drizzle ORM ---
    await db
      .update(product)
      .set({
        image: imageUrl, // Storing the remote cloud URL instead of a local path
        updatedBy: session.user.id,
      })
      .where(eq(product.id, productId));

    // --- 8. Revalidating cache to update UI instantly ---
    revalidatePath(`/product/${productId}`);
    revalidatePath('/inventory');

    return {
      success: true,
      message: 'Image uploaded successfully!',
    };
  } catch (error) {
    console.error('Error handling product image:', error);
    return {
      success: false,
      message: `Upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
    };
  }
}
