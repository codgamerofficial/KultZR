import { Product } from '../types';
import { parseQueryIntent, searchAndScoreProducts } from '../aiOrchestrator';
import { defaultEvidenceVerifier, EvidenceVerificationReport } from './evidenceVerifier';
import { defaultModelRouter } from './modelRouter';
import { tokenRouterGateway } from './tokenRouterGateway';

export interface SathiOrchestrationResult {
  searchId: string;
  intent: any;
  recommendation: Product | null;
  alternatives: Product[];
  evidenceReport: EvidenceVerificationReport | null;
  aiExplanation: string;
  modelUsed: string;
  executionTimeMs: number;
}

export class SathiOrchestrator {
  async processRequest(rawQuery: string, isDeepResearch: boolean = false): Promise<SathiOrchestrationResult> {
    const startTime = Date.now();

    // 1. Intent Engine
    const intent = parseQueryIntent(rawQuery);

    // 2. Select Model via Router
    const taskType = isDeepResearch ? 'DEEP_RESEARCH' : 'QUICK_SEARCH';
    const modelSelection = defaultModelRouter.selectModel(taskType);

    // 3. Search & Pricing Engine Execution
    const { recommendation, otherPicks } = searchAndScoreProducts(intent);

    if (!recommendation) {
      return {
        searchId: `sathi_orch_${Date.now()}`,
        intent,
        recommendation: null,
        alternatives: [],
        evidenceReport: null,
        aiExplanation: `No verified listing found matching criteria "${rawQuery}" under hard brand & model filters.`,
        modelUsed: modelSelection.modelName,
        executionTimeMs: Date.now() - startTime,
      };
    }

    // 4. Evidence Verification (Hallucination Firewall)
    const evidenceReport = defaultEvidenceVerifier.verifyProductEvidence(recommendation);

    // 5. TokenRouter AI Explanation Generation
    const aiResponse = await tokenRouterGateway.generateCompletion({
      model: modelSelection.modelName,
      system: `You are Sathi, the AI shopping agent inside DealSathi. Provide an honest, evidence-grounded recommendation summary. Use ONLY the supplied commerce facts for prices, scores, and specs.`,
      userPrompt: `Explain why ${recommendation.title} is recommended for request "${rawQuery}".`,
      commerceContext: {
        product: {
          name: recommendation.title,
          price: recommendation.currentBestTruePrice,
        },
        dealScore: {
          score: recommendation.dealScore.overallScore,
        },
        priceIntelligence: {
          average90d: recommendation.averagePrice30d,
          historicalLow: recommendation.lowestPrice365d,
        },
        seller: {
          confidence: recommendation.offers[0]?.sellerRating || 0.9,
        },
        reviewSignals: recommendation.reviewIntelligence,
      },
    });

    const executionTimeMs = Date.now() - startTime;

    return {
      searchId: `sathi_orch_${Date.now()}`,
      intent,
      recommendation,
      alternatives: otherPicks,
      evidenceReport,
      aiExplanation: aiResponse.content,
      modelUsed: aiResponse.modelUsed,
      executionTimeMs,
    };
  }
}

export const defaultSathiOrchestrator = new SathiOrchestrator();
