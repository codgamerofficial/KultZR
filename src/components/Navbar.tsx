'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/lib/cartContext';
import { ShoppingBag, Sparkles, Menu, X, Search, User } from 'lucide-react';

export default function Navbar() {
  const { cartCount, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-brand-border/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo & Wordmark */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-gold to-amber-200 text-brand-dark flex items-center justify-center font-bold text-xl shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
            K
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-extrabold tracking-wider gold-gradient-text">
              KultZR
            </span>
            <span className="text-[10px] tracking-widest uppercase text-brand-muted font-medium -mt-1">
              Wear Your Story
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="/shop" className="text-brand-pearl hover:text-brand-gold transition-colors">
            Shop Catalog
          </Link>
          <Link href="/customize" className="flex items-center gap-1.5 text-brand-gold font-semibold hover:text-amber-300 transition-colors">
            <Sparkles className="w-4 h-4" /> Design Studio
          </Link>
          <Link href="/story" className="text-brand-pearl hover:text-brand-gold transition-colors">
            Our Story
          </Link>
          <Link href="/account" className="text-brand-pearl hover:text-brand-gold transition-colors">
            Orders & Profile
          </Link>
        </nav>

        {/* Action Icons */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setSearchOpen(!searchOpen)}
            className="p-2 text-brand-muted hover:text-brand-pearl transition-colors rounded-full hover:bg-brand-card"
            aria-label="Search Catalog"
          >
            <Search className="w-5 h-5" />
          </button>

          <Link 
            href="/account" 
            className="hidden sm:flex p-2 text-brand-muted hover:text-brand-pearl transition-colors rounded-full hover:bg-brand-card"
            aria-label="Account"
          >
            <User className="w-5 h-5" />
          </Link>

          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2.5 bg-brand-card text-brand-pearl rounded-full border border-brand-border hover:border-brand-gold transition-colors"
            aria-label="Open Shopping Bag"
          >
            <ShoppingBag className="w-5 h-5 text-brand-gold" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-brand-amber text-brand-dark font-extrabold text-[11px] flex items-center justify-center shadow-md">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-brand-pearl rounded-lg hover:bg-brand-card"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Search Input Bar Overlay */}
      {searchOpen && (
        <div className="border-t border-brand-border bg-brand-card/90 p-4 transition-all">
          <div className="max-w-3xl mx-auto flex items-center gap-3">
            <Search className="w-5 h-5 text-brand-gold" />
            <input
              type="text"
              placeholder="Search story apparel (e.g. Identity Tee, Hoodie, Tote Bag)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent border-none text-brand-pearl placeholder-brand-muted text-sm focus:outline-none"
            />
            <Link
              href={`/shop?search=${encodeURIComponent(searchQuery)}`}
              onClick={() => setSearchOpen(false)}
              className="px-4 py-2 bg-brand-gold text-brand-dark font-bold text-xs rounded-lg hover:bg-amber-400"
            >
              Search
            </Link>
          </div>
        </div>
      )}

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-brand-border bg-brand-secondary p-6 space-y-4">
          <Link 
            href="/shop" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-lg font-medium text-brand-pearl hover:text-brand-gold"
          >
            Shop Catalog
          </Link>
          <Link 
            href="/customize" 
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 text-lg font-semibold text-brand-gold"
          >
            <Sparkles className="w-5 h-5" /> Design Studio
          </Link>
          <Link 
            href="/story" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-lg font-medium text-brand-pearl hover:text-brand-gold"
          >
            Our Story
          </Link>
          <Link 
            href="/account" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-lg font-medium text-brand-pearl hover:text-brand-gold"
          >
            My Orders & Profile
          </Link>
        </div>
      )}
    </header>
  );
}
