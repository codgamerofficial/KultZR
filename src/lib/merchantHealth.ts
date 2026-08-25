export type MerchantCapability =
  | 'PRODUCT_SEARCH'
  | 'PRODUCT_DETAILS'
  | 'OFFERS'
  | 'AVAILABILITY'
  | 'PRICE_HISTORY'
  | 'AFFILIATE_LINK';

export type MerchantHealthStatus = 'HEALTHY' | 'PARTIAL' | 'OFFLINE';

export interface MerchantHealthReport {
  merchantId: string;
  merchantName: string;
  status: MerchantHealthStatus;
  latencyMs: number;
  errorRatePercentage: number;
  supportedCapabilities: MerchantCapability[];
  lastCheckedAt: string;
}

export class MerchantHealthRegistry {
  private healthData: Map<string, MerchantHealthReport> = new Map();

  constructor() {
    this.healthData.set('mch-amazon-in', {
      merchantId: 'mch-amazon-in',
      merchantName: 'Amazon.in',
      status: 'HEALTHY',
      latencyMs: 142,
      errorRatePercentage: 0.2,
      supportedCapabilities: ['PRODUCT_SEARCH', 'PRODUCT_DETAILS', 'OFFERS', 'AVAILABILITY', 'AFFILIATE_LINK'],
      lastCheckedAt: new Date().toISOString(),
    });

    this.healthData.set('mch-flipkart', {
      merchantId: 'mch-flipkart',
      merchantName: 'Flipkart',
      status: 'HEALTHY',
      latencyMs: 185,
      errorRatePercentage: 0.5,
      supportedCapabilities: ['PRODUCT_SEARCH', 'PRODUCT_DETAILS', 'OFFERS', 'AVAILABILITY', 'AFFILIATE_LINK'],
      lastCheckedAt: new Date().toISOString(),
    });

    this.healthData.set('mch-croma', {
      merchantId: 'mch-croma',
      merchantName: 'Croma',
      status: 'PARTIAL',
      latencyMs: 310,
      errorRatePercentage: 2.1,
      supportedCapabilities: ['PRODUCT_DETAILS', 'OFFERS', 'AFFILIATE_LINK'],
      lastCheckedAt: new Date().toISOString(),
    });
  }

  getHealthReport(merchantId: string): MerchantHealthReport | undefined {
    return this.healthData.get(merchantId);
  }

  getAllHealthReports(): MerchantHealthReport[] {
    return Array.from(this.healthData.values());
  }

  hasCapability(merchantId: string, capability: MerchantCapability): boolean {
    const report = this.getHealthReport(merchantId);
    if (!report || report.status === 'OFFLINE') return false;
    return report.supportedCapabilities.includes(capability);
  }
}

export const defaultMerchantHealthRegistry = new MerchantHealthRegistry();
