import { createClient } from '@supabase/supabase-js';
import { Product } from './types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

export const isSupabaseConfigured = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder')
);

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Customer-facing product reads are always backed by the real catalog.
 * Never return mock products when the database is unavailable or empty.
 */
export async function fetchProducts(category?: string, querySearch?: string): Promise<Product[]> {
  if (!isSupabaseConfigured) {
    return [];
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

    if (error) {
      console.warn('Supabase product fetch failed:', error.message);
      return [];
    }

    return (data || []) as Product[];
  } catch (err) {
    console.warn('Supabase product fetch failed:', err);
    return [];
  }
}

export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  if (!isSupabaseConfigured) {
    return null;
  }

  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error || !data) {
      return null;
    }

    return data as Product;
  } catch (err) {
    console.warn('Supabase product fetch failed:', err);
    return null;
  }
}
