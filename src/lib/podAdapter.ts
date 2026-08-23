import { OrderShippingAddress } from './types';

export interface PODOrderItem {
  productTitle: string;
  size: string;
  color: string;
  quantity: number;
  customizationUrl?: string;
  designText?: string;
  qikinkSku?: string;
}

export interface PODFulfillmentPayload {
  orderId: string;
  customerAddress: OrderShippingAddress;
  items: PODOrderItem[];
  isCod?: boolean;
}

export interface PODFulfillmentResponse {
  success: boolean;
  provider: 'QIKINK' | 'PRINTFUL' | 'PRINTIFY';
  podOrderId: string;
  status: string;
  estimatedDispatchDays: number;
  rawResponse?: any;
}

export interface PODAdapter {
  name: 'QIKINK' | 'PRINTFUL' | 'PRINTIFY';
  createOrder(payload: PODFulfillmentPayload): Promise<PODFulfillmentResponse>;
  trackOrder(podOrderId: string): Promise<{ status: string; trackingUrl?: string; courier?: string }>;
}

/** Production Qikink adapter. Never fabricates a successful fulfillment when credentials/API are unavailable. */
export class QikinkAdapter implements PODAdapter {
  name: 'QIKINK' = 'QIKINK';

  private clientId = process.env.QIKINK_CLIENT_ID || '';
  private clientSecret = process.env.QIKINK_CLIENT_SECRET || '';
  private baseUrl = process.env.QIKINK_API_BASE_URL || process.env.QIKINK_API_URL || 'https://api.qikink.com/v2';

  async createOrder(payload: PODFulfillmentPayload): Promise<PODFulfillmentResponse> {
    if (!this.clientId || !this.clientSecret) {
      return {
        success: false,
        provider: 'QIKINK',
        podOrderId: '',
        status: 'FULFILLMENT_NOT_CONFIGURED',
        estimatedDispatchDays: 0,
        rawResponse: { error: 'Qikink server credentials are not configured' },
      };
    }

    const qikinkPayload = {
      order_number: payload.orderId,
      shipping_address: {
        first_name: payload.customerAddress.full_name.split(' ')[0] || payload.customerAddress.full_name,
        last_name: payload.customerAddress.full_name.split(' ').slice(1).join(' ') || '.',
        address1: payload.customerAddress.address_line1,
        address2: payload.customerAddress.address_line2 || '',
        city: payload.customerAddress.city,
        state: payload.customerAddress.state,
        zip: payload.customerAddress.pincode,
        country: 'IN',
        phone: payload.customerAddress.phone,
        email: payload.customerAddress.email,
      },
      line_items: payload.items.map((item) => ({
        search_sku: item.qikinkSku,
        quantity: item.quantity,
        print_design_url: item.customizationUrl,
        print_text: item.designText || '',
        print_position: 'chest',
      })),
      is_cod: payload.isCod || false,
    };

    if (qikinkPayload.line_items.some((item) => !item.search_sku)) {
      return {
        success: false,
        provider: 'QIKINK',
        podOrderId: '',
        status: 'FULFILLMENT_SKU_MISSING',
        estimatedDispatchDays: 0,
        rawResponse: { error: 'Every paid order item must have a Qikink SKU' },
      };
    }

    try {
      const res = await fetch(`${this.baseUrl}/orders/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Qikink-Client-Id': this.clientId,
          'X-Qikink-Client-Secret': this.clientSecret,
        },
        body: JSON.stringify(qikinkPayload),
        cache: 'no-store',
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        return {
          success: false,
          provider: 'QIKINK',
          podOrderId: '',
          status: 'FULFILLMENT_FAILED',
          estimatedDispatchDays: 0,
          rawResponse: data,
        };
      }

      return {
        success: true,
        provider: 'QIKINK',
        podOrderId: String(data.order_id || data.id || ''),
        status: 'FULFILLMENT_SUBMITTED',
        estimatedDispatchDays: 3,
        rawResponse: data,
      };
    } catch (err: any) {
      console.error('[QikinkAdapter] Network error:', err);
      return {
        success: false,
        provider: 'QIKINK',
        podOrderId: '',
        status: 'FULFILLMENT_NETWORK_ERROR',
        estimatedDispatchDays: 0,
        rawResponse: { error: err?.message || 'Network error' },
      };
    }
  }

  async trackOrder(podOrderId: string) {
    return {
      status: 'PROCESSING',
      courier: undefined,
      trackingUrl: undefined,
    };
  }
}

export class PrintfulAdapter implements PODAdapter {
  name: 'PRINTFUL' = 'PRINTFUL';
  async createOrder(payload: PODFulfillmentPayload): Promise<PODFulfillmentResponse> {
    return { success: false, provider: 'PRINTFUL', podOrderId: '', status: 'NOT_CONFIGURED', estimatedDispatchDays: 0 };
  }
  async trackOrder() {
    return { status: 'NOT_CONFIGURED' };
  }
}

export function getPODAdapter(countryCode: string = 'IN'): PODAdapter {
  if (countryCode === 'IN') return new QikinkAdapter();
  return new PrintfulAdapter();
}
