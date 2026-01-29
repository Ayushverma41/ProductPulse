'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import StarRating from './StarRating';
import { useCurrency } from '@/context/CurrencyContext';

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const { formatPrice } = useCurrency();
  const placeholder = PlaceHolderImages.find((img) => img.id === product.image);
  const imageUrl = placeholder?.imageUrl ?? 'https://placehold.co/600x400';
  const imageHint = placeholder?.imageHint ?? 'product image';

  return (
    <Link href={`/products/${product.id}`} className="group">
      <Card className="h-full overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1">
        <CardHeader className="p-0">
          <div className="aspect-[3/2] overflow-hidden">
            <Image
              src={imageUrl}
              alt={product.name}
              width={600}
              height={400}
              className="object-cover w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-105"
              data-ai-hint={imageHint}
            />
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <Badge variant="secondary" className="mb-2">
            {product.category}
          </Badge>
          <CardTitle className="text-lg font-headline mb-2 leading-tight">
            {product.name}
          </CardTitle>
          <div className="flex justify-between items-center">
            <p className="text-lg font-semibold text-primary">
              {formatPrice(product.price)}
            </p>
            <StarRating rating={product.rating} />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;
