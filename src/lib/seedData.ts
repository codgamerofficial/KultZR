import { Product, ProductOffer, PriceHistoryPoint } from './types';

export const SEED_CATEGORIES = [
  'smartphones',
  'laptops',
  'earbuds',
  'televisions',
  'gaming',
  'home-appliances',
  'shoes',
  'fashion',
  'cameras',
  'accessories',
];

export const SEED_BRANDS = [
  'Apple', 'Samsung', 'Sony', 'Dell', 'Lenovo', 'Asus', 'iQOO', 'OnePlus', 'Xiaomi', 'Realme',
  'Nike', 'Adidas', 'Puma', 'Bose', 'Sennheiser', 'LG', 'Panasonic', 'Canon', 'Nikon', 'HP'
];

export function generateSeedCatalog(): {
  categories: string[];
  brands: string[];
  productCount: number;
  variantCount: number;
  offerCount: number;
  observationCount: number;
} {
  return {
    categories: SEED_CATEGORIES,
    brands: SEED_BRANDS,
    productCount: 100,
    variantCount: 250,
    offerCount: 300,
    observationCount: 1000,
  };
}
