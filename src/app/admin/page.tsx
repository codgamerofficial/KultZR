'use client';

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Users, 
  Search, 
  MousePointerClick, 
  DollarSign, 
  Cpu, 
  CheckCircle2, 
  AlertCircle, 
  Sliders, 
  RefreshCw,
  TrendingUp,
  Database
} from 'lucide-react';
import { DEFAULT_CATEGORY_WEIGHTS } from '@/lib/dealScoreEngine';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'weights' | 'merchants' | 'matching'>('overview');
  
  const [selectedCategory, setSelectedCategory] = useState<'smartphones' | 'laptops' | 'earbuds' | 'tvs'>('smartphones');
  const [weights, setWeights] = useState(DEFAULT_CATEGORY_WEIGHTS.smartphones);
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveWeights = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const MERCHANTS = [
    { name: 'Amazon.in', status: 'HEALTHY', latency: '142ms', sync: '1 min ago', volume: '142,400 calls/day', color: 'text-emerald-600 bg-emerald-50' },
    { name: 'Flipkart', status: 'HEALTHY', latency: '185ms', sync: '2 mins ago', volume: '98,200 calls/day', color: 'text-emerald-600 bg-emerald-50' },
    { name: 'Croma', status: 'HEALTHY', latency: '210ms', sync: '5 mins ago', volume: '34,100 calls/day', color: 'text-emerald-600 bg-emerald-50' },
    { name: 'Reliance Digital', status: 'DEGRADED', latency: '840ms', sync: '18 mins ago', volume: '12,500 calls/day', color: 'text-amber-600 bg-amber-50' },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* HEADER BANNER */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-brand-blue text-white flex items-center justify-center font-bold shadow-md">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold">DealSathi Intelligence Admin</h1>
            <p className="text-xs text-slate-400">System metrics, Deal Score weights, merchant adapters, and AI cost control</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs font-bold border border-emerald-500/30">
            ● All Services Operational
          </span>
        </div>
      </div>

      {/* ADMIN NAVIGATION TABS */}
      <div className="flex border-b border-slate-200 gap-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('overview')}
          className={`pb-3 px-4 text-xs font-bold border-b-2 transition ${
            activeTab === 'overview' ? 'border-brand-blue text-brand-blue' : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          System Overview
        </button>
        <button
          onClick={() => setActiveTab('weights')}
          className={`pb-3 px-4 text-xs font-bold border-b-2 transition ${
            activeTab === 'weights' ? 'border-brand-blue text-brand-blue' : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          Deal Score Weights
        </button>
        <button
          onClick={() => setActiveTab('merchants')}
          className={`pb-3 px-4 text-xs font-bold border-b-2 transition ${
            activeTab === 'merchants' ? 'border-brand-blue text-brand-blue' : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          Merchant Adapters
        </button>
      </div>

      {/* OVERVIEW TAB */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm space-y-1">
              <span className="text-xs font-bold text-slate-400 uppercase">DAU / MAU</span>
              <p className="text-xl font-extrabold text-slate-900">42,800 / 380K</p>
              <span className="text-[10px] text-emerald-600 font-semibold">↑ +14.2% this week</span>
            </div>
            <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm space-y-1">
              <span className="text-xs font-bold text-slate-400 uppercase">AI Searches</span>
              <p className="text-xl font-extrabold text-slate-900">128,450</p>
              <span className="text-[10px] text-slate-500">98.6% intent accuracy</span>
            </div>
            <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm space-y-1">
              <span className="text-xs font-bold text-slate-400 uppercase">Affiliate Clicks</span>
              <p className="text-xl font-extrabold text-slate-900">34,120</p>
              <span className="text-[10px] text-emerald-600 font-semibold">8.4% Outbound CTR</span>
            </div>
            <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm space-y-1">
              <span className="text-xs font-bold text-slate-400 uppercase">AI Token Cost</span>
              <p className="text-xl font-extrabold text-slate-900">$42.80 / day</p>
              <span className="text-[10px] text-emerald-600 font-semibold">Cached 68% calls</span>
            </div>
          </div>
        </div>
      )}

      {/* DEAL SCORE WEIGHTS TAB */}
      {activeTab === 'weights' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-base font-bold text-slate-900">Category Weight Configurator</h2>
              <p className="text-xs text-slate-500">Adjust how Deal Score (0–100) balances price vs specs vs reviews per category</p>
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as any)}
              className="px-3 py-1.5 text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl"
            >
              <option value="smartphones">Smartphones</option>
              <option value="laptops">Laptops</option>
              <option value="earbuds">Earbuds</option>
              <option value="tvs">Smart TVs</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {Object.entries(weights).map(([key, val]) => (
              <div key={key} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <div className="flex justify-between font-bold text-slate-700 capitalize">
                  <span>{key.replace(/([A-Z])/g, ' $1')}</span>
                  <span>{Math.round(val * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={val * 100}
                  onChange={(e) => {
                    const num = Number(e.target.value) / 100;
                    setWeights(prev => ({ ...prev, [key]: num }));
                  }}
                  className="w-full accent-brand-blue"
                />
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-2">
            {isSaved ? (
              <span className="text-xs font-bold text-emerald-600">✓ Category weights saved successfully!</span>
            ) : <span></span>}
            <button onClick={handleSaveWeights} className="px-5 py-2.5 bg-brand-blue text-white rounded-xl text-xs font-bold shadow-glow-blue">
              Save Weights
            </button>
          </div>
        </div>
      )}

      {/* MERCHANT ADAPTERS TAB */}
      {activeTab === 'merchants' && (
        <div className="space-y-4">
          <h2 className="text-base font-bold text-slate-900">Merchant Source Health</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {MERCHANTS.map((m) => (
              <div key={m.name} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-extrabold text-sm text-slate-900">{m.name}</span>
                  <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${m.color}`}>
                    {m.status}
                  </span>
                </div>
                <div className="space-y-1 text-slate-500">
                  <p>Latency: <span className="font-semibold text-slate-800">{m.latency}</span></p>
                  <p>Last Sync: <span className="font-semibold text-slate-800">{m.sync}</span></p>
                  <p>Volume: <span className="font-semibold text-slate-800">{m.volume}</span></p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
