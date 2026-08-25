'use client';

import React from 'react';
import Link from 'next/link';
import { Rocket, TrendingUp, Users, Globe, Smartphone, MessageSquare, ArrowLeft, ShieldCheck } from 'lucide-react';

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link href="/admin" className="text-xs font-bold text-slate-500 hover:text-slate-900 flex items-center gap-1 mb-2">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Admin Panel</span>
          </Link>
          <h1 className="text-2xl font-extrabold text-slate-900">Launch & Growth War Room</h1>
          <p className="text-xs text-slate-500">30/60/90-day roadmap execution, acquisition channel metrics, and viral K-factor tracking.</p>
        </div>

        <div className="px-3.5 py-1.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-bold self-start sm:self-auto flex items-center gap-1.5">
          <Rocket className="w-4 h-4 text-brand-saffron" />
          <span>Growth Status: Phase 10 Active</span>
        </div>
      </div>

      {/* METRICS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-1">
          <span className="text-slate-400 block text-[10px] font-bold uppercase">Total Registered Users</span>
          <span className="text-2xl font-black text-slate-900">12,480</span>
          <span className="text-[10px] font-bold text-emerald-600 block">+1,420 this week</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-1">
          <span className="text-slate-400 block text-[10px] font-bold uppercase">Viral K-Factor</span>
          <span className="text-2xl font-black text-brand-saffron">1.42</span>
          <span className="text-[10px] font-bold text-emerald-600 block">Viral growth loop</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-1">
          <span className="text-slate-400 block text-[10px] font-bold uppercase">7-Day Retention</span>
          <span className="text-2xl font-black text-brand-blue">64.2%</span>
          <span className="text-[10px] text-slate-500 block">High repeat searches</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-1">
          <span className="text-slate-400 block text-[10px] font-bold uppercase">Active Price Watches</span>
          <span className="text-2xl font-black text-indigo-900">8,940</span>
          <span className="text-[10px] text-slate-500 block">Surveillance active</span>
        </div>
      </div>

      {/* ACQUISITION CHANNEL BREAKDOWN */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <h3 className="font-extrabold text-sm text-slate-900">Acquisition Channels Breakdown</h3>
        
        <div className="space-y-3 text-xs">
          
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-brand-blue" />
              <div>
                <span className="font-bold text-slate-900 block">Organic Search (SEO Engine)</span>
                <span className="text-slate-500 text-[10px]">Quality-gated category & product pages</span>
              </div>
            </div>
            <span className="font-black text-sm text-slate-900">42% (5,241 users)</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Smartphone className="w-5 h-5 text-brand-green" />
              <div>
                <span className="font-bold text-slate-900 block">Android Share-to-Sathi</span>
                <span className="text-slate-500 text-[10px]">Mobile URL & screenshot OCR shares</span>
              </div>
            </div>
            <span className="font-black text-sm text-slate-900">28% (3,494 users)</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MessageSquare className="w-5 h-5 text-emerald-600" />
              <div>
                <span className="font-bold text-slate-900 block">WhatsApp Viral Verdict Cards</span>
                <span className="text-slate-500 text-[10px]">Organic social referral cards</span>
              </div>
            </div>
            <span className="font-black text-sm text-slate-900">18% (2,246 users)</span>
          </div>

        </div>
      </div>

    </div>
  );
}
