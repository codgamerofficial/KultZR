import React from 'react';
import CustomizerStudio from '@/components/CustomizerStudio';

export default function CustomizePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8">
      <div className="space-y-2 pt-2">
        <span className="text-xs font-extrabold uppercase tracking-widest text-brand-gold">
          Creative Atelier
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-brand-pearl">
          Bespoke Customizer Studio
        </h1>
        <p className="text-sm text-brand-muted max-w-2xl">
          Craft your personal manifesto. Choose your base garment, select colors, set custom story text, and preview your item in real-time.
        </p>
      </div>

      <CustomizerStudio />
    </div>
  );
}
