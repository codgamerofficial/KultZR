import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { amount, currency = 'INR', items, customerAddress } = body;

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: 'Invalid order amount' }, { status: 400 });
    }

    // In a live environment, call Razorpay Orders API:
    // const razorpayOrder = await razorpay.orders.create({ amount: amount * 100, currency });

    const generatedOrderId = 'order_kz_' + Math.random().toString(36).substring(2, 10).toUpperCase();

    return NextResponse.json({
      success: true,
      order_id: generatedOrderId,
      amount: amount,
      currency: currency,
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_KultZRBrandKey123',
      message: 'Razorpay order session created successfully.'
    });

  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Failed to create checkout session' }, { status: 500 });
  }
}
