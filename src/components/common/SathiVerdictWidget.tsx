'use client';

import React from 'react';
import { Sparkles, CheckCircle2, ExternalLink } from 'lucide-react';
import { Product } from '@/lib/types';

interface SathiVerdictWidgetProps {
  product: Product;
  creatorTag?: string;
}

export const SathiVerdictWidget: React.FC<SathiVerdictWidgetProps> = ({ product, creatorTag }) => {
  const affiliateUrl = `${product.offers[0].affiliateUrl}${creatorTag ? `&tag=${creatorTag}` : ''}`;

  return (
    <div className="max-w-sm rounded-2xl bg-gradient-to-br from-indigo-950 to-slate-900 text-white p-5 border border-indigo-900 shadow-lg space-y-3 font-sans">
      
      {/* Header Badge */}
      <div className="flex items-center justify-between text-xs">
        <span className="font-extrabold text-brand-yellow flex items-center gap-1">
          <Sparkles className="w-4 h-4 fill-brand-yellow" />
          DEALSATHI VERDICT
        </span>
        <span className="px-2.5 py-0.5 rounded-full bg-emerald-500 text-white font-extrabold text-[10px]">
          🟢 BUY NOW
        </span>
      </div>

      {/* Product & Price */}
      <div className="space-y-1">
        <h4 className="font-extrabold text-sm text-white line-clamp-1">{product.title}</h4>
        <div className="flex items-baseline justify-between">
          <span className="text-xl font-black text-white">₹{product.currentBestTruePrice.toLocaleString('en-IN')}</span>
          <span className="text-xs font-bold text-brand-yellow">Score {product.dealScore.overallScore}/100</span>
        </div>
      </div>

      <p className="text-[11px] text-indigo-200 line-clamp-2 italic">
        "{product.verdictReason}"
      </p>

      {/* Outbound Link */}
      <a
        href={affiliateUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full py-2 bg-brand-saffron text-white rounded-xl text-xs font-bold shadow-glow-saffron flex items-center justify-center gap-1.5 hover:opacity-95 transition"
      >
        <span>View Deal on {product.offers[0].merchantName}</span>
        <ExternalLink className="w-3.5 h-3.5" />
      </a>

    </div>
  );
};
