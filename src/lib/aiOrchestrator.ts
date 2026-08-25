import { SearchIntent, Product, AgentStepProgress, QueryType } from './types';
import { MOCK_PRODUCTS } from './mockData';

export const INITIAL_AGENT_STEPS: AgentStepProgress[] = [
  { id: '1', label: 'Extracting search intent & entity boundaries', status: 'pending' },
  { id: '2', label: 'Verifying canonical brand & model locks', status: 'pending' },
  { id: '3', label: 'Applying hard category & brand query filters', status: 'pending' },
  { id: '4', label: 'Calculating true payable prices across merchants', status: 'pending' },
  { id: '5', label: 'Analyzing 365-day market price trendlines', status: 'pending' },
  { id: '6', label: 'Reading review signals & buyer defect reports', status: 'pending' },
  { id: '7', label: 'Enforcing exact relevance ranking dominance over Deal Score', status: 'pending' },
];

const BRAND_DICTIONARY: Record<string, string> = {
  'nothing': 'Nothing',
  'samsung': 'Samsung',
  'apple': 'Apple',
  'iqoo': 'iQOO',
  'lenovo': 'Lenovo',
  'boat': 'boAt',
};

export function parseQueryIntent(query: string): SearchIntent {
  const lower = query.toLowerCase().trim();

  // 1. Extract explicit budget ONLY if provided in query
  let budgetMax: number | undefined = undefined;
  const budgetMatch = lower.match(/(?:under|below|max|around|within|less than)\s*(?:₹|rs\.?|inr)?\s*([\d,]+)/i);
  if (budgetMatch && budgetMatch[1]) {
    const rawNum = budgetMatch[1].replace(/,/g, '');
    const parsed = parseInt(rawNum, 10);
    if (!isNaN(parsed) && parsed > 0) {
      budgetMax = parsed;
    }
  }

  // 2. Detect explicit user objective keywords
  const isBestRequested = lower.includes('best') || lower.includes('top') || lower.includes('which') || lower.includes('recommend');
  const isCameraPriority = lower.includes('camera') || lower.includes('photo');
  const isGamingPriority = lower.includes('gaming') || lower.includes('fps');
  const isBatteryPriority = lower.includes('battery');

  // 3. Extract model preference ONLY if explicitly mentioned
  let model: string | undefined = undefined;
  let exactProductRequested = false;

  if (lower.includes('iphone 17') || lower.includes('iphone17') || lower.includes('17 pro')) {
    model = 'iPhone 17 Pro Max';
    exactProductRequested = true;
  } else if (lower.includes('s26 ultra') || lower.includes('s26ultra') || lower.includes('s26-ultra')) {
    model = 'Galaxy S26 Ultra';
    exactProductRequested = true;
  } else if (lower.includes('4a') || lower.includes('phone 4a') || lower.includes('phone (4a)')) {
    model = 'Phone (4a)';
    exactProductRequested = true;
  } else if (lower.includes('phone 2') || lower.includes('phone (2)')) {
    model = 'Phone (2)';
    exactProductRequested = true;
  } else if (lower.includes('neo 9') || lower.includes('neo 9 pro')) {
    model = 'Neo 9 Pro';
    exactProductRequested = true;
  } else if (lower.includes('loq')) {
    model = 'LOQ';
    exactProductRequested = true;
  } else if (lower.includes('airdopes') || lower.includes('airdopes 141')) {
    model = 'Airdopes 141 ANC';
    exactProductRequested = true;
  }

  // 4. Extract Brand
  let brand: string | undefined = undefined;
  let brandLock = false;

  for (const [key, canonicalName] of Object.entries(BRAND_DICTIONARY)) {
    if (lower.includes(key) || (key === 'apple' && (lower.includes('iphone') || lower.includes('macbook')))) {
      brand = canonicalName;
      brandLock = true;
      break;
    }
  }

  // 5. Extract Category ONLY if explicitly mentioned in query
  let category: SearchIntent['category'] = undefined;
  if (lower.includes('laptop') || lower.includes('laptops') || lower.includes('macbook') || lower.includes('pc')) {
    category = 'laptops';
  } else if (lower.includes('earbud') || lower.includes('earbuds') || lower.includes('headphone') || lower.includes('audio')) {
    category = 'earbuds';
  } else if (lower.includes('shoe') || lower.includes('shoes') || lower.includes('sneaker')) {
    category = 'shoes';
  } else if (lower.includes('tv') || lower.includes('tvs') || lower.includes('television')) {
    category = 'tvs';
  } else if (lower.includes('appliance') || lower.includes('appliances') || lower.includes('washing') || lower.includes('fridge')) {
    category = 'appliances';
  } else if (lower.includes('phone') || lower.includes('phones') || lower.includes('mobile') || lower.includes('mobiles')) {
    category = 'smartphones';
  }

  // 6. DETERMINISTIC V4 INTENT GUARDRAIL
  let queryType: QueryType = 'PRODUCT_DISCOVERY';

  // Check for Brand-Only query ("nothing", "samsung", "apple")
  if (brand && !model && !category && !isBestRequested && !budgetMax && BRAND_DICTIONARY[lower] === brand) {
    queryType = 'BRAND_SEARCH';
    exactProductRequested = false;
    model = undefined;
    category = undefined; // Do NOT assume category!
  } else if (brand && category && !model && !isBestRequested && !budgetMax) {
    queryType = 'BRAND_CATEGORY_SEARCH';
    exactProductRequested = false;
  } else if (exactProductRequested || (brand && model)) {
    queryType = 'PRODUCT_LOOKUP';
  } else if (isBestRequested || budgetMax || isCameraPriority || isGamingPriority || isBatteryPriority) {
    queryType = 'CATEGORY_SEARCH';
  } else if (lower.includes('vs') || lower.includes('compare')) {
    queryType = 'COMPARISON';
  } else if (lower.includes('find me') || lower.includes('mission') || lower.includes('track')) {
    queryType = 'SHOPPING_MISSION';
  }

  let primaryPriority: string | undefined = undefined;
  if (isCameraPriority) primaryPriority = 'Camera & Night Photography';
  else if (isBatteryPriority) primaryPriority = 'Long Battery Life';
  else if (isGamingPriority) primaryPriority = 'High FPS Gaming & Speed';
  else if (lower.includes('cheapest') || lower.includes('saving')) primaryPriority = 'Maximum Savings';

  return {
    rawQuery: query,
    queryType,
    exactProductRequested,
    brandLock,
    brand,
    model,
    budgetMax,
    category,
    primaryPriority,
    brandPreference: brand,
    parsedConditions: exactProductRequested 
      ? ['Exact Product Lookup', 'Brand Locked', 'Category Locked'] 
      : queryType === 'BRAND_SEARCH' 
      ? ['Brand Search Mode', 'Model Unlocked', 'Category Unlocked']
      : undefined,
  };
}

export function calculateProductRelevance(product: Product, intent: SearchIntent): number {
  let score = 0;

  // HARD BRAND LOCK CHECK
  if (intent.brand) {
    if (product.brand.toLowerCase() === intent.brand.toLowerCase()) {
      score += 0.50;
    } else {
      if (intent.brandLock) {
        return 0; // Hard rejection
      }
    }
  }

  // HARD CATEGORY CHECK
  if (intent.category && product.category !== intent.category) {
    return 0; // Hard rejection
  }

  // Model match
  if (intent.model) {
    const prodModel = product.model.toLowerCase();
    const intentModel = intent.model.toLowerCase();
    if (prodModel.includes(intentModel) || product.title.toLowerCase().includes(intentModel)) {
      score += 0.50;
    }
  }

  return score;
}

export function searchAndScoreProducts(intent: SearchIntent): {
  recommendation: Product | null;
  otherPicks: Product[];
} {
  let candidates = [...MOCK_PRODUCTS];

  // 1. HARD BRAND FILTER AT DATABASE QUERY LEVEL
  if (intent.brandLock && intent.brand) {
    candidates = candidates.filter((p) => p.brand.toLowerCase() === intent.brand!.toLowerCase());
  }

  // 2. HARD CATEGORY FILTER AT DATABASE QUERY LEVEL (ONLY IF CATEGORY IS SPECIFIED!)
  if (intent.category) {
    candidates = candidates.filter((p) => p.category === intent.category);
  }

  // 3. FAIL CLOSED: If hard filtering leaves 0 candidates, return NULL (No fake fallback!)
  if (candidates.length === 0) {
    return {
      recommendation: null,
      otherPicks: [],
    };
  }

  // 4. V4 BRAND SEARCH & BRAND CATEGORY SEARCH: Return product grid without premature winner pick!
  if (intent.queryType === 'BRAND_SEARCH' || intent.queryType === 'BRAND_CATEGORY_SEARCH') {
    return {
      recommendation: null, // NO premature single winner!
      otherPicks: candidates, // Return all verified brand products as candidates
    };
  }

  // 5. Budget filter ONLY if explicitly requested by user
  if (intent.budgetMax) {
    const withinBudget = candidates.filter((p) => p.currentBestTruePrice <= intent.budgetMax! + 2000);
    if (withinBudget.length > 0) {
      candidates = withinBudget;
    }
  }

  // 6. PRODUCT_LOOKUP: Relevance MUST DOMINATE Deal Score
  if (intent.queryType === 'PRODUCT_LOOKUP' || intent.exactProductRequested) {
    const scoredCandidates = candidates
      .map((product) => ({
        product,
        relevance: calculateProductRelevance(product, intent),
      }))
      .filter((c) => c.relevance > 0)
      .sort((a, b) => {
        if (b.relevance !== a.relevance) {
          return b.relevance - a.relevance;
        }
        return b.product.dealScore.overallScore - a.product.dealScore.overallScore;
      });

    if (scoredCandidates.length === 0) {
      return {
        recommendation: null,
        otherPicks: [],
      };
    }

    return {
      recommendation: scoredCandidates[0].product,
      otherPicks: scoredCandidates.slice(1).map((c) => c.product),
    };
  }

  // 7. CATEGORY_SEARCH or DISCOVERY (User asked for "best"): Rank by Deal Score
  const sorted = [...candidates].sort((a, b) => b.dealScore.overallScore - a.dealScore.overallScore);
  return {
    recommendation: sorted[0] || null,
    otherPicks: sorted.slice(1),
  };
}
