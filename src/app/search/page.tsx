'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Sparkles, 
  CheckCircle2, 
  Loader2, 
  SlidersHorizontal, 
  ShieldCheck, 
  Flame, 
  ArrowRight,
  TrendingDown,
  Info,
  Trophy,
  Coins,
  Zap,
  Camera,
  Gem,
  Tag,
  Check,
  Search,
  AlertTriangle,
  BellRing,
  ExternalLink,
  Store,
  Compass
} from 'lucide-react';
import { parseQueryIntent, searchAndScoreProducts, INITIAL_AGENT_STEPS } from '@/lib/aiOrchestrator';
import { AgentStepProgress, Product } from '@/lib/types';
import { merchantHealthService, MerchantStatus } from '@/lib/services/merchantHealth';

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const rawQuery = searchParams.get('q') || 'nothing';

  const [intent, setIntent] = useState(() => parseQueryIntent(rawQuery));
  const [agentSteps, setAgentSteps] = useState<AgentStepProgress[]>(INITIAL_AGENT_STEPS);
  const [isProcessing, setIsProcessing] = useState(true);
  const [results, setResults] = useState<{ recommendation: Product | null; otherPicks: Product[] } | null>(null);
  const [merchantStatuses, setMerchantStatuses] = useState<MerchantStatus[]>([]);

  useEffect(() => {
    setMerchantStatuses(merchantHealthService.getMerchantHealth());
    const parsedIntent = parseQueryIntent(rawQuery);
    setIntent(parsedIntent);
    setIsProcessing(true);

    let currentStepIndex = 0;
    const interval = setInterval(() => {
      if (currentStepIndex < INITIAL_AGENT_STEPS.length) {
        setAgentSteps(prev => prev.map((step, idx) => {
          if (idx === currentStepIndex) return { ...step, status: 'completed' };
          if (idx === currentStepIndex + 1) return { ...step, status: 'active' };
          return step;
        }));
        currentStepIndex++;
      } else {
        clearInterval(interval);
        const searchResults = searchAndScoreProducts(parsedIntent);
        setResults(searchResults);
        setIsProcessing(false);
      }
    }, 200);

    return () => clearInterval(interval);
  }, [rawQuery]);

  const getHeaderTitle = () => {
    if (intent.queryType === 'BRAND_SEARCH') return `BRAND SEARCH FOR "${intent.brand || rawQuery}"`;
    if (intent.queryType === 'BRAND_CATEGORY_SEARCH') return `${(intent.brand || '').toUpperCase()} ${intent.category?.toUpperCase() || ''}`;
    if (intent.queryType === 'PRODUCT_LOOKUP') return `PRODUCT SEARCH FOR "${rawQuery}"`;
    if (intent.queryType === 'CATEGORY_SEARCH') return `RECOMMENDATION SEARCH FOR "${rawQuery}"`;
    return `SHOPPING QUERY "${rawQuery}"`;
  };

  const isBrandBrowse = intent.queryType === 'BRAND_SEARCH' || intent.queryType === 'BRAND_CATEGORY_SEARCH';

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* HEADER BANNER */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              {getHeaderTitle()}
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">“{rawQuery}”</h1>
          </div>
          <button
            onClick={() => setIsProcessing(true)}
            className="px-4 py-2 bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-bold rounded-xl flex items-center gap-1.5 transition self-start sm:self-auto"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Refine Criteria</span>
          </button>
        </div>

        {/* CONNECTED MERCHANT SOURCES TRANSPARENCY BAR */}
        <div className="flex flex-wrap items-center gap-3 pt-2 text-xs border-t border-slate-100">
          <span className="font-bold text-slate-500 text-[11px]">Sources Checked:</span>
          {merchantStatuses.map((m) => (
            <div key={m.merchantName} className="flex items-center gap-1 text-[11px] font-semibold text-slate-700 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>{m.merchantName}</span>
            </div>
          ))}
        </div>

        {/* PARSED INTENT BREAKDOWN */}
        <div className="flex flex-wrap gap-2 text-xs">
          {intent.brand && (
            <div className="px-3 py-1.5 rounded-xl bg-indigo-50 border border-indigo-200 font-bold text-indigo-950 flex items-center gap-1">
              <span>Brand: {intent.brand}</span>
              {intent.brandLock && <span className="text-[10px] text-indigo-600">(Locked)</span>}
            </div>
          )}
          {intent.model && (
            <div className="px-3 py-1.5 rounded-xl bg-indigo-50 border border-indigo-200 font-bold text-indigo-950 flex items-center gap-1">
              <span>Model: {intent.model}</span>
              <span className="text-[10px] text-indigo-600">(Locked)</span>
            </div>
          )}
          {intent.category && (
            <div className="px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 font-medium capitalize">
              Category: {intent.category}
            </div>
          )}
          {intent.budgetMax && (
            <div className="px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 font-medium">
              Max Budget: ₹{intent.budgetMax.toLocaleString('en-IN')}
            </div>
          )}
        </div>
      </div>

      {/* PROGRESSIVE AGENT STEPS */}
      {isProcessing && (
        <div className="bg-gradient-to-br from-indigo-950 to-slate-900 rounded-3xl p-6 text-white space-y-4 border border-indigo-900 shadow-xl">
          <div className="flex items-center gap-2 text-brand-yellow font-bold text-sm">
            <Sparkles className="w-5 h-5 animate-spin" />
            <span>Sathi Analyzing Merchant Registries...</span>
          </div>

          <div className="space-y-2.5">
            {agentSteps.map((step) => (
              <div key={step.id} className="flex items-center gap-3 text-xs">
                {step.status === 'completed' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : step.status === 'active' ? (
                  <Loader2 className="w-4 h-4 text-brand-yellow animate-spin shrink-0" />
                ) : (
                  <div className="w-4 h-4 rounded-full border border-slate-600 shrink-0"></div>
                )}
                <span className={step.status === 'completed' ? 'text-indigo-200 font-medium' : step.status === 'active' ? 'text-white font-bold' : 'text-slate-500'}>
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* RESULTS DISPLAY */}
      {!isProcessing && results && (
        <div className="space-y-8 animate-fadeIn">
          
          {/* BRAND BROWSE INTERACTIVE ASSISTANT BANNER */}
          {isBrandBrowse && (
            <div className="bg-gradient-to-r from-indigo-900 to-slate-900 rounded-3xl p-6 text-white space-y-4 border border-indigo-800 shadow-lg">
              <div className="flex items-center gap-2 text-brand-yellow font-bold text-sm">
                <Compass className="w-5 h-5" />
                <span>Looking for a recommendation? Tell Sathi what matters most:</span>
              </div>
              <div className="flex flex-wrap gap-2 text-xs">
                <button
                  onClick={() => router.push(`/search?q=best+${encodeURIComponent(intent.brand || rawQuery)}+phone+for+camera`)}
                  className="px-4 py-2 bg-indigo-800/80 hover:bg-indigo-700 text-white font-bold rounded-xl border border-indigo-600 transition flex items-center gap-1.5"
                >
                  <Camera className="w-3.5 h-3.5 text-brand-yellow" />
                  <span>Best Camera</span>
                </button>
                <button
                  onClick={() => router.push(`/search?q=best+${encodeURIComponent(intent.brand || rawQuery)}+phone+under+30000`)}
                  className="px-4 py-2 bg-indigo-800/80 hover:bg-indigo-700 text-white font-bold rounded-xl border border-indigo-600 transition flex items-center gap-1.5"
                >
                  <Coins className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Best Value Under ₹30k</span>
                </button>
                <button
                  onClick={() => router.push(`/search?q=cheapest+${encodeURIComponent(intent.brand || rawQuery)}+phone`)}
                  className="px-4 py-2 bg-indigo-800/80 hover:bg-indigo-700 text-white font-bold rounded-xl border border-indigo-600 transition flex items-center gap-1.5"
                >
                  <Tag className="w-3.5 h-3.5 text-brand-saffron" />
                  <span>Lowest Price</span>
                </button>
                <button
                  onClick={() => router.push(`/search?q=best+${encodeURIComponent(intent.brand || rawQuery)}+phone`)}
                  className="px-4 py-2 bg-indigo-800/80 hover:bg-indigo-700 text-white font-bold rounded-xl border border-indigo-600 transition flex items-center gap-1.5"
                >
                  <Trophy className="w-3.5 h-3.5 text-brand-yellow" />
                  <span>Best Overall</span>
                </button>
              </div>
            </div>
          )}

          {/* SINGLE PRODUCT LOOKUP CARD (WHEN EXACT MODEL REQUESTED) */}
          {!isBrandBrowse && results.recommendation && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <Search className="w-4 h-4 text-brand-saffron" />
                  🔎 EXACT MATCH
                </span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                  Verified Offer (Live Merchant Registry)
                </span>
              </div>

              <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-brand-blue/30 shadow-xl space-y-6">
                <div className="flex flex-col lg:flex-row gap-6 items-start">
                  <div className="w-full lg:w-48 shrink-0 space-y-3">
                    <img src={results.recommendation.imageUrl} alt={results.recommendation.title} className="w-full h-48 object-cover rounded-2xl border border-slate-200" />
                    <div className="flex items-center justify-between px-2">
                      <span className="text-xs font-bold text-slate-500">{results.recommendation.brand}</span>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-600 text-white">VERDICT: BUY</span>
                    </div>
                  </div>

                  <div className="flex-1 space-y-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-3 py-1 rounded-full text-xs font-extrabold text-white bg-indigo-950 border border-indigo-800 flex items-center gap-1">
                          <Check className="w-3.5 h-3.5 text-brand-yellow" />
                          🔎 EXACT MATCH
                        </span>
                        <span className="text-xs font-bold text-brand-saffron">Deal Score: {results.recommendation.dealScore.overallScore}/100</span>
                      </div>
                      <h2 className="text-xl font-extrabold text-slate-900">{results.recommendation.title}</h2>
                    </div>

                    <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-100 text-xs text-indigo-950 space-y-2">
                      <div className="font-bold text-brand-blue flex items-center gap-1.5">
                        <Info className="w-4 h-4" />
                        Verified Product Information:
                      </div>
                      <p className="leading-relaxed font-medium">{results.recommendation.verdictReason}</p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                      <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">
                        <span className="text-slate-400 text-[10px] block">Price Advantage</span>
                        <span className="font-bold text-slate-900">{results.recommendation.dealScore.priceAdvantage}/100</span>
                      </div>
                      <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">
                        <span className="text-slate-400 text-[10px] block">Product Fit</span>
                        <span className="font-bold text-slate-900">{results.recommendation.dealScore.productFit}/100</span>
                      </div>
                      <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">
                        <span className="text-slate-400 text-[10px] block">Review Quality</span>
                        <span className="font-bold text-slate-900">{results.recommendation.dealScore.reviewQuality}/100</span>
                      </div>
                      <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">
                        <span className="text-slate-400 text-[10px] block">Seller Trust</span>
                        <span className="font-bold text-slate-900">{results.recommendation.dealScore.sellerTrust}/100</span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <span className="text-xs text-slate-400 block">Current Verified Offer ({results.recommendation.offers[0]?.merchantName})</span>
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-extrabold text-slate-900">₹{results.recommendation.currentBestTruePrice.toLocaleString('en-IN')}</span>
                          <span className="text-sm text-slate-400 line-through">₹{results.recommendation.mrp.toLocaleString('en-IN')}</span>
                        </div>
                      </div>

                      <a
                        href={results.recommendation.offers[0]?.affiliateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 bg-brand-blue text-white font-bold text-sm rounded-xl hover:bg-indigo-700 transition shadow-glow-blue flex items-center gap-2"
                      >
                        <span>View Verified Offer</span>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* UNVERIFIED CARD */}
          {!isBrandBrowse && !results.recommendation && (
            <div className="bg-white rounded-3xl p-8 border-2 border-amber-200 shadow-lg space-y-6 text-center">
              <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto border border-amber-200">
                <AlertTriangle className="w-8 h-8" />
              </div>
              <div className="max-w-md mx-auto space-y-2">
                <h2 className="text-lg font-extrabold text-slate-900">
                  “{intent.brand ? `${intent.brand} ` : ''}{intent.model || rawQuery}” could not be verified
                </h2>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  We searched connected merchant registries (Amazon, Flipkart, Croma) under strict brand & model filters. No verified canonical listing matches your search criteria right now.
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => router.push(`/search?q=${encodeURIComponent(intent.brand || 'Apple')}`)}
                  className="px-5 py-2.5 bg-indigo-950 text-white text-xs font-bold rounded-xl hover:bg-brand-blue transition flex items-center gap-1.5"
                >
                  <Search className="w-4 h-4" />
                  <span>Try Related {intent.brand || 'Category'} Products</span>
                </button>
                <Link
                  href="/watch"
                  className="px-5 py-2.5 bg-amber-500 text-white text-xs font-bold rounded-xl hover:bg-amber-600 transition flex items-center gap-1.5 shadow-sm"
                >
                  <BellRing className="w-4 h-4" />
                  <span>Notify Me When Found</span>
                </Link>
              </div>
            </div>
          )}

          {/* NEUTRAL BRAND PRODUCT GRID (FOR BRAND SEARCH "nothing") */}
          {results.otherPicks.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-extrabold text-slate-900">
                  {isBrandBrowse ? `${(intent.brand || rawQuery).toUpperCase()} PRODUCTS` : 'Alternative Products'}
                </h3>
                <span className="text-xs text-slate-500 font-medium">
                  {results.otherPicks.length} verified product(s) available
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {results.otherPicks.map((product) => (
                  <div key={product.id} className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm space-y-4 hover:shadow-card-hover transition flex flex-col justify-between">
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-slate-100 text-slate-800 border border-slate-200">
                          {product.brand} {product.model}
                        </span>
                        <span className="text-xs font-bold text-slate-900">Deal Score {product.dealScore.overallScore}/100</span>
                      </div>

                      <div className="flex gap-4">
                        <img src={product.imageUrl} alt={product.title} className="w-20 h-20 object-cover rounded-2xl border border-slate-100 shrink-0" />
                        <div className="space-y-1">
                          <h4 className="font-bold text-sm text-slate-900 line-clamp-2">{product.title}</h4>
                          <p className="text-xs text-slate-500 line-clamp-1">{product.verdictReason}</p>
                          <p className="font-extrabold text-base text-emerald-600">₹{product.currentBestTruePrice.toLocaleString('en-IN')}</p>
                        </div>
                      </div>
                    </div>

                    {/* Breakdown Scores (Product Fit = N/A for Brand Browse) */}
                    <div className="grid grid-cols-3 gap-1.5 text-[11px]">
                      <div className="p-1.5 rounded-lg bg-slate-50 border border-slate-200 text-center">
                        <span className="text-slate-400 text-[9px] block">Price Advantage</span>
                        <span className="font-bold text-slate-800">{product.dealScore.priceAdvantage}/100</span>
                      </div>
                      <div className="p-1.5 rounded-lg bg-slate-50 border border-slate-200 text-center">
                        <span className="text-slate-400 text-[9px] block">Product Fit</span>
                        <span className="font-bold text-slate-400">{isBrandBrowse ? 'N/A (Browse)' : `${product.dealScore.productFit}/100`}</span>
                      </div>
                      <div className="p-1.5 rounded-lg bg-slate-50 border border-slate-200 text-center">
                        <span className="text-slate-400 text-[9px] block">Review Quality</span>
                        <span className="font-bold text-slate-800">{product.dealScore.reviewQuality}/100</span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[10px] text-slate-400 font-semibold">{product.offers.length} Verified Store Offer(s)</span>
                      <a href={product.offers[0]?.affiliateUrl} target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-brand-blue hover:underline flex items-center gap-1">
                        View Verified Offer <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>

                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="p-12 text-center text-slate-500 font-bold text-sm flex items-center justify-center gap-2">
        <Loader2 className="w-5 h-5 animate-spin text-brand-blue" />
        <span>Loading Sathi Search Engine...</span>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
