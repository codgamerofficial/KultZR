export interface FeatureFlags {
  REAL_MERCHANT_DATA: boolean;
  AI_SATHI: boolean;
  AI_DEEP_RESEARCH: boolean;
  AI_VISION: boolean;
  PRICE_WATCH: boolean;
  SHOPPING_MISSIONS: boolean;
  REAL_NOTIFICATIONS: boolean;
  AFFILIATE: boolean;
  PRO: boolean;
  SEO_ENGINE: boolean;
}

export const featureFlags: FeatureFlags = {
  REAL_MERCHANT_DATA: process.env.NODE_ENV === 'production' || process.env.USE_REAL_MERCHANT_DATA === 'true',
  AI_SATHI: true,
  AI_DEEP_RESEARCH: true,
  AI_VISION: true,
  PRICE_WATCH: true,
  SHOPPING_MISSIONS: true,
  REAL_NOTIFICATIONS: true,
  AFFILIATE: true,
  PRO: true,
  SEO_ENGINE: true,
};
