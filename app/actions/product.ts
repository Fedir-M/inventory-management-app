'use server';

import { db } from '@/db';
import { product } from '@/db/schema';
import { revalidatePath } from 'next/cache';
import { auth } from '../lib/auth';
import { headers } from 'next/headers';
import { productSchema } from '../lib/validations/productSchema';

// --- TActionResponse is our 'communication protocol' between server and client ---
export type TActionResponse = {
  success: boolean;
  message: string;
  errors?: Record<string, string>;
};

export async function addProduct(formData: FormData) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return {
        success: false,
        message: 'You must be logged in to add products',
      };
    }

    // Validation
    const validatedData = productSchema.safeParse(Object.fromEntries(formData));

    if (!validatedData.success) {
      // Converting errors of Zod into a plain object (RHF need it)
      const { fieldErrors } = validatedData.error.flatten();

      return {
        success: false,
        message: 'Check the form for errors',
        // transfer errors to fields
        errors: Object.fromEntries(
          Object.entries(fieldErrors).map(([key, val]) => [key, val?.[0]]),
        ),
      } as TActionResponse;
    }

    // --- INSERT INTO THE DATABASE ---
    await db.insert(product).values({
      ...validatedData.data,
      createdBy: session.user.id,
      updatedBy: session.user.id,
    });
    // ---/ INSERT INTO THE DATABASE /> ---

    revalidatePath('/dashboard');
    // revalidatePath('/add-product');
    return { success: true, message: 'Product added successfully !' };
  } catch (error) {
    console.error('Error of DB:', error);
    return {
      success: false,
      message: `Error: ${error instanceof Error ? error.message : 'Unknown errror'}`,
    };
  }
}
