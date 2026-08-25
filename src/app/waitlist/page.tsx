'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, Crown, Rocket, Check, Copy, ArrowRight, Gift, Users } from 'lucide-react';
import { DealSathiLogo } from '@/components/brand/DealSathiLogo';

export default function WaitlistPage() {
  const [email, setEmail] = useState('');
  const [joined, setJoined] = useState(false);
  const [queuePosition, setQueuePosition] = useState(1420);
  const [copied, setCopied] = useState(false);

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setJoined(true);
    }
  };

  const inviteUrl = `https://dealsathi.in/waitlist?ref=FOUNDER-${Math.floor(Math.random() * 8999 + 1000)}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn py-6">
      
      {/* BRAND HERO */}
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <DealSathiLogo size="lg" />
        </div>
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-brand-saffron/10 text-brand-saffron border border-brand-saffron/30 text-xs font-bold">
          <Rocket className="w-4 h-4" />
          <span>VIP Early Access Launch</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Be the First to Shop with <span className="text-brand-saffron">Sathi AI</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-500 max-w-xl mx-auto font-medium leading-relaxed">
          Join 1,400+ early shoppers. Lock in founding member pricing (₹999/yr for Sathi Pro) and get 100 bonus Deep Research credits at launch.
        </p>
      </div>

      {!joined ? (
        /* JOIN WAITLIST FORM */
        <div className="max-w-md mx-auto bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-lg space-y-4">
          <form onSubmit={handleJoin} className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Enter your email address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-brand-saffron to-amber-500 text-white font-extrabold text-sm shadow-glow-saffron hover:opacity-95 transition flex items-center justify-center gap-2"
            >
              <span>Reserve My VIP Spot</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
          <p className="text-[11px] text-slate-400 text-center font-medium">
            🔒 No spam guaranteed. Cancel anytime.
          </p>
        </div>
      ) : (
        /* JOINED CONFIRMATION & JUMP QUEUE */
        <div className="max-w-md mx-auto bg-gradient-to-br from-indigo-950 via-brand-indigo to-slate-900 rounded-3xl p-6 sm:p-8 border border-indigo-900 text-white shadow-xl space-y-5 animate-fadeIn">
          <div className="flex items-center gap-2 text-brand-yellow font-extrabold text-xs">
            <Check className="w-5 h-5 text-emerald-400" />
            <span>VIP SPOT RESERVED!</span>
          </div>

          <div className="space-y-1">
            <span className="text-xs text-indigo-200 block">Your Current Queue Position</span>
            <span className="text-4xl font-black text-white">#{queuePosition}</span>
          </div>

          <div className="p-4 rounded-2xl bg-white/10 border border-white/10 space-y-2 text-xs">
            <span className="font-bold text-brand-yellow flex items-center gap-1.5">
              <Gift className="w-4 h-4" />
              Jump 50 Spots per Referral
            </span>
            <p className="text-indigo-100 leading-relaxed font-medium">
              Share your referral link with friends. For every friend who joins, you jump 50 spots closer to instant launch access!
            </p>
            <div className="flex items-center gap-2 pt-2">
              <input
                type="text"
                readOnly
                value={inviteUrl}
                className="bg-black/30 text-white px-3 py-2 rounded-lg text-xs font-mono w-full border border-white/20 focus:outline-none"
              />
              <button
                onClick={handleCopy}
                className="px-3 py-2 bg-brand-saffron text-white font-bold rounded-lg shrink-0 text-xs hover:opacity-90 transition flex items-center gap-1"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FOUNDING MEMBER BENEFITS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs pt-6">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
          <Crown className="w-5 h-5 text-brand-saffron" />
          <h4 className="font-extrabold text-slate-900">Founding Member Lock-in</h4>
          <p className="text-slate-500 font-medium">Lock in ₹999/yr for Sathi Pro forever (50% off standard ₹1,999 pricing).</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
          <Sparkles className="w-5 h-5 text-brand-blue" />
          <h4 className="font-extrabold text-slate-900">100 Bonus Scan Credits</h4>
          <p className="text-slate-500 font-medium">Get 100 extra Deep Research credits automatically added on launch day.</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
          <Users className="w-5 h-5 text-emerald-600" />
          <h4 className="font-extrabold text-slate-900">Priority Feature Voting</h4>
          <p className="text-slate-500 font-medium">Direct access to the DealSathi team to request categories and features.</p>
        </div>
      </div>

    </div>
  );
}
