import { Money, createMoney, formatMoney } from './moneyModel';

export type PriceComponentType =
  | 'BASE_PRICE'
  | 'SHIPPING'
  | 'MANDATORY_FEE'
  | 'COUPON'
  | 'BANK_OFFER'
  | 'CASHBACK'
  | 'MEMBERSHIP';

export type ComponentStatus = 'CONFIRMED' | 'ESTIMATED' | 'CONDITIONAL';

export interface PriceComponent {
  type: PriceComponentType;
  amount: Money;
  status: ComponentStatus;
  explanation: string;
}

export interface TruePriceInput {
  basePrice: number;
  shippingFee: number;
  couponDiscount: number;
  bankDiscount?: number;
  cashback?: number;
  currency?: string;
}

export interface TruePriceResult {
  basePrice: Money;
  shipping: Money;
  confirmedDiscount: Money;
  estimatedPayable: Money;
  conditionalSavings: Money;
  confidence: number;
  components: PriceComponent[];
}

export class PriceEngine {
  calculateTruePrice(input: TruePriceInput): TruePriceResult {
    const curr = input.currency || 'INR';

    const base = createMoney(input.basePrice, curr);
    const shipping = createMoney(input.shippingFee, curr);
    const confirmedDiscount = createMoney(input.couponDiscount, curr);
    
    // Confirmed payable = base + shipping - confirmed coupons
    const payableAmount = Math.max(0, input.basePrice + input.shippingFee - input.couponDiscount);
    const estimatedPayable = createMoney(payableAmount, curr);

    // Conditional savings = bank offers + cashbacks
    const conditionalAmount = (input.bankDiscount || 0) + (input.cashback || 0);
    const conditionalSavings = createMoney(conditionalAmount, curr);

    const components: PriceComponent[] = [
      {
        type: 'BASE_PRICE',
        amount: base,
        status: 'CONFIRMED',
        explanation: `Base listed merchant price: ${formatMoney(base)}`,
      },
      {
        type: 'SHIPPING',
        amount: shipping,
        status: 'CONFIRMED',
        explanation: input.shippingFee === 0 ? 'Free merchant shipping' : `Delivery fee: ${formatMoney(shipping)}`,
      },
    ];

    if (input.couponDiscount > 0) {
      components.push({
        type: 'COUPON',
        amount: confirmedDiscount,
        status: 'CONFIRMED',
        explanation: `Confirmed store coupon code applied (-${formatMoney(confirmedDiscount)})`,
      });
    }

    if (input.bankDiscount && input.bankDiscount > 0) {
      components.push({
        type: 'BANK_OFFER',
        amount: createMoney(input.bankDiscount, curr),
        status: 'CONDITIONAL',
        explanation: `Conditional credit/debit card offer (-${formatMoney(createMoney(input.bankDiscount, curr))}) - Requires eligible bank card`,
      });
    }

    if (input.cashback && input.cashback > 0) {
      components.push({
        type: 'CASHBACK',
        amount: createMoney(input.cashback, curr),
        status: 'CONDITIONAL',
        explanation: `Conditional post-purchase wallet cashback (${formatMoney(createMoney(input.cashback, curr))})`,
      });
    }

    return {
      basePrice: base,
      shipping,
      confirmedDiscount,
      estimatedPayable,
      conditionalSavings,
      confidence: 0.95,
      components,
    };
  }
}

export const defaultPriceEngine = new PriceEngine();
