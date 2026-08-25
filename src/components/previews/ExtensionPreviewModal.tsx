'use client';

import React, { useState } from 'react';
import { X, Sparkles, ShoppingCart, ShieldCheck, CheckCircle2, ArrowRight, ExternalLink } from 'lucide-react';
import { MOCK_PRODUCTS } from '@/lib/mockData';

interface ExtensionPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExtensionPreviewModal: React.FC<ExtensionPreviewModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'verdict' | 'prices' | 'reviews'>('verdict');
  if (!isOpen) return null;

  const sampleProduct = MOCK_PRODUCTS[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-200">
        {/* Browser Extension Header Mockup */}
        <div className="bg-slate-900 px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-saffron to-amber-500 flex items-center justify-center font-bold text-white shadow-sm text-sm">
              DS
            </div>
            <div>
              <h3 className="font-bold text-sm flex items-center gap-2">
                DealSathi Extension (Manifest V3)
                <span className="px-2 py-0.5 text-[10px] bg-emerald-500/20 text-emerald-300 rounded-full border border-emerald-400/30">
                  Page Active
                </span>
              </h3>
              <p className="text-xs text-slate-400">Analyzing active Amazon / Flipkart tab</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Extension Side-Panel Simulator Body */}
        <div className="p-6 space-y-5">
          {/* Simulated Browser Webpage Banner */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img src={sampleProduct.imageUrl} alt={sampleProduct.title} className="w-14 h-14 object-cover rounded-xl border border-slate-200" />
              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Detected Product Page</span>
                <h4 className="font-bold text-sm text-slate-900 line-clamp-1">{sampleProduct.title}</h4>
                <p className="text-xs text-slate-500">Merchant Listed Price: <span className="font-semibold text-slate-900">₹34,999</span></p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-600 text-white shadow-sm">
                BUY VERDICT
              </span>
            </div>
          </div>

          {/* Extension Action Tabs */}
          <div className="flex border-b border-slate-200">
            <button
              onClick={() => setActiveTab('verdict')}
              className={`pb-2.5 px-4 text-xs font-bold border-b-2 transition ${
                activeTab === 'verdict' ? 'border-brand-blue text-brand-blue' : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              Sathi Verdict (94 Score)
            </button>
            <button
              onClick={() => setActiveTab('prices')}
              className={`pb-2.5 px-4 text-xs font-bold border-b-2 transition ${
                activeTab === 'prices' ? 'border-brand-blue text-brand-blue' : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              True Price Compare (2 Stores)
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-2.5 px-4 text-xs font-bold border-b-2 transition ${
                activeTab === 'reviews' ? 'border-brand-blue text-brand-blue' : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              Review Signals
            </button>
          </div>

          {/* Tab Contents */}
          {activeTab === 'verdict' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-indigo-50/80 border border-indigo-100 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-indigo-900 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-brand-saffron" />
                    DealSathi AI Analysis
                  </span>
                  <span className="text-xs font-extrabold text-brand-blue bg-white px-2.5 py-1 rounded-full border border-indigo-200 shadow-sm">
                    Score: 94/100
                  </span>
                </div>
                <p className="text-xs text-indigo-950 leading-relaxed font-medium">
                  {sampleProduct.verdictReason}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-500">True Payable Price</span>
                  <p className="text-lg font-bold text-emerald-600">₹{sampleProduct.currentBestTruePrice.toLocaleString('en-IN')}</p>
                  <span className="text-[10px] text-slate-400">Includes Bank Offer + Coupon</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-500">365-Day Low</span>
                  <p className="text-lg font-bold text-slate-900">₹{sampleProduct.lowestPrice365d.toLocaleString('en-IN')}</p>
                  <span className="text-[10px] text-emerald-600 font-semibold">Near lowest point!</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'prices' && (
            <div className="space-y-3 text-xs">
              {sampleProduct.offers.map((offer) => (
                <div key={offer.id} className="p-3 rounded-xl border border-slate-200 flex items-center justify-between hover:bg-slate-50 transition">
                  <div>
                    <span className="font-bold text-slate-900">{offer.merchantName}</span>
                    <p className="text-slate-500 text-[11px]">{offer.deliveryEstimate}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm text-slate-900">₹{offer.finalTruePrice.toLocaleString('en-IN')}</p>
                    <a href={offer.affiliateUrl} target="_blank" rel="noopener noreferrer" className="text-brand-blue font-semibold hover:underline inline-flex items-center gap-1">
                      Buy Offer <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                <span className="font-bold text-emerald-900">What Buyers Love:</span>
                <ul className="list-disc list-inside mt-1 text-emerald-950 space-y-0.5">
                  {sampleProduct.reviewIntelligence.positiveThemes.map((t, i) => (
                    <li key={i}>{t}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Footer Action */}
          <div className="pt-2 flex items-center justify-between text-xs text-slate-500 border-t border-slate-200">
            <span>Powered by DealSathi Engine</span>
            <button onClick={onClose} className="px-4 py-2 bg-indigo-950 text-white font-bold rounded-xl hover:bg-brand-blue transition">
              Close Preview
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
