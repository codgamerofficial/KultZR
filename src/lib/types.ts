export type VerdictType = 'BUY' | 'WAIT' | 'AVOID';

export type CategoryType = 
  | 'smartphones' 
  | 'laptops' 
  | 'earbuds' 
  | 'shoes' 
  | 'tvs' 
  | 'appliances';

export type QueryType = 
  | 'BRAND_SEARCH'
  | 'BRAND_CATEGORY_SEARCH'
  | 'PRODUCT_LOOKUP'
  | 'PRODUCT_DISCOVERY'
  | 'CATEGORY_SEARCH'
  | 'COMPARISON'
  | 'PRICE_CHECK'
  | 'DEAL_CHECK'
  | 'SHOPPING_MISSION'
  | 'PRICE_WATCH'
  | 'GENERAL_SHOPPING_QUESTION';

export interface ProductOffer {
  id: string;
  merchantName: 'Amazon.in' | 'Flipkart' | 'Croma' | 'Reliance Digital' | 'Myntra';
  merchantLogoUrl: string;
  basePrice: number;
  shippingFee: number;
  applicableCoupons: number;
  bankDiscount: number;
  cashbackEstimated: number;
  finalTruePrice: number;
  inStock: boolean;
  deliveryEstimate: string;
  affiliateUrl: string;
  sellerName: string;
  sellerRating: number;
}

export interface PriceHistoryPoint {
  date: string;
  price: number;
  merchant: string;
}

export interface ReviewIntelligence {
  sentimentScore: number;
  totalAnalyzed: number;
  suspiciousSignalsDetected: boolean;
  suspiciousDetails?: string;
  positiveThemes: string[];
  negativeThemes: string[];
  recurringDefects: string[];
  topPros: string[];
  topCons: string[];
}

export interface DealScoreBreakdown {
  overallScore: number;
  priceAdvantage: number;
  productFit: number;
  reviewQuality: number;
  sellerTrust: number;
  priceHistoryScore: number;
  specificationValue: number;
  warrantyValue: number;
  availabilityScore: number;
}

export interface Product {
  id: string;
  title: string;
  brand: string;
  model: string;
  category: CategoryType;
  imageUrl: string;
  galleryImages: string[];
  specifications: Record<string, string>;
  
  currentBestTruePrice: number;
  mrp: number;
  lowestPrice365d: number;
  highestPrice365d: number;
  averagePrice30d: number;
  priceVolatility: 'Low' | 'Medium' | 'High';

  dealScore: DealScoreBreakdown;
  verdict: VerdictType;
  verdictReason: string;
  
  badge?: 'Best Overall' | 'Best Value' | 'Best Camera' | 'Best Performance' | 'Cheapest Good Option' | 'Premium Choice' | 'Exact Match';

  offers: ProductOffer[];
  priceHistory: PriceHistoryPoint[];
  reviewIntelligence: ReviewIntelligence;
}

export interface ShoppingMission {
  id: string;
  title: string;
  category: CategoryType;
  budgetMax: number;
  priorityKey: string;
  conditionPreference: 'New' | 'Refurbished' | 'Any';
  deadlineDays: number;
  status: 'Searching' | 'Monitoring' | 'Price Dropped' | 'Target Reached';
  createdAt: string;
  targetPrice: number;
  candidatesCount: number;
  bestCandidateProduct?: Product;
}

export interface PriceWatchItem {
  id: string;
  productId: string;
  productTitle: string;
  productImage: string;
  currentPrice: number;
  targetPrice: number;
  dealScoreThreshold: number;
  notifyOnPriceDrop: boolean;
  lastPriceDropAmount?: number;
  status: 'ACTIVE' | 'TRIGGERED' | 'PAUSED';
  createdAt: string;
}

export interface SearchIntent {
  rawQuery: string;
  queryType: QueryType;
  exactProductRequested: boolean;
  brandLock?: boolean;
  brand?: string;
  model?: string;
  budgetMax?: number;
  budgetMin?: number;
  category?: CategoryType;
  primaryPriority?: string;
  brandPreference?: string;
  parsedConditions?: string[];
}

export interface AgentStepProgress {
  id: string;
  label: string;
  status: 'pending' | 'active' | 'completed';
  detail?: string;
}
