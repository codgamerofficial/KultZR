import { DealScoreBreakdown, CategoryType, Product } from './types';

export interface CategoryWeights {
  priceAdvantage: number;
  productFit: number;
  reviewQuality: number;
  sellerTrust: number;
  priceHistoryScore: number;
  specificationValue: number;
  warrantyValue: number;
  availabilityScore: number;
}

export const DEFAULT_CATEGORY_WEIGHTS: Record<CategoryType | 'default', CategoryWeights> = {
  default: {
    priceAdvantage: 0.25,
    productFit: 0.20,
    reviewQuality: 0.15,
    sellerTrust: 0.10,
    priceHistoryScore: 0.10,
    specificationValue: 0.10,
    warrantyValue: 0.05,
    availabilityScore: 0.05,
  },
  smartphones: {
    priceAdvantage: 0.25,
    productFit: 0.20,
    reviewQuality: 0.15,
    sellerTrust: 0.10,
    priceHistoryScore: 0.10,
    specificationValue: 0.10,
    warrantyValue: 0.05,
    availabilityScore: 0.05,
  },
  laptops: {
    priceAdvantage: 0.20,
    productFit: 0.20,
    specificationValue: 0.20, // Specs matter more for laptops
    reviewQuality: 0.15,
    sellerTrust: 0.10,
    priceHistoryScore: 0.05,
    warrantyValue: 0.05,
    availabilityScore: 0.05,
  },
  earbuds: {
    priceAdvantage: 0.30,
    reviewQuality: 0.20,
    productFit: 0.20,
    specificationValue: 0.10,
    sellerTrust: 0.08,
    priceHistoryScore: 0.05,
    warrantyValue: 0.04,
    availabilityScore: 0.03,
  },
  shoes: {
    priceAdvantage: 0.35,
    reviewQuality: 0.25,
    productFit: 0.20,
    sellerTrust: 0.10,
    priceHistoryScore: 0.05,
    specificationValue: 0.02,
    warrantyValue: 0.01,
    availabilityScore: 0.02,
  },
  tvs: {
    priceAdvantage: 0.25,
    specificationValue: 0.20,
    reviewQuality: 0.15,
    sellerTrust: 0.15,
    priceHistoryScore: 0.10,
    warrantyValue: 0.10, // Panel warranty matters
    productFit: 0.03,
    availabilityScore: 0.02,
  },
  appliances: {
    sellerTrust: 0.25, // Brand/service network matters most
    warrantyValue: 0.20,
    priceAdvantage: 0.20,
    reviewQuality: 0.15,
    specificationValue: 0.10,
    priceHistoryScore: 0.05,
    productFit: 0.03,
    availabilityScore: 0.02,
  },
};

export function calculateDealScore(
  product: Partial<Product>,
  customWeights?: CategoryWeights
): DealScoreBreakdown {
  const category = product.category || 'default';
  const weights = customWeights || DEFAULT_CATEGORY_WEIGHTS[category] || DEFAULT_CATEGORY_WEIGHTS.default;

  // Extract base score metrics or assign sensibleDefaults
  const priceAdv = product.dealScore?.priceAdvantage ?? 90;
  const prodFit = product.dealScore?.productFit ?? 90;
  const revQual = product.dealScore?.reviewQuality ?? 88;
  const selTrust = product.dealScore?.sellerTrust ?? 92;
  const priceHist = product.dealScore?.priceHistoryScore ?? 85;
  const specVal = product.dealScore?.specificationValue ?? 90;
  const warrVal = product.dealScore?.warrantyValue ?? 88;
  const availScore = product.dealScore?.availabilityScore ?? 95;

  const weightedTotal = Math.round(
    priceAdv * weights.priceAdvantage +
    prodFit * weights.productFit +
    revQual * weights.reviewQuality +
    selTrust * weights.sellerTrust +
    priceHist * weights.priceHistoryScore +
    specVal * weights.specificationValue +
    warrVal * weights.warrantyValue +
    availScore * weights.availabilityScore
  );

  return {
    overallScore: Math.min(100, Math.max(0, weightedTotal)),
    priceAdvantage: priceAdv,
    productFit: prodFit,
    reviewQuality: revQual,
    sellerTrust: selTrust,
    priceHistoryScore: priceHist,
    specificationValue: specVal,
    warrantyValue: warrVal,
    availabilityScore: availScore,
  };
}

export function getVerdictFromScore(score: number, priceVsAvgPercent: number): {
  verdict: 'BUY' | 'WAIT' | 'AVOID';
  badgeColor: string;
} {
  if (score >= 88 && priceVsAvgPercent <= 0) {
    return { verdict: 'BUY', badgeColor: 'bg-emerald-600 text-white' };
  } else if (score >= 70 || priceVsAvgPercent > 5) {
    return { verdict: 'WAIT', badgeColor: 'bg-amber-500 text-white' };
  } else {
    return { verdict: 'AVOID', badgeColor: 'bg-rose-600 text-white' };
  }
}
