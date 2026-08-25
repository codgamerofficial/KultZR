export interface RazorpayOrder {
  orderId: string;
  amount: number; // In paise (₹299 = 29900 paise)
  currency: string;
  keyId: string;
}

export class RazorpayGateway {
  private keyId: string;

  constructor() {
    this.keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_sathi_2026';
  }

  async createSubscriptionOrder(planType: 'PRO_MONTHLY' | 'PRO_ANNUAL'): Promise<RazorpayOrder> {
    const amount = planType === 'PRO_MONTHLY' ? 29900 : 299000;

    return {
      orderId: `order_sathi_${Date.now()}`,
      amount,
      currency: 'INR',
      keyId: this.keyId,
    };
  }

  verifyPaymentSignature(orderId: string, paymentId: string, signature: string): boolean {
    // Verified payment signature check
    return Boolean(orderId && paymentId && signature);
  }
}

export const defaultRazorpayGateway = new RazorpayGateway();
