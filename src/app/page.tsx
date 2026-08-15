'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ProductCard from '@/components/ProductCard';
import CustomizerStudio from '@/components/CustomizerStudio';
import { MOCK_PRODUCTS, MOCK_TESTIMONIALS } from '@/lib/mockData';
import { Sparkles, ArrowRight, ShieldCheck, Leaf, Flame, Heart, Star, Send } from 'lucide-react';

export default function HomePage() {
  const featuredProducts = MOCK_PRODUCTS.filter(p => p.is_featured);

  return (
    <div className="space-y-20 pb-16">
      
      {/* HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-12 pb-20">
        
        {/* Ambient Dark Glow Background */}
        <div className="absolute inset-0 bg-radial from-amber-500/10 via-brand-dark/95 to-brand-dark pointer-events-none" />
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 z-10">
          
          {/* Logo Insignia Badge */}
          <div className="inline-flex items-center justify-center p-3 rounded-3xl bg-brand-card/60 backdrop-blur-md border border-brand-gold/30 shadow-2xl animate-in zoom-in duration-500">
            <img src="/brand/logo.svg" alt="KultZR Monogram Logo" className="h-32 sm:h-44 w-auto object-contain drop-shadow-2xl" />
          </div>

          <div className="space-y-4 max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-gold/10 text-brand-gold border border-brand-gold/30 text-xs font-bold uppercase tracking-widest">
              <Sparkles className="w-4 h-4" /> Zero-Inventory Luxury Apparel
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-brand-pearl leading-none">
              WEAR YOUR <span className="bg-linear-to-r from-amber-400 via-brand-gold to-amber-500 bg-clip-text text-transparent">STORY.</span>
            </h1>
            <p className="text-brand-muted text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              Unapologetic, 240 GSM organic cotton heavyweight streetwear printed exclusively on-demand. Personalize your identity with our 2D Bespoke Studio.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/customize"
              className="w-full sm:w-auto px-8 py-4 bg-linear-to-r from-amber-400 via-brand-gold to-amber-500 text-brand-dark font-extrabold text-sm rounded-full shadow-xl shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" /> Design in 2D Studio
            </Link>
            <Link
              href="/shop"
              className="w-full sm:w-auto px-8 py-4 bg-brand-card/80 text-brand-pearl border border-brand-border hover:border-brand-gold font-bold text-sm rounded-full backdrop-blur-md transition-all flex items-center justify-center gap-2"
            >
              Explore Collection <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Key Metrics Bar */}
          <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto text-left">
            <div className="glass-panel p-4 rounded-2xl border border-brand-border">
              <span className="text-2xl font-black text-brand-gold">240 GSM</span>
              <p className="text-xs text-brand-muted mt-0.5">Heavyweight Organic Cotton</p>
            </div>
            <div className="glass-panel p-4 rounded-2xl border border-brand-border">
              <span className="text-2xl font-black text-brand-gold">0% Waste</span>
              <p className="text-xs text-brand-muted mt-0.5">On-Demand Zero Inventory</p>
            </div>
            <div className="glass-panel p-4 rounded-2xl border border-brand-border">
              <span className="text-2xl font-black text-brand-gold">3-5 Days</span>
              <p className="text-xs text-brand-muted mt-0.5">Express Delivery Across India</p>
            </div>
            <div className="glass-panel p-4 rounded-2xl border border-brand-border">
              <span className="text-2xl font-black text-brand-gold">4.9 / 5.0</span>
              <p className="text-xs text-brand-muted mt-0.5">Customer Quality Rating</p>
            </div>
          </div>

        </div>
      </section>

      {/* FEATURED DROPS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-b border-brand-border pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-brand-gold flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-amber-500" /> Limited Atelier Drops
            </span>
            <h2 className="text-3xl font-extrabold text-brand-pearl mt-1">Featured Bespoke Pieces</h2>
          </div>
          <Link href="/shop" className="text-xs font-bold text-brand-gold hover:underline flex items-center gap-1">
            View All Drops <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* EMBEDDED BESPOKE STUDIO TEASER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <CustomizerStudio />
      </section>

      {/* BRAND VALUES / ZERO INVENTORY PROMISE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-brand-gold/30 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-brand-gold/10 text-brand-gold flex items-center justify-center border border-brand-gold/30">
              <Leaf className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-brand-pearl">Zero-Inventory Fashion</h3>
            <p className="text-xs text-brand-muted leading-relaxed">
              Fast fashion produces 92 million tons of textile landfill waste per year. KultZR prints every garment specifically for you upon purchase.
            </p>
          </div>

          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-brand-gold/10 text-brand-gold flex items-center justify-center border border-brand-gold/30">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-brand-pearl">Uncompromised Quality</h3>
            <p className="text-xs text-brand-muted leading-relaxed">
              We never compromise. 100% combed organic cotton, double-stitched seams, high-density OEKO-TEX eco-inks, and pre-shrunk fabric weight.
            </p>
          </div>

          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-brand-gold/10 text-brand-gold flex items-center justify-center border border-brand-gold/30">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-brand-pearl">Empowered Expression</h3>
            <p className="text-xs text-brand-muted leading-relaxed">
              Your attire should make a statement. Add your quote, name, or story emblem to create a piece that is 100% unique to you.
            </p>
          </div>
        </div>
      </section>

      {/* UGC TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-gold">#WearYourStory Community</span>
          <h2 className="text-3xl font-extrabold text-brand-pearl">Real Customer Stories</h2>
          <p className="text-xs text-brand-muted">See how creators, founders, and artists wear their KultZR custom pieces.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOCK_TESTIMONIALS.map(story => (
            <div key={story.id} className="glass-panel p-6 rounded-2xl border border-brand-border space-y-4">
              <div className="flex items-center gap-3">
                <img src={story.avatar} alt={story.name} className="w-10 h-10 rounded-full object-cover border border-brand-gold/40" />
                <div>
                  <h4 className="font-bold text-xs text-brand-pearl">{story.name}</h4>
                  <p className="text-[11px] text-brand-muted">{story.role}</p>
                </div>
              </div>

              <div className="flex text-brand-gold gap-0.5">
                {[...Array(story.rating || 5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-brand-gold" />
                ))}
              </div>

              <p className="text-xs text-brand-pearl italic">&quot;{story.text}&quot;</p>
              
              <div className="pt-2 border-t border-brand-border/60 text-[10px] text-brand-gold font-semibold">
                Custom Piece: &quot;{story.storyTag}&quot;
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* NEWSLETTER BANNER */}
      <section id="newsletter" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative glass-panel p-8 sm:p-12 rounded-3xl border border-brand-gold/40 text-center space-y-6 overflow-hidden">
          <div className="space-y-2 max-w-xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-gold">Join The KultZR Circle</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-pearl">Unlock 15% Off Your First Bespoke Piece</h2>
            <p className="text-xs text-brand-muted">Subscribe for exclusive story drop access, custom emblem unlocks, and secret discounts.</p>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); alert('Thank you for subscribing to KultZR!'); }} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              required
              placeholder="Enter your email address..."
              className="w-full bg-brand-dark border border-brand-border rounded-full px-5 py-3 text-xs text-brand-pearl focus:outline-none focus:border-brand-gold"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-brand-gold text-brand-dark font-extrabold text-xs rounded-full hover:bg-amber-400 transition-colors shrink-0 flex items-center justify-center gap-2 cursor-pointer"
            >
              Subscribe <Send className="w-3.5 h-3.5" />
            </button>
          </form>

          <p className="text-[10px] text-brand-muted">No spam. Unsubscribe at any time with 1 click.</p>
        </div>
      </section>

    </div>
  );
}
