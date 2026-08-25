export interface Money {
  amount: number;
  currency: string;
}

export function createMoney(amount: number, currency = 'INR'): Money {
  return { amount: Math.round(amount), currency };
}

export function formatMoney(money: Money): string {
  if (money.currency === 'INR') {
    return `₹${money.amount.toLocaleString('en-IN')}`;
  }
  return `${money.currency} ${money.amount.toLocaleString()}`;
}

export function addMoney(a: Money, b: Money): Money {
  if (a.currency !== b.currency) throw new Error('Currency mismatch');
  return { amount: a.amount + b.amount, currency: a.currency };
}

export function subtractMoney(a: Money, b: Money): Money {
  if (a.currency !== b.currency) throw new Error('Currency mismatch');
  return { amount: Math.max(0, a.amount - b.amount), currency: a.currency };
}
