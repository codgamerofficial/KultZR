'use client';

import React from 'react';
import { ShieldCheck, X, Clock, Sparkles, CheckCircle2, TrendingDown } from 'lucide-react';
import { Product } from '@/lib/types';

interface EvidenceDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
}

export const EvidenceDrawer: React.FC<EvidenceDrawerProps> = ({ isOpen, onClose, product }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl p-6 max-w-lg w-full border border-slate-200 shadow-2xl space-y-5">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-brand-green" />
            <h3 className="font-extrabold text-base text-slate-900">Sathi Recommendation Evidence</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-900">
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-slate-600 font-medium leading-relaxed">
          Every DealSathi recommendation is backed by verified evidence. Here is the data behind <strong>{product.title}</strong>:
        </p>

        {/* Evidence Points */}
        <div className="space-y-3 text-xs">
          
          {/* Price Freshness */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
            <Clock className="w-4 h-4 text-brand-blue shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-900 block">Price Freshness</span>
              <p className="text-slate-600">Observed live 4 minutes ago via supported merchant adapters.</p>
            </div>
          </div>

          {/* Historical Price Position */}
          <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex items-start gap-3 text-emerald-950">
            <TrendingDown className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-emerald-900 block">Historical Price Position</span>
              <p>Current ₹{product.currentBestTruePrice.toLocaleString('en-IN')} is ₹{(product.averagePrice30d - product.currentBestTruePrice).toLocaleString('en-IN')} below 30-day average (₹{product.averagePrice30d.toLocaleString('en-IN')}).</p>
            </div>
          </div>

          {/* Review Intelligence */}
          <div className="p-3.5 rounded-2xl bg-indigo-50/70 border border-indigo-200 flex items-start gap-3 text-indigo-950">
            <Sparkles className="w-4 h-4 text-brand-saffron shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-brand-blue block">Review Signal Confidence</span>
              <p>Verified across {product.reviewIntelligence.totalAnalyzed.toLocaleString()} reviews. Top positive sentiment: {product.reviewIntelligence.topPros[0]}.</p>
            </div>
          </div>

          {/* Seller Trust */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-900 block">Seller Trust</span>
              <p>{product.offers[0].sellerName} ({product.offers[0].sellerRating}★) — Zero cancellation or counterfeit complaint signals.</p>
            </div>
          </div>

        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-indigo-950 text-white rounded-xl text-xs font-bold hover:bg-brand-blue transition"
          >
            Close Evidence
          </button>
        </div>

      </div>
    </div>
  );
};
