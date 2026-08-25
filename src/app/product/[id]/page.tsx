'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { 
  Sparkles, 
  ShieldCheck, 
  ExternalLink, 
  Eye, 
  Scale, 
  CheckCircle2, 
  XCircle, 
  ThumbsUp,
  ThumbsDown,
  Clock,
  Bot,
  Share2
} from 'lucide-react';
import { MOCK_PRODUCTS } from '@/lib/mockData';
import { DealScoreUI } from '@/components/dealScore/DealScoreUI';
import { AskSathiModal } from '@/components/common/AskSathiModal';
import { SathiScorecard } from '@/components/common/SathiScorecard';
import { WhatWouldSathiDoModal } from '@/components/common/WhatWouldSathiDoModal';
import { EvidenceDrawer } from '@/components/common/EvidenceDrawer';
import { WhyNotThis } from '@/components/common/WhyNotThis';
import { SocialShareModal } from '@/components/common/SocialShareModal';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;

  const product = MOCK_PRODUCTS.find(p => p.id === productId) || MOCK_PRODUCTS[0];

  const [selectedImage, setSelectedImage] = useState(product.imageUrl);
  const [showWatchModal, setShowWatchModal] = useState(false);
  const [targetWatchPrice, setTargetWatchPrice] = useState(product.currentBestTruePrice - 1000);
  const [watchSuccess, setWatchSuccess] = useState(false);
  const [isAskSathiOpen, setIsAskSathiOpen] = useState(false);
  const [isWhatWouldSathiDoOpen, setIsWhatWouldSathiDoOpen] = useState(false);
  const [isEvidenceOpen, setIsEvidenceOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);

  const handleCreateWatch = () => {
    setWatchSuccess(true);
    setTimeout(() => {
      setShowWatchModal(false);
      setWatchSuccess(false);
    }, 1500);
  };

  const alternatives = MOCK_PRODUCTS.filter(p => p.id !== product.id).slice(0, 2);

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* BREADCRUMB & QUICK ACTIONS */}
      <div className="flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-2 text-slate-500 font-medium">
          <Link href="/" className="hover:text-slate-900">Home</Link>
          <span>/</span>
          <Link href={`/search?q=${product.category}`} className="capitalize hover:text-slate-900">{product.category}</Link>
          <span>/</span>
          <span className="text-slate-900 font-bold truncate max-w-xs">{product.brand} {product.model}</span>
        </div>

        <div className="flex items-center gap-2">
          {/* SIGNATURE WHAT WOULD SATHI DO BUTTON */}
          <button
            onClick={() => setIsWhatWouldSathiDoOpen(true)}
            className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-brand-saffron to-amber-500 text-white font-bold hover:opacity-95 transition flex items-center gap-1.5 shadow-glow-saffron"
          >
            <Bot className="w-4 h-4" />
            <span>What Would Sathi Do?</span>
          </button>
          
          <button
            onClick={() => setIsAskSathiOpen(true)}
            className="px-3.5 py-1.5 rounded-xl bg-brand-blue text-white font-bold hover:bg-indigo-700 transition flex items-center gap-1.5 shadow-glow-blue"
          >
            <Sparkles className="w-4 h-4" />
            <span>Ask Sathi</span>
          </button>

          <button
            onClick={() => setIsShareOpen(true)}
            className="px-3.5 py-1.5 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 transition flex items-center gap-1.5"
          >
            <Share2 className="w-4 h-4 text-brand-blue" />
            <span>Share Verdict</span>
          </button>
        </div>
      </div>

      {/* TOP PRODUCT HERO SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm">
        
        {/* Gallery */}
        <div className="lg:col-span-5 space-y-4">
          <div className="aspect-square bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden flex items-center justify-center p-4">
            <img src={selectedImage} alt={product.title} className="w-full h-full object-contain" />
          </div>
          <div className="flex gap-2">
            {product.galleryImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(img)}
                className={`w-16 h-16 rounded-xl border-2 overflow-hidden transition ${
                  selectedImage === img ? 'border-brand-blue' : 'border-slate-200'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Details & Sathi Verdict */}
        <div className="lg:col-span-7 space-y-6">
          
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{product.brand}</span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-tight">
              {product.title}
            </h1>
          </div>

          {/* VERDICT BANNER */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-950 to-slate-900 text-white space-y-3 shadow-lg border border-indigo-900">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-brand-yellow flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 fill-brand-yellow" />
                Sathi Verdict
              </span>
              <div className="flex items-center gap-2">
                <span className="px-3.5 py-1 rounded-full text-xs font-extrabold bg-emerald-500 text-white shadow-sm">
                  🟢 BUY NOW
                </span>
                <span className="text-xs font-bold text-brand-yellow">
                  Score {product.dealScore.overallScore}/100
                </span>
              </div>
            </div>
            <p className="text-xs text-indigo-100 leading-relaxed font-medium">
              "{product.verdictReason}"
            </p>
          </div>

          {/* TRUE PRICE CALCULATOR */}
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <span className="text-xs font-bold text-slate-700">Estimated True Payable Price</span>
              <span className="text-[10px] text-emerald-600 font-semibold">Confirmed Live Calculation</span>
            </div>

            <div className="space-y-1.5 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Base Listed Price</span>
                <span className="font-semibold text-slate-900">₹{product.offers[0].basePrice.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping & Handling</span>
                <span className="font-semibold text-slate-900">₹{product.offers[0].shippingFee}</span>
              </div>
              <div className="flex justify-between text-emerald-600">
                <span>Applicable Store Coupon</span>
                <span className="font-semibold">-₹{product.offers[0].applicableCoupons}</span>
              </div>
              <div className="flex justify-between text-emerald-600">
                <span>Bank Credit/Debit Card Discount*</span>
                <span className="font-semibold">-₹{product.offers[0].bankDiscount}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-900 block">Final True Payable Price</span>
                <span className="text-[10px] text-slate-500">*Bank offer applied at checkout</span>
              </div>
              <span className="text-2xl font-extrabold text-emerald-600">
                ₹{product.currentBestTruePrice.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* ALL SUPPORTED OFFERS */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">All Supported Store Offers</h3>
            <div className="space-y-2">
              {product.offers.map((offer) => (
                <div key={offer.id} className="p-4 rounded-2xl border border-slate-200/80 flex items-center justify-between hover:bg-slate-50 transition">
                  <div className="space-y-0.5">
                    <span className="font-extrabold text-sm text-slate-900">{offer.merchantName}</span>
                    <p className="text-xs text-slate-500">{offer.deliveryEstimate} | Seller: {offer.sellerName} ({offer.sellerRating}★)</p>
                  </div>
                  <div className="text-right">
                    <span className="text-base font-extrabold text-slate-900">₹{offer.finalTruePrice.toLocaleString('en-IN')}</span>
                    <a
                      href={offer.affiliateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-xs font-bold text-brand-blue hover:underline flex items-center gap-1 justify-end mt-0.5"
                    >
                      <span>Buy on {offer.merchantName}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* SATHI SCORECARD COMPONENT */}
      <SathiScorecard score={product.dealScore} productName={product.title} currentPrice={product.currentBestTruePrice} />

      {/* VISUAL DEAL SCORE & PRICE POSITION GRID */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-6">
          <DealScoreUI score={product.dealScore} productName={product.title} category={product.category} />
        </div>

        <div className="md:col-span-6 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-2 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Price Position Analysis</span>
            <Link href={`/price-history/${product.id}`} className="text-xs font-bold text-brand-blue hover:underline flex items-center gap-1">
              <span>View Full 365d History</span>
              <Clock className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-1">
            <span className="text-xs font-extrabold text-emerald-700 block">Price Position: Excellent</span>
            <p className="text-xs leading-relaxed font-medium">
              Current price of ₹{product.currentBestTruePrice.toLocaleString('en-IN')} is ₹{(product.averagePrice30d - product.currentBestTruePrice).toLocaleString('en-IN')} below its 30-day average. Historical low is ₹{product.lowestPrice365d.toLocaleString('en-IN')}.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-slate-400 text-[10px] block">30-Day Average</span>
              <span className="font-bold text-slate-900">₹{product.averagePrice30d.toLocaleString('en-IN')}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-slate-400 text-[10px] block">Price Volatility</span>
              <span className="font-bold text-brand-blue">{product.priceVolatility}</span>
            </div>
          </div>
        </div>
      </div>

      {/* WHY NOT THE ALTERNATIVES */}
      <WhyNotThis alternatives={alternatives} />

      {/* PRICE HISTORY GRAPH */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Clock className="w-5 h-5 text-brand-blue" />
              <span>365-Day Price History & Trend</span>
            </h2>
            <p className="text-xs text-slate-500">Historical lowest: ₹{product.lowestPrice365d.toLocaleString('en-IN')} | Average: ₹{product.averagePrice30d.toLocaleString('en-IN')}</p>
          </div>
          <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-bold self-start sm:self-auto">
            Current Price is Below 30d Average!
          </span>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={product.priceHistory}>
              <defs>
                <linearGradient id="priceGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563EB" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="date" stroke="#94A3B8" fontSize={12} />
              <YAxis stroke="#94A3B8" fontSize={12} domain={['dataMin - 1000', 'dataMax + 1000']} />
              <Tooltip formatter={(value: number) => [`₹${value.toLocaleString('en-IN')}`, 'Price']} />
              <Area type="monotone" dataKey="price" stroke="#2563EB" strokeWidth={3} fillOpacity={1} fill="url(#priceGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Modals & Drawers */}
      <AskSathiModal isOpen={isAskSathiOpen} onClose={() => setIsAskSathiOpen(false)} contextTitle={product.title} />
      <WhatWouldSathiDoModal isOpen={isWhatWouldSathiDoOpen} onClose={() => setIsWhatWouldSathiDoOpen(false)} product={product} />
      <EvidenceDrawer isOpen={isEvidenceOpen} onClose={() => setIsEvidenceOpen(false)} product={product} />
      <SocialShareModal isOpen={isShareOpen} onClose={() => setIsShareOpen(false)} product={product} />

    </div>
  );
}
