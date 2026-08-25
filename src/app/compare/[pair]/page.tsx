'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Scale, Sparkles, CheckCircle2, ArrowRight, ExternalLink } from 'lucide-react';
import { MOCK_PRODUCTS } from '@/lib/mockData';

export default function ProgrammaticComparePage() {
  const params = useParams();
  const pairParam = (params.pair as string) || 'prod-1-vs-prod-2';

  const [idA, idB] = pairParam.split('-vs-');

  const prodA = MOCK_PRODUCTS.find(p => p.id === idA) || MOCK_PRODUCTS[0];
  const prodB = MOCK_PRODUCTS.find(p => p.id === idB) || MOCK_PRODUCTS[1] || MOCK_PRODUCTS[0];

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* HEADER BANNER */}
      <div className="bg-gradient-to-br from-indigo-950 via-brand-indigo to-slate-900 rounded-3xl p-6 sm:p-8 text-white space-y-3 border border-indigo-900 shadow-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue text-white text-xs font-extrabold shadow-sm">
          <Scale className="w-4 h-4" />
          <span>Programmatic Product Comparison</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          {prodA.title} vs {prodB.title}
        </h1>
        <p className="text-xs sm:text-sm text-indigo-100/90 max-w-xl font-medium">
          Side-by-side spec analysis, true price positioning, and verified Sathi decision verdict.
        </p>
      </div>

      {/* SATHI VERDICT BANNER */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-brand-blue font-bold text-xs">
          <Sparkles className="w-4 h-4 fill-brand-blue" />
          <span>Sathi's Recommendation</span>
        </div>

        <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-2">
          <h3 className="font-extrabold text-base text-emerald-900 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>Recommended Winner: {prodA.dealScore.overallScore >= prodB.dealScore.overallScore ? prodA.title : prodB.title}</span>
          </h3>
          <p className="text-xs font-medium leading-relaxed">
            "Buy {prodA.dealScore.overallScore >= prodB.dealScore.overallScore ? prodA.brand : prodB.brand} if you prioritize overall price advantage and higher seller confidence scores. Choose {prodA.dealScore.overallScore >= prodB.dealScore.overallScore ? prodB.brand : prodA.brand} if battery and specific display features matter most."
          </p>
        </div>
      </div>

      {/* SIDE-BY-SIDE MATRIX */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm overflow-x-auto">
        <table className="w-full text-xs text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="py-3 px-4 font-bold text-slate-400 uppercase">Metric</th>
              <th className="py-3 px-4 font-extrabold text-slate-900 text-base">{prodA.title}</th>
              <th className="py-3 px-4 font-extrabold text-slate-900 text-base">{prodB.title}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr>
              <td className="py-3.5 px-4 font-bold text-slate-500">Current Best Price</td>
              <td className="py-3.5 px-4 font-black text-emerald-600 text-base">₹{prodA.currentBestTruePrice.toLocaleString('en-IN')}</td>
              <td className="py-3.5 px-4 font-black text-emerald-600 text-base">₹{prodB.currentBestTruePrice.toLocaleString('en-IN')}</td>
            </tr>
            <tr>
              <td className="py-3.5 px-4 font-bold text-slate-500">Deal Score</td>
              <td className="py-3.5 px-4 font-bold text-slate-900">{prodA.dealScore.overallScore} / 100</td>
              <td className="py-3.5 px-4 font-bold text-slate-900">{prodB.dealScore.overallScore} / 100</td>
            </tr>
            <tr>
              <td className="py-3.5 px-4 font-bold text-slate-500">Product Fit Score</td>
              <td className="py-3.5 px-4 font-bold text-slate-900">{prodA.dealScore.productFit} / 100</td>
              <td className="py-3.5 px-4 font-bold text-slate-900">{prodB.dealScore.productFit} / 100</td>
            </tr>
            <tr>
              <td className="py-3.5 px-4 font-bold text-slate-500">Review Intelligence</td>
              <td className="py-3.5 px-4 font-bold text-slate-900">{prodA.dealScore.reviewQuality} / 100</td>
              <td className="py-3.5 px-4 font-bold text-slate-900">{prodB.dealScore.reviewQuality} / 100</td>
            </tr>
            <tr>
              <td className="py-3.5 px-4 font-bold text-slate-500">Action</td>
              <td className="py-3.5 px-4">
                <Link href={`/product/${prodA.id}`} className="text-brand-blue font-bold hover:underline flex items-center gap-1">
                  <span>View Product A</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </td>
              <td className="py-3.5 px-4">
                <Link href={`/product/${prodB.id}`} className="text-brand-blue font-bold hover:underline flex items-center gap-1">
                  <span>View Product B</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
}
