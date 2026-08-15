'use client';

import React, { useState } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { Search, Package, Truck, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function TrackOrderPage() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<any | null>(null);
  const [searched, setSearched] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSearchOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setErrorMsg(null);
    setSearched(true);
    setOrder(null);

    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('orders')
          .select('*, order_items(*)')
          .or(`order_number.ilike.%${query.trim()}%,razorpay_order_id.ilike.%${query.trim()}%,customer_email.ilike.%${query.trim()}%`)
          .order('created_at', { ascending: false })
          .limit(1)
          .single();

        if (data && !error) {
          setOrder(data);
        } else {
          setErrorMsg('No order found matching your tracking reference or email address.');
        }
      } catch (err) {
        setErrorMsg('Error searching database. Please check your query.');
      }
    } else {
      setErrorMsg('Supabase live database connection required for tracking lookup.');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Header */}
      <div className="text-center space-y-3 max-w-xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-gold flex items-center justify-center gap-1.5">
          <Truck className="w-4 h-4" /> Real-Time Fulfillment Tracker
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-brand-pearl">Track Your Order</h1>
        <p className="text-brand-muted text-xs sm:text-sm">
          Enter your Order Number, Razorpay Reference ID, or Email Address to check live print and dispatch status.
        </p>
      </div>

      {/* Search Bar Form */}
      <form onSubmit={handleSearchOrder} className="glass-panel p-4 rounded-2xl border border-brand-gold/40 flex items-center gap-3 max-w-xl mx-auto">
        <Search className="w-5 h-5 text-brand-gold shrink-0 ml-2" />
        <input
          type="text"
          required
          placeholder="e.g. order_kz_12345 or your@email.com"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-transparent text-sm text-brand-pearl focus:outline-none placeholder:text-brand-muted"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2.5 bg-brand-gold text-brand-dark font-extrabold text-xs rounded-xl hover:bg-amber-400 transition-colors shrink-0"
        >
          {loading ? 'Searching...' : 'Track Status'}
        </button>
      </form>

      {/* Error Alert */}
      {errorMsg && (
        <div className="max-w-xl mx-auto p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Order Result Card */}
      {order && (
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-brand-border space-y-6 max-w-2xl mx-auto">
          
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-brand-border pb-4 text-xs">
            <div>
              <span className="text-brand-muted">Order Reference</span>
              <p className="font-mono font-bold text-brand-gold text-base">{order.order_number}</p>
            </div>
            <div>
              <span className="text-brand-muted">Customer Name</span>
              <p className="font-bold text-brand-pearl">{order.customer_name}</p>
            </div>
            <div>
              <span className="text-brand-muted">Payment Status</span>
              <span className="block font-bold text-emerald-400 uppercase">{order.payment_status || 'PAID'}</span>
            </div>
          </div>

          {/* Stepper */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-brand-pearl">Current Fulfillment Stage</span>
            <div className="p-4 rounded-2xl bg-brand-dark border border-brand-border flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-brand-pearl capitalize">{order.order_status || 'On-Demand Printing'}</h4>
                  <p className="text-[11px] text-brand-muted">Crafted with zero-waste digital eco-ink.</p>
                </div>
              </div>
              <span className="text-brand-gold font-bold">Est: 3-5 Days</span>
            </div>
          </div>

          {/* Order Items */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-brand-pearl">Order Package Contents</span>
            {order.order_items?.map((item: any) => (
              <div key={item.id} className="flex items-center justify-between p-3 rounded-xl bg-brand-card/50 border border-brand-border/40 text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-12 relative rounded-lg overflow-hidden bg-brand-dark shrink-0">
                    {item.product_image && <img src={item.product_image} alt="" className="w-full h-full object-cover" />}
                  </div>
                  <div>
                    <p className="font-bold text-brand-pearl">{item.product_title}</p>
                    <p className="text-brand-muted text-[11px]">Size: {item.size} | Color: {item.color} | Qty: {item.quantity}</p>
                  </div>
                </div>
                <span className="font-bold text-brand-gold">₹{(Number(item.unit_price) * item.quantity).toLocaleString('en-IN')}</span>
              </div>
            ))}
          </div>

          <div className="pt-2 text-center">
            <Link href="/account" className="text-xs text-brand-gold font-bold hover:underline">
              Sign In to View Full Account Dashboard →
            </Link>
          </div>

        </div>
      )}

    </div>
  );
}
