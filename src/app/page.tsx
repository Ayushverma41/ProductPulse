import {
  getProducts,
  getCategories,
  getRecommendedProducts,
} from '@/lib/data';
import PageHeader from '@/components/PageHeader';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

type HomeProps = {
  searchParams: {
    category?: string;
    limit?: string;
  };
};

export default async function Home({ searchParams }: HomeProps) {
  const { category, limit } = searchParams;
  const products = await getProducts();
  const categories = await getCategories();
  const recommendedProducts =
    category && limit
      ? await getRecommendedProducts(category, parseInt(limit, 10))
      : [];

  return (
    <div className="space-y-8">
      <PageHeader
        title="Product Recommendations"
        subtitle="Discover products tailored to your taste."
      />

      <Card>
        <CardHeader>
          <CardTitle>Category-based Recommendations</CardTitle>
          <CardDescription>
            Select a category to find top-rated products.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col sm:flex-row items-center gap-4">
            <div className="w-full sm:w-auto sm:flex-1">
              <Label htmlFor="category-select" className="sr-only">
                Category
              </Label>
              <Select name="category" defaultValue={category}>
                <SelectTrigger id="category-select">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-full sm:w-auto sm:flex-1">
              <Label htmlFor="limit-select" className="sr-only">
                Number of products
              </Label>
              <Select name="limit" defaultValue={limit ?? '5'}>
                <SelectTrigger id="limit-select">
                  <SelectValue placeholder="Number of products" />
                </SelectTrigger>
                <SelectContent>
                  {[...Array(10)].map((_, i) => (
                    <SelectItem key={i + 1} value={`${i + 1}`}>
                      {i + 1}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="w-full sm:w-auto">
              Recommend
            </Button>
          </form>
        </CardContent>
      </Card>

      {recommendedProducts.length > 0 && (
        <div>
          <h2 className="text-2xl font-headline font-bold mb-4">
            Top {limit} products in '{category}'
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {recommendedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}

      <div>
        <h2 className="text-2xl font-headline font-bold mb-4">
          All Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
