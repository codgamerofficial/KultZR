'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { fetchProducts } from '@/lib/supabase';
import { Product } from '@/lib/types';
import { ArrowRight, Check, Leaf, Search, ShieldCheck, Sparkles, Truck } from 'lucide-react';

const categories = ['All', 'Men', 'Women', 'Unisex', 'Accessories'];

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');

  useEffect(() => {
    let active = true;
    fetchProducts()
      .then(data => { if (active) setProducts(data); })
      .catch(() => { if (active) setProducts([]); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  const visibleProducts = products.filter((product: any) => {
    const text = `${product.title || ''} ${product.description || ''} ${product.category || ''}`.toLowerCase();
    const matchesSearch = text.includes(query.trim().toLowerCase());
    if (category === 'All') return matchesSearch;
    return matchesSearch && text.includes(category.toLowerCase());
  }).slice(0, 8);

  return (
    <div className="bg-brand-dark text-brand-pearl">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-brand-border/70">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_35%,rgba(212,175,55,0.14),transparent_35%),linear-gradient(115deg,#08080A_0%,#0D0D10_60%,#14120C_100%)]" />
        <div className="relative mx-auto grid min-h-[72vh] max-w-7xl items-center gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[1.05fr_.95fr] lg:py-20">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-gold/30 bg-brand-gold/5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-brand-gold">
              <Sparkles className="h-3.5 w-3.5" /> KultZR / India Edition
            </span>
            <h1 className="mt-7 text-5xl font-black leading-[0.88] tracking-[-0.06em] sm:text-7xl lg:text-[7.2rem]">
              WEAR YOUR<br /><span className="gold-gradient-text">CULTURE.</span>
            </h1>
            <p className="mt-7 max-w-xl text-sm leading-7 text-brand-muted sm:text-base">
              Streetwear for a generation rewriting the rules. Discover original KultZR drops designed for modern India.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/shop" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-brand-gold px-6 text-xs font-black uppercase tracking-[0.14em] text-brand-dark transition-transform hover:-translate-y-0.5">
                Shop New Drops <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/story" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-brand-border bg-white/[0.03] px-6 text-xs font-bold uppercase tracking-[0.14em] text-brand-pearl transition-colors hover:border-brand-gold/50">
                Our Story
              </Link>
            </div>
            <div className="mt-10 grid max-w-xl grid-cols-3 gap-4 border-t border-brand-border/80 pt-5">
              <div><p className="text-xs font-bold text-brand-pearl">ON-DEMAND</p><p className="mt-1 text-[10px] text-brand-muted">Made after purchase</p></div>
              <div><p className="text-xs font-bold text-brand-pearl">SECURE PAYMENTS</p><p className="mt-1 text-[10px] text-brand-muted">Protected checkout</p></div>
              <div><p className="text-xs font-bold text-brand-pearl">TRACKABLE</p><p className="mt-1 text-[10px] text-brand-muted">Follow your order</p></div>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[520px]">
            <div className="aspect-[4/5] overflow-hidden rounded-[28px] border border-white/10 bg-brand-card shadow-2xl shadow-black/40">
              {products[0]?.images?.[0] ? (
                <img src={products[0].images[0]} alt={products[0].title || 'KultZR new drop'} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full flex-col justify-end bg-[linear-gradient(145deg,#242424,#0D0D0F)] p-7">
                  <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-gold">Editorial / KultZR</span>
                  <p className="mt-3 max-w-xs text-4xl font-black leading-none tracking-[-0.05em] text-white">THE NEXT DROP STARTS HERE.</p>
                  <div className="mt-6 h-px w-24 bg-brand-gold" />
                  <p className="mt-3 text-xs text-white/60">Original streetwear. Made on demand.</p>
                </div>
              )}
            </div>
            <div className="absolute -bottom-4 -left-4 rounded-2xl border border-brand-gold/30 bg-brand-dark/90 px-4 py-3 backdrop-blur-md">
              <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-brand-gold">KULTZR DROP</p>
              <p className="mt-1 text-xs font-bold text-white">Original. On demand.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Ticker */}
      <div className="overflow-hidden border-b border-brand-border bg-brand-gold py-2 text-brand-dark">
        <div className="animate-marquee whitespace-nowrap text-[10px] font-black uppercase tracking-[0.25em]">
          <span className="mx-8">WEAR YOUR CULTURE</span><span className="mx-8">NEW DROPS</span><span className="mx-8">MADE ON DEMAND</span><span className="mx-8">TRACKABLE ORDERS</span><span className="mx-8">WEAR YOUR CULTURE</span><span className="mx-8">NEW DROPS</span>
        </div>
      </div>

      {/* Products */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
        <div className="flex flex-col gap-6 border-b border-brand-border pb-7 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-gold">Fresh from KultZR</p>
            <h2 className="mt-2 text-4xl font-black tracking-[-0.04em] sm:text-5xl">NEW DROPS.</h2>
            <p className="mt-2 max-w-xl text-sm text-brand-muted">Real products only. Browse the latest pieces available in the live KultZR catalog.</p>
          </div>
          <Link href="/shop" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.14em] text-brand-gold">View all <ArrowRight className="h-4 w-4" /></Link>
        </div>

        <div className="mt-7 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-muted" />
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search the drop..." aria-label="Search KultZR products" className="h-11 w-full rounded-xl border border-brand-border bg-brand-card pl-10 pr-4 text-xs text-brand-pearl outline-none transition-colors focus:border-brand-gold/60" />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map(item => <button key={item} onClick={() => setCategory(item)} className={`min-h-10 rounded-xl border px-4 text-[10px] font-bold uppercase tracking-[0.12em] transition-colors ${category === item ? 'border-brand-gold bg-brand-gold text-brand-dark' : 'border-brand-border bg-brand-card text-brand-muted hover:text-brand-pearl'}`}>{item}</button>)}
          </div>
        </div>

        <div className="mt-8">
          {loading ? (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => <div key={i} className="overflow-hidden rounded-2xl border border-brand-border bg-brand-card"><div className="aspect-[4/5] animate-pulse bg-white/[0.04]" /><div className="space-y-2 p-4"><div className="h-3 w-2/3 animate-pulse rounded bg-white/[0.06]" /><div className="h-3 w-1/3 animate-pulse rounded bg-white/[0.06]" /></div></div>)}
            </div>
          ) : visibleProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-5">
              {visibleProducts.map(product => <ProductCard key={product.id} product={product} />)}
            </div>
          ) : (
            <div className="rounded-[24px] border border-brand-border bg-brand-card px-6 py-16 text-center">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-gold">KultZR is preparing the next drop</p>
              <h3 className="mt-3 text-2xl font-black tracking-[-0.03em] sm:text-3xl">THE NEXT DROP IS STAGING.</h3>
              <p className="mx-auto mt-3 max-w-md text-xs leading-6 text-brand-muted">The customer catalog is currently empty. Explore the brand story while the next real collection is being prepared.</p>
              <Link href="/story" className="mt-6 inline-flex items-center gap-2 rounded-xl border border-brand-gold/50 px-5 py-3 text-xs font-black uppercase tracking-[0.12em] text-brand-gold">Explore our story <ArrowRight className="h-4 w-4" /></Link>
            </div>
          )}
        </div>
      </section>

      {/* Editorial */}
      <section className="border-y border-brand-border bg-brand-card/40">
        <div className="mx-auto grid max-w-7xl gap-0 px-5 sm:px-8 lg:grid-cols-[.85fr_1.15fr]">
          <div className="flex min-h-[340px] flex-col justify-center border-b border-brand-border py-12 lg:border-b-0 lg:border-r lg:pr-14">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-gold">Editorial / 01</p>
            <h2 className="mt-4 text-4xl font-black leading-[0.92] tracking-[-0.05em] sm:text-6xl">RAW.<br />AUTHENTIC.<br /><span className="gold-gradient-text">STREET.</span></h2>
            <p className="mt-5 max-w-md text-sm leading-6 text-brand-muted">Built around individuality, modern India and the freedom to wear what feels like you.</p>
            <Link href="/story" className="mt-7 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.14em] text-brand-pearl">Read the story <ArrowRight className="h-4 w-4 text-brand-gold" /></Link>
          </div>
          <div className="flex min-h-[340px] items-center justify-center p-6 sm:p-10 lg:p-14">
            <div className="w-full border border-white/10 bg-white/[0.03] p-5 sm:p-8">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-gold">KultZR / India Edition</p>
              <p className="mt-5 max-w-2xl text-4xl font-black leading-[0.95] tracking-[-0.05em] text-white sm:text-6xl">WEAR YOUR CULTURE WITHOUT COMPROMISE.</p>
              <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-5"><span className="text-[10px] text-brand-muted">ORIGINAL DESIGN / ON-DEMAND</span><Link href="/shop" className="text-xs font-black uppercase tracking-[0.12em] text-brand-gold">Shop <ArrowRight className="ml-1 inline h-3.5 w-3.5" /></Link></div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
        <div className="grid gap-px overflow-hidden rounded-2xl border border-brand-border bg-brand-border md:grid-cols-3">
          <div className="bg-brand-card p-7"><Leaf className="h-5 w-5 text-brand-gold" /><h3 className="mt-5 text-lg font-black">Made on demand</h3><p className="mt-2 text-xs leading-6 text-brand-muted">We produce after an order is placed, keeping the model lean and reducing unnecessary inventory.</p></div>
          <div className="bg-brand-card p-7"><ShieldCheck className="h-5 w-5 text-brand-gold" /><h3 className="mt-5 text-lg font-black">Secure checkout</h3><p className="mt-2 text-xs leading-6 text-brand-muted">Payments are processed through the secured checkout flow and orders are verified server-side.</p></div>
          <div className="bg-brand-card p-7"><Truck className="h-5 w-5 text-brand-gold" /><h3 className="mt-5 text-lg font-black">Track your order</h3><p className="mt-2 text-xs leading-6 text-brand-muted">Once carrier information is available, you can follow the shipment from your account.</p></div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="border-t border-brand-border bg-brand-card/50">
        <div className="mx-auto max-w-4xl px-5 py-16 text-center sm:px-8 lg:py-20">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-gold">Join the culture</p>
          <h2 className="mt-3 text-4xl font-black tracking-[-0.04em] sm:text-5xl">FIRST TO THE DROP.</h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-brand-muted">Get new-release announcements and collection updates. No fake urgency. No noise.</p>
          <form onSubmit={e => e.preventDefault()} className="mx-auto mt-7 flex max-w-lg flex-col gap-2 sm:flex-row">
            <input type="email" required placeholder="Email address" aria-label="Email address" className="h-12 flex-1 rounded-xl border border-brand-border bg-brand-dark px-4 text-xs text-brand-pearl outline-none focus:border-brand-gold/60" />
            <button type="submit" className="h-12 rounded-xl bg-brand-gold px-6 text-xs font-black uppercase tracking-[0.12em] text-brand-dark">Join KultZR</button>
          </form>
        </div>
      </section>

      <div className="sr-only"><Check /></div>
    </div>
  );
}
