import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Leaf, Sparkles, ShieldCheck, HeartHandshake, ArrowRight } from 'lucide-react';

export default function StoryPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-extrabold uppercase tracking-widest text-brand-gold">
          The KultZR Manifesto
        </span>
        <h1 className="text-4xl sm:text-6xl font-black text-brand-pearl">
          WEAR YOUR STORY.
        </h1>
        <p className="text-base text-brand-muted leading-relaxed">
          Pronounced <span className="text-brand-gold font-bold">&quot;kul-zar&quot;</span>, KultZR evokes culture, community, and personal clarity. Fashion is no longer about fitting into a brand&apos;s mold—it is about carving your legacy on your own terms.
        </p>
      </div>

      {/* Hero Visual */}
      <div className="relative aspect-21/9 w-full rounded-3xl overflow-hidden glass-panel border border-brand-gold/30 shadow-2xl">
        <Image
          src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&q=80&w=1600"
          alt="KultZR Brand Atelier"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-brand-dark via-brand-dark/40 to-transparent" />
        <div className="absolute bottom-8 left-8 right-8 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-brand-gold uppercase tracking-widest">Our Foundation</span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-brand-pearl">Zero Inventory. Infinite Expression.</h2>
          </div>
          <Link
            href="/customize"
            className="px-6 py-3 bg-brand-gold text-brand-dark font-extrabold text-xs rounded-full hover:bg-amber-400 transition-colors shadow-lg"
          >
            Design Your Piece &rarr;
          </Link>
        </div>
      </div>

      {/* Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="glass-card p-8 rounded-3xl border border-brand-border space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
            <Leaf className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-brand-pearl">Zero Waste Commitment</h3>
          <p className="text-xs text-brand-muted leading-relaxed">
            Over 92 million tons of textile waste enter landfills each year due to overproduction in fast fashion. KultZR eliminates unsold stock completely by producing only when an order is placed.
          </p>
        </div>

        <div className="glass-card p-8 rounded-3xl border border-brand-border space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-brand-gold/10 text-brand-gold flex items-center justify-center font-bold">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-brand-pearl">Uncompromising Craftsmanship</h3>
          <p className="text-xs text-brand-muted leading-relaxed">
            We use 240 GSM organic combed cotton, bio-washed pre-shrunk fabrics, and high-density eco-inks. Every seam is constructed for structure, comfort, and durability.
          </p>
        </div>

        <div className="glass-card p-8 rounded-3xl border border-brand-border space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-brand-gold/10 text-brand-gold flex items-center justify-center font-bold">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-brand-pearl">Community & Empowerment</h3>
          <p className="text-xs text-brand-muted leading-relaxed">
            Whether you are an artist uploading your embroidery pattern, a founder printing your mantra, or a creator sharing your vision, KultZR provides the canvas to wear your legacy.
          </p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="glass-panel p-10 rounded-3xl text-center space-y-6 border border-brand-gold/30">
        <h2 className="text-3xl font-extrabold text-brand-pearl">Ready to Tell Your Story?</h2>
        <p className="text-xs text-brand-muted max-w-lg mx-auto">
          Explore our collection or launch the bespoke customizer studio to create your piece today.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/customize"
            className="px-8 py-3.5 bg-brand-gold text-brand-dark font-extrabold text-xs rounded-full hover:bg-amber-400 transition-colors shadow-lg"
          >
            Launch Design Studio
          </Link>
          <Link
            href="/shop"
            className="px-8 py-3.5 bg-brand-card text-brand-pearl font-bold text-xs rounded-full border border-brand-border hover:border-brand-gold transition-colors"
          >
            Browse Shop
          </Link>
        </div>
      </div>

    </div>
  );
}
