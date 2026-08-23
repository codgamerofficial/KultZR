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
    const { orderId } = await request.json();
    if (!orderId) return NextResponse.json({ error: 'orderId is required' }, { status: 400 });

    const supabase = db();
    const { data: order, error } = await supabase.from('orders').select('id,pod_order_id,order_status').eq('id', orderId).single();
    if (error || !order) return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    if (!order.pod_order_id) return NextResponse.json({ error: 'Order has no provider order ID yet' }, { status: 409 });

    const tracking = await new QikinkProvider().getTracking(String(order.pod_order_id));
    const normalized = String(tracking.status || 'PROCESSING').toUpperCase();
    const status = normalized.includes('DELIVER') ? 'delivered' : normalized.includes('SHIP') || tracking.tracking_number ? 'shipped' : normalized.includes('CANCEL') ? 'cancelled' : 'processing';

    await supabase.from('orders').update({ tracking_number: tracking.tracking_number || null, courier_name: tracking.courier_name || null, tracking_url: tracking.tracking_url || null, order_status: status }).eq('id', order.id);
    await supabase.from('tracking_events').insert({ order_id: order.id, pod_order_id: order.pod_order_id, status: normalized, description: `Tracking synchronized from Qikink`, event_timestamp: new Date().toISOString() });

    return NextResponse.json({ success: true, status, tracking });
  } catch (error: any) {
    console.error('Tracking sync error:', error);
    return NextResponse.json({ error: error?.message || 'Tracking synchronization failed' }, { status: 502 });
  }
}
