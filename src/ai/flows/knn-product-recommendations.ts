'use server';
/**
 * @fileOverview KNN product recommendations flow.
 *
 * - knnProductRecommendations - A function that recommends similar products based on k-nearest neighbors.
 * - KNNProductRecommendationsInput - The input type for the knnProductRecommendations function.
 * - KNNProductRecommendationsOutput - The return type for the knnProductRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const KNNProductRecommendationsInputSchema = z.object({
  productId: z.string().describe('The ID of the product to find recommendations for.'),
});

export type KNNProductRecommendationsInput = z.infer<typeof KNNProductRecommendationsInputSchema>;

const KNNProductRecommendationsOutputSchema = z.array(
  z.object({
    productId: z.string().describe('The ID of the recommended product.'),
    category: z.string().describe('The category of the recommended product.'),
    rating: z.number().describe('The rating of the recommended product.'),
    usersPurchased: z.number().describe('The number of users who purchased the recommended product.'),
    price: z.number().describe('The price of the recommended product.'),
  })
);

export type KNNProductRecommendationsOutput = z.infer<typeof KNNProductRecommendationsOutputSchema>;

export async function knnProductRecommendations(input: KNNProductRecommendationsInput): Promise<KNNProductRecommendationsOutput> {
  return knnProductRecommendationsFlow(input);
}

const knnProductRecommendationsFlow = ai.defineFlow(
  {
    name: 'knnProductRecommendationsFlow',
    inputSchema: KNNProductRecommendationsInputSchema,
    outputSchema: KNNProductRecommendationsOutputSchema,
  },
  async input => {
    // Assume products data is stored externally, and create a tool to fetch it.
    const getProductsData = ai.defineTool({
      name: 'getProductsData',
      description: 'Retrieves product data from a data source.',
      inputSchema: z.void(),
      outputSchema: z.array(z.object({
        productId: z.string(),
        category: z.string(),
        rating: z.number(),
        usersPurchased: z.number(),
        price: z.number()
      })),
    }, async () => {
      // TODO: Replace with actual data fetching logic from your data source (e.g., database).
      // This is just placeholder data.
      return [
        {
          productId: 'P0001',
          category: 'Shoes',
          rating: 4.5,
          usersPurchased: 100,
          price: 79.99,
        },
        {
          productId: 'P0002',
          category: 'Shoes',
          rating: 3.8,
          usersPurchased: 50,
          price: 59.99,
        },
        {
          productId: 'P0003',
          category: 'Watches',
          rating: 4.2,
          usersPurchased: 75,
          price: 149.00,
        },
        {
          productId: 'P0004',
          category: 'Shoes',
          rating: 4.9,
          usersPurchased: 120,
          price: 89.99,
        },
        {
          productId: 'P0005',
          category: 'Watches',
          rating: 4.0,
          usersPurchased: 60,
          price: 129.00,
        },
      ];
    });

    const products = await getProductsData();

    if (!products || products.length === 0) {
      console.warn('No products available.');
      return [];
    }

    const currentProduct = products.find(p => p.productId === input.productId);

    if (!currentProduct) {
      console.warn(`Product with ID ${input.productId} not found.`);
      return [];
    }

    // Filter products in the same category, excluding the current product.
    const sameCategoryProducts = products.filter(
      p => p.category === currentProduct.category && p.productId !== input.productId
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

    // Map the product data to the output schema.
    return recommendedProducts.map(product => ({
      productId: product.productId,
      category: product.category,
      rating: product.rating,
      usersPurchased: product.usersPurchased,
      price: product.price,
    }));
  }
);
