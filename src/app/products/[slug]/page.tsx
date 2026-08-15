'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { MOCK_PRODUCTS } from '@/lib/mockData';
import { useCart } from '@/lib/cartContext';
import { Sparkles, ShoppingBag, Star, ShieldCheck, Truck, RotateCcw, Check, Info } from 'lucide-react';
import CustomizerStudio from '@/components/CustomizerStudio';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const product = MOCK_PRODUCTS.find(p => p.slug === slug) || MOCK_PRODUCTS[0];
  const { addToCart } = useCart();

  const [activeImage, setActiveImage] = useState(product.images[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'M');
  const [showStudio, setShowStudio] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Breadcrumb Navigation */}
      <div className="text-xs text-brand-muted flex items-center gap-2">
        <Link href="/" className="hover:text-brand-gold">Home</Link> / 
        <Link href="/shop" className="hover:text-brand-gold">Shop</Link> / 
        <span className="text-brand-pearl font-semibold">{product.title}</span>
      </div>

      {/* Main PDP Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Image Gallery (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-4/5 w-full rounded-3xl overflow-hidden glass-panel border border-brand-border">
            <Image
              src={activeImage}
              alt={product.title}
              fill
              className="object-cover"
              priority
            />
            {product.is_featured && (
              <span className="absolute top-4 left-4 px-3 py-1 bg-brand-gold text-brand-dark font-extrabold text-xs rounded-full uppercase">
                Featured Drop
              </span>
            )}
          </div>

          {/* Thumbnail Strip */}
          <div className="flex gap-4 overflow-x-auto pb-2">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(img)}
                className={`relative w-24 aspect-square rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                  activeImage === img ? 'border-brand-gold scale-105' : 'border-brand-border opacity-70 hover:opacity-100'
                }`}
              >
                <Image src={img} alt="" fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right Product Details & Actions (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase tracking-wider text-brand-gold">
                {product.gender} Apparel
              </span>
              <div className="flex items-center gap-1 text-amber-400 text-xs font-semibold">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{product.rating} ({product.review_count} Verified Reviews)</span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-pearl mt-2">
              {product.title}
            </h1>

            <div className="flex items-baseline gap-3 mt-3">
              <span className="text-3xl font-extrabold text-brand-gold">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.original_price && (
                <span className="text-sm text-brand-muted line-through">
                  ₹{product.original_price.toLocaleString('en-IN')}
                </span>
              )}
              <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md">
                Save {Math.round(((product.original_price! - product.price) / product.original_price!) * 100)}%
              </span>
            </div>
          </div>

          <p className="text-sm text-brand-muted leading-relaxed">
            {product.description}
          </p>

          {/* Color Selection */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-brand-pearl">
              Color: <span className="text-brand-gold">{selectedColor.name}</span>
            </label>
            <div className="flex items-center gap-3">
              {product.colors.map(color => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color)}
                  className={`w-8 h-8 rounded-full border-2 transition-transform ${
                    selectedColor.name === color.name ? 'border-brand-gold scale-110 shadow-lg shadow-amber-500/20' : 'border-brand-border'
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          {/* Size Selection & Guide Modal trigger */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <label className="font-bold uppercase tracking-wider text-brand-pearl">
                Select Size
              </label>
              <button 
                onClick={() => setShowSizeGuide(true)}
                className="text-brand-gold hover:underline flex items-center gap-1 font-semibold"
              >
                <Info className="w-3.5 h-3.5" /> Size Guide
              </button>
            </div>

            <div className="grid grid-cols-5 gap-2">
              {product.sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-3 rounded-xl border text-xs font-bold transition-all ${
                    selectedSize === size
                      ? 'border-brand-gold bg-brand-gold text-brand-dark'
                      : 'border-brand-border bg-brand-card text-brand-pearl hover:border-brand-gold'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-3 pt-4 border-t border-brand-border">
            <button
              onClick={() => setShowStudio(true)}
              className="w-full py-4 bg-linear-to-r from-amber-400 via-brand-gold to-amber-500 text-brand-dark font-extrabold text-base rounded-2xl flex items-center justify-center gap-2 shadow-xl shadow-amber-500/20 hover:scale-[1.01] transition-transform"
            >
              <Sparkles className="w-5 h-5" /> Customize This Piece with Your Story
            </button>

            <button
              onClick={handleAddToCart}
              className="w-full py-4 bg-brand-card text-brand-pearl font-bold text-base rounded-2xl border border-brand-border hover:border-brand-gold transition-colors flex items-center justify-center gap-2"
            >
              {added ? (
                <>
                  <Check className="w-5 h-5 text-emerald-400" /> Added to Bag
                </>
              ) : (
                <>
                  <ShoppingBag className="w-5 h-5 text-brand-gold" /> Add Standard Version to Bag
                </>
              )}
            </button>
          </div>

          {/* Fabric & Delivery Guarantees */}
          <div className="glass-card p-5 rounded-2xl border border-brand-border/60 space-y-3 text-xs text-brand-muted">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-brand-gold shrink-0" />
              <span><strong>Fabric Specification:</strong> {product.fabric_details}</span>
            </div>
            <div className="flex items-center gap-3">
              <Truck className="w-5 h-5 text-brand-gold shrink-0" />
              <span><strong>Delivery Guarantee:</strong> On-demand custom printing in 48 hours. Dispatch via Express Air across India.</span>
            </div>
            <div className="flex items-center gap-3">
              <RotateCcw className="w-5 h-5 text-brand-gold shrink-0" />
              <span><strong>30-Day Guarantee:</strong> Free replacement for manufacturing defects. Zero waste policy.</span>
            </div>
          </div>

        </div>

      </div>

      {/* Embedded Studio Modal overlay when user clicks Customize */}
      {showStudio && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md p-4 sm:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between text-brand-pearl pb-4 border-b border-brand-border">
              <h2 className="text-2xl font-bold flex items-center gap-2 gold-gradient-text">
                <Sparkles className="w-6 h-6 text-brand-gold" /> Customizing {product.title}
              </h2>
              <button
                onClick={() => setShowStudio(false)}
                className="px-4 py-2 bg-brand-card text-brand-pearl hover:text-brand-gold rounded-full text-xs font-bold border border-brand-border"
              >
                Close Studio &times;
              </button>
            </div>
            <CustomizerStudio initialProduct={product} />
          </div>
        </div>
      )}

      {/* Size Guide Modal */}
      {showSizeGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-brand-secondary border border-brand-border rounded-3xl p-6 max-w-lg w-full text-brand-pearl space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-brand-border">
              <h3 className="font-bold text-lg">KultZR Heavyweight Fit Guide</h3>
              <button onClick={() => setShowSizeGuide(false)} className="text-brand-muted hover:text-brand-pearl">&times;</button>
            </div>
            <div className="text-xs text-brand-muted space-y-2">
              <p>Our tees feature a relaxed, dropped-shoulder luxury silhouette. For a standard fit, order your normal size. For an extreme oversized fit, size up one level.</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left text-brand-muted border-collapse">
                <thead>
                  <tr className="border-b border-brand-border text-brand-pearl font-bold">
                    <th className="py-2">Size</th>
                    <th className="py-2">Chest (Inches)</th>
                    <th className="py-2">Length (Inches)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-brand-border/40">
                    <td className="py-2 font-bold text-brand-gold">S</td>
                    <td className="py-2">38 - 40</td>
                    <td className="py-2">28</td>
                  </tr>
                  <tr className="border-b border-brand-border/40">
                    <td className="py-2 font-bold text-brand-gold">M</td>
                    <td className="py-2">41 - 43</td>
                    <td className="py-2">29</td>
                  </tr>
                  <tr className="border-b border-brand-border/40">
                    <td className="py-2 font-bold text-brand-gold">L</td>
                    <td className="py-2">44 - 46</td>
                    <td className="py-2">30</td>
                  </tr>
                  <tr className="border-b border-brand-border/40">
                    <td className="py-2 font-bold text-brand-gold">XL</td>
                    <td className="py-2">47 - 49</td>
                    <td className="py-2">31</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <button
              onClick={() => setShowSizeGuide(false)}
              className="w-full py-3 bg-brand-gold text-brand-dark font-bold text-xs rounded-xl"
            >
              Got It
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
