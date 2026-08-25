'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Trophy, Coins, Zap, Camera, Gem, Tag, ArrowRight, Sparkles } from 'lucide-react';
import { MOCK_PRODUCTS } from '@/lib/mockData';

export default function CategoryHubPage() {
  const params = useParams();
  const categoryParam = (params.category as string) || 'smartphones';
  const formattedCategory = categoryParam.replace('-', ' ').toUpperCase();

  const categoryProducts = MOCK_PRODUCTS.filter(p => p.category.toLowerCase() === categoryParam.toLowerCase()) ;
  const products = categoryProducts.length > 0 ? categoryProducts : MOCK_PRODUCTS;

  const CATEGORY_BADGES = [
    { title: 'Best Overall', icon: Trophy, color: 'bg-indigo-950 text-white' },
    { title: 'Best Value', icon: Coins, color: 'bg-emerald-600 text-white' },
    { title: 'Best Performance', icon: Zap, color: 'bg-blue-600 text-white' },
    { title: 'Best Camera', icon: Camera, color: 'bg-purple-600 text-white' },
    { title: 'Premium Choice', icon: Gem, color: 'bg-amber-600 text-white' },
    { title: 'Cheapest Worth Buying', icon: Tag, color: 'bg-slate-800 text-white' },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* HEADER BANNER */}
      <div className="bg-gradient-to-br from-indigo-950 via-brand-indigo to-slate-900 rounded-3xl p-6 sm:p-8 text-white space-y-3 border border-indigo-900 shadow-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-saffron text-white text-xs font-extrabold shadow-sm">
          <Trophy className="w-4 h-4" />
          <span>Category Curated Picks</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Best {formattedCategory} in India
        </h1>
        <p className="text-xs sm:text-sm text-indigo-100/90 max-w-xl font-medium">
          Verified Sathi Deal Scores, normalized true prices, and review signal evidence for top {formattedCategory.toLowerCase()}.
        </p>
      </div>

      {/* CATEGORY PICKS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product, idx) => {
          const badge = CATEGORY_BADGES[idx % CATEGORY_BADGES.length];
          const BadgeIcon = badge.icon;
          return (
            <div key={product.id} className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4 hover:shadow-card-hover transition flex flex-col justify-between">
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`px-3 py-1 rounded-full text-xs font-extrabold flex items-center gap-1.5 ${badge.color}`}>
                    <BadgeIcon className="w-3.5 h-3.5" />
                    <span>{badge.title}</span>
                  </span>
                  <span className="text-xs font-bold text-slate-900">Score {product.dealScore.overallScore}/100</span>
                </div>

                <div className="flex gap-4">
                  <img src={product.imageUrl} alt="" className="w-20 h-20 object-cover rounded-2xl border border-slate-100 shrink-0" />
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">{product.brand}</span>
                    <h3 className="font-bold text-sm text-slate-900 line-clamp-2">{product.title}</h3>
                    <p className="text-xs font-extrabold text-emerald-600">₹{product.currentBestTruePrice.toLocaleString('en-IN')}</p>
                  </div>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 bg-slate-50 p-3 rounded-xl border border-slate-200/80 font-medium">
                  "{product.verdictReason}"
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400">Verified Stores: {product.offers.length}</span>
                <Link
                  href={`/product/${product.id}`}
                  className="px-4 py-2 bg-indigo-950 text-white rounded-xl text-xs font-bold hover:bg-brand-blue transition flex items-center gap-1"
                >
                  <span>Inspect Pick</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
