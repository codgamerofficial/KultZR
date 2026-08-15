export interface ColorOption {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  category_slug: 'men' | 'women' | 'unisex' | 'accessories';
  gender: 'men' | 'women' | 'unisex' | 'accessories';
  price: number;
  original_price?: number;
  description: string;
  story: string;
  fabric_details: string;
  images: string[];
  colors: ColorOption[];
  sizes: string[];
  is_customizable: boolean;
  is_featured: boolean;
  rating: number;
  review_count: number;
}

export interface CustomizationSpec {
  id?: string;
  custom_text: string;
  font_family: string;
  text_color: string;
  garment_color: string;
  placement: 'front_center' | 'back_center' | 'chest_pocket';
  graphic_url?: string;
  preview_url?: string;
}

export interface CartItem {
  cart_item_id: string;
  product: Product;
  quantity: number;
  size: string;
  color: ColorOption;
  customization?: CustomizationSpec;
}

export interface OrderShippingAddress {
  full_name: string;
  email: string;
  phone: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

export interface OrderItem {
  id: string;
  product_title: string;
  product_image: string;
  quantity: number;
  size: string;
  color: string;
  unit_price: number;
  customization?: CustomizationSpec;
}

export interface Order {
  id: string;
  order_number: string;
  customer_name: string;
  customer_email: string;
  total_amount: number;
  payment_status: 'pending' | 'paid' | 'failed';
  order_status: 'processing' | 'printed' | 'shipped' | 'delivered';
  shipping_address: OrderShippingAddress;
  created_at: string;
  items: OrderItem[];
}

export interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}
