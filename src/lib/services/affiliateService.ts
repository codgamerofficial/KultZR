export class AffiliateService {
  generateMerchantUrl(merchantName: string, queryOrTitle: string, asinOrId?: string): string {
    const encoded = encodeURIComponent(queryOrTitle);
    const amazonTag = process.env.AMAZON_PARTNER_TAG || 'dealsathi-21';
    const flipkartId = process.env.FLIPKART_AFFILIATE_ID || 'dealsathi';

    switch (merchantName.toLowerCase()) {
      case 'amazon':
      case 'amazon.in':
        if (asinOrId && asinOrId.length === 10 && !asinOrId.includes('mock')) {
          return `https://www.amazon.in/dp/${asinOrId}?tag=${amazonTag}`;
        }
        return `https://www.amazon.in/s?k=${encoded}&tag=${amazonTag}`;

      case 'flipkart':
        return `https://www.flipkart.com/search?q=${encoded}&affid=${flipkartId}`;

      case 'croma':
        return `https://www.croma.com/searchB?q=${encoded}`;

      default:
        return `https://www.amazon.in/s?k=${encoded}&tag=${amazonTag}`;
    }
  }
}

export const affiliateService = new AffiliateService();
