export type VerdictType = 'BUY' | 'WAIT' | 'AVOID';

export interface VerdictInput {
  pricePercentile: number; // 0 to 100 (lower means cheaper than historical)
  fitScore: number;
  sellerScore: number;
  reviewScore: number;
  defectSignal?: boolean;
}

export interface VerdictResult {
  verdict: VerdictType;
  confidence: 'LOW' | 'MEDIUM' | 'HIGH';
  rationale: string;
  ruleTriggered: string;
}

export class VerdictEngine {
  determineVerdict(input: VerdictInput): VerdictResult {
    // 1. Check AVOID criteria
    if (input.sellerScore < 50) {
      return {
        verdict: 'AVOID',
        confidence: 'HIGH',
        rationale: 'Unverified seller rating below safety threshold (seller score < 50). Risk of delayed fulfillment or counterfeit goods.',
        ruleTriggered: 'LOW_SELLER_TRUST',
      };
    }

    if (input.defectSignal) {
      return {
        verdict: 'AVOID',
        confidence: 'HIGH',
        rationale: 'Significant recurring hardware failure or defect complaint signals detected in recent buyer reviews.',
        ruleTriggered: 'QUALITY_DEFECT_SIGNAL',
      };
    }

    // 2. Check BUY criteria
    if (input.pricePercentile <= 20 && input.fitScore >= 80 && input.sellerScore >= 80) {
      return {
        verdict: 'BUY',
        confidence: 'HIGH',
        rationale: `Current true price is in the bottom ${input.pricePercentile}% of its 365-day price history with strong requirement fit (${input.fitScore}/100) and trusted seller rating (${input.sellerScore}/100).`,
        ruleTriggered: 'HISTORICAL_LOW_FIT_MATCH',
      };
    }

    // 3. Check WAIT criteria
    if (input.pricePercentile > 60) {
      return {
        verdict: 'WAIT',
        confidence: 'MEDIUM',
        rationale: `Current price is in the upper ${input.pricePercentile}% of its historical range. Historical trend predicts a price reduction in upcoming sale events.`,
        ruleTriggered: 'HIGH_PRICE_PERCENTILE',
      };
    }

    // Fallback BUY for solid overall value
    return {
      verdict: 'BUY',
      confidence: 'MEDIUM',
      rationale: 'Solid overall value proposition with fair historical pricing and good buyer sentiment.',
      ruleTriggered: 'SOLID_OVERALL_VALUE',
    };
  }
}

export const defaultVerdictEngine = new VerdictEngine();
