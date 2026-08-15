import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { amount, currency = 'INR', customerAddress } = body;

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: 'Invalid order amount' }, { status: 400 });
    }

    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_TQ7Cdpi6W4Balz';
    const keySecret = process.env.RAZORPAY_KEY_SECRET || '4w6VDRwpcsW7NKo4001pabPw';

    try {
      const razorpay = new Razorpay({
        key_id: keyId,
        key_secret: keySecret,
      });

      const receipt = 'kz_' + Math.random().toString(36).substring(2, 10).toUpperCase();

      const options = {
        amount: Math.round(amount * 100),
        currency: currency,
        receipt: receipt,
        notes: {
          merchant: 'KultZR – Wear Your Story',
          customer_name: customerAddress?.full_name || 'Valued Customer',
          customer_email: customerAddress?.email || '',
        }
      };

      const razorpayOrder = await razorpay.orders.create(options);

      return NextResponse.json({
        success: true,
        is_real: true,
        order_id: razorpayOrder.id,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        key: keyId,
        message: 'Razorpay order created successfully'
      });
    } catch (apiErr: any) {
      console.warn('Razorpay Order API Notice (falling back to Direct Checkout mode):', apiErr?.message || apiErr);
      return NextResponse.json({ 
        success: true,
        is_real: false,
        amount: Math.round(amount * 100),
        currency: currency,
        key: keyId,
      });
    }

  } catch (error: any) {
    console.error('Razorpay Checkout Route Error:', error);
    return NextResponse.json({ error: error?.message || 'Failed to initialize checkout' }, { status: 500 });
  }
}
