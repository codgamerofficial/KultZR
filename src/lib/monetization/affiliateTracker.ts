export interface AffiliateClickRecord {
  clickId: string;
  productId: string;
  merchantName: string;
  estimatedCommissionRate: number; // e.g. 0.04 (4%)
  estimatedOrderValue: number;
  timestamp: string;
}

export class AffiliateTracker {
  private records: AffiliateClickRecord[] = [];

  logClick(productId: string, merchantName: string, productPrice: number): AffiliateClickRecord {
    const rateMap: Record<string, number> = {
      'Amazon India': 0.04,
      'Flipkart': 0.035,
      'Croma': 0.025,
      'Reliance Digital': 0.03,
    };

    const rate = rateMap[merchantName] || 0.03;

    const record: AffiliateClickRecord = {
      clickId: `aff_clk_${Date.now()}`,
      productId,
      merchantName,
      estimatedCommissionRate: rate,
      estimatedOrderValue: productPrice,
      timestamp: new Date().toISOString(),
    };

    this.records.push(record);
    return record;
  }

  getRevenueSummary() {
    const totalClicks = this.records.length;
    const totalOrderValue = this.records.reduce((acc, r) => acc + r.estimatedOrderValue, 0);
    const estimatedCommission = this.records.reduce((acc, r) => acc + (r.estimatedOrderValue * r.estimatedCommissionRate), 0);

    return {
      totalClicks,
      totalOrderValue,
      estimatedCommission,
    };
  }
}

export const defaultAffiliateTracker = new AffiliateTracker();
