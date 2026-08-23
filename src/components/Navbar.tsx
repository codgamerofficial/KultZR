'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/lib/cartContext';
import { useAuth } from '@/lib/authContext';
import AuthModal from './AuthModal';
import { ShoppingBag, Search, User, Menu, X, LogOut } from 'lucide-react';

const links = [
  ['Shop', '/shop'],
  ['New Drops', '/shop?sort=new'],
  ['Men', '/shop?category=men'],
  ['Women / Girls', '/shop?category=women'],
  ['Unisex', '/shop?category=unisex'],
  ['Accessories', '/shop?category=accessories'],
  ['Editorial', '/story'],
];

export default function Navbar() {
  const { cartCount, setIsCartOpen } = useCart();
  const { user, profile, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const submitSearch = (event: React.FormEvent) => {
    event.preventDefault();
    if (!searchQuery.trim()) return;
    window.location.href = `/shop?search=${encodeURIComponent(searchQuery.trim())}`;
    setSearchOpen(false);
  };

  return (
    <>
      <div className="border-b border-brand-border/70 bg-brand-card px-4 py-2 text-center text-[9px] font-bold uppercase tracking-[0.18em] text-brand-muted">
        Made on demand · Secure checkout · Trackable orders
      </div>

      <header className="sticky top-0 z-50 border-b border-brand-border/80 bg-brand-dark/90 backdrop-blur-xl">
        <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Link href="/" className="shrink-0" aria-label="KultZR home">
            <img src="/brand/logo-horizontal.svg" alt="KultZR" className="h-8 w-auto object-contain sm:h-9" />
          </Link>

          <nav className="hidden items-center gap-5 xl:flex" aria-label="Main navigation">
            {links.map(([label, href]) => (
              <Link key={href} href={href} className="whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.13em] text-brand-muted transition-colors hover:text-brand-pearl">
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <button onClick={() => setSearchOpen(v => !v)} className="rounded-xl p-2.5 text-brand-muted transition-colors hover:bg-white/[0.04] hover:text-brand-pearl" aria-label="Search KultZR">
              <Search className="h-4 w-4" />
            </button>

            {user ? (
              <div className="hidden items-center gap-1 sm:flex">
                <Link href="/account" className="max-w-[130px] truncate rounded-xl border border-brand-border px-3 py-2 text-[10px] font-bold uppercase tracking-[0.08em] text-brand-pearl hover:border-brand-gold/50">
                  {profile?.full_name || 'Account'}
                </Link>
                <button onClick={() => signOut()} className="rounded-xl p-2.5 text-brand-muted hover:text-red-400" aria-label="Sign out"><LogOut className="h-4 w-4" /></button>
              </div>
            ) : (
              <button onClick={() => setAuthModalOpen(true)} className="hidden items-center gap-1.5 rounded-xl border border-brand-border px-3 py-2 text-[10px] font-bold uppercase tracking-[0.1em] text-brand-pearl hover:border-brand-gold/50 sm:flex">
                <User className="h-3.5 w-3.5 text-brand-gold" /> Sign in
              </button>
            )}

            <button onClick={() => setIsCartOpen(true)} className="relative rounded-xl bg-brand-gold p-2.5 text-brand-dark transition-transform hover:-translate-y-0.5" aria-label={`Open cart${cartCount ? `, ${cartCount} items` : ''}`}>
              <ShoppingBag className="h-4 w-4" />
              {cartCount > 0 && <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full border-2 border-brand-dark bg-white px-1 text-[9px] font-black text-brand-dark">{cartCount}</span>}
            </button>

            <button onClick={() => setMobileMenuOpen(v => !v)} className="rounded-xl p-2.5 text-brand-muted hover:text-brand-pearl xl:hidden" aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}>
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {searchOpen && (
          <form onSubmit={submitSearch} className="border-t border-brand-border/70 bg-brand-dark px-4 py-3">
            <div className="mx-auto flex max-w-3xl items-center gap-3 rounded-xl border border-brand-border bg-brand-card px-4 py-2.5 focus-within:border-brand-gold/60">
              <Search className="h-4 w-4 shrink-0 text-brand-gold" />
              <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} autoFocus placeholder="Search products, categories or collections" aria-label="Search products" className="w-full bg-transparent text-sm text-brand-pearl outline-none placeholder:text-brand-muted" />
              <button type="button" onClick={() => setSearchOpen(false)} className="text-[10px] font-bold uppercase tracking-[0.1em] text-brand-muted hover:text-brand-pearl">Close</button>
            </div>
          </form>
        )}
      </header>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-brand-dark/98 pt-[88px] backdrop-blur-xl xl:hidden">
          <nav className="mx-auto max-w-lg px-6 pb-8" aria-label="Mobile navigation">
            {links.map(([label, href]) => (
              <Link key={href} href={href} onClick={() => setMobileMenuOpen(false)} className="flex border-b border-brand-border py-4 text-sm font-black uppercase tracking-[0.12em] text-brand-pearl hover:text-brand-gold">
                {label}
              </Link>
            ))}
            <div className="mt-6 flex gap-3">
              {user ? <Link href="/account" onClick={() => setMobileMenuOpen(false)} className="flex-1 rounded-xl border border-brand-border px-4 py-3 text-center text-xs font-bold uppercase tracking-[0.1em]">My account</Link> : <button onClick={() => { setMobileMenuOpen(false); setAuthModalOpen(true); }} className="flex-1 rounded-xl border border-brand-border px-4 py-3 text-xs font-bold uppercase tracking-[0.1em]">Sign in</button>}
              <button onClick={() => { setMobileMenuOpen(false); setIsCartOpen(true); }} className="flex-1 rounded-xl bg-brand-gold px-4 py-3 text-xs font-black uppercase tracking-[0.1em] text-brand-dark">View bag</button>
            </div>
          </nav>
        </div>
      )}

      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </>
  );
}
