import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';

function adminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error('Supabase is not configured on the server');
  return createClient(url, key, { auth: { persistSession: false } });
}

export async function POST(request: Request) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, customerAddress, items, userId } = await request.json();
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !customerAddress || !Array.isArray(items) || !items.length) return NextResponse.json({ success: false, error: 'Missing checkout finalization data' }, { status: 400 });
    const secret = process.env.RAZORPAY_KEY_SECRET;
    if (!secret) return NextResponse.json({ success: false, error: 'Razorpay is not configured on the server' }, { status: 503 });
    const expected = crypto.createHmac('sha256', secret).update(`${razorpay_order_id}|${razorpay_payment_id}`).digest('hex');
    if (expected.length !== razorpay_signature.length || !crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(razorpay_signature))) return NextResponse.json({ success: false, error: 'Invalid payment signature' }, { status: 400 });

    const supabase = adminClient();
    const { data: existing } = await supabase.from('orders').select('id,order_number,fulfillment_status,pod_order_id').eq('razorpay_order_id', razorpay_order_id).maybeSingle();
    if (existing) return NextResponse.json({ success: true, duplicate: true, order: existing });

    const ids = items.map((i: any) => String(i.productId || i.product?.id || '')).filter(Boolean);
    const { data: products, error: productError } = await supabase.from('products').select('id,title,price,images,is_active').in('id', ids);
    if (productError) throw productError;
    const byId = new Map((products || []).map((p: any) => [String(p.id), p]));
    let total = 0;
    const orderItems: any[] = [];
    for (const item of items) {
      const product = byId.get(String(item.productId || item.product?.id || ''));
      const quantity = Number(item.quantity);
      if (!product || product.is_active === false || !Number.isInteger(quantity) || quantity < 1 || quantity > 20) return NextResponse.json({ success: false, error: 'Cart changed or contains an unavailable product' }, { status: 409 });
      const unitPrice = Number(product.price);
      if (!Number.isFinite(unitPrice) || unitPrice <= 0) return NextResponse.json({ success: false, error: 'Invalid product price' }, { status: 409 });
      total += unitPrice * quantity;
      orderItems.push({ product_id: product.id, product_title: product.title, product_image: product.images?.[0] || '', quantity, size: item.size || '', color: item.color?.name || item.color || '', unit_price: unitPrice, customization_details: item.customization || null });
    }

    const orderNumber = `KZ-${Date.now().toString(36).toUpperCase()}`;
    const { data: order, error: orderError } = await supabase.from('orders').insert({ order_number: orderNumber, user_id: userId || null, customer_email: customerAddress.email, customer_name: customerAddress.full_name, shipping_address: customerAddress, total_amount: total, currency: 'INR', payment_status: 'paid', payment_verified_at: new Date().toISOString(), order_status: 'processing', fulfillment_status: 'PENDING', fulfillment_attempts: 0, razorpay_order_id, razorpay_payment_id }).select('id,order_number,fulfillment_status').single();
    if (orderError) {
      const { data: retry } = await supabase.from('orders').select('id,order_number,fulfillment_status,pod_order_id').eq('razorpay_order_id', razorpay_order_id).maybeSingle();
      if (retry) return NextResponse.json({ success: true, duplicate: true, order: retry });
      throw orderError;
    }
    const { error: itemsError } = await supabase.from('order_items').insert(orderItems.map(i => ({ ...i, order_id: order.id })));
    if (itemsError) throw itemsError;

    // Fulfillment is intentionally best-effort here. The scheduled worker retries safely if Qikink is unavailable.
    try {
      const fulfillmentUrl = new URL('/api/fulfillment/submit', request.url);
      const response = await fetch(fulfillmentUrl, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ orderId: order.id }) });
      if (response.ok) {
        const result = await response.json();
        return NextResponse.json({ success: true, order, total, fulfillment: result });
      }
    } catch (fulfillmentError) {
      console.warn('Immediate Qikink fulfillment deferred:', fulfillmentError);
    }
    return NextResponse.json({ success: true, order, total, fulfillment: { status: 'PENDING_RETRY' } });
  } catch (error: any) {
    console.error('Checkout finalization error:', error);
    return NextResponse.json({ success: false, error: error?.message || 'Unable to finalize order' }, { status: 500 });
  }
}
