import { Product, ShoppingMission, PriceWatchItem, CategoryType } from '@/lib/types';
import { MOCK_PRODUCTS } from '@/lib/mockData';

// In-Memory Real State Store with initial seed catalog
class DatabaseStore {
  private products: Product[] = [...MOCK_PRODUCTS];
  private missions: ShoppingMission[] = [];
  private watches: PriceWatchItem[] = [];

  // PRODUCTS
  getProducts(): Product[] {
    return this.products;
  }

  getProductById(id: string): Product | undefined {
    return this.products.find((p) => p.id === id);
  }

  // MISSIONS
  getMissions(): ShoppingMission[] {
    return this.missions;
  }

  addMission(missionData: {
    title: string;
    category?: string;
    budgetMax: number;
    priorityKey: string;
    conditionPreference?: string;
    deadlineDays?: number;
  }): ShoppingMission {
    // Find best candidate from products matching budget
    const matchingCandidate = this.products.find(
      (p) => p.currentBestTruePrice <= missionData.budgetMax
    ) || this.products[0];

    const safeCategory: CategoryType = 
      (missionData.category as CategoryType) || 'smartphones';

    const safeCondition: 'New' | 'Refurbished' | 'Any' = 
      missionData.conditionPreference === 'Refurbished' ? 'Refurbished' :
      missionData.conditionPreference === 'Any' ? 'Any' : 'New';

    const newMission: ShoppingMission = {
      id: `mission_${Date.now()}`,
      title: missionData.title,
      category: safeCategory,
      budgetMax: missionData.budgetMax,
      priorityKey: missionData.priorityKey,
      conditionPreference: safeCondition,
      deadlineDays: missionData.deadlineDays || 7,
      status: 'Searching',
      createdAt: new Date().toISOString().split('T')[0],
      targetPrice: Math.round(missionData.budgetMax * 0.9),
      candidatesCount: matchingCandidate ? 1 : 0,
      bestCandidateProduct: matchingCandidate,
    };

    this.missions.unshift(newMission);
    return newMission;
  }

  deleteMission(id: string): boolean {
    const initialLen = this.missions.length;
    this.missions = this.missions.filter((m) => m.id !== id);
    return this.missions.length < initialLen;
  }

  // WATCHES
  getWatches(): PriceWatchItem[] {
    return this.watches;
  }

  addWatch(watchData: {
    productId: string;
    targetPrice: number;
    notifyOnDrop: boolean;
  }): PriceWatchItem | null {
    const product = this.getProductById(watchData.productId);
    if (!product) return null;

    const newWatch: PriceWatchItem = {
      id: `watch_${Date.now()}`,
      productId: product.id,
      productTitle: product.title,
      productImage: product.imageUrl,
      currentPrice: product.currentBestTruePrice,
      targetPrice: watchData.targetPrice,
      dealScoreThreshold: product.dealScore.overallScore,
      notifyOnPriceDrop: watchData.notifyOnDrop,
      status: 'ACTIVE',
      createdAt: new Date().toISOString().split('T')[0],
    };

    this.watches.unshift(newWatch);
    return newWatch;
  }

  deleteWatch(id: string): boolean {
    const initialLen = this.watches.length;
    this.watches = this.watches.filter((w) => w.id !== id);
    return this.watches.length < initialLen;
  }
}

export const dbStore = new DatabaseStore();
