'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Sparkles, 
  Flame, 
  Target, 
  ShieldCheck, 
  ArrowRight,
  Smartphone,
  Laptop,
  Headphones,
  Tv,
  Footprints,
  WashingMachine,
  Bot,
  LineChart,
  Star,
  Lock,
  Search,
  ExternalLink
} from 'lucide-react';
import { MOCK_PRODUCTS, MOCK_MISSIONS } from '@/lib/mockData';
import { IntelligentSearchBox } from '@/components/search/IntelligentSearchBox';
import { AskSathiModal } from '@/components/common/AskSathiModal';

export default function HomePage() {
  const router = useRouter();
  const [urlInput, setUrlInput] = useState('');
  const [showUrlModal, setShowUrlModal] = useState(false);
  const [isAskSathiOpen, setIsAskSathiOpen] = useState(false);
  const [userMissions] = useState(MOCK_MISSIONS);

  const handleUrlAnalyze = () => {
    if (urlInput.trim()) {
      router.push(`/search?q=${encodeURIComponent('Analyze URL: ' + urlInput)}`);
    }
  };

  const CATEGORIES = [
    { label: 'Smartphones', icon: Smartphone, href: '/search?q=nothing', color: 'bg-blue-950/80 text-blue-400 border-blue-800/50' },
    { label: 'Laptops', icon: Laptop, href: '/search?q=Best+Laptops', color: 'bg-indigo-950/80 text-indigo-400 border-indigo-800/50' },
    { label: 'Earbuds & Audio', icon: Headphones, href: '/search?q=Best+Earbuds', color: 'bg-amber-950/80 text-amber-400 border-amber-800/50' },
    { label: 'Smart TVs', icon: Tv, href: '/search?q=Best+Smart+TVs', color: 'bg-emerald-950/80 text-emerald-400 border-emerald-800/50' },
    { label: 'Shoes', icon: Footprints, href: '/search?q=Running+Shoes', color: 'bg-purple-950/80 text-purple-400 border-purple-800/50' },
    { label: 'Appliances', icon: WashingMachine, href: '/search?q=Washing+Machine', color: 'bg-rose-950/80 text-rose-400 border-rose-800/50' },
  ];

  return (
    <div className="space-y-8 sm:space-y-10 animate-fadeIn text-slate-100">
      
      {/* MOBILE-OPTIMIZED HERO SECTION */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0A0D1F] via-[#0E1329] to-[#070A16] p-5 sm:p-8 lg:p-10 border border-slate-800/80 shadow-2xl">
        
        {/* Background Ambient Glow Orbs */}
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-blue-600/15 rounded-full blur-[80px] pointer-events-none"></div>
        <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-violet-600/15 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          
          {/* Left Hero Column */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-5">
            
            {/* Brand Promise Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-800/60 text-[11px] font-semibold text-amber-400">
              <Sparkles className="w-3 h-3 fill-amber-400" />
              <span>You Wish. Sathi Finds. You Save.</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
              Shopping <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-violet-400 bg-clip-text text-transparent">
                Smarter with Sathi
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-lg font-normal leading-relaxed">
              Sathi researches real prices, merchant offers and reviews so you don't have to.
            </p>

            {/* INTELLIGENT SEARCH BOX */}
            <IntelligentSearchBox onUrlAnalyzeClick={() => setShowUrlModal(true)} />

            {/* QUICK PROMPT BADGES (Horizontal Scrollable on Mobile) */}
            <div className="pt-1 flex items-center gap-2 overflow-x-auto whitespace-nowrap no-scrollbar py-1">
              <span className="text-[11px] font-semibold text-slate-400 shrink-0">Try asking:</span>
              {['nothing 4a', 'Best laptop under ₹70k', 'Best earbuds under ₹3k', 'Best TV for PS5'].map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => router.push(`/search?q=${encodeURIComponent(prompt)}`)}
                  className="px-3 py-1 rounded-xl bg-[#11162B] hover:bg-[#1A203B] hover:text-white text-slate-300 border border-slate-800 transition text-[11px] font-medium shrink-0"
                >
                  {prompt}
                </button>
              ))}
            </div>

          </div>

          {/* Right 3D Sathi Intelligence Scene (Desktop Only to save mobile space) */}
          <div className="lg:col-span-5 relative hidden md:flex items-center justify-center min-h-[260px]">
            <div className="w-64 h-64 rounded-full pedestal-glow absolute inset-0 m-auto pointer-events-none"></div>
            
            <div className="relative w-full max-w-xs p-5 rounded-3xl bg-gradient-to-b from-[#131830] to-[#0A0D1B] border border-indigo-500/30 shadow-2xl text-center space-y-3 animate-float">
              <div className="relative h-36 flex items-center justify-center">
                <div className="w-28 h-28 rounded-2xl bg-gradient-to-tr from-blue-600 to-violet-600 opacity-20 blur-xl absolute inset-0 m-auto"></div>
                <div className="relative z-10 w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-900 to-indigo-950 border border-indigo-400/40 shadow-2xl flex items-center justify-center">
                  <Bot className="w-12 h-12 text-amber-400" />
                </div>
              </div>
              <div className="space-y-0.5">
                <span className="text-[10px] font-extrabold text-blue-400 uppercase tracking-widest">SATHI AGENT ENGAGED</span>
                <p className="text-[11px] text-slate-300 font-medium">100% Real Commerce Data Verified</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* AI INTELLIGENCE STRIP */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        
        <div className="p-3.5 sm:p-4 rounded-2xl bg-[#0C1021] border border-slate-800/80 shadow-md flex items-center gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-blue-950 border border-blue-800/50 flex items-center justify-center shrink-0">
            <Bot className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white">AI Research</h4>
            <p className="text-[10px] text-slate-400 line-clamp-1">Finds & compares</p>
          </div>
        </div>

        <div className="p-3.5 sm:p-4 rounded-2xl bg-[#0C1021] border border-slate-800/80 shadow-md flex items-center gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-indigo-950 border border-indigo-800/50 flex items-center justify-center shrink-0">
            <LineChart className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white">Price Tracking</h4>
            <p className="text-[10px] text-slate-400 line-clamp-1">24/7 price alerts</p>
          </div>
        </div>

        <div className="p-3.5 sm:p-4 rounded-2xl bg-[#0C1021] border border-slate-800/80 shadow-md flex items-center gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-950 border border-emerald-800/50 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white">Verified Offers</h4>
            <p className="text-[10px] text-slate-400 line-clamp-1">Connected sources</p>
          </div>
        </div>

        <div className="p-3.5 sm:p-4 rounded-2xl bg-[#0C1021] border border-slate-800/80 shadow-md flex items-center gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-violet-950 border border-violet-800/50 flex items-center justify-center shrink-0">
            <Target className="w-5 h-5 text-violet-400" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white">Smart Missions</h4>
            <p className="text-[10px] text-slate-400 line-clamp-1">Target price watch</p>
          </div>
        </div>

      </section>

      {/* POPULAR CATEGORIES */}
      <section className="space-y-3">
        <h2 className="text-sm sm:text-base font-extrabold text-slate-100">
          Popular Shopping Categories
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.label}
                href={cat.href}
                className="p-3.5 rounded-2xl bg-[#0C1021] border border-slate-800/80 shadow-sm hover:border-blue-500/40 hover:-translate-y-0.5 transition flex flex-col items-center text-center gap-2 group"
              >
                <div className={`w-9 h-9 rounded-xl ${cat.color} border flex items-center justify-center transition group-hover:scale-110`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-slate-200 group-hover:text-blue-400">
                  {cat.label}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* POPULAR VERIFIED PRODUCTS (STANDARDIZED CARDS) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 fill-amber-400" />
            <h2 className="text-sm sm:text-base font-extrabold text-white">Popular Verified Products</h2>
          </div>
          <Link href="/search?q=all+deals" className="text-xs font-bold text-blue-400 hover:underline flex items-center gap-1">
            View All Deals <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Product Cards Grid with Compact Image Containers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {MOCK_PRODUCTS.slice(0, 3).map((product) => (
            <div key={product.id} className="product-card-3d bg-[#0C1021] rounded-2xl p-4 sm:p-5 border border-slate-800/90 shadow-lg space-y-3 flex flex-col justify-between group">
              
              {/* Product Top Bar */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{product.brand}</span>
                <span className="px-2.5 py-0.5 rounded-full bg-slate-900 text-amber-400 border border-amber-500/30 font-extrabold text-[11px] flex items-center gap-1">
                  ★ {product.dealScore.overallScore}
                </span>
              </div>

              {/* Standardized Compact Image Platform */}
              <div className="relative h-32 sm:h-40 flex items-center justify-center rounded-xl bg-[#080B17] border border-slate-800/80 p-2">
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="max-h-full max-w-full object-contain rounded-lg relative z-10 group-hover:scale-105 transition duration-300"
                />
              </div>

              {/* Title & Price */}
              <div className="space-y-1">
                <h3 className="font-bold text-xs sm:text-sm text-white line-clamp-2 leading-snug">
                  {product.title}
                </h3>
              </div>

              {/* Price & Savings */}
              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                <div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-base sm:text-lg font-black text-white">
                      ₹{product.currentBestTruePrice.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[11px] text-slate-500 line-through">
                      ₹{product.mrp.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-bold block">
                    Save ₹{(product.mrp - product.currentBestTruePrice).toLocaleString('en-IN')}
                  </span>
                </div>

                <Link
                  href={`/product/${product.id}`}
                  className="px-3.5 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs rounded-xl hover:brightness-110 transition shadow-md flex items-center gap-1"
                >
                  <span>Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

            </div>
          ))}
        </div>

        {/* TRUST PROOF BAR */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-2 text-[11px] text-slate-400 border-t border-slate-800/80">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            <span>Verified Prices</span>
          </div>
          <div className="flex items-center gap-1.5">
            <LineChart className="w-3.5 h-3.5 text-indigo-400" />
            <span>Price History</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>Real Reviews</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span>Secure Links</span>
          </div>
        </div>

      </section>

      {/* ACTIVE MISSIONS PANEL (1 PER ROW ON MOBILE TO PREVENT COMPRESSION) */}
      <section className="bg-[#0C1021] rounded-3xl p-5 sm:p-6 border border-slate-800/90 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-indigo-400" />
            <div>
              <h3 className="text-sm sm:text-base font-extrabold text-white">Active Shopping Missions</h3>
              <p className="text-[11px] text-slate-400">Persistent AI monitoring target prices</p>
            </div>
          </div>
          <Link href="/missions" className="px-3.5 py-1.5 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-500 transition">
            Create
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {userMissions.map((mission) => (
            <div key={mission.id} className="p-4 rounded-2xl bg-[#080B17] border border-slate-800/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 text-[10px] font-extrabold rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800">
                  {mission.status}
                </span>
                <span className="text-[11px] font-bold text-slate-300">
                  ₹{mission.targetPrice.toLocaleString('en-IN')} / ₹{mission.budgetMax.toLocaleString('en-IN')}
                </span>
              </div>
              <h4 className="font-bold text-xs text-white leading-snug">{mission.title}</h4>
              
              {/* Mission Visual Target Bar */}
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 to-emerald-400 rounded-full" style={{ width: `${Math.min(100, (mission.targetPrice / mission.budgetMax) * 100)}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Ask Sathi Global Modal */}
      <AskSathiModal
        isOpen={isAskSathiOpen}
        onClose={() => setIsAskSathiOpen(false)}
        contextTitle="DealSathi Shopping Assistant"
      />

      {/* URL Analyzer Modal */}
      {showUrlModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#0C1021] rounded-3xl p-6 max-w-md w-full border border-slate-700 space-y-4 text-white">
            <h3 className="font-extrabold text-base">Analyze Product URL</h3>
            <p className="text-xs text-slate-400">Paste any Amazon, Flipkart, or Croma link to get instant DealSathi verdict</p>
            <input
              type="text"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="https://amazon.in/dp/example..."
              className="w-full px-4 py-2.5 text-xs bg-[#080B17] text-white rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex gap-2 justify-end">
              <button onClick={() => setShowUrlModal(false)} className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white">Cancel</button>
              <button onClick={handleUrlAnalyze} className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-500">Analyze Link</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
