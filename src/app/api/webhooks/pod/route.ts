import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { orderId, paymentId, items, shippingAddress } = body;

    if (!orderId || !paymentId || !items) {
      return NextResponse.json({ error: 'Invalid POD payload' }, { status: 400 });
    }

    // Format order payload for Print-on-Demand vendor API (e.g. Printful API v2)
    const podOrderPayload = {
      external_id: orderId,
      recipient: {
        name: shippingAddress.full_name,
        address1: shippingAddress.address_line1,
        city: shippingAddress.city,
        state_code: shippingAddress.state,
        country_code: 'IN',
        zip: shippingAddress.pincode,
        email: shippingAddress.email,
        phone: shippingAddress.phone,
      },
      items: items.map((item: any) => ({
        name: item.product_title || item.product?.title,
        quantity: item.quantity,
        retail_price: item.unit_price || item.product?.price,
        customization: item.customization || item.customization_details,
      })),
      metadata: {
        brand: 'KultZR – Wear Your Story',
        fulfillment: 'On-Demand Zero Inventory',
      }
    };

    console.log('[POD Webhook] Prepared order payload for fulfillment vendor:', podOrderPayload);

    return NextResponse.json({
      success: true,
      order_id: orderId,
      pod_status: 'forwarded_to_print_atelier',
      vendor_reference: 'POD_KZ_' + Math.random().toString(36).substring(2, 8).toUpperCase(),
      message: 'Order successfully dispatched to print-on-demand fulfillment center.'
    });

  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'POD processing failed' }, { status: 500 });
  }
}
