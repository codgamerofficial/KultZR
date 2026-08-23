'use client';

import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product, ColorOption } from '@/lib/types';
import { useCart } from '@/lib/cartContext';
import { Check, Heart, ShoppingBag, Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

function parseJsonArray<T>(value: unknown): T[] {
  if (Array.isArray(value)) return value as T[];
  if (typeof value !== 'string' || !value.trim()) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed as T[] : [];
  } catch {
    return [];
  }
}

function parseColors(value: unknown): ColorOption[] {
  const parsed = parseJsonArray<ColorOption>(value);
  return parsed.length ? parsed : [{ name: 'Default', hex: '#111111' }];
}

function parseSizes(value: unknown): string[] {
  if (Array.isArray(value)) return value.map(String).filter(Boolean);
  if (typeof value === 'string') return value.split(',').map(size => size.trim()).filter(Boolean);
  return [];
}

function parseImages(value: unknown): string[] {
  const parsed = parseJsonArray<string>(value).filter(Boolean);
  if (parsed.length) return parsed;
  return typeof value === 'string' && value.trim() ? [value.trim()] : [];
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);
  const [selectedColor, setSelectedColor] = useState<ColorOption | null>(null);

  const colors = useMemo(() => parseColors(product.colors), [product.colors]);
  const sizes = useMemo(() => parseSizes(product.sizes), [product.sizes]);
  const images = useMemo(() => parseImages(product.images), [product.images]);
  const activeColor = selectedColor || colors[0];
  const discountPercent = product.original_price && product.original_price > product.price
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
    : null;
  const rating = Number(product.rating);
  const reviewCount = Number(product.review_count);

  const handleQuickAdd = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    addToCart(product, sizes[0] || 'M', activeColor);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  };

  const handleWishlist = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setWishlisted(value => !value);
  };

  return (
    <article className="group min-w-0 rounded-3xl overflow-hidden border border-brand-border bg-brand-card transition-transform duration-300 hover:-translate-y-1 hover:border-brand-gold/50">
      <div className="relative">
        <Link href={`/products/${product.slug}`} aria-label={`View ${product.title}`} className="block">
          <div className="relative aspect-square overflow-hidden bg-brand-charcoal">
            {images[0] ? (
              <Image
                src={images[0]}
                alt={product.title}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1280px) 33vw, 25vw"
                className="object-contain p-3 sm:p-5 transition-transform duration-500 group-hover:scale-[1.035]"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-xs text-brand-muted">Image unavailable</div>
            )}

            <div className="absolute inset-x-3 top-3 flex items-start justify-between gap-2 pointer-events-none">
              <div className="flex flex-wrap gap-1.5">
                {product.is_featured && <span className="px-2.5 py-1 rounded-full bg-brand-gold text-brand-dark text-[9px] font-black uppercase tracking-wider">Featured</span>}
                {discountPercent !== null && <span className="px-2.5 py-1 rounded-full bg-brand-dark/85 text-white text-[9px] font-bold">-{discountPercent}%</span>}
              </div>
            </div>
          </div>
        </Link>

        <button
          type="button"
          onClick={handleWishlist}
          aria-label={wishlisted ? `Remove ${product.title} from wishlist` : `Add ${product.title} to wishlist`}
          aria-pressed={wishlisted}
          className="absolute top-3 right-3 z-10 h-9 w-9 rounded-full border border-white/10 bg-brand-dark/75 backdrop-blur-sm flex items-center justify-center text-white hover:border-brand-gold hover:text-brand-gold transition-colors"
        >
          <Heart className={`w-4 h-4 ${wishlisted ? 'fill-current text-brand-gold' : ''}`} />
        </button>

        <button
          type="button"
          onClick={handleQuickAdd}
          aria-label={added ? `${product.title} added to bag` : `Add ${product.title} to bag`}
          className="absolute bottom-3 right-3 z-10 h-10 w-10 rounded-full bg-brand-gold text-brand-dark flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-transform"
        >
          {added ? <Check className="w-4 h-4 stroke-[3]" /> : <ShoppingBag className="w-4 h-4 stroke-[2.5]" />}
        </button>
      </div>

      <div className="p-4 sm:p-5">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[9px] uppercase tracking-[0.18em] font-bold text-brand-gold truncate">{product.category_slug || 'Streetwear'}</p>
          {Number.isFinite(rating) && rating > 0 && (
            <span className="shrink-0 inline-flex items-center gap-1 text-[10px] text-brand-muted" aria-label={`${rating} out of 5 stars${reviewCount > 0 ? ` from ${reviewCount} reviews` : ''}`}>
              <Star className="w-3 h-3 fill-brand-gold text-brand-gold" />
              {rating.toFixed(1)}{reviewCount > 0 ? ` (${reviewCount})` : ''}
            </span>
          )}
        </div>

        <Link href={`/products/${product.slug}`} className="block mt-1">
          <h2 className="text-sm sm:text-base font-bold text-brand-pearl line-clamp-2 group-hover:text-brand-gold transition-colors">{product.title}</h2>
        </Link>

        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-base sm:text-lg font-black text-brand-pearl">₹{Number(product.price).toLocaleString('en-IN')}</span>
          {product.original_price && product.original_price > product.price && <span className="text-xs text-brand-muted line-through">₹{Number(product.original_price).toLocaleString('en-IN')}</span>}
        </div>

        {colors.length > 0 && (
          <div className="mt-3 flex items-center gap-2" aria-label="Available colors">
            {colors.slice(0, 5).map((color, index) => (
              <button
                type="button"
                key={`${color.name}-${index}`}
                onClick={() => setSelectedColor(color)}
                aria-label={`Select ${color.name}`}
                aria-pressed={activeColor?.name === color.name}
                className={`h-5 w-5 rounded-full border transition-transform ${activeColor?.name === color.name ? 'border-brand-gold ring-2 ring-brand-gold/30 scale-110' : 'border-white/20 hover:scale-110'}`}
                style={{ backgroundColor: color.hex || '#111111' }}
              />
            ))}
            {colors.length > 5 && <span className="text-[10px] text-brand-muted">+{colors.length - 5}</span>}
          </div>
        )}
      </div>
    </article>
  );
}
