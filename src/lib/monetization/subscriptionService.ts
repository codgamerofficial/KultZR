export type UserTier = 'FREE' | 'PRO';

export interface UserSubscriptionProfile {
  userId: string;
  tier: UserTier;
  deepResearchCreditsRemaining: number;
  activeWatchesCount: number;
  maxWatchesAllowed: number;
  subscriptionExpiresAt?: string;
}

export class SubscriptionService {
  getUserProfile(userId: string): UserSubscriptionProfile {
    // Default demo user profile
    return {
      userId,
      tier: 'FREE',
      deepResearchCreditsRemaining: 10,
      activeWatchesCount: 2,
      maxWatchesAllowed: 3,
    };
  }

  canCreateWatch(profile: UserSubscriptionProfile): boolean {
    if (profile.tier === 'PRO') return true;
    return profile.activeWatchesCount < profile.maxWatchesAllowed;
  }

  canPerformDeepResearch(profile: UserSubscriptionProfile): boolean {
    if (profile.tier === 'PRO') return true;
    return profile.deepResearchCreditsRemaining > 0;
  }
}

export const defaultSubscriptionService = new SubscriptionService();
