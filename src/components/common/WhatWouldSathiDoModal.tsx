'use client';

import React from 'react';
import { Bot, X, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { Product } from '@/lib/types';
import Link from 'next/link';

interface WhatWouldSathiDoModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
}

export const WhatWouldSathiDoModal: React.FC<WhatWouldSathiDoModalProps> = ({
  isOpen,
  onClose,
  product,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl p-6 max-w-lg w-full border border-slate-200 shadow-2xl space-y-5">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-950 via-brand-indigo to-slate-900 -mx-6 -mt-6 p-6 text-white rounded-t-3xl flex items-center justify-between border-b border-indigo-900">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-brand-saffron flex items-center justify-center text-white shadow-md">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-white flex items-center gap-1.5">
                What Would Sathi Do?
                <Sparkles className="w-4 h-4 text-brand-yellow fill-brand-yellow" />
              </h3>
              <p className="text-xs text-indigo-200">{product.title}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-indigo-200 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Verdict Badge */}
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2 text-xs">
          <div className="flex items-center justify-between font-extrabold text-emerald-900">
            <span className="text-sm flex items-center gap-1.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              Sathi Action: 🟢 BUY NOW
            </span>
            <span className="text-brand-saffron">Score {product.dealScore.overallScore}/100</span>
          </div>
          <p className="text-emerald-950 font-medium leading-relaxed">
            "At ₹{product.currentBestTruePrice.toLocaleString('en-IN')}, I'd buy this immediately. Price is ₹{(product.averagePrice30d - product.currentBestTruePrice).toLocaleString('en-IN')} below its 30-day market average with verified 4.8★ seller trust."
          </p>
        </div>

        {/* Actions */}
        <div className="pt-2 flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 text-xs font-semibold text-slate-600">Close</button>
          <a
            href={product.offers[0].affiliateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-brand-saffron text-white rounded-xl text-xs font-bold shadow-glow-saffron flex items-center gap-1.5 hover:opacity-95 transition"
          >
            <span>Buy on {product.offers[0].merchantName}</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </div>
  );
};
