import { Product } from '../types';

export type IndexationDecision = 'INDEX' | 'NOINDEX' | 'CANONICAL_TO_PARENT' | 'NOT_READY';

export interface SeoEligibilityReport {
  decision: IndexationDecision;
  qualityScore: number; // 0 to 100
  reasons: string[];
}

export class SeoEligibilityService {
  evaluateProductPage(product: Product): SeoEligibilityReport {
    const reasons: string[] = [];
    let score = 100;

    // 1. Check price observation freshness
    if (!product.currentBestTruePrice || product.currentBestTruePrice <= 0) {
      score -= 40;
      reasons.push('Missing current price observation.');
    }

    // 2. Check offer count
    if (!product.offers || product.offers.length === 0) {
      score -= 30;
      reasons.push('No verified merchant offers available.');
    }

    // 3. Check review evidence
    if (!product.reviewIntelligence || product.reviewIntelligence.totalAnalyzed < 5) {
      score -= 20;
      reasons.push('Insufficient review signal evidence.');
    }

    // 4. Decision determination
    let decision: IndexationDecision = 'INDEX';
    if (score < 50) {
      decision = 'NOINDEX';
    } else if (score < 70) {
      decision = 'CANONICAL_TO_PARENT';
    }

    return {
      decision,
      qualityScore: Math.max(0, score),
      reasons,
    };
  }
}

export const defaultSeoEligibilityService = new SeoEligibilityService();
