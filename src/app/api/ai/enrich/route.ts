import { NextResponse } from 'next/server';
import { enrichProductMetadata } from '@/lib/aiEnrichment';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const enriched = await enrichProductMetadata({
      rawTitle: body.rawTitle || 'Identity Oversized Tee',
      category: body.category || 'T-Shirts',
      customText: body.customText,
      emblemName: body.emblemName,
    });

    return NextResponse.json({
      success: true,
      enrichedData: enriched,
    });
  } catch (err) {
    console.error('[AI Enrich API Error]:', err);
    return NextResponse.json({ error: 'Failed to enrich product metadata' }, { status: 500 });
  }
}
