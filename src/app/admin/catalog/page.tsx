'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, Database, ExternalLink, Package, RefreshCw, Search, Sparkles, UploadCloud, XCircle } from 'lucide-react';

type QikinkProduct = {
  id: string | number;
  title: string;
  category?: string;
  description?: string;
  image_url?: string;
  image?: string;
  images?: string[];
  base_price?: number;
  variants?: Array<{ sku?: string; size?: string; color?: string; cost?: number }>;
};

type SyncState = { id: string | number; status: 'syncing' | 'success' | 'error'; message?: string } | null;

export default function AdminCatalogControlCenter() {
  const [products, setProducts] = useState<QikinkProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('ALL');
  const [sync, setSync] = useState<SyncState>(null);
  const [error, setError] = useState('');

  const loadCatalog = async () => {
    setError('');
    setRefreshing(true);
    try {
      const res = await fetch('/api/qikink/sync', { cache: 'no-store' });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || 'Unable to load Qikink catalog');
      setProducts(Array.isArray(data.products) ? data.products : []);
    } catch (err: any) {
      setError(err?.message || 'Unable to load Qikink catalog');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => { loadCatalog(); }, []);

  const categories = useMemo(() => {
    const values = products.map((p) => p.category).filter(Boolean) as string[];
    return ['ALL', ...Array.from(new Set(values)).sort()];
  }, [products]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      const matchesQuery = !q || `${p.title} ${p.category || ''} ${p.id}`.toLowerCase().includes(q);
      const matchesCategory = category === 'ALL' || p.category === category;
      return matchesQuery && matchesCategory;
    });
  }, [products, query, category]);

  const syncProduct = async (product: QikinkProduct) => {
    setSync({ id: product.id, status: 'syncing' });
    try {
      const base = Number(product.base_price || 0);
      const suggested = Math.ceil((base * 2.2) / 10) * 10;
      const res = await fetch('/api/qikink/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: product.id, sellingPrice: suggested }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || 'Sync failed');
      setSync({ id: product.id, status: 'success', message: data.message });
    } catch (err: any) {
      setSync({ id: product.id, status: 'error', message: err?.message || 'Sync failed' });
    }
  };

  const imageFor = (p: QikinkProduct) => p.image_url || p.image || p.images?.[0] || '';

  return (
    <main className="min-h-screen bg-brand-dark text-brand-pearl p-6 sm:p-10 pt-28">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 border-b border-brand-border pb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-brand-gold flex items-center gap-2">
              <Database className="w-4 h-4" /> KultZR Control Center
            </span>
            <h1 className="text-3xl sm:text-4xl font-black mt-2">Real Qikink Catalog</h1>
            <p className="text-sm text-brand-muted mt-2 max-w-2xl">Browse the provider catalog directly, inspect landed costs and sync products into the KultZR store. No mock products.</p>
          </div>
          <div className="flex gap-2">
            <Link href="/admin/integrations/qikink" className="px-4 py-2.5 rounded-xl bg-brand-secondary border border-brand-border text-xs font-bold hover:border-brand-gold">Qikink Settings</Link>
            <button onClick={loadCatalog} disabled={refreshing} className="px-4 py-2.5 rounded-xl bg-brand-gold text-brand-dark text-xs font-extrabold flex items-center gap-2 disabled:opacity-50">
              <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} /> Refresh Catalog
            </button>
          </div>
        </header>

        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="glass-panel p-5 rounded-2xl border border-brand-border"><p className="text-xs text-brand-muted uppercase font-bold">Provider Products</p><p className="text-3xl font-black mt-1">{loading ? '—' : products.length}</p><p className="text-[10px] text-brand-muted mt-1">Live Qikink response</p></div>
          <div className="glass-panel p-5 rounded-2xl border border-brand-border"><p className="text-xs text-brand-muted uppercase font-bold">Visible Now</p><p className="text-3xl font-black mt-1">{loading ? '—' : filtered.length}</p><p className="text-[10px] text-brand-muted mt-1">After filters</p></div>
          <div className="glass-panel p-5 rounded-2xl border border-brand-border"><p className="text-xs text-brand-muted uppercase font-bold">Categories</p><p className="text-3xl font-black mt-1">{loading ? '—' : categories.length - 1}</p><p className="text-[10px] text-brand-muted mt-1">Detected automatically</p></div>
          <div className="glass-panel p-5 rounded-2xl border border-brand-border"><p className="text-xs text-brand-muted uppercase font-bold">Fulfillment</p><p className="text-xl font-black mt-2 text-emerald-400">ON DEMAND</p><p className="text-[10px] text-brand-muted mt-1">No inventory required</p></div>
        </section>

        <section className="glass-panel p-4 rounded-2xl border border-brand-border flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search real Qikink products, IDs or categories..." className="w-full bg-brand-dark border border-brand-border rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:border-brand-gold" />
          </div>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="bg-brand-dark border border-brand-border rounded-xl px-4 py-3 text-sm outline-none focus:border-brand-gold md:w-56">
            {categories.map((c) => <option key={c} value={c}>{c === 'ALL' ? 'All categories' : c}</option>)}
          </select>
        </section>

        {error && <div className="p-4 rounded-2xl border border-red-500/30 bg-red-500/10 text-sm text-red-300 flex items-center gap-3"><XCircle className="w-5 h-5" /> {error}</div>}

        {sync?.message && <div className={`p-4 rounded-2xl border ${sync.status === 'success' ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300' : 'border-red-500/30 bg-red-500/10 text-red-300'} text-sm flex items-center gap-3`}>
          {sync.status === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />} {sync.message}
        </div>}

        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {loading ? Array.from({ length: 6 }).map((_, i) => <div key={i} className="glass-panel rounded-3xl border border-brand-border overflow-hidden animate-pulse"><div className="h-64 bg-brand-secondary" /><div className="p-5 space-y-3"><div className="h-4 bg-brand-secondary rounded" /><div className="h-3 bg-brand-secondary rounded w-2/3" /><div className="h-10 bg-brand-secondary rounded-xl" /></div></div>) : filtered.map((product) => {
            const cost = Number(product.base_price || 0);
            const suggested = Math.ceil((cost * 2.2) / 10) * 10;
            const image = imageFor(product);
            const isSyncing = sync?.id === product.id && sync.status === 'syncing';
            return <article key={String(product.id)} className="glass-panel rounded-3xl border border-brand-border overflow-hidden hover:border-brand-gold/40 transition-colors">
              <div className="h-64 bg-brand-secondary relative overflow-hidden">
                {image ? <img src={image} alt={product.title} className="w-full h-full object-cover" loading="lazy" /> : <div className="w-full h-full flex items-center justify-center"><Package className="w-14 h-14 text-brand-muted" /></div>}
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-brand-dark/90 border border-brand-border text-[10px] font-bold text-brand-gold">QIKINK #{product.id}</span>
              </div>
              <div className="p-5 space-y-4">
                <div><p className="text-[10px] uppercase tracking-wider text-brand-muted font-bold">{product.category || 'Uncategorized'}</p><h2 className="font-black text-lg mt-1 line-clamp-2">{product.title}</h2></div>
                <div className="grid grid-cols-2 gap-3 text-xs"><div className="rounded-xl bg-brand-dark border border-brand-border p-3"><p className="text-brand-muted">Provider cost</p><p className="font-black text-base mt-1">₹{cost.toFixed(2)}</p></div><div className="rounded-xl bg-brand-dark border border-brand-border p-3"><p className="text-brand-muted">Suggested retail</p><p className="font-black text-base mt-1 text-emerald-400">₹{suggested.toFixed(0)}</p></div></div>
                <p className="text-[11px] text-brand-muted">{product.variants?.length || 0} variants · price is an initial suggestion, not a guaranteed margin.</p>
                <button onClick={() => syncProduct(product)} disabled={isSyncing} className="w-full py-3 rounded-xl bg-brand-gold text-brand-dark font-extrabold text-xs flex items-center justify-center gap-2 disabled:opacity-50">
                  {isSyncing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <UploadCloud className="w-4 h-4" />} {isSyncing ? 'Syncing + AI enriching...' : 'Sync & Publish to KultZR'}
                </button>
                <div className="flex gap-2"><span className="flex-1 text-[10px] text-brand-muted flex items-center gap-1"><Sparkles className="w-3 h-3" /> AI metadata</span><span className="flex-1 text-[10px] text-brand-muted flex items-center gap-1 justify-end"><ExternalLink className="w-3 h-3" /> Qikink source</span></div>
              </div>
            </article>;
          })}
        </section>

        {!loading && filtered.length === 0 && !error && <div className="text-center py-20 text-brand-muted">No Qikink products match your filters.</div>}
      </div>
    </main>
  );
}
