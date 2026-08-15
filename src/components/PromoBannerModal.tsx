'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, X, Gift, Check, ArrowRight, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function PromoBannerModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Check if user has already dismissed or claimed promo modal
    const dismissed = localStorage.getItem('kultzr_promo_dismissed');
    if (!dismissed) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('kultzr_promo_dismissed', 'true');
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText('KULT15');
    setCopied(true);
    confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
    setTimeout(() => {
      handleClose();
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 animate-in fade-in duration-300">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/85 backdrop-blur-md" onClick={handleClose} />

      {/* Modal Card */}
      <div className="relative w-full max-w-md bg-brand-secondary border border-brand-gold/50 rounded-3xl p-6 sm:p-8 text-brand-pearl shadow-2xl z-10 space-y-6 text-center overflow-hidden">
        
        {/* Glow ambient background */}
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-brand-gold/15 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-brand-muted hover:text-brand-pearl rounded-full transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Insignia Logo */}
        <div className="inline-flex items-center justify-center p-2 rounded-2xl bg-brand-card/80 border border-brand-gold/30">
          <img src="/brand/logo.svg" alt="KultZR Logo" className="h-16 w-auto object-contain" />
        </div>

        {/* Headline & Offer */}
        <div className="space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-gold/10 text-brand-gold border border-brand-gold/30 text-[10px] font-extrabold uppercase tracking-widest">
            <Gift className="w-3.5 h-3.5" /> Welcome Atelier Drop Offer
          </span>
          <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-brand-pearl">
            UNLOCK <span className="bg-linear-to-r from-amber-400 via-brand-gold to-amber-500 bg-clip-text text-transparent">15% OFF</span> YOUR FIRST BESPOKE PIECE
          </h3>
          <p className="text-xs text-brand-muted leading-relaxed max-w-xs mx-auto">
            Enjoy 15% off any 240 GSM organic cotton streetwear piece or bespoke custom creation today.
          </p>
        </div>

        {/* Coupon Code Display Box */}
        <div className="p-3.5 rounded-2xl bg-brand-dark border border-brand-gold/40 flex items-center justify-between gap-3">
          <div className="text-left">
            <span className="text-[10px] text-brand-muted uppercase font-bold tracking-wider">Secret Promo Code</span>
            <p className="text-lg font-black tracking-widest text-brand-gold font-mono">KULT15</p>
          </div>
          <button
            onClick={handleCopyCode}
            className="px-4 py-2 bg-brand-gold text-brand-dark font-extrabold text-xs rounded-xl hover:bg-amber-400 transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" /> Copied & Applied!
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" /> Copy Code
              </>
            )}
          </button>
        </div>

        {/* Claim CTA */}
        <button
          onClick={handleCopyCode}
          className="w-full py-3.5 bg-linear-to-r from-amber-400 via-brand-gold to-amber-500 text-brand-dark font-extrabold text-xs uppercase tracking-wider rounded-2xl flex items-center justify-center gap-2 hover:opacity-95 transition-opacity shadow-xl shadow-amber-500/20 cursor-pointer"
        >
          Claim 15% Off & Start Designing <ArrowRight className="w-4 h-4" />
        </button>

        <p className="text-[10px] text-brand-muted flex items-center justify-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          Valid on all items • Zero minimum order requirement
        </p>

      </div>
    </div>
  );
}
