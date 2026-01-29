'use server';
/**
 * @fileOverview KNN product recommendations flow.
 *
 * - knnProductRecommendations - A function that recommends similar products based on k-nearest neighbors.
 * - KNNProductRecommendationsInput - The input type for the knnProductRecommendations function.
 */

import { z } from 'zod';
import { getProducts } from '@/lib/data';
import type { Product } from '@/lib/types';

const KNNProductRecommendationsInputSchema = z.object({
  productId: z.string().describe('The ID of the product to find recommendations for.'),
});

export type KNNProductRecommendationsInput = z.infer<typeof KNNProductRecommendationsInputSchema>;

export async function knnProductRecommendations(input: KNNProductRecommendationsInput): Promise<Product[]> {
    const products = await getProducts();

    if (!products || products.length === 0) {
      console.warn('No products available.');
      return [];
    }

    const currentProduct = products.find(p => p.id === input.productId);

    if (!currentProduct) {
      console.warn(`Product with ID ${input.productId} not found.`);
      return [];
    }

    // Filter products in the same category, excluding the current product.
    const sameCategoryProducts = products.filter(
      p => p.category === currentProduct.category && p.id !== input.productId
    );

    if (sameCategoryProducts.length === 0) {
      console.warn(`No other products found in the same category (${currentProduct.category}).`);
      return [];
    }

    // Simple sorting logic based on a combination of rating, usersPurchased, and price.
    const recommendedProducts = sameCategoryProducts.sort((a, b) => {
      const scoreA = a.rating * 0.6 + a.usersPurchased * 0.3 - a.price * 0.1;
      const scoreB = b.rating * 0.6 + b.usersPurchased * 0.3 - b.price * 0.1;
      return scoreB - scoreA; // Sort in descending order of the combined score.
    }).slice(0, 5); // Return top 5 recommendations.

    return recommendedProducts;
}
