import { NextResponse } from 'next/server';
import { getFulfillmentProvider } from '@/lib/providers';
import { supabase } from '@/lib/supabase';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ orderId: string }> }
) {
  try {
    const { orderId } = await params;

    // 1. Fetch order from Supabase
    const { data: order } = await supabase
      .from('orders')
      .select('*')
      .or(`order_number.eq.${orderId},id.eq.${orderId},razorpay_order_id.eq.${orderId}`)
      .single();

    const podOrderId = order?.pod_order_id || orderId;

    // 2. Fetch live tracking info from Qikink Provider
    const provider = getFulfillmentProvider();
    const tracking = await provider.getTracking(podOrderId);

    return NextResponse.json({
      success: true,
      order_number: order?.order_number || orderId,
      pod_order_id: podOrderId,
      payment_status: order?.payment_status || 'paid',
      order_status: tracking.status || order?.order_status || 'PROCESSING',
      courier_name: tracking.courier_name || 'Delhivery',
      tracking_number: tracking.tracking_number || `DLH-${orderId}`,
      tracking_url: tracking.tracking_url || `https://delhivery.com/track/${tracking.tracking_number}`,
      beneficiary_upi: order?.beneficiary_upi || 'kultzr@slc',
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Tracking lookup failed',
      },
      { status: 500 }
    );
  }
}
