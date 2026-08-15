import { Product } from './types';

// REAL QIKINK OPEN API CATALOG PRODUCTS ONLY (NO DEMO / FAKE PRODUCTS)
export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'qikink-64609138',
    title: 'Unisex Ringer T-Shirt',
    slug: 'unisex-ringer-t-shirt-64609138',
    category_slug: 'unisex',
    gender: 'unisex',
    price: 799,
    original_price: 1299,
    description: 'Qikink Product ID: 64609138. High-density 240 GSM organic cotton contrast ringer tee. 4 Colors, 24 Variants (Size XS - XXL). On-demand zero-inventory printing.',
    story: 'Clean retro sportswear silhouette meets modern luxury streetwear storytelling.',
    fabric_details: '100% Combed Organic Cotton • 240 GSM Contrast Ringer • Pre-Shrunk • Qikink Product ID 64609138',
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&q=80&w=1000',
    ],
    colors: [
      { name: 'Red / White Accent', hex: '#E54D42' },
      { name: 'Obsidian Black', hex: '#0A0A0C' },
      { name: 'Royal Blue / White', hex: '#2B6CB0' },
      { name: 'Pearl White', hex: '#FAFAFA' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    is_customizable: true,
    is_featured: true,
    rating: 4.95,
    review_count: 48
  },
  {
    id: 'qikink-63665902',
    title: 'GT Unisex Varsity Jacket',
    slug: 'gt-unisex-varsity-jacket-63665902',
    category_slug: 'unisex',
    gender: 'unisex',
    price: 1499,
    original_price: 2499,
    description: 'Qikink Product ID: 63665902. GujaratTitans Edition heavy fleece satin-lined varsity jacket. 6 Colors, 42 Variants (Size XS - 3XL).',
    story: 'Sovereignty on the street. Designed for high-density chest emblems and back statements.',
    fabric_details: 'Heavyweight Fleece Satin Lined • Premium Ribbed Cuffs • Snap Buttons • Qikink Product ID 63665902',
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80&w=1000',
    ],
    colors: [
      { name: 'Lavender Purple / White', hex: '#8B5CF6' },
      { name: 'Navy Blue / White', hex: '#1E3A8A' },
      { name: 'Obsidian Black', hex: '#0A0A0C' },
      { name: 'Emerald Green', hex: '#059669' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'],
    is_customizable: true,
    is_featured: true,
    rating: 4.98,
    review_count: 64
  },
  {
    id: 'qikink-63665896',
    title: 'DC Unisex Varsity Jacket',
    slug: 'dc-unisex-varsity-jacket-63665896',
    category_slug: 'unisex',
    gender: 'unisex',
    price: 1499,
    original_price: 2499,
    description: 'Qikink Product ID: 63665896. DelhiCapitals Edition atelier fleece varsity jacket. 6 Colors, 42 Variants (Size XS - 3XL).',
    story: 'Crafted in silence, speaks in thunder. Tailored for bespoke personalization.',
    fabric_details: 'Heavyweight Fleece Satin Lined • Custom Ribbing • Qikink Product ID 63665896',
    images: [
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=1000',
    ],
    colors: [
      { name: 'Royal Blue / White', hex: '#2563EB' },
      { name: 'Navy / White', hex: '#1E3A8A' },
      { name: 'Obsidian Black', hex: '#0A0A0C' },
      { name: 'Crimson Red', hex: '#DC2626' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'],
    is_customizable: true,
    is_featured: true,
    rating: 4.92,
    review_count: 39
  }
];

export const MOCK_TESTIMONIALS = [
  {
    id: 't-1',
    name: 'Devendra V.',
    role: 'Creative Director',
    text: 'The 240 GSM organic fabric quality is insane. Customizing my quote on the back felt like designing my own luxury brand line.',
    rating: 5,
    storyTag: 'Unapologetically Self-Made',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
  },
  {
    id: 't-2',
    name: 'Ananya S.',
    role: 'Product Designer',
    text: 'Zero inventory on-demand printing done right. Ordered the Unisex Ringer Tee with my emblem and it arrived in 4 days.',
    rating: 5,
    storyTag: 'Wear Your Legacy',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200',
  },
  {
    id: 't-3',
    name: 'Rohan K.',
    role: 'Founder',
    text: 'Wear Your Story is not just a slogan. The 2D Bespoke Studio makes high-density custom streetwear effortless.',
    rating: 5,
    storyTag: 'Code & Canvas',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200',
  }
];
