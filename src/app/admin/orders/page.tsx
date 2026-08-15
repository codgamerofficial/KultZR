'use client';

import React, { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { ShieldCheck, Package, Truck, Clock, RefreshCw, CheckCircle2, Search, Filter } from 'lucide-react';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchOrders = async () => {
    setLoading(true);
    if (isSupabaseConfigured) {
      try {
        let query = supabase
          .from('orders')
          .select('*, order_items(*)')
          .order('created_at', { ascending: false });

        if (statusFilter !== 'all') {
          query = query.eq('order_status', statusFilter);
        }

        const { data, error } = await query;
        if (!error && data) {
          setOrders(data);
        }
      } catch (err) {
        console.warn('Error fetching admin orders:', err);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, [statusFilter]);

  const handleUpdateStatus = async (orderId: string, newStatus: string) => {
    setUpdatingId(orderId);
    if (isSupabaseConfigured) {
      try {
        const { error } = await supabase
          .from('orders')
          .update({ order_status: newStatus })
          .eq('id', orderId);

        if (!error) {
          setOrders(orders.map(o => o.id === orderId ? { ...o, order_status: newStatus } : o));
        }
      } catch (err) {
        console.error('Update status error:', err);
      }
    }
    setUpdatingId(null);
  };

  const totalRevenue = orders.reduce((acc, o) => acc + (Number(o.total_amount) || 0), 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-brand-gold/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-brand-gold flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> KultZR Atelier Admin Portal
          </span>
          <h1 className="text-3xl font-black text-brand-pearl">Merchant Order Management</h1>
          <p className="text-xs text-brand-muted mt-1">
            Manage print-on-demand fulfillment stages, customer deliveries, and sales revenue.
          </p>
        </div>

        <div className="flex gap-4">
          <div className="px-4 py-2 rounded-2xl bg-brand-dark border border-brand-border text-xs">
            <span className="text-brand-muted">Total Orders</span>
            <p className="text-xl font-bold text-brand-pearl">{orders.length}</p>
          </div>
          <div className="px-4 py-2 rounded-2xl bg-brand-dark border border-brand-gold/40 text-xs">
            <span className="text-brand-muted">Total Revenue</span>
            <p className="text-xl font-extrabold text-brand-gold">₹{totalRevenue.toLocaleString('en-IN')}</p>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-brand-border pb-4 text-xs font-bold">
        <div className="flex gap-2">
          {['all', 'processing', 'printing', 'shipped', 'delivered'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 rounded-xl capitalize transition-colors ${
                statusFilter === status
                  ? 'bg-brand-gold text-brand-dark'
                  : 'bg-brand-card/40 text-brand-muted hover:text-brand-pearl border border-brand-border'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        <button
          onClick={fetchOrders}
          className="px-3 py-2 bg-brand-card text-brand-muted hover:text-brand-pearl border border-brand-border rounded-xl flex items-center gap-1.5"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Refresh List
        </button>
      </div>

      {/* Orders List */}
      {loading ? (
        <div className="p-12 text-center text-xs text-brand-muted animate-pulse">
          Loading merchant order queue from Supabase cloud database...
        </div>
      ) : orders.length === 0 ? (
        <div className="glass-panel p-12 rounded-3xl border border-brand-border text-center space-y-3">
          <Package className="w-12 h-12 text-brand-muted mx-auto" />
          <h3 className="text-lg font-bold text-brand-pearl">No Orders Found</h3>
          <p className="text-xs text-brand-muted">There are currently no orders in this status category.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="glass-panel p-6 rounded-3xl border border-brand-border space-y-6">
              
              {/* Top Details */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-brand-border pb-4 text-xs">
                <div>
                  <span className="text-brand-muted">Order ID</span>
                  <p className="font-mono font-bold text-brand-gold text-sm">{order.order_number}</p>
                </div>
                <div>
                  <span className="text-brand-muted">Customer Info</span>
                  <p className="font-bold text-brand-pearl">{order.customer_name}</p>
                  <p className="text-brand-muted text-[11px]">{order.customer_email}</p>
                </div>
                <div>
                  <span className="text-brand-muted">Payment ID (Razorpay)</span>
                  <p className="font-mono text-brand-pearl">{order.razorpay_payment_id || 'pay_test_verified'}</p>
                </div>
                <div>
                  <span className="text-brand-muted">Order Date</span>
                  <p className="font-semibold text-brand-pearl">{new Date(order.created_at).toLocaleDateString('en-IN')}</p>
                </div>
                <div>
                  <span className="text-brand-muted">Amount</span>
                  <p className="font-black text-brand-gold text-sm">₹{Number(order.total_amount).toLocaleString('en-IN')}</p>
                </div>
              </div>

              {/* Items & Print Vector Details */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-brand-pearl">Order Items & Custom Specifications</span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {order.order_items?.map((item: any) => (
                    <div key={item.id} className="p-3 rounded-2xl bg-brand-dark/60 border border-brand-border/40 text-xs flex gap-3 items-center">
                      <div className="w-12 h-14 relative rounded-lg overflow-hidden bg-brand-secondary border border-brand-border shrink-0">
                        {item.product_image && <img src={item.product_image} alt="" className="w-full h-full object-cover" />}
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-brand-pearl line-clamp-1">{item.product_title}</p>
                        <p className="text-brand-muted text-[11px]">Size: {item.size} | Color: {item.color} | Qty: {item.quantity}</p>
                        {item.customization_details?.custom_text && (
                          <p className="text-brand-gold text-[10px] font-semibold mt-1">
                            Print Vector: &quot;{item.customization_details.custom_text}&quot; ({item.customization_details.font_family})
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status Update Action Bar */}
              <div className="p-4 rounded-2xl bg-brand-card/40 border border-brand-border flex flex-wrap items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-brand-gold" />
                  <span className="text-brand-muted">Current Status:</span>
                  <span className="font-bold text-emerald-400 uppercase">{order.order_status || 'processing'}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-brand-muted font-bold">Update Stage:</span>
                  {['processing', 'printing', 'shipped', 'delivered'].map((st) => (
                    <button
                      key={st}
                      disabled={updatingId === order.id}
                      onClick={() => handleUpdateStatus(order.id, st)}
                      className={`px-3 py-1.5 rounded-lg font-bold capitalize transition-colors ${
                        order.order_status === st
                          ? 'bg-brand-gold text-brand-dark'
                          : 'bg-brand-dark border border-brand-border text-brand-muted hover:text-brand-pearl'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
}
