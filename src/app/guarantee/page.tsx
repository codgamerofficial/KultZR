import React from 'react';
import { ShieldCheck, RefreshCw, Award, ThumbsUp } from 'lucide-react';

export const metadata = {
  title: '30-Day Quality Guarantee | KultZR',
  description: 'KultZR 30-Day Quality & Satisfaction Guarantee policy for bespoke apparel.',
};

export default function QualityGuaranteePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      <div className="space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-gold flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-400" /> Uncompromising Craftsmanship
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-brand-pearl">30-Day Quality Guarantee</h1>
        <p className="text-brand-muted text-sm leading-relaxed">
          At KultZR, we stand behind every thread, print, and seam. If your item arrives with any manufacturing defect, sizing discrepancy, or print flaw, we will replace it free of charge.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div className="glass-panel p-6 rounded-2xl border border-brand-border space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-brand-pearl">50+ Wash Print Guarantee</h3>
          <p className="text-xs text-brand-muted leading-relaxed">
            Our high-density eco-ink printing is cured at 180°C. We guarantee zero cracking, peeling, or fading for over 50 wash cycles when cared for properly.
          </p>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-brand-border space-y-3">
          <div className="w-10 h-10 rounded-xl bg-brand-gold/10 text-brand-gold flex items-center justify-center border border-brand-gold/30">
            <RefreshCw className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-brand-pearl">Free Replacement & Exchange</h3>
          <p className="text-xs text-brand-muted leading-relaxed">
            If your garment has a sizing issue or defect upon arrival, submit a photo to care@kultzr.com within 30 days and we will reprint and ship a brand new piece free of cost.
          </p>
        </div>

      </div>

      <div className="glass-panel p-8 rounded-3xl border border-brand-border space-y-4">
        <h3 className="font-bold text-xl text-brand-pearl flex items-center gap-2">
          <ThumbsUp className="w-5 h-5 text-brand-gold" /> How to Claim Guarantee
        </h3>

        <ol className="list-decimal list-inside text-xs text-brand-pearl space-y-2.5 leading-relaxed">
          <li>Take a quick photo of the issue or size mis-fit.</li>
          <li>Email <span className="text-brand-gold font-bold">care@kultzr.com</span> with your Order Number and photo attachment.</li>
          <li>Our Quality Atelier team will approve your claim within 24 hours.</li>
          <li>A replacement order will be immediately dispatched with zero return shipping hassle.</li>
        </ol>
      </div>

    </div>
  );
}
