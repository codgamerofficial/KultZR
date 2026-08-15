'use client';

import React, { useState } from 'react';
import { useAuth } from '@/lib/authContext';
import { Lock, Mail, User, KeyRound, Sparkles, X, ArrowRight } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'signin' | 'signup';
}

export default function AuthModal({ isOpen, onClose, initialMode = 'signin' }: AuthModalProps) {
  const { signIn, signUp } = useAuth();
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    try {
      if (mode === 'signin') {
        const { error } = await signIn(email, password);
        if (error) {
          setErrorMsg(error.message || 'Failed to sign in. Check your credentials.');
        } else {
          onClose();
        }
      } else {
        if (!fullName.trim()) {
          setErrorMsg('Please enter your full name');
          setLoading(false);
          return;
        }
        const { error } = await signUp(email, password, fullName);
        if (error) {
          setErrorMsg(error.message || 'Failed to create account.');
        } else {
          onClose();
        }
      }
    } catch (err: any) {
      setErrorMsg(err?.message || 'Authentication error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/85 backdrop-blur-md" onClick={onClose} />

      {/* Auth Card */}
      <div className="relative w-full max-w-md bg-brand-secondary border border-brand-gold/40 rounded-3xl p-6 sm:p-8 text-brand-pearl shadow-2xl z-10 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-brand-border">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-brand-gold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> KultZR Identity
            </span>
            <h3 className="text-2xl font-black text-brand-pearl">
              {mode === 'signin' ? 'Sign In to Your Account' : 'Create KultZR Account'}
            </h3>
          </div>
          <button onClick={onClose} className="text-brand-muted hover:text-brand-pearl p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="grid grid-cols-2 p-1 bg-brand-dark rounded-xl border border-brand-border text-xs font-bold">
          <button
            type="button"
            onClick={() => { setMode('signin'); setErrorMsg(null); }}
            className={`py-2 rounded-lg transition-colors ${mode === 'signin' ? 'bg-brand-gold text-brand-dark' : 'text-brand-muted hover:text-brand-pearl'}`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setMode('signup'); setErrorMsg(null); }}
            className={`py-2 rounded-lg transition-colors ${mode === 'signup' ? 'bg-brand-gold text-brand-dark' : 'text-brand-muted hover:text-brand-pearl'}`}
          >
            Create Account
          </button>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-medium">
            {errorMsg}
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {mode === 'signup' && (
            <div className="space-y-1">
              <label className="text-xs font-bold text-brand-pearl flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-brand-gold" /> Full Name
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Aysha Khan"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-brand-dark border border-brand-border rounded-xl px-3.5 py-2.5 text-xs text-brand-pearl focus:outline-none focus:border-brand-gold"
              />
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-bold text-brand-pearl flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-brand-gold" /> Email Address
            </label>
            <input
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-brand-dark border border-brand-border rounded-xl px-3.5 py-2.5 text-xs text-brand-pearl focus:outline-none focus:border-brand-gold"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-brand-pearl flex items-center gap-1.5">
              <KeyRound className="w-3.5 h-3.5 text-brand-gold" /> Password
            </label>
            <input
              type="password"
              required
              minLength={6}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-brand-dark border border-brand-border rounded-xl px-3.5 py-2.5 text-xs text-brand-pearl focus:outline-none focus:border-brand-gold"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-linear-to-r from-amber-400 via-brand-gold to-amber-500 text-brand-dark font-extrabold text-xs rounded-xl flex items-center justify-center gap-2 hover:opacity-95 transition-opacity disabled:opacity-50 shadow-lg shadow-amber-500/20 cursor-pointer"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Lock className="w-4 h-4 animate-spin" /> Authenticating...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                {mode === 'signin' ? 'Sign In & Access Dashboard' : 'Register Account'} <ArrowRight className="w-4 h-4" />
              </span>
            )}
          </button>
        </form>

        <p className="text-[11px] text-center text-brand-muted leading-relaxed">
          Protected by Supabase Encrypted JWT Auth & 256-Bit SSL Encryption.
        </p>

      </div>
    </div>
  );
}
