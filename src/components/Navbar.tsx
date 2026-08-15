'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/lib/cartContext';
import { useAuth } from '@/lib/authContext';
import AuthModal from './AuthModal';
import { ShoppingBag, Search, User, Menu, X, LogOut } from 'lucide-react';

export default function Navbar() {
  const { cartCount, setIsCartOpen } = useCart();
  const { user, profile, signOut } = useAuth();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [authModalOpen, setAuthModalOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-brand-dark/85 border-b border-brand-border/60 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo with official vector monogram */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="h-10 w-auto relative flex items-center">
              <img src="/brand/logo-horizontal.svg" alt="KultZR Logo" className="h-9 w-auto object-contain hover:scale-[1.02] transition-transform" />
            </div>
            <span className="hidden lg:inline-block text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-brand-gold/10 text-brand-gold border border-brand-gold/30">
              Zero Inventory
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-widest font-bold text-brand-muted">
            <Link href="/" className="hover:text-brand-gold transition-colors">Home</Link>
            <Link href="/shop" className="hover:text-brand-gold transition-colors">Shop Catalog</Link>
            <Link href="/story" className="hover:text-brand-gold transition-colors">Our Story</Link>
            <Link href="/about" className="hover:text-brand-gold transition-colors">About</Link>
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-4">
            
            {/* Search Trigger */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-brand-muted hover:text-brand-gold transition-colors cursor-pointer"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Account / User State */}
            {user ? (
              <div className="flex items-center gap-2">
                <Link
                  href="/account"
                  className="px-3 py-1.5 rounded-full bg-brand-card border border-brand-border hover:border-brand-gold text-xs font-bold text-brand-pearl flex items-center gap-1.5 transition-all"
                >
                  <User className="w-3.5 h-3.5 text-brand-gold" />
                  <span className="max-w-[100px] truncate">{profile?.full_name || 'My Account'}</span>
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
                className="flex items-center gap-1.5 text-xs uppercase font-bold text-brand-pearl hover:text-brand-gold transition-colors cursor-pointer"
              >
                <User className="w-4 h-4 text-brand-gold" /> Sign In
              </button>
            )}

            {/* Cart Bag Icon Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 bg-brand-gold text-brand-dark rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
              aria-label="View Bag"
            >
              <ShoppingBag className="w-5 h-5 stroke-[2.5]" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 text-white font-extrabold text-[10px] rounded-full flex items-center justify-center border-2 border-brand-dark animate-bounce">
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
          <div className="bg-brand-dark/95 border-b border-brand-border px-4 py-3 animate-in slide-in-from-top-2 duration-300">
            <div className="max-w-3xl mx-auto flex items-center gap-2">
              <Search className="w-4 h-4 text-brand-gold shrink-0" />
              <input
                type="text"
                placeholder="Search products by title, category, or fabric..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && searchQuery) {
                    window.location.href = `/shop?search=${encodeURIComponent(searchQuery)}`;
                  }
                }}
                className="w-full bg-transparent text-sm text-brand-pearl focus:outline-none placeholder:text-brand-muted"
                autoFocus
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="text-xs font-bold text-brand-muted hover:text-brand-gold uppercase tracking-wider"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-30 bg-brand-dark/95 backdrop-blur-xl pt-24 px-6 space-y-6 animate-in fade-in duration-300">
          <nav className="flex flex-col gap-6 text-base font-extrabold uppercase tracking-widest text-brand-pearl">
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="hover:text-brand-gold">Home</Link>
            <Link href="/shop" onClick={() => setMobileMenuOpen(false)} className="hover:text-brand-gold">Shop Catalog</Link>
            <Link href="/story" onClick={() => setMobileMenuOpen(false)} className="hover:text-brand-gold">Our Story</Link>
            <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="hover:text-brand-gold">About</Link>
          </nav>
        </div>
      )}

      {/* Auth Modal */}
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </>
  );
}
