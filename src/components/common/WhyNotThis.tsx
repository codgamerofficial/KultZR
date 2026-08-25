'use client';

import React from 'react';
import { Info, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Product } from '@/lib/types';

interface WhyNotThisProps {
  alternatives: Product[];
}

export const WhyNotThis: React.FC<WhyNotThisProps> = ({ alternatives }) => {
  if (!alternatives || alternatives.length === 0) return null;

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
      <div className="flex items-center gap-2">
        <Info className="w-5 h-5 text-brand-blue" />
        <h3 className="font-extrabold text-base text-slate-900">Why Not The Alternatives?</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {alternatives.map((alt) => (
          <div key={alt.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
            <div className="flex items-center justify-between font-bold text-slate-900">
              <span className="line-clamp-1">{alt.title}</span>
              <span className="text-slate-500">Score {alt.dealScore.overallScore}</span>
            </div>
            <p className="text-slate-600 font-medium leading-relaxed">
              {alt.verdictReason || 'Slightly higher price point or lower rating in camera optics compared to #1 pick.'}
            </p>
            <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between">
              <span className="font-extrabold text-slate-900">₹{alt.currentBestTruePrice.toLocaleString('en-IN')}</span>
              <Link href={`/product/${alt.id}`} className="text-brand-blue font-bold hover:underline flex items-center gap-1">
                <span>Inspect Alternative</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
