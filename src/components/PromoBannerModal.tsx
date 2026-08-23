'use client';

import React, { useEffect, useState } from 'react';
import { ArrowRight, X } from 'lucide-react';

/**
 * Optional promotional banner.
 * Disabled by default so a promotional claim can never block the storefront
 * unless the promotion has explicitly been configured for this deployment.
 */
export default function PromoBannerModal() {
  const enabled = process.env.NEXT_PUBLIC_PROMO_ENABLED === 'true';
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    const dismissed = localStorage.getItem('kultzr_promo_dismissed');
    if (dismissed) return;
    const timer = window.setTimeout(() => setVisible(true), 8000);
    return () => window.clearTimeout(timer);
  }, [enabled]);

  if (!enabled || !visible) return null;

  return (
    <aside className="fixed bottom-4 left-4 right-4 z-40 mx-auto max-w-lg rounded-2xl border border-brand-gold/30 bg-brand-card/95 p-4 shadow-2xl backdrop-blur-xl sm:left-auto sm:right-5 sm:w-[380px]" role="dialog" aria-label="KultZR promotion">
      <button onClick={() => { setVisible(false); localStorage.setItem('kultzr_promo_dismissed', 'true'); }} aria-label="Close promotion" className="absolute right-3 top-3 rounded-full p-1.5 text-brand-muted transition-colors hover:text-brand-pearl">
        <X className="h-4 w-4" />
      </button>
      <p className="pr-7 text-[10px] font-bold uppercase tracking-[0.18em] text-brand-gold">KultZR Drop Offer</p>
      <h2 className="mt-1 pr-7 text-lg font-black text-brand-pearl">A little extra for your first drop.</h2>
      <p className="mt-1 text-xs leading-5 text-brand-muted">Use the promotion shown here only when it is active in the store checkout.</p>
      <button onClick={() => { setVisible(false); localStorage.setItem('kultzr_promo_dismissed', 'true'); }} className="mt-3 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.12em] text-brand-gold">
        Shop the drop <ArrowRight className="h-3.5 w-3.5" />
      </button>
    </aside>
  );
}
