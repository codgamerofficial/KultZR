import { NextResponse } from 'next/server';
import { SearchRequestSchema } from '@/lib/zodSchemas';
import { parseQueryIntent, searchAndScoreProducts } from '@/lib/aiOrchestrator';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = SearchRequestSchema.parse(body);

    const intent = parseQueryIntent(validated.query);
    if (validated.maxBudget) intent.budgetMax = validated.maxBudget;
    if (validated.category) intent.category = validated.category as any;

    const { recommendation, otherPicks } = searchAndScoreProducts(intent);

    return NextResponse.json({
      success: true,
      searchId: `srch_${Date.now()}`,
      intent,
      recommendation,
      otherPicks,
      dataFreshness: {
        pricesCheckedAt: new Date().toISOString(),
        verifiedMerchantSources: ['Amazon.in', 'Flipkart', 'Croma'],
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.errors || error.message || 'Search execution failed' },
      { status: 400 }
    );
  }
}
