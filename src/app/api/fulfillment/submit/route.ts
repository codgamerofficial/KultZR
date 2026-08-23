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
    const { orderId } = await request.json();
    if (!orderId) return NextResponse.json({ success: false, error: 'orderId is required' }, { status: 400 });
    const supabase = db();

    const { data: order, error: orderError } = await supabase.from('orders').select('*').eq('id', orderId).single();
    if (orderError || !order) return NextResponse.json({ success: false, error: 'Order not found' }, { status: 404 });
    if (order.payment_status !== 'paid') return NextResponse.json({ success: false, error: 'Only paid orders can be fulfilled' }, { status: 409 });
    if (order.pod_order_id || order.fulfillment_status === 'SUBMITTED') return NextResponse.json({ success: true, already_submitted: true, provider_order_id: order.pod_order_id });

    const { data: items, error: itemsError } = await supabase.from('order_items').select('*').eq('order_id', orderId);
    if (itemsError || !items?.length) return NextResponse.json({ success: false, error: 'Order has no fulfillment items' }, { status: 409 });

    const provider = new QikinkProvider();
    const providerItems: any[] = [];
    for (const item of items) {
      const { data: mappings } = await supabase.from('product_provider_mappings').select('provider_product_id').eq('product_id', item.product_id).eq('provider_code', 'QIKINK').limit(1);
      const providerProductId = mappings?.[0]?.provider_product_id;
      if (!providerProductId) return NextResponse.json({ success: false, error: `No Qikink mapping for ${item.product_title}` }, { status: 409 });
      const variants = await provider.getVariants(providerProductId);
      const variant = variants.find(v => v.sku && v.size.toLowerCase() === String(item.size).toLowerCase() && v.color.toLowerCase() === String(item.color).toLowerCase());
      if (!variant || variant.availability === 'OUT_OF_STOCK') return NextResponse.json({ success: false, error: `Qikink variant unavailable for ${item.product_title} (${item.size}/${item.color})` }, { status: 409 });
      await supabase.from('order_items').update({ provider_sku: variant.sku, provider_product_id: providerProductId, provider_variant_id: variant.id, provider_cost: variant.cost }).eq('id', item.id);
      providerItems.push({ sku: variant.sku, size: variant.size, color: variant.color, quantity: item.quantity, custom_text: item.customization_details?.custom_text, graphic_url: item.customization_details?.graphic_url });
    }

    await supabase.from('orders').update({ fulfillment_status: 'SUBMITTING', fulfillment_attempts: Number(order.fulfillment_attempts || 0) + 1, fulfillment_error: null }).eq('id', orderId);
    const result = await provider.createOrder({ order_number: order.order_number, customer_name: order.customer_name, customer_email: order.customer_email, customer_phone: order.shipping_address?.phone || '', shipping_address: order.shipping_address, items: providerItems });
    if (!result.success || !result.provider_order_id) {
      await supabase.from('orders').update({ fulfillment_status: 'FAILED', fulfillment_error: result.message || 'Qikink rejected fulfillment' }).eq('id', orderId);
      return NextResponse.json({ success: false, error: result.message || 'Qikink fulfillment failed' }, { status: 502 });
    }

    await supabase.from('orders').update({ pod_order_id: result.provider_order_id, fulfillment_status: 'SUBMITTED', fulfillment_error: null, order_status: 'processing' }).eq('id', orderId);
    return NextResponse.json({ success: true, provider_order_id: result.provider_order_id, status: 'SUBMITTED' });
  } catch (error: any) {
    console.error('Fulfillment submit error:', error);
    return NextResponse.json({ success: false, error: error?.message || 'Fulfillment submission failed' }, { status: 500 });
  }
}
