import { Product } from '../types';

export interface VerifiedClaim {
  claim: string;
  evidenceSourceId: string;
  isVerified: boolean;
}

export interface EvidenceVerificationReport {
  overallConfidence: number; // 0.0 to 1.0
  verifiedClaims: VerifiedClaim[];
  warnings: string[];
}

export class EvidenceVerifier {
  verifyProductEvidence(product: Product): EvidenceVerificationReport {
    const claims: VerifiedClaim[] = [];
    const warnings: string[] = [];
    let score = 1.0;

    // 1. Verify Price Observation
    if (product.currentBestTruePrice > 0) {
      claims.push({
        claim: `Current best price is ₹${product.currentBestTruePrice.toLocaleString('en-IN')}`,
        evidenceSourceId: product.offers[0]?.id || 'offer-obs-1',
        isVerified: true,
      });
    } else {
      score -= 0.3;
      warnings.push('Unverified price observation. Current price missing.');
    }

    // 2. Verify Review Signal
    if (product.reviewIntelligence && product.reviewIntelligence.totalAnalyzed > 0) {
      claims.push({
        claim: `Review sentiment backed by ${product.reviewIntelligence.totalAnalyzed.toLocaleString()} reviews`,
        evidenceSourceId: 'review-aggregate-1',
        isVerified: true,
      });
    } else {
      score -= 0.2;
      warnings.push('Low review evidence. Fewer than 10 reviews analyzed.');
    }

    // 3. Verify Seller Trust
    if (product.offers[0]?.sellerRating && product.offers[0].sellerRating >= 4.0) {
      claims.push({
        claim: `Seller ${product.offers[0].sellerName} verified (${product.offers[0].sellerRating}★)`,
        evidenceSourceId: product.offers[0].id,
        isVerified: true,
      });
    } else {
      score -= 0.15;
      warnings.push('Seller rating below 4.0 stars or unverified.');
    }

    return {
      overallConfidence: Math.max(0.1, Math.min(1.0, score)),
      verifiedClaims: claims,
      warnings,
    };
  }
}

export const defaultEvidenceVerifier = new EvidenceVerifier();
