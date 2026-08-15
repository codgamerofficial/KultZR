// KultZR Fulfillment Provider Domain Interfaces

export interface ProviderVariant {
  id: string; // provider variant ID
  sku: string;
  size: string;
  color: string;
  cost: number;
  availability: 'IN_STOCK' | 'LOW_STOCK' | 'OUT_OF_STOCK';
  raw?: any;
}

export interface ProviderProduct {
  id: string; // provider product ID
  title: string;
  description?: string;
  category?: string;
  image_url?: string;
  images?: string[];
  base_price: number;
  selling_price_range?: { min: number; max: number };
  variants: ProviderVariant[];
  raw?: any;
}

export interface ProviderOrderItem {
  sku: string;
  size: string;
  color: string;
  quantity: number;
  custom_text?: string;
  graphic_url?: string;
}

export interface ProviderOrderPayload {
  order_number: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  shipping_address: {
    address_line1: string;
    address_line2?: string;
    city: string;
    state: string;
    pincode: string;
    country?: string;
  };
  items: ProviderOrderItem[];
}

export interface ProviderOrderResult {
  success: boolean;
  provider_order_id?: string;
  status: string;
  message?: string;
  tracking_number?: string;
  courier_name?: string;
  raw?: any;
}

export interface TrackingData {
  provider_order_id: string;
  status: string;
  courier_name?: string;
  tracking_number?: string;
  tracking_url?: string;
  history?: Array<{ timestamp: string; status: string; location?: string; description?: string }>;
}

export interface FulfillmentProvider {
  name: string;
  code: string;
  getProducts(): Promise<ProviderProduct[]>;
  getProduct(providerProductId: string): Promise<ProviderProduct | null>;
  getVariants(providerProductId: string): Promise<ProviderVariant[]>;
  createOrder(payload: ProviderOrderPayload): Promise<ProviderOrderResult>;
  getTracking(providerOrderId: string): Promise<TrackingData>;
  cancelOrder?(providerOrderId: string): Promise<boolean>;
}
