'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShieldCheck, Leaf, Sparkles, Send, CheckCircle2 } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-brand-secondary border-t border-brand-border text-brand-pearl pt-16 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Value Proposition Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12 border-b border-brand-border/60">
          <div className="flex items-start gap-4 p-6 rounded-2xl bg-brand-card/40 border border-brand-border/40">
            <div className="p-3 bg-brand-gold/10 text-brand-gold rounded-xl">
              <Leaf className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-base">Zero Inventory & Waste</h4>
              <p className="text-xs text-brand-muted mt-1 leading-relaxed">
                Every garment is printed on-demand only when you order. Zero unsold stock ending up in landfills.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-6 rounded-2xl bg-brand-card/40 border border-brand-border/40">
            <div className="p-3 bg-brand-gold/10 text-brand-gold rounded-xl">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-base">Story-Driven Customization</h4>
              <p className="text-xs text-brand-muted mt-1 leading-relaxed">
                Print your own quotes, symbols, or artwork on luxury 240 GSM organic combed cotton.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-6 rounded-2xl bg-brand-card/40 border border-brand-border/40">
            <div className="p-3 bg-brand-gold/10 text-brand-gold rounded-xl">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-base">Ethical & GST Compliant</h4>
              <p className="text-xs text-brand-muted mt-1 leading-relaxed">
                100% secure checkout powered by Razorpay. Includes Indian GST invoice and global dispatch options.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 py-12">
          
          {/* Column 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-gold to-amber-200 text-brand-dark flex items-center justify-center font-bold text-lg">
                K
              </div>
              <span className="text-xl font-bold gold-gradient-text">KultZR</span>
            </div>
            <p className="text-xs text-brand-muted leading-relaxed">
              KultZR (“kul-zar”) embodies culture, community, and personal clarity. Wear your identity with pride.
            </p>
            <div className="text-[11px] text-brand-muted/70">
              <p>GSTIN: 27AAAAA0000A1Z5 (Registered)</p>
              <p>Made with passion in India for the world.</p>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="space-y-3">
            <h5 className="font-bold text-sm text-brand-pearl tracking-wide uppercase">Explore Collections</h5>
            <ul className="space-y-2 text-xs text-brand-muted">
              <li><Link href="/shop?category=men" className="hover:text-brand-gold transition-colors">Men&apos;s Streetwear</Link></li>
              <li><Link href="/shop?category=women" className="hover:text-brand-gold transition-colors">Women&apos;s Apparel</Link></li>
              <li><Link href="/shop?category=unisex" className="hover:text-brand-gold transition-colors">Unisex Heavyweight Tees</Link></li>
              <li><Link href="/shop?category=accessories" className="hover:text-brand-gold transition-colors">Canvas Totes & Accessories</Link></li>
              <li><Link href="/customize" className="text-brand-gold font-semibold hover:underline">Interactive Design Studio</Link></li>
            </ul>
          </div>

          {/* Column 3: Legal & Support */}
          <div className="space-y-3">
            <h5 className="font-bold text-sm text-brand-pearl tracking-wide uppercase">Customer Care</h5>
            <ul className="space-y-2 text-xs text-brand-muted">
              <li><Link href="/story" className="hover:text-brand-gold transition-colors">About KultZR</Link></li>
              <li><a href="#shipping" className="hover:text-brand-gold transition-colors">Shipping & Delivery Times</a></li>
              <li><a href="#returns" className="hover:text-brand-gold transition-colors">30-Day Quality Guarantee</a></li>
              <li><a href="#terms" className="hover:text-brand-gold transition-colors">Terms of Service</a></li>
              <li><a href="#privacy" className="hover:text-brand-gold transition-colors">Privacy Policy & GDPR</a></li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="space-y-4">
            <h5 className="font-bold text-sm text-brand-pearl tracking-wide uppercase">Join Our Story</h5>
            <p className="text-xs text-brand-muted">
              Subscribe to receive exclusive limited drop access and 10% off your first custom piece.
            </p>
            {subscribed ? (
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-xl text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                <span>You&apos;re subscribed! Check your inbox for your 10% discount code.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 bg-brand-dark border border-brand-border rounded-xl px-3 py-2 text-xs text-brand-pearl focus:outline-none focus:border-brand-gold"
                />
                <button
                  type="submit"
                  className="p-2.5 bg-brand-gold text-brand-dark rounded-xl hover:bg-amber-400 transition-colors font-bold"
                  aria-label="Subscribe"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-brand-border/40 text-center text-xs text-brand-muted flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} KultZR – Wear Your Story. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Instant Razorpay Checkout</span>
            <span>Made to Order</span>
            <span>Zero Plastic Packaging</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
