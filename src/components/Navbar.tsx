'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/lib/cartContext';
import { useAuth } from '@/lib/authContext';
import AuthModal from './AuthModal';
import { ShoppingBag, Search, User, Menu, X, Sparkles, LogOut } from 'lucide-react';

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
            <Link href="/customize" className="hover:text-brand-gold transition-colors flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-brand-gold" /> Bespoke Studio
            </Link>
            <Link href="/story" className="hover:text-brand-gold transition-colors">Our Story</Link>
            <Link href="/about" className="hover:text-brand-gold transition-colors">About</Link>
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-4">
            
            {/* Search Trigger */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-brand-muted hover:text-brand-gold transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Account / User State */}
            {user ? (
              <div className="flex items-center gap-2">
                <Link
                  href="/account"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-gold/10 border border-brand-gold/40 text-brand-gold hover:bg-brand-gold/20 transition-colors text-xs font-bold"
                >
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline line-clamp-1">{profile?.full_name || user.email?.split('@')[0]}</span>
                </Link>
                <button
                  onClick={() => signOut()}
                  className="p-2 text-brand-muted hover:text-red-400 transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setAuthModalOpen(true)}
                className="p-2 text-brand-muted hover:text-brand-gold transition-colors flex items-center gap-1 text-xs font-bold"
              >
                <User className="w-5 h-5" />
                <span className="hidden sm:inline">Sign In</span>
              </button>
            )}

            {/* Cart Counter Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-brand-pearl hover:text-brand-gold transition-colors flex items-center justify-center cursor-pointer"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-brand-gold text-brand-dark font-extrabold text-[10px] flex items-center justify-center shadow-lg shadow-amber-500/20">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-brand-muted hover:text-brand-pearl"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>
        </div>

        {/* Expandable Search Overlay */}
        {searchOpen && (
          <div className="border-t border-brand-border bg-brand-secondary p-4 animate-in slide-in-from-top duration-200">
            <div className="max-w-3xl mx-auto flex items-center gap-3">
              <Search className="w-5 h-5 text-brand-gold" />
              <input
                type="text"
                placeholder="Search heavyweight tees, hoodies, statement graphics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-sm text-brand-pearl focus:outline-none"
                autoFocus
              />
              {searchQuery && (
                <Link
                  href={`/shop?search=${encodeURIComponent(searchQuery)}`}
                  onClick={() => setSearchOpen(false)}
                  className="px-4 py-1.5 bg-brand-gold text-brand-dark font-bold text-xs rounded-full"
                >
                  Search
                </Link>
              )}
            </div>
          </div>
        )}

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-brand-border bg-brand-dark/95 backdrop-blur-xl px-4 py-6 space-y-4 text-sm font-bold uppercase tracking-widest text-brand-muted">
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="block py-2 hover:text-brand-gold">Home</Link>
            <Link href="/shop" onClick={() => setMobileMenuOpen(false)} className="block py-2 hover:text-brand-gold">Shop Catalog</Link>
            <Link href="/customize" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-brand-gold">Bespoke Studio</Link>
            <Link href="/story" onClick={() => setMobileMenuOpen(false)} className="block py-2 hover:text-brand-gold">Our Story</Link>
            <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="block py-2 hover:text-brand-gold">About</Link>
            <Link href="/account" onClick={() => setMobileMenuOpen(false)} className="block py-2 hover:text-brand-gold">My Account</Link>
          </div>
        )}
      </header>

      {/* Auth Modal Trigger */}
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </>
  );
}
