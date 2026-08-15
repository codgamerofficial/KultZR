'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MOCK_PRODUCTS } from '@/lib/mockData';
import { Product } from '@/lib/types';
import { Sparkles, SlidersHorizontal, Search, ShieldCheck, Check } from 'lucide-react';

const GENDERS = ['All', 'Men', 'Women', 'Unisex'];
const CATEGORIES = ['All Categories', 'T-Shirts', 'Oversized', 'Hoodies', 'Jackets', 'Shirts', 'Accessories'];
const COLLECTIONS = ['All Collections', 'New Drops', 'Trending', 'KultZR Essentials', 'Limited Edition', 'Street Culture', 'Minimal'];
const SIZES = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'];
const PRICE_RANGES = [
  { label: 'All Prices', min: 0, max: Infinity },
  { label: 'Under ₹500', min: 0, max: 500 },
  { label: '₹500 – ₹999', min: 500, max: 999 },
  { label: '₹1,000 – ₹1,499', min: 1000, max: 1499 },
  { label: '₹1,500+', min: 1500, max: Infinity },
];
const SORT_OPTIONS = [
  { label: 'Featured', value: 'featured' },
  { label: 'Newest Drops', value: 'newest' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
  { label: 'Trending', value: 'trending' },
];

export default function ShopPage() {
  const [selectedGender, setSelectedGender] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedCollection, setSelectedCollection] = useState('All Collections');
  const [selectedSize, setSelectedSize] = useState('All');
  const [selectedPriceRange, setSelectedPriceRange] = useState(PRICE_RANGES[0]);
  const [selectedSort, setSelectedSort] = useState('featured');
  const [searchQuery, setSearchQuery] = useState('');

  // Dynamic Filtering Logic
  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter(product => {
      // Search query
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matches = product.title.toLowerCase().includes(q) || 
                        product.description.toLowerCase().includes(q) ||
                        product.category_slug.toLowerCase().includes(q);
        if (!matches) return false;
      }

      // Gender filter
      if (selectedGender !== 'All' && product.gender.toLowerCase() !== selectedGender.toLowerCase()) {
        return false;
      }

      // Size filter
      if (selectedSize !== 'All' && !product.sizes.includes(selectedSize)) {
        return false;
      }

      // Price filter
      if (product.price < selectedPriceRange.min || product.price > selectedPriceRange.max) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (selectedSort === 'price_asc') return a.price - b.price;
      if (selectedSort === 'price_desc') return b.price - a.price;
      if (selectedSort === 'newest') return b.is_featured ? 1 : -1;
      return 0;
    });
  }, [searchQuery, selectedGender, selectedSize, selectedPriceRange, selectedSort]);

  return (
    <div className="min-h-screen bg-brand-dark text-brand-pearl pb-20 pt-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-brand-border pb-6 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-brand-gold flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" /> KultZR Catalog Taxonomy
            </span>
            <h1 className="text-4xl font-black text-brand-pearl tracking-tight mt-1">
              Luxury Streetwear Drops
            </h1>
            <p className="text-xs text-brand-muted mt-1 max-w-xl">
              240 GSM organic cotton, on-demand zero-inventory fulfillment powered by Qikink Open API and NVIDIA NIM AI enrichment.
            </p>
          </div>

          {/* Search & Sort Controls */}
          <div className="flex flex-wrap items-center gap-3">
            
            {/* Search Bar */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted" />
              <input
                type="text"
                placeholder="Search silhouette or style..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-brand-secondary border border-brand-border rounded-full pl-9 pr-4 py-2 text-xs text-brand-pearl focus:outline-none focus:border-brand-gold transition-colors"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value)}
                className="bg-brand-secondary border border-brand-border rounded-full px-4 py-2 text-xs text-brand-pearl focus:outline-none focus:border-brand-gold cursor-pointer"
              >
                {SORT_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>Sort: {opt.label}</option>
                ))}
              </select>
            </div>

          </div>
        </div>

        {/* Gender Tabs Header */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {GENDERS.map(gender => (
            <button
              key={gender}
              onClick={() => setSelectedGender(gender)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                selectedGender === gender
                  ? 'bg-brand-gold text-brand-dark shadow-lg shadow-amber-500/20'
                  : 'bg-brand-secondary border border-brand-border text-brand-muted hover:text-brand-pearl hover:border-brand-gold'
              }`}
            >
              {gender} Collection
            </button>
          ))}
        </div>

        {/* Main Grid with Sidebar Filter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Sidebar Filter Panel (3 cols) */}
          <aside className="lg:col-span-3 space-y-6 glass-panel p-6 rounded-3xl border border-brand-border">
            <div className="flex items-center justify-between border-b border-brand-border pb-4">
              <h3 className="text-sm font-extrabold uppercase tracking-widest text-brand-gold flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4" /> Filters
              </h3>
              <button
                onClick={() => {
                  setSelectedGender('All');
                  setSelectedCategory('All Categories');
                  setSelectedCollection('All Collections');
                  setSelectedSize('All');
                  setSelectedPriceRange(PRICE_RANGES[0]);
                  setSearchQuery('');
                }}
                className="text-[11px] text-brand-muted hover:text-brand-gold underline cursor-pointer"
              >
                Reset All
              </button>
            </div>

            {/* Categories Filter */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-brand-pearl uppercase tracking-wider">Category</label>
              <div className="space-y-1">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors flex items-center justify-between cursor-pointer ${
                      selectedCategory === cat ? 'bg-brand-gold/15 text-brand-gold font-bold' : 'text-brand-muted hover:text-brand-pearl'
                    }`}
                  >
                    <span>{cat}</span>
                    {selectedCategory === cat && <Check className="w-3.5 h-3.5" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Collections Filter */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-brand-pearl uppercase tracking-wider">Collection</label>
              <div className="space-y-1">
                {COLLECTIONS.map(col => (
                  <button
                    key={col}
                    onClick={() => setSelectedCollection(col)}
                    className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors flex items-center justify-between cursor-pointer ${
                      selectedCollection === col ? 'bg-brand-gold/15 text-brand-gold font-bold' : 'text-brand-muted hover:text-brand-pearl'
                    }`}
                  >
                    <span>{col}</span>
                    {selectedCollection === col && <Check className="w-3.5 h-3.5" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Sizes Filter */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-brand-pearl uppercase tracking-wider">Fit Size</label>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => setSelectedSize('All')}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                    selectedSize === 'All' ? 'border-brand-gold bg-brand-gold text-brand-dark' : 'border-brand-border text-brand-muted hover:text-brand-pearl'
                  }`}
                >
                  All
                </button>
                {SIZES.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-8 h-8 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                      selectedSize === size ? 'border-brand-gold bg-brand-gold text-brand-dark' : 'border-brand-border text-brand-muted hover:text-brand-pearl'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-brand-pearl uppercase tracking-wider">Price Tier</label>
              <div className="space-y-1">
                {PRICE_RANGES.map(range => (
                  <button
                    key={range.label}
                    onClick={() => setSelectedPriceRange(range)}
                    className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors flex items-center justify-between cursor-pointer ${
                      selectedPriceRange.label === range.label ? 'bg-brand-gold/15 text-brand-gold font-bold' : 'text-brand-muted hover:text-brand-pearl'
                    }`}
                  >
                    <span>{range.label}</span>
                    {selectedPriceRange.label === range.label && <Check className="w-3.5 h-3.5" />}
                  </button>
                ))}
              </div>
            </div>

          </aside>

          {/* Product Grid (9 cols) */}
          <main className="lg:col-span-9 space-y-6">
            
            <div className="flex items-center justify-between">
              <span className="text-xs text-brand-muted">
                Showing <strong className="text-brand-pearl">{filteredProducts.length}</strong> bespoke streetwear pieces
              </span>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="p-12 text-center rounded-3xl bg-brand-secondary border border-brand-border space-y-4">
                <Sparkles className="w-8 h-8 text-brand-gold mx-auto" />
                <h3 className="text-xl font-bold text-brand-pearl">No matching products found</h3>
                <p className="text-xs text-brand-muted">Try clearing your category, size, or price filters to view all pieces.</p>
                <button
                  onClick={() => {
                    setSelectedCategory('All Categories');
                    setSelectedSize('All');
                    setSelectedPriceRange(PRICE_RANGES[0]);
                    setSearchQuery('');
                  }}
                  className="px-4 py-2 rounded-full bg-brand-gold text-brand-dark font-bold text-xs cursor-pointer"
                >
                  Reset Catalog Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <Link
                    key={product.id}
                    href={`/products/${product.slug}`}
                    className="group bg-brand-secondary border border-brand-border hover:border-brand-gold/50 rounded-3xl p-4 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
                  >
                    <div>
                      {/* Product Image Box */}
                      <div className="relative w-full h-72 rounded-2xl bg-brand-dark overflow-hidden mb-4">
                        <Image
                          src={product.images[0]}
                          alt={product.title}
                          fill
                          className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                        />
                        {product.is_featured && (
                          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-brand-gold text-brand-dark text-[10px] font-black uppercase tracking-wider">
                            Featured Drop
                          </span>
                        )}
                        <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-brand-dark/80 backdrop-blur-md text-[10px] text-brand-gold border border-brand-gold/30 font-bold">
                          240 GSM
                        </span>
                      </div>

                      {/* Title & Description */}
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase font-bold tracking-widest text-brand-gold">{product.category_slug}</span>
                        <h3 className="text-base font-bold text-brand-pearl group-hover:text-brand-gold transition-colors truncate">
                          {product.title}
                        </h3>
                        <p className="text-xs text-brand-muted line-clamp-2 leading-relaxed">
                          {product.description}
                        </p>
                      </div>
                    </div>

                    {/* Price & Rating Footer */}
                    <div className="pt-4 border-t border-brand-border/60 flex items-center justify-between mt-4">
                      <div>
                        <span className="text-sm font-black text-brand-pearl">₹{product.price.toLocaleString('en-IN')}</span>
                        {product.original_price && (
                          <span className="text-xs text-brand-muted line-through ml-2">₹{product.original_price.toLocaleString('en-IN')}</span>
                        )}
                      </div>
                      <span className="text-[11px] text-brand-muted font-bold flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Free Shipping
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}

          </main>

        </div>

      </div>
    </div>
  );
}
