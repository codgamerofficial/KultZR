import { NextResponse } from 'next/server';
import { tokenRouterGateway } from '@/lib/ai/tokenRouterGateway';
import { TOKENROUTER_MODELS } from '@/lib/ai/modelRouter';

export async function GET() {
  try {
    const result = await tokenRouterGateway.generateCompletion({
      model: TOKENROUTER_MODELS.fast,
      system: 'You are an API health check system.',
      userPrompt: 'Respond with OK if connected.',
    });

    return NextResponse.json({
      connected: true,
      model: result.modelUsed,
      latencyMs: result.latencyMs,
      requestId: result.requestId,
      fastModel: TOKENROUTER_MODELS.fast,
      reasoningModel: TOKENROUTER_MODELS.reasoning,
      visionModel: TOKENROUTER_MODELS.vision,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        connected: false,
        error: error.message || 'TokenRouter health check failed',
      },
      { status: 500 }
    );
  }
}
