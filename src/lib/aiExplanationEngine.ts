import { Product } from './types';
import { TruePriceResult } from './priceEngine';
import { VerdictResult } from './verdictEngine';

export interface ExplanationOutput {
  headline: string;
  summary: string;
  reasons: string[];
  tradeoffs: string[];
  confidence: number;
}

export class AIExplanationEngine {
  generateExplanation(
    product: Product,
    priceResult: TruePriceResult,
    verdictResult: VerdictResult
  ): ExplanationOutput {
    // In production, passes structured evidence to Gemini / NVIDIA API with strict system prompt
    const payableStr = `₹${priceResult.estimatedPayable.amount.toLocaleString('en-IN')}`;

    let headline = `Sathi Verdict: BUY NOW at ${payableStr}`;
    if (verdictResult.verdict === 'WAIT') {
      headline = `Sathi Verdict: WAIT for Price Drop`;
    } else if (verdictResult.verdict === 'AVOID') {
      headline = `Sathi Verdict: AVOID - Seller/Quality Alert`;
    }

    const reasons = [
      `True payable price is ${payableStr} (MRP: ₹${product.mrp.toLocaleString('en-IN')}).`,
      `Verified Sathi Deal Score: ${product.dealScore.overallScore}/100.`,
      `Review sentiment verified across ${product.reviewIntelligence.totalAnalyzed.toLocaleString()} buyer reviews.`,
    ];

    if (priceResult.conditionalSavings.amount > 0) {
      reasons.push(
        `Additional conditional savings of ₹${priceResult.conditionalSavings.amount.toLocaleString('en-IN')} available with bank offer.`
      );
    }

    const tradeoffs = product.reviewIntelligence.topCons.map(c => `Buyer complaint note: ${c}`);

    return {
      headline,
      summary: verdictResult.rationale,
      reasons,
      tradeoffs,
      confidence: verdictResult.confidence === 'HIGH' ? 0.94 : 0.82,
    };
  }
}

export const defaultAIExplanationEngine = new AIExplanationEngine();
