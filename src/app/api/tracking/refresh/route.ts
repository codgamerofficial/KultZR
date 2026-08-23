import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { QikinkProvider } from '@/lib/providers/qikink';

function db() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error('Supabase is not configured');
  return createClient(url, key, { auth: { persistSession: false } });
}

export async function POST(request: Request) {
  try {
    const secret = process.env.TRACKING_SYNC_SECRET;
    if (secret && request.headers.get('x-kultzr-sync-secret') !== secret) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const supabase = db();
    const { data: orders, error } = await supabase.from('orders').select('id,pod_order_id').in('fulfillment_status', ['SUBMITTED', 'SHIPPED']).not('pod_order_id', 'is', null).limit(50);
    if (error) throw error;
    const provider = new QikinkProvider();
    let updated = 0;
    const results = [];
    for (const order of orders || []) {
      try {
        const tracking = await provider.getTracking(String(order.pod_order_id));
        const raw = String(tracking.status || 'PROCESSING').toUpperCase();
        const status = raw.includes('DELIVER') ? 'delivered' : raw.includes('SHIP') || tracking.tracking_number ? 'shipped' : raw.includes('CANCEL') ? 'cancelled' : 'processing';
        await supabase.from('orders').update({ tracking_number: tracking.tracking_number || null, courier_name: tracking.courier_name || null, tracking_url: tracking.tracking_url || null, order_status: status }).eq('id', order.id);
        await supabase.from('tracking_events').insert({ order_id: order.id, pod_order_id: order.pod_order_id, status: raw, description: 'Automated Qikink tracking refresh', event_timestamp: new Date().toISOString() });
        updated++;
        results.push({ order_id: order.id, status });
      } catch (err: any) {
        results.push({ order_id: order.id, error: err?.message || 'Tracking refresh failed' });
      }
    }
    return NextResponse.json({ success: true, checked: orders?.length || 0, updated, results });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Tracking refresh failed' }, { status: 502 });
  }
}
