import { createClient } from '@supabase/supabase-js';
import { MOCK_PRODUCTS } from './mockData';
import { Product } from './types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

export const isSupabaseConfigured = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL && 
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder')
);

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function fetchProducts(category?: string, querySearch?: string): Promise<Product[]> {
  if (!isSupabaseConfigured) {
    let filtered = [...MOCK_PRODUCTS];
    if (category && category !== 'all') {
      filtered = filtered.filter(p => p.category_slug === category || p.gender === category);
    }
    if (querySearch) {
      const q = querySearch.toLowerCase();
      filtered = filtered.filter(p => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }
    return filtered;
  }

  try {
    let query = supabase.from('products').select('*');
    if (category && category !== 'all') {
      query = query.eq('category_slug', category);
    }
    if (querySearch) {
      query = query.ilike('title', `%${querySearch}%`);
    }
    const { data, error } = await query;
    if (error || !data || data.length === 0) {
      return MOCK_PRODUCTS;
    }
    return data as Product[];
  } catch (err) {
    console.warn('Supabase fetch failed, utilizing mock data fallback:', err);
    return MOCK_PRODUCTS;
  }
}

export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  if (!isSupabaseConfigured) {
    return MOCK_PRODUCTS.find(p => p.slug === slug) || MOCK_PRODUCTS[0];
  }

  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('slug', slug)
      .single();
    
    if (error || !data) {
      return MOCK_PRODUCTS.find(p => p.slug === slug) || MOCK_PRODUCTS[0];
    }
    return data as Product;
  } catch {
    return MOCK_PRODUCTS.find(p => p.slug === slug) || MOCK_PRODUCTS[0];
  }
}
