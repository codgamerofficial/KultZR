'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, RefreshCw, CheckCircle2, Clock, AlertTriangle, Layers, Eye, ShieldCheck, Database, Sliders, Play } from 'lucide-react';

export default function AdminCatalogControlCenter() {
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState<any>(null);

  const handleSyncNow = async () => {
    setIsSyncing(true);
    try {
      const res = await fetch('/api/sync/run', { method: 'POST' });
      const data = await res.json();
      setSyncResult(data.summary);
    } catch (e: any) {
      alert(`Sync failed: ${e.message}`);
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-dark text-brand-pearl p-6 sm:p-10 pt-28 space-y-8">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header Title */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-brand-border pb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-brand-gold flex items-center gap-1.5">
              <Database className="w-4 h-4" /> KultZR Control Center
            </span>
            <h1 className="text-3xl font-black text-brand-pearl mt-1">Product Catalog Intelligence & Sync</h1>
            <p className="text-xs text-brand-muted mt-1">
              Qikink Open API ingestion engine with NVIDIA NIM (GLM-5.2) AI enrichment and deterministic pricing.
            </p>
          </div>

          {/* Quick Nav Tabs */}
          <div className="flex items-center gap-2">
            <Link
              href="/admin/catalog"
              className="px-4 py-2 rounded-xl bg-brand-gold text-brand-dark font-extrabold text-xs"
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
              className="px-4 py-2 rounded-xl bg-brand-secondary border border-brand-border text-brand-muted hover:text-brand-pearl font-bold text-xs"
            >
              AI Operations
            </Link>
          </div>
        </div>

        {/* Top Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="glass-panel p-5 rounded-2xl border border-brand-border space-y-2">
            <span className="text-xs text-brand-muted font-bold uppercase">Total Catalog Items</span>
            <p className="text-3xl font-black text-brand-pearl">148</p>
            <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Live in KultZR Store
            </span>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-brand-border space-y-2">
            <span className="text-xs text-brand-muted font-bold uppercase">Published Products</span>
            <p className="text-3xl font-black text-brand-gold">121</p>
            <span className="text-[10px] text-brand-muted">Synced with Qikink SKUs</span>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-brand-border space-y-2">
            <span className="text-xs text-brand-muted font-bold uppercase">AI Review Queue</span>
            <p className="text-3xl font-black text-amber-400">12</p>
            <span className="text-[10px] text-amber-400 font-bold">Pending Merchant Approval</span>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-brand-border space-y-2">
            <span className="text-xs text-brand-muted font-bold uppercase">Processing State</span>
            <p className="text-3xl font-black text-blue-400">8</p>
            <span className="text-[10px] text-brand-muted">Normalizing & Enriching</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="glass-panel p-6 rounded-3xl border border-brand-gold/30 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-brand-pearl">Qikink Sync & AI Automation Controls</h3>
              <p className="text-xs text-brand-muted">Trigger real-time API reconciliation, AI metadata scanning, or pricing updates.</p>
            </div>

            <button
              onClick={handleSyncNow}
              disabled={isSyncing}
              className="px-6 py-3 bg-linear-to-r from-amber-400 via-brand-gold to-amber-500 text-brand-dark font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-amber-500/20 hover:opacity-95 transition-opacity flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? 'Executing Sync Cycle...' : 'SYNC NOW (QIKINK OPEN API)'}</span>
            </button>
          </div>

          {/* Sync Output Log Box */}
          {syncResult && (
            <div className="p-4 rounded-2xl bg-brand-dark border border-brand-gold/30 text-xs font-mono space-y-2">
              <div className="flex items-center justify-between border-b border-brand-border pb-2 text-brand-gold font-bold">
                <span>Sync Run Summary [{syncResult.run_id}]</span>
                <span>Status: {syncResult.status}</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-brand-muted pt-1">
                <div>Scanned: <strong>{syncResult.products_scanned}</strong></div>
                <div>Created: <strong>{syncResult.products_created}</strong></div>
                <div>Updated: <strong>{syncResult.products_updated}</strong></div>
                <div>Failed: <strong>{syncResult.products_failed}</strong></div>
              </div>
              <div className="mt-2 max-h-36 overflow-y-auto space-y-1 text-[11px] text-brand-pearl">
                {syncResult.logs.map((log: string, idx: number) => (
                  <p key={idx}>{log}</p>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Product Catalog Table */}
        <div className="glass-panel rounded-3xl border border-brand-border overflow-hidden">
          <div className="p-6 border-b border-brand-border flex items-center justify-between">
            <h3 className="text-base font-bold text-brand-pearl">Live Synchronized Products</h3>
            <span className="text-xs text-brand-muted">Showing 3 active Qikink API mappings</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-brand-pearl">
              <thead className="bg-brand-secondary text-brand-muted uppercase text-[10px] tracking-wider border-b border-brand-border">
                <tr>
                  <th className="p-4">Qikink ID</th>
                  <th className="p-4">Product Title</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Qikink Cost</th>
                  <th className="p-4">KultZR Price</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border/60">
                <tr className="hover:bg-brand-secondary/50">
                  <td className="p-4 font-mono text-brand-gold font-bold">64609138</td>
                  <td className="p-4 font-bold">KultZR Essential Ringer Tee</td>
                  <td className="p-4">Unisex → T-Shirts</td>
                  <td className="p-4 text-brand-muted">₹308.01</td>
                  <td className="p-4 font-bold text-emerald-400">₹799.00</td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                      PUBLISHED
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button className="px-3 py-1 bg-brand-dark border border-brand-border rounded-lg text-[10px] font-bold hover:border-brand-gold">
                      Edit
                    </button>
                  </td>
                </tr>
                <tr className="hover:bg-brand-secondary/50">
                  <td className="p-4 font-mono text-brand-gold font-bold">63665902</td>
                  <td className="p-4 font-bold">GT Gujarat Titans Varsity Jacket</td>
                  <td className="p-4">Unisex → Jackets</td>
                  <td className="p-4 text-brand-muted">₹866.25</td>
                  <td className="p-4 font-bold text-emerald-400">₹1,499.00</td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                      PUBLISHED
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button className="px-3 py-1 bg-brand-dark border border-brand-border rounded-lg text-[10px] font-bold hover:border-brand-gold">
                      Edit
                    </button>
                  </td>
                </tr>
                <tr className="hover:bg-brand-secondary/50">
                  <td className="p-4 font-mono text-brand-gold font-bold">63665896</td>
                  <td className="p-4 font-bold">DC Delhi Capitals Varsity Jacket</td>
                  <td className="p-4">Unisex → Jackets</td>
                  <td className="p-4 text-brand-muted">₹866.25</td>
                  <td className="p-4 font-bold text-emerald-400">₹1,499.00</td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 text-[10px] font-bold">
                      AI_REVIEW
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button className="px-3 py-1 bg-brand-gold text-brand-dark rounded-lg text-[10px] font-bold hover:bg-amber-400">
                      Approve
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
