import { NextResponse } from 'next/server';
import { MOCK_PRODUCTS } from '@/lib/mockData';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const offerId = searchParams.get('offerId');
  const sessionId = searchParams.get('sessionId') || 'anonymous_session';

  const offer = MOCK_PRODUCTS.flatMap(p => p.offers).find(o => o.id === offerId);
  const destinationUrl = offer ? offer.affiliateUrl : 'https://amazon.in?tag=dealsathi-21';

  // Log Telemetry Server-Side before Redirect
  console.log(`[AFFILIATE_CLICK_LOG] timestamp=${new Date().toISOString()} offerId=${offerId} sessionId=${sessionId} merchant=${offer?.merchantName || 'Unknown'} destination=${destinationUrl}`);

  // HTTP 302 Outbound Redirect
  return NextResponse.redirect(destinationUrl, { status: 302 });
}
