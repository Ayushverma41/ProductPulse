'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { addProduct, deleteProduct } from './data';

const productSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters.'),
  category: z.string(),
  rating: z.coerce.number().min(1).max(5),
  usersPurchased: z.coerce.number().min(0),
  price: z.coerce.number().min(0),
  description: z.string().min(10, 'Description must be at least 10 characters.'),
});

export async function addProductAction(
  prevState: any,
  formData: FormData
) {
  const validatedFields = productSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    await addProduct(validatedFields.data);
    revalidatePath('/manage');
    return { success: true, message: 'Product added successfully.' };
  } catch (error) {
    return { success: false, message: 'Failed to add product.' };
  }
}

export async function deleteProductAction(formData: FormData) {
  const id = formData.get('productId') as string;
  if (id) {
    try {
      await deleteProduct(id);
      revalidatePath('/manage');
    } catch (error) {
      console.error('Failed to delete product:', error);
      // In a real app, you'd want to return an error state to the UI
    }
  }
}
