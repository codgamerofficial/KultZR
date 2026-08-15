'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/types';
import { useCart } from '@/lib/cartContext';
import { ShoppingBag, Star, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  
  // Safe color parsing
  const colorsArray = Array.isArray(product.colors) 
    ? product.colors 
    : typeof product.colors === 'string'
    ? JSON.parse(product.colors)
    : [{ name: 'Obsidian Black', hex: '#0A0A0C' }];
    
  const [selectedColor, setSelectedColor] = useState(colorsArray[0] || { name: 'Default', hex: '#0A0A0C' });
  const [added, setAdded] = useState(false);

  // Safe sizes parsing
  const sizesArray: string[] = Array.isArray(product.sizes) 
    ? product.sizes 
    : typeof product.sizes === 'string'
    ? (product.sizes as string).split(',').map(s => s.trim())
    : ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  // Safe images parsing
  const rawImageUrl = (product as any).image_url || 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=1000';
  const imagesArray: string[] = Array.isArray(product.images) 
    ? product.images 
    : typeof product.images === 'string'
    ? JSON.parse(product.images)
    : [rawImageUrl];

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, sizesArray[0] || 'M', selectedColor);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="group glass-card rounded-3xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 border border-brand-border hover:border-brand-gold/50 bg-brand-secondary/90">
      <Link href={`/products/${product.slug}`} className="block relative">
        {/* Product Image Container with object-contain for crisp garment display */}
        <div className="w-full aspect-square relative bg-brand-dark/95 p-4 overflow-hidden flex items-center justify-center">
          <Image
            src={imagesArray[0] || rawImageUrl}
            alt={product.title}
            fill
            className="object-contain p-3 group-hover:scale-105 transition-transform duration-500"
            priority
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
            {product.is_featured && (
              <span className="px-2.5 py-1 rounded-full bg-brand-gold text-brand-dark font-black text-[10px] uppercase tracking-wider shadow-md">
                Featured Drop
              </span>
            )}
          </div>

          <span className="absolute bottom-3 left-3 px-2 py-0.5 rounded-md bg-brand-dark/80 text-[10px] text-brand-muted border border-brand-border font-mono">
            {sizesArray.join(' • ')}
          </span>

          {/* Quick Add Button */}
          <button
            onClick={handleQuickAdd}
            className="absolute bottom-3 right-3 p-3 bg-brand-gold text-brand-dark rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all z-10 cursor-pointer"
            title="Quick Add to Bag"
          >
            {added ? <Check className="w-4 h-4 stroke-[3]" /> : <ShoppingBag className="w-4 h-4 stroke-[2.5]" />}
          </button>
        </div>

        {/* Info */}
        <div className="p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold tracking-widest text-brand-gold">
              {product.category_slug || 'Streetwear'}
            </span>
            <div className="flex items-center gap-1 text-[11px] font-bold text-amber-400">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>{product.rating || 4.9}</span>
            </div>
          </div>

          <h3 className="text-base font-bold text-brand-pearl group-hover:text-brand-gold transition-colors line-clamp-1">
            {product.title}
          </h3>

          <p className="text-xs text-brand-muted line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          {/* Colors */}
          <div className="flex items-center gap-1.5 pt-2">
            {colorsArray.map((color: any, idx: number) => (
              <button
                key={color.name || idx}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSelectedColor(color);
                }}
                style={{ backgroundColor: color.hex || '#0A0A0C' }}
                className={`w-4 h-4 rounded-full border transition-transform ${
                  selectedColor.name === color.name ? 'border-brand-gold scale-125 shadow-md shadow-amber-500/20' : 'border-brand-border'
                }`}
                title={color.name || 'Color'}
              />
            ))}
          </div>
        </div>
      </Link>

      {/* Footer Price */}
      <div className="px-5 pb-5 pt-2 border-t border-brand-border/40 flex items-center justify-between">
        <div>
          <span className="text-lg font-black text-brand-pearl">₹{Number(product.price).toLocaleString('en-IN')}</span>
          {product.original_price && (
            <span className="text-xs text-brand-muted line-through ml-2">₹{Number(product.original_price).toLocaleString('en-IN')}</span>
          )}
        </div>
        <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
          On-Demand POD
        </span>
      </div>
    </div>
  );
}
