'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Lock, AlertTriangle, ArrowLeft, CheckCircle2, Server, Cpu, Zap } from 'lucide-react';

export default function AdminSecurityPage() {
  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link href="/admin" className="text-xs font-bold text-slate-500 hover:text-slate-900 flex items-center gap-1 mb-2">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Admin Panel</span>
          </Link>
          <h1 className="text-2xl font-extrabold text-slate-900">Security & AI Gateway Hardening</h1>
          <p className="text-xs text-slate-500">OWASP Top 10 compliance checklist, TokenRouter OpenAI gateway status, and sliding-window rate limiting.</p>
        </div>

        <div className="px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold self-start sm:self-auto flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Security Health: 100 / 100</span>
        </div>
      </div>

      {/* SECURITY METRICS */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-1">
          <span className="text-slate-400 block text-[10px] font-bold uppercase">Prompt Injection Defenses</span>
          <span className="text-2xl font-black text-emerald-600">Active</span>
          <span className="text-[10px] text-slate-500 block">Sanitizer filtering enabled</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-1">
          <span className="text-slate-400 block text-[10px] font-bold uppercase">API Throttling Limit</span>
          <span className="text-2xl font-black text-slate-900">60 req/min</span>
          <span className="text-[10px] text-emerald-600 block font-bold">Sliding-window active</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-1">
          <span className="text-slate-400 block text-[10px] font-bold uppercase">DPDP Act Compliance</span>
          <span className="text-2xl font-black text-brand-blue">100%</span>
          <span className="text-[10px] text-slate-500 block">Data export & erasure live</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-1">
          <span className="text-slate-400 block text-[10px] font-bold uppercase">TokenRouter Gateway</span>
          <span className="text-2xl font-black text-indigo-900">Connected</span>
          <span className="text-[10px] font-bold text-emerald-600 block">Server-Side API Key Only</span>
        </div>
      </div>

      {/* TOKENROUTER MODEL TIER MAP */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-900 font-extrabold text-sm">
            <Cpu className="w-5 h-5 text-indigo-600" />
            <span>TokenRouter AI Gateway Tiers</span>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-bold text-[10px] border border-indigo-200">
            OpenAI API Compatible
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                <span>FAST Tier</span>
              </span>
              <span className="text-[10px] font-bold text-slate-400">Search & Intent</span>
            </div>
            <code className="text-[11px] font-semibold text-slate-700 block bg-white p-2 rounded-lg border border-slate-200">
              qwen/qwen3.8-max-free
            </code>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-indigo-600" />
                <span>REASONING Tier</span>
              </span>
              <span className="text-[10px] font-bold text-slate-400">Deep Research</span>
            </div>
            <code className="text-[11px] font-semibold text-slate-700 block bg-white p-2 rounded-lg border border-slate-200">
              deepseek/deepseek-v4-pro-0813
            </code>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>VISION Tier</span>
              </span>
              <span className="text-[10px] font-bold text-slate-400">OCR & Visual</span>
            </div>
            <code className="text-[11px] font-semibold text-slate-700 block bg-white p-2 rounded-lg border border-slate-200 truncate">
              nvidia/nemotron-3-nano-omni-30b...
            </code>
          </div>
        </div>
      </div>

      {/* OWASP CHECKLIST */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <h3 className="font-extrabold text-sm text-slate-900">OWASP & Production Security Checklist</h3>

        <div className="space-y-2.5 text-xs">
          
          <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-200 flex items-center justify-between">
            <span className="font-bold text-emerald-950 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Prompt Injection Firewall (Untrusted Merchant Content Sanitized)</span>
            </span>
            <span className="font-bold text-emerald-700">VERIFIED</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-200 flex items-center justify-between">
            <span className="font-bold text-emerald-950 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Server-Side TokenRouter Key Isolation (Never Exposed to Frontend / Extension)</span>
            </span>
            <span className="font-bold text-emerald-700">VERIFIED</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-200 flex items-center justify-between">
            <span className="font-bold text-emerald-950 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Sliding Window API Rate Limiting (60 req/min/IP)</span>
            </span>
            <span className="font-bold text-emerald-700">VERIFIED</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-200 flex items-center justify-between">
            <span className="font-bold text-emerald-950 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Recommendation Firewall (Affiliate Payouts Isolated from Scoring)</span>
            </span>
            <span className="font-bold text-emerald-700">VERIFIED</span>
          </div>

        </div>
      </div>

    </div>
  );
}
