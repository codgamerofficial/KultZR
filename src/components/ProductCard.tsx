'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/types';
import { useCart } from '@/lib/cartContext';
import { ShoppingBag, Star, Check, Sparkles } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

function safeJsonParse<T>(val: any, fallback: T): T {
  if (!val) return fallback;
  if (Array.isArray(val)) return val as unknown as T;
  if (typeof val === 'string') {
    const trimmed = (val as string).trim();
    if (trimmed.startsWith('[') || trimmed.startsWith('{')) {
      try {
        return JSON.parse(trimmed) as T;
      } catch {
        return fallback;
      }
    }
  }
  return fallback;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  
  // Safe color parsing
  const defaultColors = [{ name: 'Obsidian Black', hex: '#0A0A0C' }];
  const colorsArray = safeJsonParse<any[]>(product.colors, defaultColors);
  const [selectedColor, setSelectedColor] = useState(colorsArray[0] || defaultColors[0]);
  const [added, setAdded] = useState(false);

  // Safe sizes parsing
  const sizesArray: string[] = Array.isArray(product.sizes) 
    ? product.sizes 
    : typeof product.sizes === 'string'
    ? (product.sizes as string).split(',').map(s => s.trim())
    : ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  // Safe images parsing
  const rawImageUrl = (product as any).image_url || 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=1000';
  const defaultImages = [rawImageUrl];
  const imagesArray = safeJsonParse<string[]>(product.images, defaultImages);
  const isPlainStringImage = typeof product.images === 'string' && !(product.images as string).trim().startsWith('[');
  const displayImage = isPlainStringImage ? (product.images as unknown as string) : (imagesArray[0] || rawImageUrl);

  // Calculate percentage discount
  const discountPercent = product.original_price && product.original_price > product.price
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
    : null;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, sizesArray[0] || 'M', selectedColor);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="group glass-card rounded-3xl overflow-hidden flex flex-col justify-between transition-all duration-500 hover:-translate-y-2 border border-brand-border/60 hover:border-brand-gold/60 bg-gradient-to-b from-brand-card/90 to-brand-charcoal/90 shadow-xl hover:shadow-2xl hover:shadow-amber-500/10">
      <Link href={`/products/${product.slug}`} className="block relative">
        
        {/* Product Image Container with crisp dark back drop & object-contain */}
        <div className="w-full aspect-square relative bg-gradient-to-b from-black via-brand-dark/95 to-brand-charcoal/90 p-5 overflow-hidden flex items-center justify-center">
          
          <Image
            src={displayImage || rawImageUrl}
            alt={product.title}
            fill
            className="object-contain p-4 group-hover:scale-108 transition-transform duration-700 ease-out"
            priority
          />

          {/* Top Badges */}
          <div className="absolute top-3.5 left-3.5 flex flex-col gap-1.5 z-10">
            {product.is_featured && (
              <span className="px-3 py-1 rounded-full bg-gradient-to-r from-amber-400 via-brand-gold to-amber-500 text-brand-dark font-black text-[10px] uppercase tracking-widest shadow-lg shadow-amber-500/20">
                Featured Drop
              </span>
            )}
            {discountPercent && (
              <span className="px-2.5 py-0.5 rounded-full bg-red-500/90 text-white font-black text-[9px] uppercase tracking-wider shadow-md w-fit">
                Save {discountPercent}%
              </span>
            )}
          </div>

          {/* Size Pill */}
          <span className="absolute bottom-3.5 left-3.5 px-2.5 py-1 rounded-full bg-brand-dark/90 text-[10px] text-brand-muted border border-brand-border/80 font-mono backdrop-blur-md">
            {sizesArray.slice(0, 4).join(' • ')}{sizesArray.length > 4 ? ' +' : ''}
          </span>

          {/* Quick Add Floating Button */}
          <button
            onClick={handleQuickAdd}
            className="absolute bottom-3.5 right-3.5 p-3.5 bg-gradient-to-r from-amber-400 via-brand-gold to-amber-500 text-brand-dark rounded-full shadow-xl shadow-amber-500/30 hover:scale-115 active:scale-90 transition-all z-10 cursor-pointer"
            title="Quick Add to Bag"
          >
            {added ? <Check className="w-4 h-4 stroke-[3]" /> : <ShoppingBag className="w-4 h-4 stroke-[3]" />}
          </button>
        </div>

        {/* Product Details Info */}
        <div className="p-6 space-y-3">
          
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-black tracking-widest text-brand-gold bg-brand-gold/10 px-2.5 py-0.5 rounded-full border border-brand-gold/30">
              {product.category_slug || 'Streetwear'}
            </span>
            <div className="flex items-center gap-1 text-[11px] font-black text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-md border border-amber-400/20">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating || 4.95}</span>
            </div>
          </div>

          <h3 className="text-lg font-black text-brand-pearl group-hover:text-brand-gold transition-colors line-clamp-1">
            {product.title}
          </h3>

          <p className="text-xs text-brand-muted line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          {/* Interactive Color Dots */}
          <div className="flex items-center gap-2 pt-1">
            {colorsArray.map((color: any, idx: number) => (
              <button
                key={color.name || idx}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSelectedColor(color);
                }}
                style={{ backgroundColor: color.hex || '#0A0A0C' }}
                className={`w-4.5 h-4.5 rounded-full border transition-all ${
                  selectedColor?.name === color.name 
                    ? 'border-brand-gold ring-2 ring-amber-400/50 scale-125 shadow-lg shadow-amber-500/30' 
                    : 'border-brand-border/80 opacity-70 hover:opacity-100'
                }`}
                title={color.name || 'Color Option'}
              />
            ))}
          </div>

        </div>
      </Link>

      {/* Card Footer: Price & POD Badge */}
      <div className="px-6 pb-6 pt-3 border-t border-brand-border/40 flex items-center justify-between bg-black/20">
        <div>
          <span className="text-xl font-black text-brand-pearl">₹{Number(product.price).toLocaleString('en-IN')}</span>
          {product.original_price && (
            <span className="text-xs text-brand-muted line-through ml-2 font-medium">₹{Number(product.original_price).toLocaleString('en-IN')}</span>
          )}
        </div>
        <span className="text-[10px] text-emerald-400 font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-950/40 border border-emerald-500/30">
          Qikink POD
        </span>
      </div>

    </div>
  );
}
