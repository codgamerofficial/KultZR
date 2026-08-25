'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, Target, Eye, User, Sparkles } from 'lucide-react';

export const MobileNav: React.FC = () => {
  const pathname = usePathname();

  const NAV_ITEMS = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'Search', href: '/search?q=nothing', icon: Search },
    { label: 'Missions', href: '/missions', icon: Target },
    { label: 'Watch', href: '/watch', icon: Eye },
    { label: 'Account', href: '/admin', icon: User },
  ];

  return (
    <>
      {/* Floating Ask Sathi FAB (Positioned cleanly ABOVE bottom nav with zero overlap) */}
      <Link
        href="/search?q=Help+me+choose"
        className="md:hidden fixed bottom-[4.25rem] right-4 z-40 p-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold text-xs rounded-full shadow-xl shadow-orange-950/70 flex items-center justify-center border border-amber-300/40 active:scale-95 transition"
        title="Ask Sathi AI"
      >
        <Sparkles className="w-5 h-5 fill-amber-200 text-amber-200" />
      </Link>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#080B17]/95 backdrop-blur-xl border-t border-slate-800/80 px-2 py-2.5 flex items-center justify-around shadow-2xl safe-area-pb">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex flex-col items-center gap-1 py-0.5 px-3 text-[10px] font-semibold transition ${
                isActive ? 'text-amber-400 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-amber-400' : 'text-slate-500'}`} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
};
