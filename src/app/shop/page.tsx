'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { fetchProducts } from '@/lib/supabase';
import { Product } from '@/lib/types';
import ProductCard from '@/components/ProductCard';
import { Search, SlidersHorizontal, Sparkles, X } from 'lucide-react';

const GENDERS = ['All', 'Men', 'Women', 'Unisex'];
const CATEGORIES = ['All', 'T-Shirts', 'Oversized', 'Hoodies', 'Jackets', 'Shirts', 'Accessories'];
const SIZES = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'];
const PRICE_RANGES = [
  { label: 'All prices', min: 0, max: Infinity },
  { label: 'Under ₹500', min: 0, max: 500 },
  { label: '₹500 – ₹999', min: 500, max: 999 },
  { label: '₹1,000 – ₹1,499', min: 1000, max: 1499 },
  { label: '₹1,500+', min: 1500, max: Infinity },
];
const SORT_OPTIONS = [
  { label: 'Featured', value: 'featured' },
  { label: 'Newest', value: 'newest' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
];

function normalize(value: unknown) {
  return String(value ?? '').trim().toLowerCase();
}

function matchesCategory(product: Product, selected: string) {
  if (selected === 'All') return true;
  const category = normalize(product.category_slug);
  const title = normalize(product.title);
  const map: Record<string, string[]> = {
    'T-Shirts': ['t-shirt', 'tshirt', 'tee'],
    Oversized: ['oversized'],
    Hoodies: ['hoodie', 'sweatshirt'],
    Jackets: ['jacket', 'outerwear'],
    Shirts: ['shirt'],
    Accessories: ['accessor'],
  };
  return (map[selected] || [normalize(selected)]).some(token => category.includes(token) || title.includes(token));
}

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedGender, setSelectedGender] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSize, setSelectedSize] = useState('All');
  const [selectedPriceRange, setSelectedPriceRange] = useState(PRICE_RANGES[0]);
  const [selectedSort, setSelectedSort] = useState('featured');
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  async function loadProducts() {
    setLoading(true);
    setError(false);
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch {
      setProducts([]);
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    const filtered = products.filter(product => {
      const q = normalize(searchQuery);
      const searchable = [product.title, product.description, product.category_slug, product.gender].map(normalize).join(' ');

      if (q && !searchable.includes(q)) return false;
      if (selectedGender !== 'All' && normalize(product.gender) !== normalize(selectedGender)) return false;
      if (!matchesCategory(product, selectedCategory)) return false;
      if (selectedSize !== 'All' && !product.sizes?.includes(selectedSize)) return false;
      if (product.price < selectedPriceRange.min || product.price > selectedPriceRange.max) return false;

      return true;
    });

    return filtered.sort((a, b) => {
      if (selectedSort === 'price_asc') return a.price - b.price;
      if (selectedSort === 'price_desc') return b.price - a.price;
      if (selectedSort === 'newest') return Number(b.is_featured) - Number(a.is_featured);
      return Number(b.is_featured) - Number(a.is_featured);
    });
  }, [products, searchQuery, selectedGender, selectedCategory, selectedSize, selectedPriceRange, selectedSort]);

  const resetFilters = () => {
    setSelectedGender('All');
    setSelectedCategory('All');
    setSelectedSize('All');
    setSelectedPriceRange(PRICE_RANGES[0]);
    setSearchQuery('');
  };

  const hasFilters = selectedGender !== 'All' || selectedCategory !== 'All' || selectedSize !== 'All' || selectedPriceRange.label !== 'All prices' || searchQuery.length > 0;

  return (
    <div className="min-h-screen bg-brand-dark text-brand-pearl px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-20">
      <div className="max-w-7xl mx-auto">
        <header className="border-b border-brand-border pb-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <p className="text-[11px] uppercase tracking-[0.25em] font-bold text-brand-gold">KultZR / Shop</p>
              <h1 className="mt-2 text-4xl sm:text-5xl font-black tracking-tight">NEW DROPS.</h1>
              <p className="mt-3 max-w-xl text-sm leading-6 text-brand-muted">Discover the current KultZR catalog. Every product shown here comes from the live store catalog.</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <div className="relative w-full sm:w-72">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted" />
                <input
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  aria-label="Search products"
                  className="w-full h-11 rounded-full border border-brand-border bg-brand-card pl-11 pr-10 text-sm outline-none focus:border-brand-gold"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} aria-label="Clear search" className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-brand-muted hover:text-brand-pearl">
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              <select
                value={selectedSort}
                onChange={e => setSelectedSort(e.target.value)}
                aria-label="Sort products"
                className="h-11 rounded-full border border-brand-border bg-brand-card px-4 text-sm outline-none focus:border-brand-gold"
              >
                {SORT_OPTIONS.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
              </select>
              <button onClick={() => setMobileFiltersOpen(true)} className="lg:hidden h-11 px-5 rounded-full border border-brand-border bg-brand-card text-sm font-semibold flex items-center justify-center gap-2">
                <SlidersHorizontal className="w-4 h-4" /> Filters
              </button>
            </div>
          </div>

          <div className="mt-7 flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {GENDERS.map(gender => (
              <button
                key={gender}
                onClick={() => setSelectedGender(gender)}
                className={`shrink-0 px-5 py-2.5 rounded-full text-xs font-bold transition-colors ${selectedGender === gender ? 'bg-brand-gold text-brand-dark' : 'border border-brand-border text-brand-muted hover:text-brand-pearl hover:border-brand-gold/60'}`}
              >
                {gender}
              </button>
            ))}
          </div>
        </header>

        <div className="grid lg:grid-cols-[240px_minmax(0,1fr)] gap-8 pt-8">
          <aside className={`${mobileFiltersOpen ? 'fixed inset-0 z-50 flex' : 'hidden'} lg:flex lg:static lg:z-auto`}>
            <div className={`${mobileFiltersOpen ? 'fixed inset-0 bg-black/70' : 'hidden'} lg:hidden`} onClick={() => setMobileFiltersOpen(false)} />
            <div className="relative z-10 w-full max-w-sm lg:max-w-none h-fit lg:sticky lg:top-28 bg-brand-card border border-brand-border rounded-3xl p-5">
              <div className="flex items-center justify-between pb-4 border-b border-brand-border">
                <h2 className="text-sm font-black uppercase tracking-wider flex items-center gap-2"><SlidersHorizontal className="w-4 h-4 text-brand-gold" /> Filters</h2>
                <button className="lg:hidden" onClick={() => setMobileFiltersOpen(false)} aria-label="Close filters"><X className="w-5 h-5" /></button>
              </div>

              <div className="py-5 border-b border-brand-border">
                <p className="text-[11px] uppercase tracking-widest font-bold text-brand-muted mb-3">Category</p>
                <div className="space-y-1">
                  {CATEGORIES.map(category => (
                    <button key={category} onClick={() => setSelectedCategory(category)} className={`w-full text-left px-3 py-2 rounded-xl text-sm ${selectedCategory === category ? 'bg-brand-gold/10 text-brand-gold font-bold' : 'text-brand-muted hover:text-brand-pearl'}`}>{category}</button>
                  ))}
                </div>
              </div>

              <div className="py-5 border-b border-brand-border">
                <p className="text-[11px] uppercase tracking-widest font-bold text-brand-muted mb-3">Size</p>
                <div className="flex flex-wrap gap-2">
                  {['All', ...SIZES].map(size => (
                    <button key={size} onClick={() => setSelectedSize(size)} className={`min-w-10 h-9 px-2 rounded-lg border text-xs font-bold ${selectedSize === size ? 'bg-brand-gold border-brand-gold text-brand-dark' : 'border-brand-border text-brand-muted hover:text-brand-pearl'}`}>{size}</button>
                  ))}
                </div>
              </div>

              <div className="py-5">
                <p className="text-[11px] uppercase tracking-widest font-bold text-brand-muted mb-3">Price</p>
                <div className="space-y-1">
                  {PRICE_RANGES.map(range => (
                    <button key={range.label} onClick={() => setSelectedPriceRange(range)} className={`w-full text-left px-3 py-2 rounded-xl text-sm ${selectedPriceRange.label === range.label ? 'bg-brand-gold/10 text-brand-gold font-bold' : 'text-brand-muted hover:text-brand-pearl'}`}>{range.label}</button>
                  ))}
                </div>
              </div>

              {hasFilters && <button onClick={resetFilters} className="w-full h-10 rounded-full border border-brand-border text-xs font-bold hover:border-brand-gold hover:text-brand-gold">Reset filters</button>}
              <button onClick={() => setMobileFiltersOpen(false)} className="lg:hidden w-full mt-3 h-10 rounded-full bg-brand-gold text-brand-dark text-xs font-bold">Apply filters</button>
            </div>
          </aside>

          <main className="min-w-0">
            <div className="flex items-center justify-between mb-5">
              <p className="text-sm text-brand-muted"><span className="text-brand-pearl font-bold">{filteredProducts.length}</span> products</p>
            </div>

            {loading ? (
              <div className="grid grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                {Array.from({ length: 6 }).map((_, index) => <div key={index} className="rounded-3xl overflow-hidden border border-brand-border bg-brand-card animate-pulse"><div className="aspect-square bg-brand-charcoal" /><div className="p-5 space-y-3"><div className="h-3 w-20 bg-brand-charcoal rounded" /><div className="h-5 w-3/4 bg-brand-charcoal rounded" /><div className="h-4 w-1/3 bg-brand-charcoal rounded" /></div></div>)}
              </div>
            ) : error ? (
              <div className="rounded-3xl border border-brand-border bg-brand-card p-10 text-center">
                <Sparkles className="mx-auto w-8 h-8 text-brand-gold mb-4" />
                <h2 className="text-xl font-black">THE DROP IS TEMPORARILY UNAVAILABLE.</h2>
                <p className="mt-2 text-sm text-brand-muted">We could not load the live catalog. Please try again.</p>
                <button onClick={() => void loadProducts()} className="mt-6 px-5 py-2.5 rounded-full bg-brand-gold text-brand-dark text-sm font-bold">Retry</button>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="rounded-3xl border border-brand-border bg-brand-card p-10 sm:p-16 text-center">
                <Sparkles className="mx-auto w-8 h-8 text-brand-gold mb-4" />
                <h2 className="text-xl sm:text-2xl font-black">{products.length === 0 ? 'THE NEXT DROP IS STAGING.' : 'NO MATCHES.'}</h2>
                <p className="mt-2 max-w-md mx-auto text-sm text-brand-muted">{products.length === 0 ? 'The live KultZR catalog is currently empty. New pieces will appear here automatically once published.' : 'Try another search or clear your filters.'}</p>
                {products.length === 0 ? <Link href="/story" className="inline-flex mt-6 px-5 py-2.5 rounded-full bg-brand-gold text-brand-dark text-sm font-bold">Explore Our Story</Link> : <button onClick={resetFilters} className="mt-6 px-5 py-2.5 rounded-full bg-brand-gold text-brand-dark text-sm font-bold">Clear filters</button>}
              </div>
            ) : (
              <div className="grid grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                {filteredProducts.map(product => <ProductCard key={product.id} product={product} />)}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
