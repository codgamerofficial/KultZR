'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  Search, 
  Target, 
  Eye, 
  Scale, 
  ShieldCheck,
  Crown,
  Rocket,
  Award,
  BarChart3,
  Lock,
  ShieldAlert,
  Layers,
  Settings
} from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'AI Search', href: '/search?q=nothing', icon: Search },
  { label: 'Missions', href: '/missions', icon: Target, badge: 'Flagship' },
  { label: 'Price Watch', href: '/watch', icon: Eye },
  { label: 'Compare', href: '/compare', icon: Scale },
  { label: 'Sathi Pro', href: '/pricing', icon: Crown, badge: 'PRO' },
  { label: 'VIP Waitlist', href: '/waitlist', icon: Rocket },
  { label: 'Creator Hub', href: '/creator', icon: Award },
  { label: 'Privacy Center', href: '/privacy', icon: Lock },
  { label: 'Trust Center', href: '/trust', icon: ShieldCheck },
];

const ADMIN_ITEMS = [
  { label: 'Security Admin', href: '/admin/security', icon: ShieldAlert },
  { label: 'Growth Analytics', href: '/admin/analytics', icon: BarChart3 },
];

export const Sidebar: React.FC = () => {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col w-64 shrink-0 h-[calc(100vh-4rem)] sticky top-16 bg-[#080B17] border-r border-slate-800/80 p-4 space-y-6 overflow-y-auto">
      {/* Primary Navigation */}
      <div className="space-y-1">
        <p className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">
          Shopping Assistant
        </p>
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                isActive
                  ? 'bg-gradient-to-r from-blue-600/20 to-indigo-600/20 text-white border border-blue-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-[#11162B]'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-blue-400' : 'text-slate-500'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className={`px-2 py-0.5 text-[9px] font-extrabold rounded-full border ${
                  item.badge === 'PRO' ? 'bg-amber-500 text-slate-950 border-amber-400' : 'bg-indigo-950 text-indigo-300 border-indigo-700'
                }`}>
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </div>

      {/* Admin Controls */}
      <div className="pt-4 border-t border-slate-800/80 space-y-1">
        <p className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">
          System Control
        </p>
        {ADMIN_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                isActive
                  ? 'bg-gradient-to-r from-blue-600/20 to-indigo-600/20 text-white border border-blue-500/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-[#11162B]'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-blue-400' : 'text-slate-500'}`} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </aside>
  );
};
