'use client';

import React, { useState } from 'react';
import { Sparkles, Check, Zap, ShieldCheck, ArrowRight, Bot, Crown } from 'lucide-react';
import { defaultRazorpayGateway } from '@/lib/monetization/razorpayGateway';

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleUpgrade = async () => {
    setLoading(true);
    const order = await defaultRazorpayGateway.createSubscriptionOrder(
      billingCycle === 'monthly' ? 'PRO_MONTHLY' : 'PRO_ANNUAL'
    );

    // Simulate Razorpay Payment Modal Checkout
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1200);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fadeIn">
      
      {/* HEADER BANNER */}
      <div className="text-center space-y-3 py-6">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-brand-saffron/10 text-brand-saffron border border-brand-saffron/30 text-xs font-bold">
          <Crown className="w-4 h-4" />
          <span>Sathi Pro Membership</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Supercharge Your AI Shopping
        </h1>
        <p className="text-sm text-slate-500 max-w-xl mx-auto font-medium">
          Get unlimited price watches, instant WhatsApp alerts, and 500 Deep Research market scanner credits every month.
        </p>

        {/* BILLING TOGGLE */}
        <div className="flex items-center justify-center gap-3 pt-4">
          <span className={`text-xs font-bold ${billingCycle === 'monthly' ? 'text-slate-900' : 'text-slate-400'}`}>Monthly</span>
          <button
            onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
            className="w-12 h-6 rounded-full bg-indigo-950 p-1 transition flex items-center"
          >
            <div className={`w-4 h-4 rounded-full bg-brand-saffron transition-transform ${billingCycle === 'annual' ? 'translate-x-6' : 'translate-x-0'}`} />
          </button>
          <span className={`text-xs font-bold ${billingCycle === 'annual' ? 'text-slate-900' : 'text-slate-400'}`}>
            Annual <span className="text-xs font-extrabold text-emerald-600">(Save 20%)</span>
          </span>
        </div>
      </div>

      {/* SUCCESS BANNER */}
      {success && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 text-xs font-bold flex items-center justify-between animate-fadeIn">
          <span>🎉 Welcome to Sathi Pro! Your account has been upgraded with 500 Deep Research credits.</span>
          <button onClick={() => setSuccess(false)} className="text-emerald-700 underline">Dismiss</button>
        </div>
      )}

      {/* PRICING CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* FREE PLAN */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div>
              <h3 className="font-extrabold text-lg text-slate-900">Sathi Free</h3>
              <p className="text-xs text-slate-500">Essential AI shopping features for everyday deal checking.</p>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black text-slate-900">₹0</span>
              <span className="text-xs font-bold text-slate-400">/ forever</span>
            </div>

            <ul className="space-y-2.5 text-xs text-slate-600 pt-4 border-t border-slate-100">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>3 Active Price Watches</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>10 Deep Research credits / month</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Standard Deal Score calculation</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Standard email alerts</span>
              </li>
            </ul>
          </div>

          <button className="w-full py-3 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs cursor-default">
            Current Plan
          </button>
        </div>

        {/* SATHI PRO PLAN */}
        <div className="bg-gradient-to-br from-indigo-950 via-brand-indigo to-slate-900 rounded-3xl p-6 sm:p-8 border border-indigo-900 text-white shadow-xl space-y-6 flex flex-col justify-between relative overflow-hidden">
          
          <div className="absolute top-4 right-4 px-3 py-1 bg-brand-saffron text-white text-[10px] font-extrabold uppercase rounded-full shadow-sm">
            Most Popular
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-extrabold text-lg text-white flex items-center gap-2">
                <Crown className="w-5 h-5 text-brand-yellow" />
                <span>Sathi Pro</span>
              </h3>
              <p className="text-xs text-indigo-200">Full power AI shopping agent with instant alerts and deep scans.</p>
            </div>

            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black text-white">
                {billingCycle === 'monthly' ? '₹299' : '₹2,390'}
              </span>
              <span className="text-xs font-bold text-indigo-200">
                {billingCycle === 'monthly' ? '/ month' : '/ year'}
              </span>
            </div>

            <ul className="space-y-2.5 text-xs text-indigo-100 pt-4 border-t border-indigo-900">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-brand-yellow shrink-0" />
                <span className="font-bold">Unlimited Active Price Watches</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-brand-yellow shrink-0" />
                <span className="font-bold">500 Deep Research Market Scan credits / mo</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-brand-yellow shrink-0" />
                <span>Instant WhatsApp & SMS Price Drop Alerts</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-brand-yellow shrink-0" />
                <span>Historical All-Time Low Alerts</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-brand-yellow shrink-0" />
                <span>Priority AI Engine Processing</span>
              </li>
            </ul>
          </div>

          <button
            onClick={handleUpgrade}
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-brand-saffron to-amber-500 text-white font-extrabold text-xs shadow-glow-saffron hover:opacity-95 transition flex items-center justify-center gap-2"
          >
            {loading ? (
              <span>Initializing Razorpay...</span>
            ) : (
              <>
                <span>Upgrade to Sathi Pro</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

      </div>

    </div>
  );
}
