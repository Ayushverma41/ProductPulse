'use server';

/**
 * @fileOverview Flow for recommending complementary products based on the category of the viewed product.
 *
 * - `getComplementaryProducts`:  A function that returns a list of complementary product recommendations.
 * - `ComplementaryProductsInput`: The input type for the getComplementaryProducts function.
 * - `ComplementaryProductsOutput`: The return type for the getComplementaryProducts function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ComplementaryProductsInputSchema = z.object({
  productId: z.string().describe('The ID of the product for which to find complementary products.'),
  productCategory: z.string().describe('The category of the product.'),
});
export type ComplementaryProductsInput = z.infer<typeof ComplementaryProductsInputSchema>;

const ComplementaryProductsOutputSchema = z.array(
  z.object({
    Product_ID: z.string().describe('The ID of the complementary product.'),
    Category: z.string().describe('The category of the complementary product.'),
    Rating: z.number().describe('The rating of the complementary product.'),
    Users_Purchased: z.number().describe('The number of users who purchased the complementary product.'),
    Price: z.number().describe('The price of the complementary product.'),
  })
);
export type ComplementaryProductsOutput = z.infer<typeof ComplementaryProductsOutputSchema>;

export async function getComplementaryProducts(input: ComplementaryProductsInput): Promise<ComplementaryProductsOutput> {
  return complementaryProductsFlow(input);
}

const complementaryProductsPrompt = ai.definePrompt({
  name: 'complementaryProductsPrompt',
  input: {schema: ComplementaryProductsInputSchema},
  output: {schema: ComplementaryProductsOutputSchema},
  prompt: `Given the product category "{{{productCategory}}}", suggest a list of products that are frequently bought together with items in this category.

Ensure that each product in the list includes the following information:
- Product ID
- Category
- Rating
- Number of Users Purchased
- Price

Respond in a JSON format.
`,
});

const complementaryProductsFlow = ai.defineFlow(
  {
    name: 'complementaryProductsFlow',
    inputSchema: ComplementaryProductsInputSchema,
    outputSchema: ComplementaryProductsOutputSchema,
  },
  async input => {
    const {output} = await complementaryProductsPrompt(input);
    return output!;
  }
);
