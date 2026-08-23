import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { items, currency = 'INR', customerAddress } = body;

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }
    if (!customerAddress?.full_name || !customerAddress?.email || !customerAddress?.phone || !customerAddress?.address_line1 || !customerAddress?.city || !customerAddress?.state || !customerAddress?.pincode) {
      return NextResponse.json({ error: 'Complete shipping details are required' }, { status: 400 });
    }

    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!keyId || !keySecret) return NextResponse.json({ error: 'Razorpay is not configured on the server' }, { status: 503 });
    if (!supabaseUrl || !serviceRoleKey) return NextResponse.json({ error: 'Store database is not configured on the server' }, { status: 503 });

    const supabase = createClient(supabaseUrl, serviceRoleKey, { auth: { persistSession: false } });
    const ids = items.map((item: any) => String(item.productId || item.product?.id || '')).filter(Boolean);
    if (!ids.length) return NextResponse.json({ error: 'Invalid cart items' }, { status: 400 });

    const { data: products, error: productError } = await supabase.from('products').select('id,title,price,images,is_active').in('id', ids);
    if (productError) throw productError;

    const byId = new Map((products || []).map((p: any) => [String(p.id), p]));
    let total = 0;
    const validatedItems: any[] = [];

    for (const raw of items) {
      const productId = String(raw.productId || raw.product?.id || '');
      const product = byId.get(productId);
      const quantity = Number(raw.quantity);
      if (!product || product.is_active === false || !Number.isInteger(quantity) || quantity < 1 || quantity > 20) {
        return NextResponse.json({ error: 'One or more cart items are invalid or unavailable' }, { status: 400 });
      }
      const unitPrice = Number(product.price);
      if (!Number.isFinite(unitPrice) || unitPrice <= 0) return NextResponse.json({ error: `Invalid price for ${product.title}` }, { status: 500 });
      total += unitPrice * quantity;
      validatedItems.push({ product_id: product.id, product_title: product.title, quantity, unit_price: unitPrice, size: raw.size || null, color: raw.color?.name || raw.color || null, customization: raw.customization || null });
    }

    const amountPaise = Math.round(total * 100);
    if (amountPaise <= 0) return NextResponse.json({ error: 'Invalid order total' }, { status: 400 });

    const razorpay = new Razorpay({ key_id: keyId, key_secret: keySecret });
    const receipt = `kz_${Date.now().toString(36).toUpperCase()}`;
    const razorpayOrder = await razorpay.orders.create({ amount: amountPaise, currency, receipt, notes: { merchant: 'KultZR', customer_email: customerAddress.email } });

    return NextResponse.json({ success: true, is_real: true, order_id: razorpayOrder.id, amount: razorpayOrder.amount, currency: razorpayOrder.currency, key: keyId, validated_items: validatedItems });
  } catch (error: any) {
    console.error('Razorpay Checkout Route Error:', error);
    return NextResponse.json({ error: error?.message || 'Failed to initialize checkout' }, { status: 500 });
  }
}
