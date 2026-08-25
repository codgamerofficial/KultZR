'use client';

import React, { useState } from 'react';
import { Sparkles, Info, X, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { DealScoreBreakdown } from '@/lib/types';

interface DealScoreUIProps {
  score: DealScoreBreakdown;
  productName?: string;
  category?: string;
  className?: string;
}

export const DealScoreUI: React.FC<DealScoreUIProps> = ({
  score,
  productName = 'Product',
  category = 'smartphones',
  className = '',
}) => {
  const [showModal, setShowModal] = useState(false);

  const METRICS = [
    { label: 'Price Advantage', score: score.priceAdvantage, weight: '25%' },
    { label: 'Product Fit', score: score.productFit, weight: '20%' },
    { label: 'Review Quality', score: score.reviewQuality, weight: '15%' },
    { label: 'Seller Trust', score: score.sellerTrust, weight: '10%' },
    { label: 'Price History', score: score.priceHistoryScore, weight: '10%' },
  ];

  return (
    <div className={`bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-4 ${className}`}>
      
      {/* Score Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-brand-saffron fill-brand-saffron" />
          <h3 className="font-extrabold text-sm text-slate-900">Sathi Deal Score</h3>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-2xl font-black text-slate-900 tracking-tight">
            {score.overallScore}
          </span>
          <span className="text-xs font-bold text-slate-400">/ 100</span>
        </div>
      </div>

      {/* Score Breakdown Progress Bars */}
      <div className="space-y-2.5 text-xs">
        {METRICS.map((m) => (
          <div key={m.label} className="space-y-1">
            <div className="flex justify-between font-bold text-slate-700 text-[11px]">
              <span>{m.label}</span>
              <span className="text-slate-900">{m.score}/100</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-brand-blue to-indigo-600 rounded-full transition-all duration-700"
                style={{ width: `${m.score}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Transparent Explanation Trigger */}
      <button
        type="button"
        onClick={() => setShowModal(true)}
        className="w-full pt-3 text-xs font-bold text-brand-blue hover:underline flex items-center justify-center gap-1.5 border-t border-slate-100"
      >
        <Info className="w-3.5 h-3.5" />
        <span>How did we calculate this score?</span>
      </button>

      {/* Calculation Explanation Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full border border-slate-200 space-y-5 shadow-2xl">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-brand-green" />
                <h3 className="font-extrabold text-base text-slate-900">Transparent Deal Score Methodology</h3>
              </div>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-900">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-600 leading-relaxed font-medium">
              <p>
                DealSathi calculates the <strong>Deal Score ({score.overallScore}/100)</strong> using category-specific weighted criteria. Zero affiliate commissions or sponsored listings influence this score.
              </p>

              <div className="space-y-2 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <span className="font-bold text-slate-900 block uppercase text-[10px] tracking-wider">Applied Weightings ({category}):</span>
                <ul className="space-y-1.5">
                  <li className="flex justify-between">
                    <span>1. Price Advantage (25%)</span>
                    <strong className="text-slate-900">{score.priceAdvantage} pts</strong>
                  </li>
                  <li className="flex justify-between">
                    <span>2. Product Requirements Fit (20%)</span>
                    <strong className="text-slate-900">{score.productFit} pts</strong>
                  </li>
                  <li className="flex justify-between">
                    <span>3. Review Quality & Complaint Signals (15%)</span>
                    <strong className="text-slate-900">{score.reviewQuality} pts</strong>
                  </li>
                  <li className="flex justify-between">
                    <span>4. Verified Seller Trust (10%)</span>
                    <strong className="text-slate-900">{score.sellerTrust} pts</strong>
                  </li>
                  <li className="flex justify-between">
                    <span>5. 365-Day Price History Entry (10%)</span>
                    <strong className="text-slate-900">{score.priceHistoryScore} pts</strong>
                  </li>
                </ul>
              </div>

              <div className="flex items-center gap-2 text-emerald-700 bg-emerald-50 p-3 rounded-xl border border-emerald-200">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>100% evidence-based calculation. No hard-coded merchant bias.</span>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-5 py-2.5 bg-indigo-950 text-white rounded-xl text-xs font-bold hover:bg-brand-blue transition"
              >
                Close Explanation
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
