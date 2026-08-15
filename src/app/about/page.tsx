import React from 'react';
import { ShieldCheck, Sparkles, Leaf, Award } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'About KultZR | Zero-Inventory Luxury Fashion',
  description: 'Learn about KultZR – Wear Your Story. Discover our zero-waste on-demand luxury apparel model.',
};

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Hero */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-gold flex items-center justify-center gap-1.5">
          <Sparkles className="w-4 h-4" /> Craft Over Mass Production
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-brand-pearl">About KultZR – Wear Your Story</h1>
        <p className="text-brand-muted text-sm sm:text-base leading-relaxed">
          KultZR was founded on a simple principle: clothing should be a reflection of your personal narrative, not mass-market overflow. We combine 240 GSM organic cotton with zero-waste print-on-demand technology.
        </p>
      </div>

      {/* Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-6 rounded-2xl border border-brand-border space-y-3">
          <div className="w-10 h-10 rounded-xl bg-brand-gold/10 text-brand-gold flex items-center justify-center border border-brand-gold/30">
            <Leaf className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-brand-pearl">Zero-Inventory Model</h3>
          <p className="text-xs text-brand-muted leading-relaxed">
            Every piece is printed only when you order. No overproduction, no unsold landfill waste, and zero unnecessary carbon footprint.
          </p>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-brand-border space-y-3">
          <div className="w-10 h-10 rounded-xl bg-brand-gold/10 text-brand-gold flex items-center justify-center border border-brand-gold/30">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-brand-pearl">240 GSM Luxury Heavyweight</h3>
          <p className="text-xs text-brand-muted leading-relaxed">
            We use 100% combed organic cotton, bio-washed and pre-shrunk for an uncompromised drape and feel that lasts years.
          </p>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-brand-border space-y-3">
          <div className="w-10 h-10 rounded-xl bg-brand-gold/10 text-brand-gold flex items-center justify-center border border-brand-gold/30">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-brand-pearl">Bespoke Empowerment</h3>
          <p className="text-xs text-brand-muted leading-relaxed">
            Our 2D Studio gives you full creative freedom to add quotes, emblems, and mantras that express who you are.
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="glass-panel p-8 rounded-3xl border border-brand-gold/30 text-center space-y-4">
        <h2 className="text-2xl font-bold text-brand-pearl">Ready to Design Your Story Piece?</h2>
        <p className="text-xs text-brand-muted max-w-md mx-auto">
          Explore our customizable catalog or enter the Bespoke Studio to start creating.
        </p>
        <div className="flex justify-center gap-4 pt-2">
          <Link href="/customize" className="px-6 py-3 bg-brand-gold text-brand-dark font-extrabold text-xs rounded-full hover:bg-amber-400 transition-colors">
            Enter Bespoke Studio
          </Link>
          <Link href="/shop" className="px-6 py-3 bg-brand-card text-brand-pearl font-bold text-xs rounded-full border border-brand-border">
            Browse Catalog
          </Link>
        </div>
      </div>

    </div>
  );
}
