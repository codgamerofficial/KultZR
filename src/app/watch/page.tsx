'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Eye, Bell, Trash2, ArrowRight, TrendingDown, Sparkles } from 'lucide-react';
import { PriceWatchItem } from '@/lib/types';

export default function WatchPage() {
  const [watches, setWatches] = useState<PriceWatchItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchWatches = async () => {
    try {
      const res = await fetch('/api/v1/watches');
      const data = await res.json();
      if (data.success) {
        setWatches(data.watches || []);
      }
    } catch (err) {
      console.error('Failed to fetch price watches:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWatches();
  }, []);

  const handleDeleteWatch = async (id: string) => {
    try {
      const res = await fetch(`/api/v1/watches?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        await fetchWatches();
      }
    } catch (err) {
      console.error('Failed to delete price watch:', err);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-50 text-brand-saffron flex items-center justify-center font-bold">
            <Eye className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">Price Watch & Surveillance</h1>
            <p className="text-xs text-slate-500">Real-time price surveillance items connected to backend worker queue</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900">Monitored Products ({watches.length})</h2>
          <span className="text-xs text-slate-400">Backend Synced</span>
        </div>

        {loading ? (
          <div className="p-12 text-center text-slate-400 text-xs font-medium">
            Loading active price watches...
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {watches.map((watch) => (
              <div key={watch.id} className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                
                <div className="flex items-center gap-4">
                  {watch.productImage ? (
                    <img src={watch.productImage} alt="" className="w-12 h-12 object-cover rounded-2xl border border-slate-200 shrink-0" />
                  ) : (
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-brand-blue font-bold text-xs">
                      WATCH
                    </div>
                  )}
                  <div className="space-y-1">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">
                      ● SURVEILLANCE ACTIVE
                    </span>
                    <h3 className="font-bold text-sm text-slate-900 line-clamp-1">{watch.productTitle}</h3>
                    <p className="text-xs text-slate-500">
                      Current: <span className="font-bold text-slate-900">₹{watch.currentPrice.toLocaleString('en-IN')}</span> | Target: <span className="font-bold text-emerald-600">₹{watch.targetPrice.toLocaleString('en-IN')}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto justify-end border-t sm:border-t-0 border-slate-100 pt-3 sm:pt-0">
                  <Link
                    href={`/product/${watch.productId}`}
                    className="px-4 py-2 bg-indigo-950 text-white rounded-xl text-xs font-bold hover:bg-brand-blue transition flex items-center gap-1"
                  >
                    <span>View Product</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <button
                    onClick={() => handleDeleteWatch(watch.id)}
                    className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition"
                    title="Remove Watch"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

              </div>
            ))}

            {watches.length === 0 && (
              <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 text-slate-500 space-y-2">
                <Eye className="w-8 h-8 text-slate-300 mx-auto" />
                <p className="text-sm font-semibold">No active price watches</p>
                <p className="text-xs">Browse products and click "Watch Price" to get notified on drops.</p>
              </div>
            )}
          </div>
        )}
      </div>

    </div>
  );
}
