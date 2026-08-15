'use client';

import React, { useState, useMemo } from 'react';
import ProductCard from '@/components/ProductCard';
import { MOCK_PRODUCTS } from '@/lib/mockData';
import { Search, Filter, ArrowUpDown } from 'lucide-react';

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');

  const filteredProducts = useMemo(() => {
    let result = [...MOCK_PRODUCTS];

    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category_slug === selectedCategory || p.gender === selectedCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }

    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header Banner */}
      <div className="space-y-4">
        <span className="text-xs font-extrabold uppercase tracking-widest text-brand-gold">
          KultZR Collection
        </span>
        <h1 className="text-4xl sm:text-6xl font-black text-brand-pearl">
          Bespoke Apparel Catalog
        </h1>
        <p className="text-sm text-brand-muted max-w-2xl">
          Explore on-demand heavyweight organic cotton tees, hoodies, and totes. Every design is customizable with your story.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="glass-panel p-4 rounded-2xl border border-brand-border flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {[
            { id: 'all', label: 'All Collections' },
            { id: 'unisex', label: 'Unisex Oversized' },
            { id: 'men', label: "Men's Streetwear" },
            { id: 'women', label: "Women's Fashion" },
            { id: 'accessories', label: 'Canvas Accessories' },
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-brand-gold text-brand-dark shadow-md'
                  : 'bg-brand-dark/60 text-brand-muted hover:text-brand-pearl hover:bg-brand-card'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search & Sort Controls */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="w-4 h-4 text-brand-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-brand-dark border border-brand-border rounded-xl pl-9 pr-3 py-2 text-xs text-brand-pearl focus:outline-none focus:border-brand-gold"
            />
          </div>

          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-brand-dark border border-brand-border text-xs text-brand-pearl rounded-xl px-3 py-2 font-semibold focus:outline-none focus:border-brand-gold"
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 space-y-4">
          <Filter className="w-12 h-12 text-brand-muted mx-auto opacity-50" />
          <h3 className="text-xl font-bold text-brand-pearl">No products found</h3>
          <p className="text-xs text-brand-muted">Try clearing your search terms or selecting a different category.</p>
          <button
            onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
            className="px-6 py-2 bg-brand-gold text-brand-dark font-bold text-xs rounded-xl"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

    </div>
  );
}
