import React from 'react';
import Link from 'next/link';
import { Sparkles, ShieldCheck, Truck, RefreshCw, ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-brand-secondary border-t border-brand-border text-brand-pearl pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Grid: Value Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-12 border-b border-brand-border/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-gold/10 text-brand-gold flex items-center justify-center border border-brand-gold/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm">Zero Inventory</h4>
              <p className="text-xs text-brand-muted">Printed on-demand with zero waste</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-gold/10 text-brand-gold flex items-center justify-center border border-brand-gold/30">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm">Fast Shipping</h4>
              <p className="text-xs text-brand-muted">3-5 business days across India</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-gold/10 text-brand-gold flex items-center justify-center border border-brand-gold/30">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm">30-Day Guarantee</h4>
              <p className="text-xs text-brand-muted">Free size & quality exchanges</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-gold/10 text-brand-gold flex items-center justify-center border border-brand-gold/30">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm">240 GSM Luxury</h4>
              <p className="text-xs text-brand-muted">100% Combed organic cotton</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Brand Info (4 cols) */}
          <div className="md:col-span-4 space-y-4">
            <Link href="/" className="inline-block">
              <img src="/brand/logo-horizontal.svg" alt="KultZR Logo" className="h-10 w-auto object-contain" />
            </Link>
            <p className="text-xs text-brand-muted leading-relaxed max-w-sm">
              Wear Your Story. Modern, sustainable luxury apparel printed exclusively on-demand. Zero inventory, uncompromised quality.
            </p>
            <div className="pt-2 text-xs text-brand-gold font-bold">
              GST Registered Entity • GSTIN: 27AAACK1234F1Z9
            </div>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-brand-gold">Brand & Catalog</h4>
            <ul className="space-y-2 text-xs text-brand-muted">
              <li>
                <Link href="/about" className="hover:text-brand-pearl transition-colors">About KultZR</Link>
              </li>
              <li>
                <Link href="/story" className="hover:text-brand-pearl transition-colors">Brand Manifesto</Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-brand-pearl transition-colors">Explore Collections</Link>
              </li>
            </ul>
          </div>

          {/* Customer Care & Policies (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-brand-gold">Customer Care</h4>
            <ul className="space-y-2 text-xs text-brand-muted">
              <li>
                <Link href="/track" className="hover:text-brand-pearl transition-colors font-semibold text-brand-pearl">Track Order Status</Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-brand-pearl transition-colors">Shipping & Delivery Times</Link>
              </li>
              <li>
                <Link href="/guarantee" className="hover:text-brand-pearl transition-colors">30-Day Quality Guarantee</Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-brand-pearl transition-colors">Terms of Service</Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-brand-pearl transition-colors">Privacy Policy & GDPR</Link>
              </li>
            </ul>
          </div>

          {/* Newsletter (2 cols) */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-brand-gold">Stay Updated</h4>
            <p className="text-[11px] text-brand-muted">Join the story drop circle for secret releases.</p>
            <Link
              href="/#newsletter"
              className="inline-flex items-center gap-1 text-xs font-bold text-brand-gold hover:underline"
            >
              Subscribe Newsletter <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-brand-border/60 flex flex-col sm:flex-row items-center justify-between text-xs text-brand-muted gap-4">
          <p>© {new Date().getFullYear()} KultZR – Wear Your Story. All rights reserved.</p>
          <div className="flex items-center gap-6 text-[11px]">
            <Link href="/privacy" className="hover:text-brand-pearl transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-brand-pearl transition-colors">Terms</Link>
            <Link href="/guarantee" className="hover:text-brand-pearl transition-colors">Guarantee</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
