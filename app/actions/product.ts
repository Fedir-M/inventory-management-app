'use server';

import { db } from '@/db';
import { product } from '@/db/schema';
import { revalidatePath } from 'next/cache';
import { auth } from '../lib/auth';
import { headers } from 'next/headers';

export type TActionResponse = {
  success: boolean;
  message: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function addProduct(prevState: any, formData: FormData) {
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

    const name = formData.get('name') as string;
    const sku = formData.get('sku') as string;
    const price = parseFloat(formData.get('price') as string);
    const quantity = parseInt(formData.get('quantity') as string);
    const lowStockRaw = formData.get('lowStock') as string;
    // Если строка пустая, превращаем её в null или undefined для базы данных
    const lowStock = lowStockRaw ? parseInt(lowStockRaw) : null;

    const category = formData.get('category') as string;
    const description = formData.get('description') as string;

    // В Drizzle мы передаем объект с полями прямо сюда:
    await db.insert(product).values({
      name,
      sku,
      price,
      quantity,
      lowStock: lowStock,
      category,
      description,
      createdBy: session.user.id,
      updatedBy: session.user.id,
    });

    revalidatePath('/dashboard');
    return { success: true, message: 'Product added successfully !' };
  } catch (error) {
    // реальная ошибка
    console.error('Ошибка базы данных:', error);
    return {
      success: false,
      message: `Ошибка: ${error instanceof Error ? error.message : 'Неизвестная ошибка'}`,
    };
  }
}
