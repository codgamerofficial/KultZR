'use client';

import React from 'react';
import { X, Smartphone, Share2, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { MOCK_PRODUCTS } from '@/lib/mockData';

interface AndroidShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AndroidShareModal: React.FC<AndroidShareModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const product = MOCK_PRODUCTS[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-950 text-white rounded-3xl shadow-2xl max-w-sm w-full overflow-hidden border border-slate-800">
        
        {/* Android Device Status Bar Mockup */}
        <div className="bg-slate-900 px-6 py-3 flex items-center justify-between text-xs text-slate-400 font-mono">
          <span>9:41 AM</span>
          <div className="flex items-center gap-2">
            <span>5G</span>
            <span>100%</span>
          </div>
        </div>

        {/* App Title & Header */}
        <div className="px-6 py-4 bg-gradient-to-b from-slate-900 to-indigo-950 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-brand-saffron flex items-center justify-center font-bold text-white shadow-md text-xs">
              DS
            </div>
            <div>
              <h3 className="font-bold text-sm text-white">DealSathi Android App</h3>
              <p className="text-[10px] text-slate-300">Share Intent Receiver Active</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Share Sheet simulation content */}
        <div className="p-5 space-y-4">
          <div className="p-3 bg-white/5 rounded-2xl border border-white/10 flex items-center gap-3">
            <Share2 className="w-5 h-5 text-brand-saffron shrink-0" />
            <div className="text-xs">
              <span className="text-slate-400 block text-[10px]">Shared Link Received:</span>
              <p className="font-mono text-indigo-300 truncate">https://amazon.in/dp/iqoo-neo-9-pro</p>
            </div>
          </div>

          {/* Sathi Instant Analysis */}
          <div className="bg-gradient-to-br from-indigo-900/80 to-indigo-950 p-4 rounded-2xl border border-indigo-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-brand-yellow flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                Sathi Verdict
              </span>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500 text-white">
                BUY (Score 94)
              </span>
            </div>

            <p className="text-xs text-indigo-100 leading-relaxed font-medium">
              "Great match! True price is ₹33,499 with Amazon ICICI Bank offer. Lowest in 30 days."
            </p>

            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
              <span className="text-slate-400">Save ₹1,500 over Flipkart</span>
              <a
                href={`/product/${product.id}`}
                onClick={onClose}
                className="text-brand-saffron font-bold flex items-center gap-1 hover:underline"
              >
                View Full Analysis <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div className="text-center pt-2">
            <button
              onClick={onClose}
              className="w-full py-2.5 bg-brand-blue text-white rounded-xl text-xs font-bold hover:bg-indigo-600 transition shadow-glow-blue"
            >
              Done & Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
