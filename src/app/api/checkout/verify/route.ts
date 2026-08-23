import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await request.json();

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ verified: false, error: 'Missing Razorpay verification fields' }, { status: 400 });
    }

    const secret = process.env.RAZORPAY_KEY_SECRET;
    if (!secret) {
      return NextResponse.json({ verified: false, error: 'Razorpay is not configured on the server' }, { status: 503 });
    }

    const expected = crypto
      .createHmac('sha256', secret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    const verified = crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(razorpay_signature));
    if (!verified) return NextResponse.json({ verified: false, error: 'Invalid payment signature' }, { status: 400 });

    return NextResponse.json({ verified: true });
  } catch (error: any) {
    console.error('Razorpay verification error:', error);
    return NextResponse.json({ verified: false, error: error?.message || 'Verification failed' }, { status: 500 });
  }
}
