import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ProductCard from '@/components/ProductCard';
import CustomizerStudio from '@/components/CustomizerStudio';
import { MOCK_PRODUCTS, MOCK_TESTIMONIALS } from '@/lib/mockData';
import { Sparkles, ArrowRight, ShieldCheck, Leaf, HeartHandshake, Star, Flame } from 'lucide-react';

export default function HomePage() {
  const featuredProducts = MOCK_PRODUCTS.filter(p => p.is_featured || p.rating >= 4.9);

  return (
    <div className="space-y-24 pb-16">
      
      {/* HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden pt-8">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-brand-gold/15 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-75 h-75 bg-amber-500/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative max-w-5xl mx-auto text-center space-y-8 z-10">
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-brand-gold/40 text-brand-gold text-xs font-bold uppercase tracking-widest animate-glow shadow-lg shadow-amber-500/10">
            <Sparkles className="w-4 h-4" /> Zero-Inventory Luxury Fashion
          </div>

          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-[1.05]">
            WEAR YOUR <br />
            <span className="gold-gradient-text">STORY.</span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-xl text-brand-muted font-normal leading-relaxed">
            KultZR is your personal canvas. Print your quotes, legacy, and identity on bespoke 240 GSM organic cotton apparel. Made on-demand with zero waste.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/customize"
              className="w-full sm:w-auto px-8 py-4 bg-linear-to-r from-amber-400 via-brand-gold to-amber-500 text-brand-dark font-extrabold text-base rounded-full shadow-xl shadow-amber-500/20 hover:scale-105 transition-transform flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5" /> Launch Design Studio
            </Link>

            <Link
              href="/shop"
              className="w-full sm:w-auto px-8 py-4 bg-brand-card/80 text-brand-pearl font-bold text-base rounded-full border border-brand-border hover:border-brand-gold transition-colors flex items-center justify-center gap-2"
            >
              Explore Shop <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Social Proof */}
          <div className="pt-8 flex flex-wrap items-center justify-center gap-8 text-xs text-brand-muted border-t border-brand-border/40 max-w-3xl mx-auto">
            <div className="flex items-center gap-2">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="font-bold text-brand-pearl">4.9/5</span> Rating (500+ Stories Worn)
            </div>
            <div className="flex items-center gap-2">
              <Leaf className="w-4 h-4 text-emerald-400" />
              <span>100% Zero-Waste Production</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-brand-gold" />
              <span>Free Shipping Across India</span>
            </div>
          </div>

        </div>
      </section>

      {/* BRAND VALUES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-panel p-8 rounded-3xl border border-brand-border/80 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-gold/10 text-brand-gold flex items-center justify-center font-bold">
              <Leaf className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-brand-pearl">Zero Inventory Model</h3>
            <p className="text-sm text-brand-muted leading-relaxed">
              Fast fashion causes millions of unsold garments to go to waste. KultZR only prints after you order—protecting the planet while honoring your individuality.
            </p>
          </div>

          <div className="glass-panel p-8 rounded-3xl border border-brand-border/80 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-gold/10 text-brand-gold flex items-center justify-center font-bold">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-brand-pearl">Bespoke Customization</h3>
            <p className="text-sm text-brand-muted leading-relaxed">
              Use our live 2D studio to print your favorite quotes, family mantras, or original art in high-density eco-inks or 3D thread embroidery.
            </p>
          </div>

          <div className="glass-panel p-8 rounded-3xl border border-brand-border/80 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-gold/10 text-brand-gold flex items-center justify-center font-bold">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-brand-pearl">240 GSM Luxury Organic Cotton</h3>
            <p className="text-sm text-brand-muted leading-relaxed">
              Crafted from combed organic cotton with pre-shrunk bio-wash. Built to feel heavy, structured, and luxurious on your skin for years.
            </p>
          </div>
        </div>
      </section>

      {/* FEATURED DROPS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-b border-brand-border pb-6">
          <div>
            <div className="flex items-center gap-2 text-brand-gold text-xs font-extrabold uppercase tracking-widest">
              <Flame className="w-4 h-4 text-amber-400" /> Featured Drops
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-pearl mt-1">
              Curated Canvas Apparel
            </h2>
          </div>
          <Link href="/shop" className="text-sm font-bold text-brand-gold hover:underline flex items-center gap-1">
            View All Products ({MOCK_PRODUCTS.length}) &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* INTERACTIVE CUSTOMIZER TEASER STUDIO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="px-3 py-1 rounded-full bg-brand-gold/20 text-brand-gold text-xs font-extrabold uppercase tracking-widest">
            Try It Now
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-brand-pearl">
            Design Your Piece in Real-Time
          </h2>
          <p className="text-sm text-brand-muted">
            Type your mantra, pick your font, select your garment color, and preview it live below.
          </p>
        </div>

        <CustomizerStudio />
      </section>

      {/* USER STORIES & UGC GALLERY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-brand-gold text-xs font-bold uppercase tracking-widest">#WearYourStory</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-pearl">
            Worn by Visionaries & Storytellers
          </h2>
          <p className="text-xs text-brand-muted">
            Real customers wearing their personal legacy and custom designs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {MOCK_TESTIMONIALS.map(item => (
            <div key={item.id} className="glass-card p-6 rounded-3xl border border-brand-border space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex text-amber-400">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-brand-pearl italic leading-relaxed">
                  &quot;{item.text}&quot;
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-brand-border/40">
                <div className="w-10 h-10 rounded-full overflow-hidden relative bg-brand-dark">
                  <Image src={item.avatar} alt={item.name} fill className="object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-brand-pearl">{item.name}</h4>
                  <p className="text-xs text-brand-muted">{item.role}</p>
                </div>
                <span className="ml-auto text-[10px] font-bold text-brand-gold bg-brand-gold/10 px-2 py-1 rounded-md">
                  {item.storyTag}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* NEWSLETTER BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel p-10 sm:p-14 rounded-3xl border border-brand-gold/40 text-center space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold/10 blur-3xl pointer-events-none" />
          <h2 className="text-3xl sm:text-5xl font-black text-brand-pearl">
            Ready to Wear Your Story?
          </h2>
          <p className="text-sm text-brand-muted max-w-xl mx-auto leading-relaxed">
            Join the KultZR inner circle. Get priority access to limited drops, custom embroidery releases, and ₹300 off your first bespoke order.
          </p>
          <div className="pt-2 flex justify-center">
            <Link
              href="/customize"
              className="px-8 py-4 bg-linear-to-r from-amber-400 to-brand-gold text-brand-dark font-extrabold text-base rounded-full shadow-xl shadow-amber-500/20 hover:scale-105 transition-transform"
            >
              Start Customizing Now &rarr;
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
