'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Clock, TrendingDown, Info, ShieldCheck, ArrowRight } from 'lucide-react';
import { MOCK_PRODUCTS } from '@/lib/mockData';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export default function PriceHistoryPage() {
  const params = useParams();
  const slug = params.slug as string;

  const product = MOCK_PRODUCTS.find(p => p.id === slug) || MOCK_PRODUCTS[0];

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* HEADER BANNER */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-3">
        <div className="flex items-center gap-2 text-brand-blue font-bold text-xs">
          <Clock className="w-4 h-4" />
          <span>Historical Price Intelligence</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
          Price History: {product.title}
        </h1>
        <p className="text-xs text-slate-500">
          365-day price observation trendline across supported merchants (Amazon India, Flipkart, Croma).
        </p>
      </div>

      {/* PRICE POSITION METRICS */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
          <span className="text-slate-400 block text-[10px]">Current Best Price</span>
          <span className="text-xl font-black text-emerald-600">₹{product.currentBestTruePrice.toLocaleString('en-IN')}</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
          <span className="text-slate-400 block text-[10px]">30-Day Average</span>
          <span className="text-xl font-black text-slate-900">₹{product.averagePrice30d.toLocaleString('en-IN')}</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
          <span className="text-slate-400 block text-[10px]">365-Day Historical Low</span>
          <span className="text-xl font-black text-brand-blue">₹{product.lowestPrice365d.toLocaleString('en-IN')}</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
          <span className="text-slate-400 block text-[10px]">Price Position</span>
          <span className="text-xl font-black text-emerald-600">Bottom 14%</span>
        </div>
      </div>

      {/* WHY IS THIS A GOOD PRICE AI RATIONALE BOX */}
      <div className="p-5 rounded-2xl bg-indigo-50 border border-indigo-100 text-xs text-indigo-950 space-y-2">
        <div className="font-bold text-brand-blue flex items-center gap-1.5">
          <Info className="w-4 h-4" />
          <span>Why is this a good price?</span>
        </div>
        <p className="leading-relaxed font-medium">
          The current price of ₹{product.currentBestTruePrice.toLocaleString('en-IN')} is around the lower end of its recent historical range. It is ₹{(product.averagePrice30d - product.currentBestTruePrice).toLocaleString('en-IN')} below its 30-day average. While not the all-time historical lowest (₹{product.lowestPrice365d.toLocaleString('en-IN')}), current bank card offers make this an attractive purchase entry.
        </p>
      </div>

      {/* RECHARTS AREA CHART */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
        <h2 className="text-base font-bold text-slate-900">365-Day Observation Trendline</h2>
        
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={product.priceHistory}>
              <defs>
                <linearGradient id="histGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563EB" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="date" stroke="#94A3B8" fontSize={12} />
              <YAxis stroke="#94A3B8" fontSize={12} domain={['dataMin - 1000', 'dataMax + 1000']} />
              <Tooltip formatter={(value: number) => [`₹${value.toLocaleString('en-IN')}`, 'Price']} />
              <Area type="monotone" dataKey="price" stroke="#2563EB" strokeWidth={3} fillOpacity={1} fill="url(#histGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <Link
          href={`/product/${product.id}`}
          className="px-6 py-3 bg-brand-blue text-white rounded-xl text-xs font-bold hover:bg-indigo-700 transition flex items-center gap-2 shadow-glow-blue"
        >
          <span>Return to Product Details</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
}
