import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { amount, currency = 'INR', customerAddress } = body;

    if (!Number.isFinite(Number(amount)) || Number(amount) <= 0) {
      return NextResponse.json({ error: 'Invalid order amount' }, { status: 400 });
    }

    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      return NextResponse.json({ error: 'Razorpay is not configured on the server' }, { status: 503 });
    }

    const razorpay = new Razorpay({ key_id: keyId, key_secret: keySecret });
    const receipt = `kz_${Date.now().toString(36).toUpperCase()}`;

    const razorpayOrder = await razorpay.orders.create({
      amount: Math.round(Number(amount) * 100),
      currency,
      receipt,
      notes: {
        merchant: 'KultZR',
        customer_name: customerAddress?.full_name || 'Customer',
        customer_email: customerAddress?.email || '',
      },
    });

    return NextResponse.json({
      success: true,
      is_real: true,
      order_id: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      key: keyId,
    });
  } catch (error: any) {
    console.error('Razorpay Checkout Route Error:', error);
    return NextResponse.json({ error: error?.message || 'Failed to initialize checkout' }, { status: 500 });
  }
}
