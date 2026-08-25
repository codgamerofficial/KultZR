import { MOCK_PRODUCTS, MOCK_MISSIONS, MOCK_PRICE_WATCHES } from './mockData';
import { calculateDealScore } from './dealScoreEngine';

export interface AIToolDefinition {
  name: string;
  description: string;
  parameters: Record<string, unknown>;
  execute(args: Record<string, any>): Promise<any>;
}

export const AI_AGENT_TOOLS: Record<string, AIToolDefinition> = {
  search_products: {
    name: 'search_products',
    description: 'Searches supported merchants for products matching natural language query, category, and budget.',
    parameters: {
      type: 'object',
      properties: {
        query: { type: 'string' },
        category: { type: 'string' },
        maxBudget: { type: 'number' },
      },
      required: ['query'],
    },
    async execute({ query, category, maxBudget }) {
      let filtered = MOCK_PRODUCTS;
      if (category) {
        filtered = filtered.filter(p => p.category === category);
      }
      if (maxBudget) {
        filtered = filtered.filter(p => p.currentBestTruePrice <= maxBudget);
      }
      return { count: filtered.length, products: filtered };
    },
  },

  get_product: {
    name: 'get_product',
    description: 'Retrieves canonical product details, specs, and current verdict by ID or slug.',
    parameters: {
      type: 'object',
      properties: {
        productId: { type: 'string' },
      },
      required: ['productId'],
    },
    async execute({ productId }) {
      const product = MOCK_PRODUCTS.find(p => p.id === productId) || MOCK_PRODUCTS[0];
      return product;
    },
  },

  get_offers: {
    name: 'get_offers',
    description: 'Retrieves all verified merchant offers and true price breakdown for a product.',
    parameters: {
      type: 'object',
      properties: {
        productId: { type: 'string' },
      },
      required: ['productId'],
    },
    async execute({ productId }) {
      const product = MOCK_PRODUCTS.find(p => p.id === productId) || MOCK_PRODUCTS[0];
      return { offers: product.offers, currentBestTruePrice: product.currentBestTruePrice };
    },
  },

  get_price_history: {
    name: 'get_price_history',
    description: 'Retrieves 365-day price history points, lowest/highest prices, and 30-day average.',
    parameters: {
      type: 'object',
      properties: {
        productId: { type: 'string' },
      },
      required: ['productId'],
    },
    async execute({ productId }) {
      const product = MOCK_PRODUCTS.find(p => p.id === productId) || MOCK_PRODUCTS[0];
      return {
        priceHistory: product.priceHistory,
        lowestPrice365d: product.lowestPrice365d,
        averagePrice30d: product.averagePrice30d,
        volatility: product.priceVolatility,
      };
    },
  },

  compare_products: {
    name: 'compare_products',
    description: 'Compares specifications and Deal Scores for up to 4 products and determines winner.',
    parameters: {
      type: 'object',
      properties: {
        productIds: { type: 'array', items: { type: 'string' } },
      },
      required: ['productIds'],
    },
    async execute({ productIds }) {
      const selected = MOCK_PRODUCTS.filter(p => productIds.includes(p.id));
      const sorted = [...selected].sort((a, b) => b.dealScore.overallScore - a.dealScore.overallScore);
      return {
        winner: sorted[0],
        comparedCount: selected.length,
        items: selected,
      };
    },
  },

  calculate_deal_score: {
    name: 'calculate_deal_score',
    description: 'Computes transparent weighted 0-100 Deal Score for a product based on category rules.',
    parameters: {
      type: 'object',
      properties: {
        productId: { type: 'string' },
      },
      required: ['productId'],
    },
    async execute({ productId }) {
      const product = MOCK_PRODUCTS.find(p => p.id === productId) || MOCK_PRODUCTS[0];
      const score = calculateDealScore(product);
      return score;
    },
  },

  create_price_watch: {
    name: 'create_price_watch',
    description: 'Creates a price surveillance monitor targeting price drop or target price.',
    parameters: {
      type: 'object',
      properties: {
        productId: { type: 'string' },
        targetPrice: { type: 'number' },
      },
      required: ['productId', 'targetPrice'],
    },
    async execute({ productId, targetPrice }) {
      return {
        success: true,
        watchId: `watch-${Date.now()}`,
        status: 'ACTIVE',
        targetPrice,
      };
    },
  },

  create_mission: {
    name: 'create_mission',
    description: 'Creates a persistent long-running Shopping Mission for the user.',
    parameters: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        budgetMax: { type: 'number' },
        priorityKey: { type: 'string' },
      },
      required: ['title', 'budgetMax', 'priorityKey'],
    },
    async execute({ title, budgetMax, priorityKey }) {
      return {
        success: true,
        missionId: `mission-${Date.now()}`,
        title,
        status: 'Searching',
      };
    },
  },
};
