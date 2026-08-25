'use client';

import React, { useState } from 'react';
import { Sparkles, Code, Copy, Check, ExternalLink, DollarSign, Award } from 'lucide-react';
import { MOCK_PRODUCTS } from '@/lib/mockData';
import { SathiVerdictWidget } from '@/components/common/SathiVerdictWidget';

export default function CreatorPage() {
  const [creatorTag, setCreatorTag] = useState('techguy_deals');
  const [copied, setCopied] = useState(false);
  const sampleProduct = MOCK_PRODUCTS[0];

  const embedCode = `<iframe src="https://dealsathi.in/embed/verdict/${sampleProduct.id}?tag=${creatorTag}" width="380" height="240" frameborder="0"></iframe>`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* HEADER BANNER */}
      <div className="bg-gradient-to-br from-indigo-950 via-brand-indigo to-slate-900 rounded-3xl p-6 sm:p-8 text-white space-y-3 border border-indigo-900 shadow-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-saffron text-white text-xs font-extrabold shadow-sm">
          <Award className="w-4 h-4" />
          <span>Sathi Creator Program</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Monetize Your Tech Reviews with Sathi Intelligence
        </h1>
        <p className="text-xs sm:text-sm text-indigo-100/90 max-w-xl font-medium">
          Embed live Sathi Deal Score widgets into your YouTube descriptions, blog articles, and Instagram link-in-bios. Earn full affiliate commissions on every purchase.
        </p>
      </div>

      {/* EMBED CODE GENERATOR GRID */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Left: Customizer & Code Output */}
        <div className="md:col-span-7 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-5">
          <div className="space-y-2">
            <h3 className="font-extrabold text-base text-slate-900">Custom Widget Generator</h3>
            <p className="text-xs text-slate-500">Enter your affiliate tag to generate customized embed code.</p>
          </div>

          <div className="space-y-2 text-xs">
            <label className="font-bold text-slate-700 block">Your Creator Tag</label>
            <input
              type="text"
              value={creatorTag}
              onChange={(e) => setCreatorTag(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue"
            />
          </div>

          <div className="space-y-2 text-xs">
            <span className="font-bold text-slate-700 block">Embed Code</span>
            <div className="relative">
              <textarea
                readOnly
                rows={3}
                value={embedCode}
                className="w-full p-3 bg-slate-950 text-emerald-400 rounded-xl font-mono text-xs focus:outline-none resize-none border border-slate-800"
              />
              <button
                onClick={handleCopyCode}
                className="absolute top-2.5 right-2.5 px-3 py-1.5 bg-brand-blue text-white rounded-lg font-bold text-xs hover:bg-indigo-700 transition flex items-center gap-1"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy HTML'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right: Live Widget Preview */}
        <div className="md:col-span-5 bg-slate-50 rounded-3xl p-6 border border-slate-200 flex flex-col items-center justify-center space-y-3">
          <span className="text-xs font-bold text-slate-400 uppercase">Live Widget Preview</span>
          <SathiVerdictWidget product={sampleProduct} creatorTag={creatorTag} />
        </div>

      </div>

    </div>
  );
}
