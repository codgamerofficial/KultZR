'use client';

import React from 'react';
import Link from 'next/link';
import { Scale, ArrowRight, Bot, Check, Sparkles } from 'lucide-react';
import { MOCK_PRODUCTS } from '@/lib/mockData';

export default function ComparePage() {
  const p1 = MOCK_PRODUCTS[0]; // Nothing Phone (4a) 5G
  const p2 = MOCK_PRODUCTS[1]; // Nothing Phone (2) 5G

  const winner = p1.dealScore.overallScore >= p2.dealScore.overallScore ? p1 : p2;
  const runnerUp = winner.id === p1.id ? p2 : p1;

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* HEADER BANNER */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-brand-blue flex items-center justify-center font-bold">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">Side-by-Side Product Comparison</h1>
            <p className="text-xs text-slate-500">Deterministic specification comparison with Deal Score winner callouts</p>
          </div>
        </div>
      </div>

      {/* SATHI'S DECISION CALLOUT BOX */}
      <div className="bg-gradient-to-br from-indigo-950 via-brand-indigo to-slate-900 rounded-3xl p-6 sm:p-8 text-white space-y-4 border border-indigo-900 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-brand-yellow" />
            <h2 className="text-lg font-extrabold">Sathi's Final Decision</h2>
          </div>
          <span className="px-3 py-1 bg-emerald-500 text-white rounded-full text-xs font-bold flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Winner: {winner.title}</span>
          </span>
        </div>

        <p className="text-xs sm:text-sm text-indigo-100 leading-relaxed font-medium">
          "<strong>Choose {winner.title}.</strong> It delivers a strong Deal Score ({winner.dealScore.overallScore} vs {runnerUp.dealScore.overallScore}), better price-to-performance ratio (₹{winner.currentBestTruePrice.toLocaleString('en-IN')} vs ₹{runnerUp.currentBestTruePrice.toLocaleString('en-IN')}), and verified merchant offers."
        </p>

        <div className="pt-2 flex justify-end">
          <Link
            href={`/product/${winner.id}`}
            className="px-6 py-2.5 bg-brand-saffron text-white rounded-xl text-xs font-bold hover:opacity-95 shadow-glow-saffron flex items-center gap-2"
          >
            <span>View Verified Offer ({winner.brand} {winner.model})</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* COMPARISON MATRIX TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-3xl border border-slate-200 overflow-hidden text-xs">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="p-4 text-left font-bold text-slate-400 uppercase w-1/4">Specification</th>
              <th className="p-4 text-left font-extrabold text-slate-900 w-3/8">
                <div className="flex items-center gap-2">
                  <span>{p1.title}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                    p1.id === winner.id ? 'bg-emerald-100 text-emerald-800 font-bold' : 'bg-slate-100 text-slate-700'
                  }`}>
                    Score {p1.dealScore.overallScore} {p1.id === winner.id ? '(Winner)' : ''}
                  </span>
                </div>
              </th>
              <th className="p-4 text-left font-extrabold text-slate-900 w-3/8">
                <div className="flex items-center gap-2">
                  <span>{p2.title}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                    p2.id === winner.id ? 'bg-emerald-100 text-emerald-800 font-bold' : 'bg-slate-100 text-slate-700'
                  }`}>
                    Score {p2.dealScore.overallScore} {p2.id === winner.id ? '(Winner)' : ''}
                  </span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr>
              <td className="p-4 font-bold text-slate-700">Current Verified Price</td>
              <td className="p-4 font-extrabold text-emerald-600 text-sm">₹{p1.currentBestTruePrice.toLocaleString('en-IN')}</td>
              <td className="p-4 font-bold text-slate-900 text-sm">₹{p2.currentBestTruePrice.toLocaleString('en-IN')}</td>
            </tr>
            <tr>
              <td className="p-4 font-bold text-slate-700">Sathi Verdict</td>
              <td className="p-4"><span className="px-2.5 py-0.5 rounded-full bg-emerald-600 text-white font-bold">{p1.verdict}</span></td>
              <td className="p-4"><span className="px-2.5 py-0.5 rounded-full bg-emerald-600 text-white font-bold">{p2.verdict}</span></td>
            </tr>
            <tr>
              <td className="p-4 font-bold text-slate-700">Processor</td>
              <td className="p-4 font-medium text-slate-900">{p1.specifications['Processor']}</td>
              <td className="p-4 font-medium text-slate-900">{p2.specifications['Processor']}</td>
            </tr>
            <tr>
              <td className="p-4 font-bold text-slate-700">Camera System</td>
              <td className="p-4 font-medium text-slate-900">{p1.specifications['Camera']}</td>
              <td className="p-4 font-medium text-slate-900">{p2.specifications['Camera']}</td>
            </tr>
            <tr>
              <td className="p-4 font-bold text-slate-700">Battery & Charging</td>
              <td className="p-4 font-medium text-slate-900">{p1.specifications['Battery']}</td>
              <td className="p-4 font-medium text-slate-900">{p2.specifications['Battery']}</td>
            </tr>
            <tr>
              <td className="p-4 font-bold text-slate-700">Sathi Rationale</td>
              <td className="p-4 font-semibold text-emerald-700 bg-emerald-50/50">{p1.verdictReason}</td>
              <td className="p-4 font-medium text-slate-700">{p2.verdictReason}</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
}
