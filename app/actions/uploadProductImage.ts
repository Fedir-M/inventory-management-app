'use server';

import { eq } from 'drizzle-orm';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
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
    // --- 1. Authorization check (acctually we could do the separat func of this already)---
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return {
        success: false,
        message: 'You must be logged in to upload images',
      };
    }

    // --- 2. Extracting data from FormData ---
    const file = formData.get('file') as File | null;
    const productId = formData.get('productId') as string | null;

    if (!file || !productId) {
      return {
        success: false,
        message: 'Missing file or product ID',
      };
    }

    // --- 3. Server-side file validation ---
    // Size limitation: 3 МБ (3 * 1024 * 1024 bytes)
    const MAX_FILE_SIZE = 3 * 1024 * 1024;
    if (file.size > MAX_FILE_SIZE) {
      return {
        success: false,
        message: 'File size exceeds the 3MB limit',
      };
    }

    // 3.1. File's type check
    if (!file.type.startsWith('image/')) {
      return {
        success: false,
        message: 'Only image files are allowed',
      };
    }

    // --- 4. Preparing to save a file to disk (with Node.js)---
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 4.1. Generate a unique file name to avoid collisions
    const fileExtension = path.extname(file.name) || '.png';
    const uniqueFilename = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}${fileExtension}`;

    // 4.2. Path to the folder within the project
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    const filePath = path.join(uploadDir, uniqueFilename);

    // 4.3. Creating  public/uploads folder
    await mkdir(uploadDir, { recursive: true });

    // 4.4. writting the file
    await writeFile(filePath, buffer);

    // 4.5. Piblic URL(in browser))
    const imageUrl = `/uploads/${uniqueFilename}`;

    // --- 5. Updating bd via Drizzle ---
    await db
      .update(product)
      .set({
        image: imageUrl,
        updatedBy: session.user.id,
      })
      .where(eq(product.id, productId));

    // --- 6. Cache reset ---
    revalidatePath(`/product/${productId}`);

    return {
      success: true,
      message: 'Image uploaded successfully!',
    };
  } catch (error) {
    console.error('Error uploading image:', error);
    return {
      success: false,
      message: `Upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
    };
  }
}
