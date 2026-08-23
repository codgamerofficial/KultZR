import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

function db() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error('Supabase is not configured');
  return createClient(url, key, { auth: { persistSession: false } });
}

export async function GET(request: Request) {
  try {
    const secret = process.env.CRON_SECRET;
    const auth = request.headers.get('authorization');
    if (secret && auth !== `Bearer ${secret}`) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const supabase = db();
    const { data: orders, error } = await supabase.from('orders').select('id,fulfillment_status,fulfillment_attempts').eq('payment_status', 'paid').in('fulfillment_status', ['PENDING', 'FAILED']).lt('fulfillment_attempts', 3).limit(10);
    if (error) throw error;
    const results = [];
    for (const order of orders || []) {
      try {
        const base = new URL('/api/fulfillment/submit', request.url);
        const response = await fetch(base, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ orderId: order.id }) });
        results.push({ order_id: order.id, ok: response.ok });
      } catch (err: any) {
        results.push({ order_id: order.id, ok: false, error: err?.message || 'Fulfillment retry failed' });
      }
    }
    return NextResponse.json({ success: true, checked: orders?.length || 0, results });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Fulfillment cron failed' }, { status: 500 });
  }
}
