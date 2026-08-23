import { FulfillmentProvider, ProviderProduct, ProviderVariant, ProviderOrderPayload, ProviderOrderResult, TrackingData } from '../types';
import { qikinkFetch } from './client';

export class QikinkProvider implements FulfillmentProvider {
  name = 'Qikink Official Print on Demand';
  code = 'QIKINK';

  async getProducts(): Promise<ProviderProduct[]> {
    const response = await qikinkFetch('/products');
    const rawList = Array.isArray(response) ? response : response?.data || response?.products || [];
    if (!rawList.length) throw new Error('Qikink returned an empty catalog');
    return rawList.map((item: any) => this.mapRawProduct(item));
  }

  async getProduct(providerProductId: string): Promise<ProviderProduct | null> {
    try {
      const item = await qikinkFetch(`/products/${encodeURIComponent(providerProductId)}`);
      return item ? this.mapRawProduct(item) : null;
    } catch {
      return null;
    }
  }

  async getVariants(providerProductId: string): Promise<ProviderVariant[]> {
    const prod = await this.getProduct(providerProductId);
    return prod?.variants || [];
  }

  async createOrder(payload: ProviderOrderPayload): Promise<ProviderOrderResult> {
    try {
      const result = await qikinkFetch('/orders', {
        method: 'POST',
        body: JSON.stringify({
          order_number: payload.order_number,
          gateway: 'Razorpay',
          name: payload.customer_name,
          email: payload.customer_email,
          phone: payload.customer_phone,
          address1: payload.shipping_address.address_line1,
          address2: payload.shipping_address.address_line2 || '',
          city: payload.shipping_address.city,
          state: payload.shipping_address.state,
          zip: payload.shipping_address.pincode,
          country: payload.shipping_address.country || 'India',
          line_items: payload.items.map(item => ({ sku: item.sku, quantity: item.quantity, custom_text: item.custom_text, design_url: item.graphic_url })),
        }),
      });
      return { success: true, provider_order_id: String(result.order_id || result.id), status: 'FULFILLMENT_SUBMITTED', message: 'Order routed to Qikink', raw: result };
    } catch (err: any) {
      console.error('Qikink order creation error:', err?.message || err);
      return { success: false, status: 'FULFILLMENT_FAILED', message: err?.message || 'Qikink order creation failed' };
    }
  }

  async getTracking(providerOrderId: string): Promise<TrackingData> {
    const data = await qikinkFetch(`/orders/${encodeURIComponent(providerOrderId)}/track`);
    return {
      provider_order_id: providerOrderId,
      status: data.status || 'PROCESSING',
      courier_name: data.courier_name,
      tracking_number: data.tracking_number,
      tracking_url: data.tracking_url,
    };
  }

  private mapRawProduct(item: any): ProviderProduct {
    return {
      id: String(item.id || item.product_id),
      title: item.name || item.title || 'Untitled Qikink Product',
      description: item.description || '',
      category: item.category || 'Uncategorized',
      image_url: item.image || item.image_url || '',
      images: Array.isArray(item.images) ? item.images : [item.image || item.image_url].filter(Boolean),
      base_price: Number(item.price || item.cost || 0),
      variants: (item.variants || []).map((v: any) => ({
        id: String(v.id || `${item.id}-${v.size || 'ALL'}-${v.color || 'ALL'}`),
        sku: String(v.sku || ''),
        size: v.size || 'ALL',
        color: v.color || 'Default',
        cost: Number(v.price || v.cost || item.price || 0),
        availability: v.in_stock === false ? 'OUT_OF_STOCK' : 'IN_STOCK',
      })),
      raw: item,
    };
  }
}
