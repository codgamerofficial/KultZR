'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, Brain, CheckCircle2, Sliders, ShieldCheck, Zap } from 'lucide-react';

export default function AIControlCenter() {
  const [autoPublish, setAutoPublish] = useState(true);

  return (
    <div className="min-h-screen bg-brand-dark text-brand-pearl p-6 sm:p-10 pt-28 space-y-8">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Navigation Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-brand-border pb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-brand-gold flex items-center gap-1.5">
              <Brain className="w-4 h-4" /> AI Intelligence Suite
            </span>
            <h1 className="text-3xl font-black text-brand-pearl mt-1">NVIDIA NIM (GLM-5.2) Operations Center</h1>
            <p className="text-xs text-brand-muted mt-1">
              AI product copywriter, taxonomy classifier, SEO optimizer, and luxury storytelling agent.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/admin/catalog"
              className="px-4 py-2 rounded-xl bg-brand-secondary border border-brand-border text-brand-muted hover:text-brand-pearl font-bold text-xs"
            >
              Catalog Control
            </Link>
            <Link
              href="/admin/integrations/qikink"
              className="px-4 py-2 rounded-xl bg-brand-secondary border border-brand-border text-brand-muted hover:text-brand-pearl font-bold text-xs"
            >
              Qikink Integration
            </Link>
            <Link
              href="/admin/ai"
              className="px-4 py-2 rounded-xl bg-brand-gold text-brand-dark font-extrabold text-xs"
            >
              AI Operations
            </Link>
          </div>
        </div>

        {/* AI Model Status Card */}
        <div className="glass-panel p-6 rounded-3xl border border-brand-gold/30 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-brand-gold animate-bounce" />
              <div>
                <h3 className="text-lg font-bold text-brand-pearl">NVIDIA NIM GLM-5.2 Engine Active</h3>
                <p className="text-xs text-brand-muted">Base URL: https://integrate.api.nvidia.com/v1</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-brand-muted font-bold">Auto-Publish Approved AI Products:</span>
              <button
                onClick={() => setAutoPublish(!autoPublish)}
                className={`w-12 h-6 rounded-full p-1 transition-colors cursor-pointer ${
                  autoPublish ? 'bg-emerald-400' : 'bg-brand-border'
                }`}
              >
                <div className={`w-4 h-4 rounded-full bg-brand-dark transition-transform ${autoPublish ? 'translate-x-6' : ''}`} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-brand-dark border border-brand-border space-y-1">
              <span className="text-brand-muted font-bold">Primary Model</span>
              <p className="font-mono text-brand-gold font-bold">z-ai/glm-5.2</p>
            </div>
            <div className="p-4 rounded-2xl bg-brand-dark border border-brand-border space-y-1">
              <span className="text-brand-muted font-bold">Fallback Model</span>
              <p className="font-mono text-brand-pearl font-bold">HuggingFace Inference API</p>
            </div>
            <div className="p-4 rounded-2xl bg-brand-dark border border-brand-border space-y-1">
              <span className="text-brand-muted font-bold">Average Latency</span>
              <p className="font-mono text-emerald-400 font-bold">420 ms / request</p>
            </div>
          </div>
        </div>

        {/* AI Agent Responsibilities */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-panel p-6 rounded-3xl border border-brand-border space-y-3">
            <h3 className="text-sm font-extrabold uppercase text-brand-gold flex items-center gap-2">
              <Zap className="w-4 h-4" /> AI Capabilities
            </h3>
            <ul className="text-xs text-brand-muted space-y-2 list-disc list-inside">
              <li>Generates luxury brand storytelling and 240 GSM organic fabric notes.</li>
              <li>Auto-classifies product taxonomy into Men, Women, Unisex, Accessories.</li>
              <li>Generates SEO metadata titles and meta descriptions.</li>
              <li>Recommends optimal collection tagging (New Drops, Street Culture).</li>
            </ul>
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-brand-border space-y-3">
            <h3 className="text-sm font-extrabold uppercase text-brand-gold flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" /> Safety & Financial Safeguards
            </h3>
            <ul className="text-xs text-brand-muted space-y-2 list-disc list-inside">
              <li>AI **never** freely alters final prices (calculated deterministically).</li>
              <li>AI **never** modifies Qikink provider SKUs or order IDs.</li>
              <li>AI **never** directly authorizes financial payments.</li>
              <li>Fallback rules maintain catalog operation if AI services are down.</li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}
