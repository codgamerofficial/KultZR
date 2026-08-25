'use client';

import React from 'react';
import { Sparkles, CheckCircle2, Clock, XCircle } from 'lucide-react';
import { DealScoreBreakdown } from '@/lib/types';

interface SathiScorecardProps {
  score: DealScoreBreakdown;
  productName: string;
  currentPrice: number;
}

export const SathiScorecard: React.FC<SathiScorecardProps> = ({ score, productName, currentPrice }) => {
  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-brand-saffron fill-brand-saffron" />
          <h3 className="font-extrabold text-base text-slate-900">Sathi Scorecard</h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-black text-slate-900">{score.overallScore}</span>
          <span className="text-xs font-bold text-slate-400">/ 100</span>
        </div>
      </div>

      {/* Score Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
        <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Price</span>
          <span className="text-base font-black text-slate-900 block">{score.priceAdvantage}</span>
        </div>
        <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Fit</span>
          <span className="text-base font-black text-slate-900 block">{score.productFit}</span>
        </div>
        <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Reviews</span>
          <span className="text-base font-black text-slate-900 block">{score.reviewQuality}</span>
        </div>
        <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Seller</span>
          <span className="text-base font-black text-slate-900 block">{score.sellerTrust}</span>
        </div>
        <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase">History</span>
          <span className="text-base font-black text-slate-900 block">{score.priceHistoryScore}</span>
        </div>
      </div>

      {/* BUY IF / WAIT IF / SKIP IF CONDITIONAL GUIDANCE */}
      <div className="space-y-2 text-xs">
        
        <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex items-start gap-2.5 text-emerald-950">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <strong className="text-emerald-900 block font-extrabold">BUY IF:</strong>
            <p>You need strong gaming/camera performance under ₹{currentPrice.toLocaleString('en-IN')} with 120W fast charging immediately.</p>
          </div>
        </div>

        <div className="p-3 rounded-2xl bg-amber-50/70 border border-amber-200 flex items-start gap-2.5 text-amber-950">
          <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <strong className="text-amber-900 block font-extrabold">WAIT IF:</strong>
            <p>You can wait 3 weeks for upcoming festive bank sale events to save an extra ₹500–₹1,000.</p>
          </div>
        </div>

        <div className="p-3 rounded-2xl bg-rose-50/70 border border-rose-200 flex items-start gap-2.5 text-rose-950">
          <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <div>
            <strong className="text-rose-900 block font-extrabold">SKIP IF:</strong>
            <p>You prioritize lightweight under-170g chassis or wireless charging support.</p>
          </div>
        </div>

      </div>

    </div>
  );
};
