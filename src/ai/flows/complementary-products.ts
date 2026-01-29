'use server';

/**
 * @fileOverview Flow for recommending complementary products based on the category of the viewed product.
 *
 * - `getComplementaryProducts`:  A function that returns a list of complementary product recommendations.
 * - `ComplementaryProductsInput`: The input type for the getComplementaryProducts function.
 */

import { z } from 'zod';
import { getProducts } from '@/lib/data';
import type { Product } from '@/lib/types';

const ComplementaryProductsInputSchema = z.object({
  productId: z.string().describe('The ID of the product for which to find complementary products.'),
  productCategory: z.string().describe('The category of the product.'),
});
export type ComplementaryProductsInput = z.infer<typeof ComplementaryProductsInputSchema>;

export async function getComplementaryProducts(input: ComplementaryProductsInput): Promise<Product[]> {
  const allProducts = await getProducts();
  // Recommend top 4 products from other categories
  const complementary = allProducts
    .filter(p => p.category !== input.productCategory)
    .sort((a, b) => b.usersPurchased - a.usersPurchased)
    .slice(0, 4);

  return complementary;
}
