'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/types';
import { useCart } from '@/lib/cartContext';
import { Sparkles, ShoppingBag, Star, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [added, setAdded] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, product.sizes[0] || 'M', selectedColor);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="group glass-card rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1">
      <Link href={`/products/${product.slug}`} className="block relative">
        {/* Product Image Container */}
        <div className="w-full aspect-[4/5] relative bg-brand-dark overflow-hidden">
          <Image
            src={product.images[0]}
            alt={product.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

          {/* Featured or Customizable Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
            {product.is_featured && (
              <span className="px-2.5 py-1 rounded-full bg-brand-gold/90 text-brand-dark font-extrabold text-[10px] uppercase tracking-wider shadow-md">
                Featured Drop
              </span>
            )}
            {product.is_customizable && (
              <span className="px-2.5 py-1 rounded-full bg-brand-dark/80 backdrop-blur-md text-brand-amber border border-brand-amber/40 text-[10px] font-semibold flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Customizable
              </span>
            )}
          </div>

          {/* Quick Add Button */}
          <button
            onClick={handleQuickAdd}
            className="absolute bottom-3 right-3 p-3 bg-brand-gold text-brand-dark rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all z-10"
            title="Quick Add to Bag"
          >
            {added ? <Check className="w-4 h-4 stroke-[3]" /> : <ShoppingBag className="w-4 h-4 stroke-[2.5]" />}
          </button>
        </div>

        {/* Content Details */}
        <div className="p-5 space-y-3">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-brand-muted">
              {product.category_slug}
            </span>
            <div className="flex items-center gap-1 text-amber-400 text-xs font-semibold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating} ({product.review_count})</span>
            </div>
          </div>

          <h3 className="font-bold text-base text-brand-pearl group-hover:text-brand-gold transition-colors line-clamp-1">
            {product.title}
          </h3>

          <p className="text-xs text-brand-muted line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          {/* Color Selector Badges */}
          <div className="flex items-center gap-1.5 pt-1">
            {product.colors.map(color => (
              <button
                key={color.name}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSelectedColor(color);
                }}
                className={`w-4 h-4 rounded-full border ${selectedColor.name === color.name ? 'border-brand-gold scale-125' : 'border-brand-border'} transition-all`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
          </div>

          {/* Pricing & CTA */}
          <div className="flex items-center justify-between pt-2 border-t border-brand-border/50">
            <div>
              <span className="text-lg font-extrabold text-brand-gold">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.original_price && (
                <span className="text-xs text-brand-muted line-through ml-2">
                  ₹{product.original_price.toLocaleString('en-IN')}
                </span>
              )}
            </div>

            <span className="text-xs font-semibold text-brand-pearl group-hover:translate-x-1 transition-transform flex items-center gap-1">
              Customize &rarr;
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
