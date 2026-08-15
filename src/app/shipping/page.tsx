import React from 'react';
import { Truck, Clock, MapPin, ShieldCheck } from 'lucide-react';

export const metadata = {
  title: 'Shipping & Delivery Times | KultZR',
  description: 'Learn about KultZR on-demand printing fulfillment timelines and shipping across India.',
};

export default function ShippingPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      <div className="space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-gold flex items-center gap-1.5">
          <Truck className="w-4 h-4" /> Fast & Plastic-Free Delivery
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-brand-pearl">Shipping & Delivery Times</h1>
        <p className="text-brand-muted text-sm leading-relaxed">
          Because KultZR operates on a zero-inventory on-demand model, every piece is custom printed and quality inspected before shipment.
        </p>
      </div>

      {/* Timeline Steps */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-6 rounded-2xl border border-brand-border space-y-2">
          <div className="w-8 h-8 rounded-lg bg-brand-gold/10 text-brand-gold flex items-center justify-center font-bold text-xs">
            01
          </div>
          <h3 className="font-bold text-brand-pearl">Order Confirmation</h3>
          <p className="text-xs text-brand-muted">
            Instant receipt confirmation via email & SMS. Your design vector is sent to our print atelier.
          </p>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-brand-border space-y-2">
          <div className="w-8 h-8 rounded-lg bg-brand-gold/10 text-brand-gold flex items-center justify-center font-bold text-xs">
            02
          </div>
          <h3 className="font-bold text-brand-pearl">On-Demand Printing (24-48 Hours)</h3>
          <p className="text-xs text-brand-muted">
            High-density OEKO-TEX certified eco-friendly digital printing and 3-point quality check.
          </p>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-brand-border space-y-2">
          <div className="w-8 h-8 rounded-lg bg-brand-gold/10 text-brand-gold flex items-center justify-center font-bold text-xs">
            03
          </div>
          <h3 className="font-bold text-brand-pearl">Express Shipping (2-4 Days)</h3>
          <p className="text-xs text-brand-muted">
            Dispatched via BlueDart / Delhivery / Bluedart Air with live GPS tracking link.
          </p>
        </div>
      </div>

      {/* Breakdown Table */}
      <div className="glass-panel p-6 rounded-2xl border border-brand-border space-y-4">
        <h3 className="font-bold text-lg text-brand-pearl flex items-center gap-2">
          <Clock className="w-5 h-5 text-brand-gold" /> Estimated Delivery Windows
        </h3>

        <div className="divide-y divide-brand-border text-xs text-brand-pearl">
          <div className="py-3 flex justify-between">
            <span className="text-brand-muted">Metro Cities (Mumbai, Delhi, Bengaluru, Hyderabad, Chennai)</span>
            <span className="font-bold text-brand-gold">3 - 4 Business Days</span>
          </div>
          <div className="py-3 flex justify-between">
            <span className="text-brand-muted">Rest of India (Tier 2 & Tier 3 Cities)</span>
            <span className="font-bold text-brand-gold">4 - 6 Business Days</span>
          </div>
          <div className="py-3 flex justify-between">
            <span className="text-brand-muted">North-East & Remote Regions</span>
            <span className="font-bold text-brand-gold">5 - 7 Business Days</span>
          </div>
        </div>
      </div>

      {/* Free Shipping Callout */}
      <div className="p-4 rounded-xl bg-brand-card border border-brand-border flex items-center gap-3 text-xs text-brand-pearl">
        <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0" />
        <div>
          <p className="font-bold">Free Express Shipping across India on all orders over ₹999.</p>
          <p className="text-brand-muted text-[11px]">All orders packaged in 100% biodegradable cassava plastic-free mailers.</p>
        </div>
      </div>

    </div>
  );
}
