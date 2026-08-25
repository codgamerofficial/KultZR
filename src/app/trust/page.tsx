'use client';

import React from 'react';
import { ShieldCheck, CheckCircle2, Info, Lock, Flame, Sparkles, Scale, RefreshCw } from 'lucide-react';

export default function TrustPage() {
  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* HERO HEADER */}
      <div className="bg-gradient-to-br from-indigo-950 via-brand-indigo to-slate-900 rounded-3xl p-6 sm:p-10 text-white space-y-4 border border-indigo-900 shadow-xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>100% Evidence-Based Commitment</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">DealSathi Trust & Methodology Center</h1>
        <p className="text-xs sm:text-sm text-indigo-100/90 max-w-2xl leading-relaxed">
          DealSathi exists to eliminate shopping information asymmetry. We never allow merchant commissions or sponsored listings to manipulate Deal Scores or recommendations.
        </p>
      </div>

      {/* CORE TRANSPARENCY PRINCIPLES */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <Scale className="w-5 h-5" />
          </div>
          <h3 className="font-extrabold text-base text-slate-900">0% Commission Bias</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Deal Scores are computed deterministically based on price advantage, fit, reviews, seller trust, and price history. Affiliate commissions do not alter ranking scores.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-50 text-brand-blue flex items-center justify-center font-bold">
            <RefreshCw className="w-5 h-5" />
          </div>
          <h3 className="font-extrabold text-base text-slate-900">True Price Normalization</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            We separate guaranteed store coupons from conditional bank card offers so you never see misleading "fake discount" savings claims.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="font-extrabold text-base text-slate-900">Evidence-Bound AI</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Our AI reasoning engines strictly interpret verified numeric data and review signals. AI never fabricates prices, ratings, or specifications.
          </p>
        </div>
      </div>

      {/* DATA FRESHNESS BADGE MATRIX */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
        <h2 className="text-lg font-bold text-slate-900">Data Freshness Classifications</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1">
            <span className="font-extrabold text-emerald-800 uppercase tracking-wider block">🟢 LIVE</span>
            <p className="text-emerald-950 font-medium">Fetched live from merchant adapter within the last 15 minutes.</p>
          </div>

          <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 space-y-1">
            <span className="font-extrabold text-blue-800 uppercase tracking-wider block">🔵 RECENT</span>
            <p className="text-blue-950 font-medium">Cached observation recorded within the last 6 hours.</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-100 border border-slate-300 space-y-1">
            <span className="font-extrabold text-slate-700 uppercase tracking-wider block">⚪ HISTORICAL</span>
            <p className="text-slate-800 font-medium">Aggregated 30-day, 90-day, or 365-day historical baseline stats.</p>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-1">
            <span className="font-extrabold text-amber-800 uppercase tracking-wider block">🟡 ESTIMATED</span>
            <p className="text-amber-950 font-medium">Calculated conditional savings subject to bank card eligibility.</p>
          </div>
        </div>
      </div>

      {/* AFFILIATE DISCLOSURE STATEMENT */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-3">
        <h3 className="font-extrabold text-base text-brand-yellow">Affiliate Link Transparency Disclosure</h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          DealSathi participates in merchant affiliate programs (including Amazon Associates and Flipkart Affiliate Network). When you click outbound links on DealSathi and complete a purchase, we may earn an affiliate commission at no additional cost to you. This revenue funds continuous platform development. However, affiliate commissions **never** influence our Deal Score algorithm or recommendation rankings.
        </p>
      </div>

    </div>
  );
}
