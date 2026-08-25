export interface FakeDiscountResult {
  isFakeDiscount: boolean;
  claimedDiscountPercentage: number;
  realDiscountPercentage: number;
  warningMessage?: string;
}

export interface PriceAnomalyResult {
  isAnomaly: boolean;
  anomalyType?: 'IMPOSSIBLE_DROP' | 'SUSPICIOUS_SELLER' | 'DECIMAL_MISMATCH';
  message?: string;
}

export class PriceAnomalyEngine {
  detectFakeDiscount(
    mrplessClaimed: number,
    currentPrice: number,
    historicalAverage30d: number,
    historicalLow365d: number
  ): FakeDiscountResult {
    const claimedDiscountPct = Math.round(((mrplessClaimed - currentPrice) / mrplessClaimed) * 100);

    // If current price is within 5% of historical average despite a 25%+ claimed MRP strike-through, flag fake discount
    const isWithinNormalRange = currentPrice >= historicalAverage30d * 0.95;

    if (claimedDiscountPct >= 25 && isWithinNormalRange) {
      return {
        isFakeDiscount: true,
        claimedDiscountPercentage: claimedDiscountPct,
        realDiscountPercentage: Math.max(0, Math.round(((historicalAverage30d - currentPrice) / historicalAverage30d) * 100)),
        warningMessage: `⚠️ Not a genuine ${claimedDiscountPct}% discount. Current price (₹${currentPrice.toLocaleString('en-IN')}) is within its normal 30-day selling range (avg ₹${historicalAverage30d.toLocaleString('en-IN')}).`,
      };
    }

    return {
      isFakeDiscount: false,
      claimedDiscountPercentage: claimedDiscountPct,
      realDiscountPercentage: Math.max(0, Math.round(((historicalAverage30d - currentPrice) / historicalAverage30d) * 100)),
    };
  }

  detectPriceAnomaly(
    currentPrice: number,
    historicalAverage30d: number
  ): PriceAnomalyResult {
    // If price drops by over 80% suddenly, flag as anomaly (e.g. ₹39,999 -> ₹399 typo)
    if (currentPrice < historicalAverage30d * 0.20 && historicalAverage30d > 5000) {
      return {
        isAnomaly: true,
        anomalyType: 'IMPOSSIBLE_DROP',
        message: '⚠️ Price anomaly detected. Listed price is over 80% below historical average. Verifying merchant listing.',
      };
    }

    return { isAnomaly: false };
  }
}

export const defaultPriceAnomalyEngine = new PriceAnomalyEngine();
