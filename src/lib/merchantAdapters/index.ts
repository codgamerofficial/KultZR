import { ProductOffer, CategoryType } from '../types';
import { MOCK_PRODUCTS } from '../mockData';

export interface MerchantSearchQuery {
  keywords: string;
  category?: CategoryType;
  maxBudget?: number;
}

export interface MerchantAdapter {
  merchantId: string;
  merchantName: 'Amazon.in' | 'Flipkart' | 'Croma' | 'Reliance Digital' | 'Myntra';
  
  searchProducts(query: MerchantSearchQuery): Promise<Partial<ProductOffer>[]>;
  getProductOffers(externalProductId: string): Promise<ProductOffer[]>;
  createAffiliateLink(rawUrl: string, campaignId?: string): string;
}

/**
 * Amazon Creators API Adapter Implementation
 * Uses Amazon Associates Creators API (SearchItems, GetItems, GetVariations, OffersV2)
 */
export class AmazonCreatorsAdapter implements MerchantAdapter {
  merchantId = 'mch-amazon-in';
  merchantName = 'Amazon.in' as const;

  async searchProducts(query: MerchantSearchQuery): Promise<Partial<ProductOffer>[]> {
    // In production, invokes Amazon Creators API /paapi5/searchitems with PartnerTag & Credentials
    const amazonPartnerTag = process.env.AMAZON_PARTNER_TAG || 'dealsathi-21';

    const sampleOffers = MOCK_PRODUCTS.flatMap(p => p.offers).filter(o => o.merchantName === 'Amazon.in');
    return sampleOffers.map(o => ({
      ...o,
      affiliateUrl: this.createAffiliateLink(o.affiliateUrl)
    }));
  }

  async getProductOffers(asin: string): Promise<ProductOffer[]> {
    // Invokes Amazon Creators API GetItems & OffersV2 for ASIN
    const match = MOCK_PRODUCTS.flatMap(p => p.offers).filter(o => o.merchantName === 'Amazon.in');
    return match;
  }

  createAffiliateLink(rawUrl: string, campaignId = 'dealsathi'): string {
    const tag = process.env.AMAZON_PARTNER_TAG || 'dealsathi-21';
    if (rawUrl.includes('tag=')) return rawUrl;
    const separator = rawUrl.includes('?') ? '&' : '?';
    return `${rawUrl}${separator}tag=${tag}&ascsubtag=${campaignId}`;
  }
}

/**
 * Flipkart Affiliate API Adapter Implementation
 */
export class FlipkartAdapter implements MerchantAdapter {
  merchantId = 'mch-flipkart';
  merchantName = 'Flipkart' as const;

  async searchProducts(query: MerchantSearchQuery): Promise<Partial<ProductOffer>[]> {
    const sampleOffers = MOCK_PRODUCTS.flatMap(p => p.offers).filter(o => o.merchantName === 'Flipkart');
    return sampleOffers;
  }

  async getProductOffers(flipkartId: string): Promise<ProductOffer[]> {
    return MOCK_PRODUCTS.flatMap(p => p.offers).filter(o => o.merchantName === 'Flipkart');
  }

  createAffiliateLink(rawUrl: string, campaignId = 'dealsathi'): string {
    const affiliateId = process.env.FLIPKART_AFFILIATE_ID || 'dealsathi';
    const separator = rawUrl.includes('?') ? '&' : '?';
    return `${rawUrl}${separator}affid=${affiliateId}`;
  }
}

/**
 * Unified Merchant Adapter Registry
 */
export class MerchantRegistry {
  private adapters: Map<string, MerchantAdapter> = new Map();

  constructor() {
    this.registerAdapter(new AmazonCreatorsAdapter());
    this.registerAdapter(new FlipkartAdapter());
  }

  registerAdapter(adapter: MerchantAdapter) {
    this.adapters.set(adapter.merchantId, adapter);
  }

  async searchAllMerchants(query: MerchantSearchQuery): Promise<Partial<ProductOffer>[]> {
    const promises = Array.from(this.adapters.values()).map(a => a.searchProducts(query));
    const results = await Promise.allSettled(promises);
    
    return results.flatMap(r => r.status === 'fulfilled' ? r.value : []);
  }
}

export const defaultMerchantRegistry = new MerchantRegistry();
