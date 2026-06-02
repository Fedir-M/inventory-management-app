'use server';

import { db } from '@/db';
import { product } from '@/db/schema';
import { revalidatePath } from 'next/cache';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function addProduct(prevState: any, formData: FormData) {
  try {
    const name = formData.get('name') as string;
    const sku = formData.get('sku') as string;
    const price = parseFloat(formData.get('price') as string);
    const quantity = parseInt(formData.get('quantity') as string);
    const lowStockRaw = formData.get('lowStock') as string;
    // Если строка пустая, превращаем её в null или undefined для базы данных
    const lowStock = lowStockRaw ? parseInt(lowStockRaw) : null;

    // В Drizzle мы передаем объект с полями прямо сюда:
    await db.insert(product).values({
      name,
      sku,
      price,
      quantity,
      lowStock: lowStock, // <--- Вот здесь оно должно быть!
    });

    revalidatePath('/dashboard');
    return { success: true, message: 'Product added successfully !' };
  } catch (error) {
    // Выводим реальную ошибку в терминал
    console.error('Ошибка базы данных:', error);
    return {
      success: false,
      message: `Ошибка: ${error instanceof Error ? error.message : 'Неизвестная ошибка'}`,
    };
  }
}
