import { getProductById } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import PageHeader from '@/components/PageHeader';
import { Badge } from '@/components/ui/badge';
import StarRating from '@/components/StarRating';
import { knnProductRecommendations } from '@/ai/flows/knn-product-recommendations';
import { getComplementaryProducts } from '@/ai/flows/complementary-products';
import ProductCard from '@/components/ProductCard';
import type { Product } from '@/lib/types';
import DisplayPrice from '@/components/DisplayPrice';

type ProductDetailPageProps = {
  params: {
    id: string;
  };
};

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const product = await getProductById(params.id);

  if (!product) {
    notFound();
  }

  const [similarProducts, complementaryProducts] = await Promise.all([
    knnProductRecommendations({ productId: product.id }),
    getComplementaryProducts({
      productId: product.id,
      productCategory: product.category,
    }),
  ]);

  const placeholder = PlaceHolderImages.find((img) => img.id === product.image);
  const imageUrl = placeholder?.imageUrl ?? 'https://placehold.co/600x400';
  const imageHint = placeholder?.imageHint ?? 'product image';

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <div className="aspect-video overflow-hidden rounded-lg shadow-lg">
          <Image
            src={imageUrl}
            alt={product.name}
            width={1200}
            height={800}
            className="object-cover w-full h-full"
            data-ai-hint={imageHint}
          />
        </div>
        <div className="flex flex-col justify-center">
          <PageHeader title={product.name} />
          <Badge variant="secondary" className="w-fit mb-4">
            {product.category}
          </Badge>
          <div className="flex items-center gap-4 mb-4">
            <StarRating rating={product.rating} />
            <span className="text-sm text-muted-foreground">
              ({product.usersPurchased} purchased)
            </span>
          </div>
          <p className="text-3xl font-bold text-primary mb-6">
            <DisplayPrice price={product.price} />
          </p>
          <p className="text-muted-foreground leading-relaxed">
            {product.description}
          </p>
        </div>
      </div>

      {similarProducts.length > 0 && (
        <div>
          <h2 className="text-2xl font-headline font-bold mb-4">
            Similar Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {similarProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}

      {complementaryProducts.length > 0 && (
        <div>
          <h2 className="text-2xl font-headline font-bold mb-4">
            Complementary Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {complementaryProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
