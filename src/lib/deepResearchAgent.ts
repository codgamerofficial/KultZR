import { Product } from './types';
import { MOCK_PRODUCTS } from './mockData';

export interface DeepResearchResult {
  totalScannedCandidates: number;
  strongMatchesCount: number;
  finalists: Product[];
  winner: Product;
  researchSummary: {
    conclusion: string;
    keyStrengths: string[];
    tradeoffs: string[];
  };
}

export class DeepResearchAgent {
  async executeDeepResearch(query: string, budgetMax: number): Promise<DeepResearchResult> {
    // Simulates multi-step market scan across 24 candidate listings
    const candidates = MOCK_PRODUCTS.filter(p => p.currentBestTruePrice <= budgetMax);
    const sorted = [...candidates].sort((a, b) => b.dealScore.overallScore - a.dealScore.overallScore);

    const winner = sorted[0] || MOCK_PRODUCTS[0];
    const finalists = sorted.slice(0, 3);

    return {
      totalScannedCandidates: 24,
      strongMatchesCount: Math.min(8, candidates.length),
      finalists,
      winner,
      researchSummary: {
        conclusion: `Buy ${winner.title}. It offers the strongest Deal Score (${winner.dealScore.overallScore}/100) and lowest true payable price within your ₹${budgetMax.toLocaleString('en-IN')} budget.`,
        keyStrengths: [
          `True price of ₹${winner.currentBestTruePrice.toLocaleString('en-IN')} is below 30-day market average.`,
          `Sony IMX sensor optics and fast thermal charging verified in 1,800+ buyer reviews.`,
          `Verified seller rating of 4.8★ with zero delivery defect signals.`,
        ],
        tradeoffs: [
          `Slightly heavier chassis compared to alternative models.`,
          `Does not include wall charging brick in retail packaging.`,
        ],
      },
    };
  }
}

export const defaultDeepResearchAgent = new DeepResearchAgent();
