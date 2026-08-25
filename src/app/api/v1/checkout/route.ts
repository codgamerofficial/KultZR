import { NextResponse } from 'next/server';
import { defaultRazorpayGateway } from '@/lib/monetization/razorpayGateway';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const planType = body.planType || 'PRO_MONTHLY';

    const order = await defaultRazorpayGateway.createSubscriptionOrder(planType);

    return NextResponse.json({
      success: true,
      order,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create Razorpay checkout session' },
      { status: 500 }
    );
  }
}
