'use client';

import React, { useState } from 'react';
import { Sparkles, X, Share2, Copy, Check, MessageSquare, Send } from 'lucide-react';
import { Product } from '@/lib/types';

interface SocialShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
}

export const SocialShareModal: React.FC<SocialShareModalProps> = ({ isOpen, onClose, product }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const shareUrl = typeof window !== 'undefined' ? window.location.href : `https://dealsathi.in/product/${product.id}`;
  const shareText = `🟢 Sathi Verdict: BUY NOW! ${product.title} is ₹${product.currentBestTruePrice.toLocaleString('en-IN')} (Score ${product.dealScore.overallScore}/100). Check it on DealSathi:`;

  const handleCopy = () => {
    navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-slate-200 shadow-2xl space-y-5">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-brand-blue" />
            <h3 className="font-extrabold text-base text-slate-900">Share Sathi Verdict</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-900">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Visual Share Card Preview */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-950 to-slate-900 text-white space-y-3 shadow-lg border border-indigo-900">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-brand-yellow flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 fill-brand-yellow" />
              DEALSATHI VERDICT
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500 text-white font-extrabold">
              🟢 BUY NOW
            </span>
          </div>

          <h4 className="font-extrabold text-sm text-white line-clamp-1">{product.title}</h4>

          <div className="flex items-baseline justify-between pt-1">
            <span className="text-lg font-black text-white">₹{product.currentBestTruePrice.toLocaleString('en-IN')}</span>
            <span className="text-xs font-bold text-brand-yellow">Deal Score {product.dealScore.overallScore}/100</span>
          </div>

          <p className="text-[11px] text-indigo-200 line-clamp-2 italic">
            "₹{(product.averagePrice30d - product.currentBestTruePrice).toLocaleString('en-IN')} below recent average."
          </p>
        </div>

        {/* Social Share Buttons */}
        <div className="grid grid-cols-3 gap-2 text-xs">
          <a
            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700 font-bold border border-emerald-200 flex flex-col items-center gap-1 hover:bg-emerald-100 transition"
          >
            <MessageSquare className="w-4 h-4 text-emerald-600" />
            <span>WhatsApp</span>
          </a>

          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-blue-50 text-blue-700 font-bold border border-blue-200 flex flex-col items-center gap-1 hover:bg-blue-100 transition"
          >
            <Send className="w-4 h-4 text-blue-600" />
            <span>Twitter / X</span>
          </a>

          <button
            onClick={handleCopy}
            className="p-2.5 rounded-xl bg-slate-100 text-slate-700 font-bold border border-slate-200 flex flex-col items-center gap-1 hover:bg-slate-200 transition"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-600" />}
            <span>{copied ? 'Copied!' : 'Copy Link'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
