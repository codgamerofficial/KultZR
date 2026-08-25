'use client';

import React, { useState } from 'react';
import { ShieldCheck, Download, Trash2, Check, Lock, Info } from 'lucide-react';
import { defaultDataPrivacyManager } from '@/lib/security/privacyManager';

export default function PrivacyPage() {
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [deletionSuccess, setDeletionSuccess] = useState(false);

  const handleDownload = () => {
    const data = defaultDataPrivacyManager.exportUserData('demo-user');
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dealsathi-user-data.json`;
    a.click();
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to request complete erasure of your DealSathi account and all price watch history?')) {
      setDeletionSuccess(true);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      
      {/* HEADER BANNER */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-3">
        <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs">
          <ShieldCheck className="w-4 h-4" />
          <span>Privacy & Data Control Center</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          Your Privacy & Data Rights (DPDP Compliant)
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-medium max-w-xl">
          DealSathi respects your data privacy. We never sell your personal information or contaminate recommendation algorithms with sponsor money.
        </p>
      </div>

      {/* SELF SERVICE DATA CONTROLS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        
        {/* Export Data */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-slate-900 font-extrabold text-base">
              <Download className="w-5 h-5 text-brand-blue" />
              <span>Download Personal Data</span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              Export a complete JSON archive of your active price watches, shopping missions, and search preferences.
            </p>
          </div>

          <button
            onClick={handleDownload}
            className="w-full py-3 rounded-xl bg-slate-100 text-slate-900 font-bold text-xs hover:bg-slate-200 transition flex items-center justify-center gap-2"
          >
            {downloadSuccess ? <Check className="w-4 h-4 text-emerald-600" /> : <Download className="w-4 h-4" />}
            <span>{downloadSuccess ? 'Downloaded!' : 'Export My Data (.json)'}</span>
          </button>
        </div>

        {/* Delete Account */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-rose-900 font-extrabold text-base">
              <Trash2 className="w-5 h-5 text-rose-600" />
              <span>Request Account Erasure</span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              Permanently wipe your account, price watch alerts, and personal browsing history under DPDP Act provisions.
            </p>
          </div>

          <button
            onClick={handleDelete}
            className="w-full py-3 rounded-xl bg-rose-50 text-rose-700 font-bold text-xs border border-rose-200 hover:bg-rose-100 transition flex items-center justify-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete My Account</span>
          </button>
        </div>

      </div>

      {deletionSuccess && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-950 text-xs font-bold animate-fadeIn">
          Account deletion request received. All records will be erased within 30 days.
        </div>
      )}

      {/* POLICY DETAILS */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-4 text-xs text-slate-600">
        <h3 className="font-extrabold text-sm text-slate-900">Key Privacy Commitments</h3>
        
        <ul className="space-y-2 leading-relaxed">
          <li className="flex items-start gap-2">
            <Lock className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span><strong>Zero Data Monetization:</strong> We do not sell your personal shopping activity or search logs to third-party advertisers.</span>
          </li>
          <li className="flex items-start gap-2">
            <Lock className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span><strong>Out-of-Band Attribution:</strong> Merchant affiliate links use standard click parameters and never alter Deal Scores.</span>
          </li>
          <li className="flex items-start gap-2">
            <Lock className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span><strong>Transparent Retention:</strong> Browser extension content scripts observe only supported merchant product pages.</span>
          </li>
        </ul>
      </div>

    </div>
  );
}
