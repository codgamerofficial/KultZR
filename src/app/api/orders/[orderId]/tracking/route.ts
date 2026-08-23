import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

function db() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error('Supabase is not configured');
  return createClient(url, key, { auth: { persistSession: false } });
}

export async function GET(request: Request, { params }: { params: Promise<{ orderId: string }> }) {
  try {
    const { orderId } = await params;
    if (!orderId) return NextResponse.json({ error: 'orderId is required' }, { status: 400 });
    const supabase = db();
    const { data: order, error } = await supabase.from('orders').select('id,order_number,order_status,fulfillment_status,pod_order_id,tracking_number,courier_name,tracking_url,created_at').eq('id', orderId).single();
    if (error || !order) return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    const { data: events } = await supabase.from('tracking_events').select('status,location,description,event_timestamp').eq('order_id', orderId).order('event_timestamp', { ascending: false });
    return NextResponse.json({ success: true, order, events: events || [] });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Unable to load tracking' }, { status: 500 });
  }
}
