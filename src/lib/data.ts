import type { Product } from './types';

let products: Product[] = [
  {
    id: 'P0001',
    name: 'Azure Glide Runners',
    category: 'Shoes',
    rating: 4.5,
    usersPurchased: 150,
    price: 79.99,
    description:
      'Lightweight and comfortable running shoes, perfect for daily training and marathons. Features breathable mesh and responsive cushioning.',
    image: 'P0001',
  },
  {
    id: 'P0002',
    name: 'Executive Loafers',
    category: 'Shoes',
    rating: 4.8,
    usersPurchased: 250,
    price: 129.99,
    description:
      'Classic leather loafers for a sharp, professional look. Hand-stitched with premium materials for durability and comfort.',
    image: 'P0002',
  },
  {
    id: 'P0003',
    name: 'Chrono-Tourbillon Watch',
    category: 'Watches',
    rating: 4.9,
    usersPurchased: 80,
    price: 499.0,
    description:
      'A masterpiece of horology, this watch features a complex tourbillon movement and a sleek, modern design.',
    image: 'P0003',
  },
  {
    id: 'P0004',
    name: 'Stealth Digital Watch',
    category: 'Watches',
    rating: 4.3,
    usersPurchased: 300,
    price: 89.99,
    description:
      'A rugged and reliable digital watch with multiple functions, including a stopwatch, alarm, and water resistance up to 100m.',
    image: 'P0004',
  },
  {
    id: 'P0005',
    name: 'Explorer Backpack',
    category: 'Bags',
    rating: 4.7,
    usersPurchased: 180,
    price: 69.99,
    description:
      'A versatile and durable backpack with multiple compartments, perfect for hiking, travel, or daily commute.',
    image: 'P0005',
  },
  {
    id: 'P0006',
    name: 'Vogue Satchel',
    category: 'Bags',
    rating: 4.6,
    usersPurchased: 120,
    price: 149.99,
    description:
      'An elegant and spacious leather satchel, combining style and functionality for the modern woman.',
    image: 'P0006',
  },
  {
    id: 'P0007',
    name: 'Galaxy Orbiter X',
    category: 'Smartphones',
    rating: 4.8,
    usersPurchased: 500,
    price: 999.99,
    description:
      'The latest in smartphone technology, featuring a stunning edge-to-edge display, pro-grade camera system, and all-day battery life.',
    image: 'P0007',
  },
  {
    id: 'P0008',
    name: 'Nova Lite',
    category: 'Smartphones',
    rating: 4.4,
    usersPurchased: 800,
    price: 399.99,
    description:
      'A powerful and affordable smartphone that delivers a smooth experience, great camera quality, and a large, vibrant display.',
    image: 'P0008',
  },
  {
    id: 'P0009',
    name: 'Solaris Aviators',
    category: 'Sunglasses',
    rating: 4.6,
    usersPurchased: 450,
    price: 159.99,
    description:
      'Timeless aviator sunglasses with polarized lenses that provide 100% UV protection and reduce glare for crystal-clear vision.',
    image: 'P0009',
  },
  {
    id: 'P0010',
    name: 'The Minimalist Wallet',
    category: 'Men Wallet',
    rating: 4.9,
    usersPurchased: 600,
    price: 49.99,
    description:
      'A slim and stylish leather wallet with RFID protection, designed to hold your essentials without the bulk.',
    image: 'P0010',
  },
  {
    id: 'P0011',
    name: 'Aura Pods Pro',
    category: 'Earbuds',
    rating: 4.7,
    usersPurchased: 1200,
    price: 249.0,
    description:
      'Immerse yourself in sound with active noise cancellation, transparency mode, and a customizable fit for all-day comfort.',
    image: 'P0011',
  },
  {
    id: 'P0012',
    name: 'Summit Hiking Boots',
    category: 'Shoes',
    rating: 4.7,
    usersPurchased: 220,
    price: 189.99,
    description:
      'Waterproof and breathable hiking boots designed for the toughest trails. Provides excellent traction and ankle support.',
    image: 'P0012',
  },
];

const generateProductId = (existingIds: string[]) => {
  if (!existingIds.length) {
    return 'P0001';
  }
  const lastId = Math.max(...existingIds.map((id) => parseInt(id.substring(1), 10)));
  return `P${(lastId + 1).toString().padStart(4, '0')}`;
};

export async function getProducts(): Promise<Product[]> {
  return products;
}

export async function getProductById(id: string): Promise<Product | undefined> {
  return products.find((p) => p.id === id);
}

export async function getCategories(): Promise<string[]> {
  const categories = new Set(products.map((p) => p.category));
  return Array.from(categories);
}

export async function addProduct(productData: Omit<Product, 'id' | 'image'>): Promise<Product> {
  const newId = generateProductId(products.map((p) => p.id));
  const newProduct: Product = {
    id: newId,
    ...productData,
    image: newId, // Use ID for placeholder image seed
  };
  products.push(newProduct);
  return newProduct;
}

export async function deleteProduct(id: string): Promise<void> {
  products = products.filter((p) => p.id !== id);
}

export async function getRecommendedProducts(category: string, topN: number): Promise<Product[]> {
  return products
    .filter((p) => p.category === category)
    .sort((a, b) => {
      if (b.usersPurchased !== a.usersPurchased) {
        return b.usersPurchased - a.usersPurchased;
      }
      return b.rating - a.rating;
    })
    .slice(0, topN);
}
