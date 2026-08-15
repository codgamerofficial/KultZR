'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/lib/cartContext';
import { useAuth } from '@/lib/authContext';
import AuthModal from './AuthModal';
import { ShoppingBag, Search, User, Menu, X, LogOut, Sparkles, ShieldCheck } from 'lucide-react';

export default function Navbar() {
  const { cartCount, setIsCartOpen } = useCart();
  const { user, profile, signOut } = useAuth();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [authModalOpen, setAuthModalOpen] = useState(false);

  return (
    <>
      {/* Top Luxury Announcement Ticker */}
      <div className="bg-gradient-to-r from-amber-600 via-brand-gold to-amber-500 text-brand-dark overflow-hidden py-1.5 font-mono text-[11px] font-black uppercase tracking-wider shadow-sm">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-8">
          <span>⚡ ZERO INVENTORY LUXURY • 240 GSM COMBED ORGANIC COTTON • QIKINK OPEN API REAL-TIME SYNC • FREE EXPRESS DELIVERY ACROSS INDIA • CODE: KULT15 FOR 15% OFF ⚡</span>
          <span>⚡ ZERO INVENTORY LUXURY • 240 GSM COMBED ORGANIC COTTON • QIKINK OPEN API REAL-TIME SYNC • FREE EXPRESS DELIVERY ACROSS INDIA • CODE: KULT15 FOR 15% OFF ⚡</span>
        </div>
      </div>

      {/* Main Floating Glass Navbar */}
      <header className="sticky top-0 z-40 w-full backdrop-blur-2xl bg-brand-dark/85 border-b border-brand-border/60 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Brand Logo with Monogram vector */}
          <Link href="/" className="flex items-center gap-3.5 group">
            <div className="h-11 w-auto relative flex items-center">
              <img
                src="/brand/logo-horizontal.svg"
                alt="KultZR Logo"
                className="h-10 w-auto object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-md"
              />
            </div>
            <span className="hidden lg:inline-flex items-center gap-1 text-[10px] uppercase font-black tracking-widest px-2.5 py-1 rounded-full bg-brand-gold/10 text-brand-gold border border-brand-gold/30">
              <ShieldCheck className="w-3 h-3 text-brand-gold" /> On-Demand POD
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-9 text-xs uppercase tracking-widest font-extrabold text-brand-muted">
            <Link href="/" className="hover:text-brand-gold transition-colors py-1 relative group">
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-gold transition-all duration-300 group-hover:w-full" />
            </Link>
            <Link href="/shop" className="hover:text-brand-gold transition-colors py-1 relative group text-brand-pearl">
              Shop Catalog
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-gold transition-all duration-300 group-hover:w-full" />
            </Link>
            <Link href="/story" className="hover:text-brand-gold transition-colors py-1 relative group">
              Brand Story
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-gold transition-all duration-300 group-hover:w-full" />
            </Link>
            <Link href="/about" className="hover:text-brand-gold transition-colors py-1 relative group">
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-gold transition-all duration-300 group-hover:w-full" />
            </Link>
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-4">
            
            {/* Search Trigger */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2.5 rounded-full hover:bg-brand-charcoal text-brand-muted hover:text-brand-gold transition-colors cursor-pointer border border-transparent hover:border-brand-border"
              aria-label="Search Catalog"
            >
              <Search className="w-4 h-4 stroke-[2.5]" />
            </button>

            {/* Account / User State */}
            {user ? (
              <div className="flex items-center gap-2">
                <Link
                  href="/account"
                  className="px-3.5 py-1.5 rounded-full bg-brand-card/90 border border-brand-gold/40 hover:border-brand-gold text-xs font-black text-brand-pearl flex items-center gap-1.5 transition-all shadow-sm"
                >
                  <User className="w-3.5 h-3.5 text-brand-gold" />
                  <span className="max-w-[110px] truncate">{profile?.full_name || 'My Account'}</span>
                </Link>
                <button
                  onClick={() => signOut()}
                  className="p-2 text-brand-muted hover:text-red-400 transition-colors cursor-pointer"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setAuthModalOpen(true)}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-card/60 border border-brand-border hover:border-brand-gold text-xs uppercase font-extrabold text-brand-pearl hover:text-brand-gold transition-all cursor-pointer"
              >
                <User className="w-3.5 h-3.5 text-brand-gold" /> Sign In
              </button>
            )}

            {/* Cart Bag Icon Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-3 bg-gradient-to-r from-amber-400 via-brand-gold to-amber-500 text-brand-dark rounded-full shadow-lg shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              aria-label="View Bag"
            >
              <ShoppingBag className="w-4 h-4 stroke-[3]" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 text-white font-black text-[10px] rounded-full flex items-center justify-center border-2 border-brand-dark animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-brand-muted hover:text-brand-gold transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>
        </div>

        {/* Expandable Search Input */}
        {searchOpen && (
          <div className="bg-brand-dark/95 border-b border-brand-border px-4 py-3.5 animate-in slide-in-from-top-2 duration-300">
            <div className="max-w-3xl mx-auto flex items-center gap-3 bg-brand-card/90 border border-brand-gold/40 rounded-full px-5 py-2.5 shadow-lg">
              <Search className="w-4 h-4 text-brand-gold shrink-0" />
              <input
                type="text"
                placeholder="Search real Qikink catalog by title, category, or fabric..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && searchQuery) {
                    window.location.href = `/shop?search=${encodeURIComponent(searchQuery)}`;
                  }
                }}
                className="w-full bg-transparent text-sm text-brand-pearl focus:outline-none placeholder:text-brand-muted font-medium"
                autoFocus
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="text-xs font-bold text-brand-muted hover:text-brand-gold uppercase tracking-wider cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-30 bg-brand-dark/95 backdrop-blur-2xl pt-28 px-6 space-y-6 animate-in fade-in duration-300">
          <nav className="flex flex-col gap-6 text-base font-extrabold uppercase tracking-widest text-brand-pearl border-b border-brand-border pb-8">
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="hover:text-brand-gold">Home</Link>
            <Link href="/shop" onClick={() => setMobileMenuOpen(false)} className="hover:text-brand-gold text-brand-gold">Shop Catalog</Link>
            <Link href="/story" onClick={() => setMobileMenuOpen(false)} className="hover:text-brand-gold">Brand Story</Link>
            <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="hover:text-brand-gold">About</Link>
          </nav>
        </div>
      )}

      {/* Auth Modal */}
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </>
  );
}
