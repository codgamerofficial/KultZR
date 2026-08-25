import { z } from 'zod';

export const SearchRequestSchema = z.object({
  query: z.string().min(2, 'Search query must be at least 2 characters'),
  currency: z.string().default('INR'),
  country: z.string().default('IN'),
  maxBudget: z.number().optional(),
  category: z.string().optional(),
  priority: z.string().optional(),
});

export const UrlAnalyzeRequestSchema = z.object({
  url: z.string().url('Must be a valid merchant URL'),
});

export const PriceWatchRequestSchema = z.object({
  productId: z.string().min(1),
  targetPrice: z.number().positive('Target price must be positive'),
  dealScoreThreshold: z.number().min(0).max(100).default(90),
  notifyOnPriceDrop: z.boolean().default(true),
});

export const ShoppingMissionRequestSchema = z.object({
  title: z.string().min(3),
  category: z.enum(['smartphones', 'laptops', 'earbuds', 'shoes', 'tvs', 'appliances']),
  budgetMax: z.number().positive(),
  priorityKey: z.string().min(2),
  conditionPreference: z.enum(['New', 'Refurbished', 'Any']).default('New'),
  deadlineDays: z.number().min(1).max(365).default(30),
});

export const CompareRequestSchema = z.object({
  productIds: z.array(z.string()).min(2, 'Must compare at least 2 products').max(4, 'Maximum 4 products allowed'),
});

export const AffiliateClickSchema = z.object({
  offerId: z.string().min(1),
  sessionId: z.string().optional(),
  referrer: z.string().optional(),
});
