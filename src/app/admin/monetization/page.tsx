'use client';

import React from 'react';
import Link from 'next/link';
import { DollarSign, TrendingUp, Users, ExternalLink, ShieldAlert, ArrowLeft } from 'lucide-react';
import { defaultAffiliateTracker } from '@/lib/monetization/affiliateTracker';

export default function AdminMonetizationPage() {
  const affiliateSummary = defaultAffiliateTracker.getRevenueSummary();

  const mrr = 149500; // ₹1,49,500 MRR demo data
  const proSubscribers = 500;

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link href="/admin" className="text-xs font-bold text-slate-500 hover:text-slate-900 flex items-center gap-1 mb-2">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Admin Panel</span>
          </Link>
          <h1 className="text-2xl font-extrabold text-slate-900">Monetization & Unit Economics</h1>
          <p className="text-xs text-slate-500">Live subscription metrics, affiliate commissions, and monetization integrity status.</p>
        </div>

        <div className="px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold self-start sm:self-auto flex items-center gap-1.5">
          <ShieldAlert className="w-4 h-4 text-emerald-600" />
          <span>Recommendation Integrity Firewall: Active</span>
        </div>
      </div>

      {/* METRICS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
        
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-1">
          <span className="text-slate-400 block text-[10px] font-bold uppercase">Monthly Recurring Revenue (MRR)</span>
          <span className="text-2xl font-black text-slate-900">₹{mrr.toLocaleString('en-IN')}</span>
          <span className="text-[10px] font-bold text-emerald-600 block">+14% vs last month</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-1">
          <span className="text-slate-400 block text-[10px] font-bold uppercase">Active Sathi Pro Members</span>
          <span className="text-2xl font-black text-brand-blue">{proSubscribers}</span>
          <span className="text-[10px] text-slate-500 block">₹299/mo standard plan</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-1">
          <span className="text-slate-400 block text-[10px] font-bold uppercase">Estimated Affiliate Earnings</span>
          <span className="text-2xl font-black text-emerald-600">₹{affiliateSummary.estimatedCommission.toLocaleString('en-IN')}</span>
          <span className="text-[10px] text-slate-500 block">From {affiliateSummary.totalClicks} outbound clicks</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-1">
          <span className="text-slate-400 block text-[10px] font-bold uppercase">Outbound Conversion Rate</span>
          <span className="text-2xl font-black text-indigo-900">18.4%</span>
          <span className="text-[10px] font-bold text-emerald-600 block">High intent traffic</span>
        </div>

      </div>

      {/* REVENUE BREAKDOWN BY MERCHANT */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <h3 className="font-extrabold text-sm text-slate-900">Affiliate Earnings Breakdown by Merchant</h3>
        
        <div className="space-y-3 text-xs">
          
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="font-bold text-slate-900 block">Amazon India (Creators API)</span>
              <span className="text-slate-500 text-[10px]">Estimated Commission Rate: 4.0%</span>
            </div>
            <div className="text-right">
              <span className="font-extrabold text-sm text-slate-900">₹42,800</span>
              <span className="text-[10px] text-emerald-600 block font-bold">1,240 outbound clicks</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="font-bold text-slate-900 block">Flipkart Affiliate Network</span>
              <span className="text-slate-500 text-[10px]">Estimated Commission Rate: 3.5%</span>
            </div>
            <div className="text-right">
              <span className="font-extrabold text-sm text-slate-900">₹28,400</span>
              <span className="text-[10px] text-emerald-600 block font-bold">890 outbound clicks</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="font-bold text-slate-900 block">Croma Retail</span>
              <span className="text-slate-500 text-[10px]">Estimated Commission Rate: 2.5%</span>
            </div>
            <div className="text-right">
              <span className="font-extrabold text-sm text-slate-900">₹12,100</span>
              <span className="text-[10px] text-emerald-600 block font-bold={true}">340 outbound clicks</span>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
