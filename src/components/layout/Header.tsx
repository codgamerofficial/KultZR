'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { DealSathiLogo } from '@/components/brand/DealSathiLogo';
import { 
  Search, 
  Sparkles, 
  Bell, 
  SlidersHorizontal,
  Smartphone,
  Globe,
  Gift
} from 'lucide-react';
import { ExtensionPreviewModal } from '@/components/previews/ExtensionPreviewModal';
import { AndroidShareModal } from '@/components/previews/AndroidShareModal';
import { ReferralProgramModal } from '@/components/common/ReferralProgramModal';

export const Header: React.FC = () => {
  const router = useRouter();
  const [quickQuery, setQuickQuery] = useState('');
  const [isExtensionOpen, setIsExtensionOpen] = useState(false);
  const [isAndroidOpen, setIsAndroidOpen] = useState(false);
  const [isReferralOpen, setIsReferralOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(quickQuery)}`);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#080B17]/95 backdrop-blur-xl border-b border-slate-800/80">
        <div className="max-w-[1500px] mx-auto px-3 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Logo & Tagline Badge */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <Link href="/" className="flex items-center">
              <DealSathiLogo size="md" />
            </Link>
            <span className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-950/80 text-indigo-300 border border-indigo-800/60 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              AI Shopping Agent
            </span>
          </div>

          {/* Quick Header Search Bar (Desktop Only) */}
          <form onSubmit={handleSearchSubmit} className="flex-1 max-w-lg hidden md:flex items-center relative">
            <input
              type="text"
              value={quickQuery}
              onChange={(e) => setQuickQuery(e.target.value)}
              placeholder="Ask Sathi what you need (e.g., iPhone 17 under ₹80k)..."
              className="w-full pl-10 pr-24 py-2 text-xs bg-[#0F1428] text-slate-100 rounded-full border border-slate-700/80 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 placeholder-slate-500 shadow-inner"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
            <button
              type="submit"
              className="absolute right-1.5 px-3.5 py-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full text-xs font-bold hover:brightness-110 transition shadow-sm"
            >
              Ask Sathi
            </button>
          </form>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            
            {/* Invite Sathi Viral Referral Trigger (Desktop Only) */}
            <button
              onClick={() => setIsReferralOpen(true)}
              className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-amber-500 to-orange-600 hover:brightness-110 shadow-md transition"
              title="Invite Friends & Get Free Credits"
            >
              <Gift className="w-4 h-4" />
              <span>Invite Sathi</span>
            </button>

            {/* Chrome Extension Simulator (Desktop Only) */}
            <button
              onClick={() => setIsExtensionOpen(true)}
              className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-300 bg-[#11162B] hover:bg-[#1A203B] border border-slate-700/70 transition"
              title="Try Chrome/Edge Extension"
            >
              <Globe className="w-4 h-4 text-blue-400" />
              <span>Extension</span>
            </button>

            {/* Android Share Simulator (Desktop Only) */}
            <button
              onClick={() => setIsAndroidOpen(true)}
              className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-300 bg-[#11162B] hover:bg-[#1A203B] border border-slate-700/70 transition"
              title="Try Android Share-to-App"
            >
              <Smartphone className="w-4 h-4 text-emerald-400" />
              <span>Android App</span>
            </button>

            {/* Watch Alerts Badge */}
            <Link
              href="/watch"
              className="p-1.5 sm:p-2 rounded-xl text-slate-300 hover:text-white bg-[#11162B] hover:bg-[#1A203B] border border-slate-700/70 relative transition"
              title="Price Watch & Alerts"
            >
              <Bell className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-400 ring-2 ring-[#080B17]"></span>
            </Link>

            {/* Admin Direct Shortcut (Desktop Only) */}
            <Link
              href="/admin"
              className="hidden sm:flex p-2 rounded-xl text-slate-300 hover:text-white bg-[#11162B] hover:bg-[#1A203B] border border-slate-700/70 transition"
              title="Admin Intelligence Panel"
            >
              <SlidersHorizontal className="w-5 h-5" />
            </Link>

            {/* User Profile Avatar */}
            <div className="flex items-center gap-2 pl-1.5 border-l border-slate-800">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-600 to-amber-500 text-white font-bold text-[11px] sm:text-xs flex items-center justify-center shadow-md border border-indigo-400/30">
                DS
              </div>
            </div>

          </div>
        </div>
      </header>

      {/* Extension Simulator Modal */}
      <ExtensionPreviewModal isOpen={isExtensionOpen} onClose={() => setIsExtensionOpen(false)} />

      {/* Android Simulator Modal */}
      <AndroidShareModal isOpen={isAndroidOpen} onClose={() => setIsAndroidOpen(false)} />

      {/* Referral Modal */}
      <ReferralProgramModal isOpen={isReferralOpen} onClose={() => setIsReferralOpen(false)} />
    </>
  );
};
