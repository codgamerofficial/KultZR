'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Search, 
  Sparkles, 
  Mic, 
  Link as LinkIcon, 
  ArrowRight,
  Zap,
  Gamepad2,
  Code2,
  BatteryCharging,
  Palette
} from 'lucide-react';
import { parseQueryIntent } from '@/lib/aiOrchestrator';

interface IntelligentSearchBoxProps {
  onUrlAnalyzeClick?: () => void;
  className?: string;
}

export const IntelligentSearchBox: React.FC<IntelligentSearchBoxProps> = ({
  onUrlAnalyzeClick,
  className = '',
}) => {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [selectedPill, setSelectedPill] = useState<string | null>(null);
  const [isVoiceActive, setIsVoiceActive] = useState(false);

  const parsedIntent = parseQueryIntent(query);

  const OPTIMIZATION_PILLS = [
    { label: 'Performance', icon: Zap, value: 'Max Speed & Multitasking' },
    { label: 'Gaming', icon: Gamepad2, value: 'High FPS GPU & Thermal' },
    { label: 'Coding', icon: Code2, value: 'RAM & Keyboard Comfort' },
    { label: 'Battery', icon: BatteryCharging, value: 'All-Day Battery Backup' },
    { label: 'Design', icon: Palette, value: 'Sleek & Lightweight Build' },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    let finalQuery = query;
    if (selectedPill) {
      finalQuery += ` optimized for ${selectedPill}`;
    }
    router.push(`/search?q=${encodeURIComponent(finalQuery)}`);
  };

  const handleVoiceSimulate = () => {
    setIsVoiceActive(true);
    setTimeout(() => {
      setQuery('Best laptop under ₹80,000 for coding and gaming');
      setIsVoiceActive(false);
    }, 1200);
  };

  return (
    <div className={`relative space-y-3 ${className}`}>
      
      {/* Expanding Search Bar Container */}
      <form
        onSubmit={handleSearchSubmit}
        className={`bg-[#0F1428] rounded-2xl p-2.5 sm:p-3 shadow-2xl transition-all duration-300 border ${
          isFocused ? 'border-blue-500 ring-4 ring-blue-500/20 scale-[1.01]' : 'border-slate-700/80'
        }`}
      >
        <div className="flex items-center gap-3 px-3">
          <Search className={`w-5 h-5 transition ${isFocused ? 'text-blue-400' : 'text-slate-400'}`} />
          <input
            type="text"
            value={query}
            onFocus={() => setIsFocused(true)}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tell Sathi what you need (e.g. iPhone 17 under ₹80,000)..."
            className="w-full bg-transparent text-white text-sm font-medium placeholder:text-slate-500 focus:outline-none py-2"
          />
        </div>

        {/* Dynamic Parsed Intent Header */}
        {query.length > 3 && (
          <div className="mx-3 my-2 pt-2 border-t border-slate-800 flex items-center justify-between text-xs animate-fadeIn">
            <div className="flex items-center gap-2 text-slate-300">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>Detected Intent:</span>
              <span className="font-bold text-white capitalize">{parsedIntent.brand || parsedIntent.category || 'Search'}</span>
              {parsedIntent.budgetMax && (
                <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 font-extrabold text-[10px]">
                  Under ₹{parsedIntent.budgetMax.toLocaleString('en-IN')}
                </span>
              )}
            </div>
            <span className="text-[10px] text-slate-500">Sathi Agent Ready</span>
          </div>
        )}

        {/* Optimization Pills Section */}
        {(isFocused || query.length > 0) && (
          <div className="px-3 pt-2 pb-1 border-t border-slate-800 space-y-2 animate-fadeIn">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Want Sathi to optimize for:
            </span>
            <div className="flex flex-wrap gap-2">
              {OPTIMIZATION_PILLS.map((pill) => {
                const Icon = pill.icon;
                const isSelected = selectedPill === pill.label;
                return (
                  <button
                    key={pill.label}
                    type="button"
                    onClick={() => setSelectedPill(isSelected ? null : pill.label)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${
                      isSelected
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-[#181F3B] text-slate-300 hover:bg-[#20294D]'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{pill.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Input Action Controls */}
        <div className="flex items-center justify-between border-t border-slate-800 pt-2.5 mt-2 px-2">
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={handleVoiceSimulate}
              className={`p-2 rounded-xl text-slate-400 hover:text-white hover:bg-[#181F3B] transition ${
                isVoiceActive ? 'bg-rose-950 text-rose-400 animate-bounce' : ''
              }`}
              title="Voice Input"
            >
              <Mic className="w-4 h-4" />
            </button>

            {onUrlAnalyzeClick && (
              <button
                type="button"
                onClick={onUrlAnalyzeClick}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-[#181F3B] transition flex items-center gap-1 text-xs font-medium"
                title="Paste Product URL"
              >
                <LinkIcon className="w-4 h-4" />
                <span className="hidden sm:inline">Paste URL</span>
              </button>
            )}
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold text-xs rounded-xl shadow-lg shadow-orange-950/50 hover:brightness-110 transition flex items-center gap-2"
          >
            <span>Ask Sathi</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>

    </div>
  );
};
