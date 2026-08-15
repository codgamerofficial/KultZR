import { NextResponse } from 'next/server';
import { getPODAdapter } from '@/lib/podAdapter';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log('[POD Webhook] Payment Received Event:', body);

    const { orderId, amount, customerAddress, items, isCod } = body;

    if (!orderId || !customerAddress) {
      return NextResponse.json({ error: 'Missing required order metadata' }, { status: 400 });
    }

    // Select POD Adapter (Defaults to Qikink for India)
    const podAdapter = getPODAdapter(customerAddress.country || 'IN');

    // Dispatch order to Qikink / Printful POD Engine
    const fulfillmentResult = await podAdapter.createOrder({
      orderId,
      customerAddress,
      items: items || [],
      isCod: isCod || false,
    });

    return NextResponse.json({
      message: 'Fulfillment successfully triggered',
      provider: fulfillmentResult.provider,
      pod_order_id: fulfillmentResult.podOrderId,
      status: fulfillmentResult.status,
      estimated_dispatch_days: fulfillmentResult.estimatedDispatchDays,
    });
  } catch (err) {
    console.error('[POD Webhook] Handler Error:', err);
    return NextResponse.json({ error: 'Internal server error processing fulfillment' }, { status: 500 });
  }
}
