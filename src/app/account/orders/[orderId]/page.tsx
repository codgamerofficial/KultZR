'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, CheckCircle2, Clock3, ExternalLink, Package, RefreshCw, Truck } from 'lucide-react';

const steps = [
  ['processing', 'Order Processing'],
  ['printing', 'Printing & Packing'],
  ['shipped', 'Shipped'],
  ['delivered', 'Delivered'],
] as const;

function indexFor(status: string) {
  if (status === 'delivered') return 3;
  if (status === 'shipped') return 2;
  if (status === 'printing') return 1;
  return 0;
}

export default function OrderDetailsPage() {
  const params = useParams<{ orderId: string }>();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  async function load() {
    if (!params.orderId) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/orders/${params.orderId}/tracking`, { cache: 'no-store' });
      setData(res.ok ? await res.json() : { error: 'Order not found' });
    } finally { setLoading(false); }
  }

  async function refresh() {
    setRefreshing(true);
    try {
      await fetch('/api/tracking/sync', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ orderId: params.orderId }) });
      await load();
    } finally { setRefreshing(false); }
  }

  useEffect(() => { load(); }, [params.orderId]);

  if (loading) return <div className="max-w-5xl mx-auto px-4 py-20 text-center text-sm text-brand-muted animate-pulse">Loading live order status...</div>;
  if (!data?.order) return <div className="max-w-5xl mx-auto px-4 py-20 text-center"><p className="text-brand-pearl font-bold">{data?.error || 'Order not found'}</p><Link href="/account" className="inline-flex mt-5 px-5 py-2.5 bg-brand-gold text-brand-dark rounded-xl text-xs font-extrabold">Back to Account</Link></div>;

  const order = data.order;
  const current = indexFor(order.order_status || 'processing');

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-6">
      <Link href="/account" className="inline-flex items-center gap-2 text-xs font-bold text-brand-muted hover:text-brand-gold"><ArrowLeft className="w-4 h-4" /> Back to My Orders</Link>
      <section className="glass-panel rounded-3xl border border-brand-gold/20 p-5 sm:p-8 space-y-7">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div><p className="text-[11px] uppercase tracking-widest text-brand-gold font-bold">KultZR Order</p><h1 className="text-2xl sm:text-3xl font-black text-brand-pearl mt-1">{order.order_number}</h1><p className="text-xs text-brand-muted mt-1">Placed {new Date(order.created_at).toLocaleString('en-IN')}</p></div>
          <button onClick={refresh} disabled={refreshing || !order.pod_order_id} className="px-4 py-2 rounded-xl border border-brand-border text-xs font-bold text-brand-pearl flex items-center gap-2 disabled:opacity-40"><RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} /> {refreshing ? 'Refreshing' : 'Refresh Tracking'}</button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4">
          {steps.map(([key, label], i) => <div key={key} className={`rounded-2xl p-3 border ${i <= current ? 'border-brand-gold/50 bg-brand-gold/5' : 'border-brand-border bg-brand-dark/30'}`}><div className="flex items-center gap-2">{i < current ? <CheckCircle2 className="w-4 h-4 text-brand-gold" /> : i === current ? <Clock3 className="w-4 h-4 text-brand-gold" /> : <Package className="w-4 h-4 text-brand-muted" />}<span className={`text-[11px] font-bold ${i <= current ? 'text-brand-pearl' : 'text-brand-muted'}`}>{label}</span></div></div>)}
        </div>

        {(order.tracking_number || order.tracking_url) && <div className="rounded-2xl border border-brand-gold/20 bg-brand-gold/5 p-4 flex flex-wrap items-center justify-between gap-4"><div className="flex items-center gap-3"><Truck className="w-5 h-5 text-brand-gold" /><div><p className="text-[10px] text-brand-muted">{order.courier_name || 'Courier'}</p><p className="font-mono text-sm font-bold text-brand-pearl">{order.tracking_number || 'Tracking available'}</p></div></div>{order.tracking_url && <a href={order.tracking_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-brand-gold text-brand-dark rounded-xl text-xs font-extrabold">Track Package <ExternalLink className="w-3 h-3" /></a>}</div>}

        <div><h2 className="text-sm font-bold text-brand-pearl mb-3">Tracking Timeline</h2><div className="space-y-3">{(data.events || []).map((event: any, i: number) => <div key={`${event.event_timestamp}-${i}`} className="flex gap-3"><div className="pt-1"><div className="w-2.5 h-2.5 rounded-full bg-brand-gold" /></div><div className="pb-3"><p className="text-xs font-bold text-brand-pearl">{event.status}</p><p className="text-[11px] text-brand-muted">{event.description || 'Order status updated'}{event.location ? ` · ${event.location}` : ''}</p><p className="text-[10px] text-brand-muted mt-0.5">{new Date(event.event_timestamp).toLocaleString('en-IN')}</p></div></div>)}{(!data.events || data.events.length === 0) && <p className="text-xs text-brand-muted">Your tracking timeline will appear here as Qikink sends updates.</p>}</div></div>

        <div className="border-t border-brand-border pt-5"><h2 className="text-sm font-bold text-brand-pearl mb-3">Items</h2><div className="space-y-2">{(order.order_items || []).map((item: any) => <div key={item.id} className="flex items-center justify-between gap-3 rounded-xl border border-brand-border p-3"><div><p className="text-xs font-bold text-brand-pearl">{item.product_title}</p><p className="text-[10px] text-brand-muted">{item.size || 'Default'} · {item.color || 'Default'} · Qty {item.quantity}</p></div><p className="text-xs font-bold text-brand-gold">₹{(Number(item.unit_price) * Number(item.quantity)).toLocaleString('en-IN')}</p></div>)}</div></div>
      </section>
    </main>
  );
}
