import { NextResponse } from 'next/server';
import { UrlAnalyzeRequestSchema } from '@/lib/zodSchemas';
import { MOCK_PRODUCTS } from '@/lib/mockData';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { url } = UrlAnalyzeRequestSchema.parse(body);

    const parsedUrl = new URL(url);

    // 1. SSRF Protection: HTTPS requirement and Private IP rejection
    if (parsedUrl.protocol !== 'https:') {
      return NextResponse.json(
        { success: false, error: 'Only secure HTTPS merchant URLs are supported.' },
        { status: 400 }
      );
    }

    const hostname = parsedUrl.hostname.toLowerCase();
    const isPrivateIp = 
      hostname.includes('localhost') || 
      hostname.includes('127.0.0.1') || 
      hostname.includes('169.254.') || 
      hostname.startsWith('10.') || 
      hostname.startsWith('192.168.');

    if (isPrivateIp) {
      return NextResponse.json(
        { success: false, error: 'Internal cloud and private IP addresses are blocked.' },
        { status: 403 }
      );
    }

    // 2. Domain Allowlist Check
    const isSupportedMerchant = 
      hostname.includes('amazon.in') || 
      hostname.includes('flipkart.com') || 
      hostname.includes('croma.com') || 
      hostname.includes('myntra.com');

    if (!isSupportedMerchant) {
      return NextResponse.json(
        { 
          success: false, 
          error: `The merchant "${hostname}" is not currently supported for automated URL analysis.`,
          analyzedUrl: url 
        },
        { status: 422 }
      );
    }

    // 3. Match product in database by URL or slug tokens
    const pathnameLower = parsedUrl.pathname.toLowerCase();
    const matchedProduct = MOCK_PRODUCTS.find((p) => {
      const brandLower = p.brand.toLowerCase();
      const modelLower = p.model.toLowerCase();
      return (
        pathnameLower.includes(brandLower) || 
        pathnameLower.includes(modelLower) || 
        p.offers.some((o) => o.affiliateUrl.toLowerCase().includes(pathnameLower))
      );
    });

    if (!matchedProduct) {
      return NextResponse.json(
        { 
          success: false, 
          error: `Unable to verify a canonical product listing for this URL.`,
          analyzedUrl: url,
          domain: hostname
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      analyzedUrl: url,
      domain: hostname,
      canonicalProduct: matchedProduct,
      verdict: matchedProduct.verdict,
      dealScore: matchedProduct.dealScore.overallScore,
      currentVerifiedPrice: matchedProduct.currentBestTruePrice,
      savingsVsMerchantList: matchedProduct.mrp - matchedProduct.currentBestTruePrice,
      savingsVs30dAverage: matchedProduct.averagePrice30d - matchedProduct.currentBestTruePrice,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.errors || error.message || 'URL analysis failed' },
      { status: 400 }
    );
  }
}
