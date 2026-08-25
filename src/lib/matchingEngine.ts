import { Product } from './types';

export interface ProductMatchCandidate {
  product: Product;
  matchScore: number; // 0.0 to 1.0
  decision: 'AUTO_MERGE' | 'ADMIN_REVIEW' | 'NO_MATCH';
  matchReason: string;
}

export function matchCanonicalProduct(
  incomingTitle: string,
  incomingBrand: string,
  incomingModel: string,
  incomingSpecs: Record<string, string>,
  existingProducts: Product[],
  gtin?: string,
  mpn?: string
): ProductMatchCandidate {
  let bestMatch: Product | null = null;
  let highestScore = 0;
  let matchReason = 'No match found';

  const cleanTitle = incomingTitle.toLowerCase();
  const cleanBrand = incomingBrand.toLowerCase();
  const cleanModel = incomingModel.toLowerCase();

  for (const product of existingProducts) {
    let score = 0;
    const reasons: string[] = [];

    // 1. GTIN / EAN Exact Match
    if (gtin && gtin === product.specifications['GTIN']) {
      score += 1.0;
      reasons.push('Exact GTIN match (+1.0)');
    }

    // 2. MPN Exact Match
    if (mpn && mpn === product.specifications['MPN']) {
      score += 0.95;
      reasons.push('Exact MPN match (+0.95)');
    }

    // 3. Brand & Model Exact Match
    if (product.brand.toLowerCase() === cleanBrand) {
      score += 0.15;
      if (product.model.toLowerCase() === cleanModel || cleanTitle.includes(product.model.toLowerCase())) {
        score += 0.75;
        reasons.push('Exact Brand & Model match (+0.90)');
      }
    }

    // 4. Specs Similarity (RAM / Storage Check)
    if (incomingSpecs['RAM & Storage'] && product.specifications['RAM & Storage']) {
      if (incomingSpecs['RAM & Storage'] === product.specifications['RAM & Storage']) {
        score += 0.10;
      } else {
        score -= 0.35; // Storage/RAM mismatch penalty
        reasons.push('RAM/Storage mismatch penalty (-0.35)');
      }
    }

    if (score > highestScore) {
      highestScore = Math.min(1.0, Math.max(0, score));
      bestMatch = product;
      matchReason = reasons.join(', ');
    }
  }

  let decision: ProductMatchCandidate['decision'] = 'NO_MATCH';
  if (highestScore >= 0.92) {
    decision = 'AUTO_MERGE';
  } else if (highestScore >= 0.75) {
    decision = 'ADMIN_REVIEW';
  }

  return {
    product: bestMatch || existingProducts[0],
    matchScore: highestScore,
    decision,
    matchReason,
  };
}
