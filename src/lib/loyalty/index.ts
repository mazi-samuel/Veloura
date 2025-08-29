// Veloura Society Loyalty Program
import { api } from '../api';
import { analytics } from '../analytics';

export interface LoyaltyMember {
  id: string;
  userId: string;
  tierLevel: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  points: number;
  lifetimeSpent: number;
  nextTierPoints?: number;
  nextTierSpent?: number;
  memberSince: string;
  lastActivity: string;
  benefits: LoyaltyBenefit[];
  earnedRewards: EarnedReward[];
}

export interface LoyaltyTier {
  level: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  name: string;
  minSpent: number;
  minPoints: number;
  color: string;
  icon: string;
  benefits: LoyaltyBenefit[];
  welcomeBonus: number;
}

export interface LoyaltyBenefit {
  id: string;
  type: 'discount' | 'free_shipping' | 'early_access' | 'exclusive_products' | 'birthday_gift' | 'concierge';
  title: string;
  description: string;
  value?: number; // For discounts
  tier: string[];
  active: boolean;
}

export interface PointsTransaction {
  id: string;
  userId: string;
  type: 'earned' | 'redeemed' | 'expired' | 'adjusted';
  amount: number;
  reason: string;
  orderId?: string;
  rewardId?: string;
  timestamp: string;
  expiryDate?: string;
}

export interface LoyaltyReward {
  id: string;
  name: string;
  description: string;
  pointsCost: number;
  type: 'discount' | 'product' | 'experience' | 'gift_card';
  value: number;
  category: string;
  tier: string[];
  available: boolean;
  limitPerUser?: number;
  expiryDate?: string;
  image?: string;
  terms?: string;
}

export interface EarnedReward {
  id: string;
  rewardId: string;
  userId: string;
  reward: LoyaltyReward;
  redeemedAt: string;
  usedAt?: string;
  expiryDate: string;
  status: 'active' | 'used' | 'expired';
  code: string;
}

export interface PointsRule {
  id: string;
  action: 'purchase' | 'review' | 'referral' | 'birthday' | 'social_share' | 'account_creation';
  pointsPerDollar?: number;
  fixedPoints?: number;
  multiplier?: number;
  tier?: string[];
  conditions?: Record<string, any>;
  active: boolean;
}

class LoyaltyService {
  private tiers: LoyaltyTier[] = [
    {
      level: 'Bronze',
      name: 'Velvet Starter',
      minSpent: 0,
      minPoints: 0,
      color: '#CD7F32',
      icon: '🥉',
      benefits: [
        {
          id: 'bronze-points',
          type: 'discount',
          title: '1 Point per $1',
          description: 'Earn 1 point for every dollar spent',
          tier: ['Bronze', 'Silver', 'Gold', 'Platinum'],
          active: true,
        },
        {
          id: 'bronze-birthday',
          type: 'birthday_gift',
          title: 'Birthday Surprise',
          description: 'Special gift during your birthday month',
          tier: ['Bronze', 'Silver', 'Gold', 'Platinum'],
          active: true,
        },
      ],
      welcomeBonus: 100,
    },
    {
      level: 'Silver',
      name: 'Silk Society',
      minSpent: 150,
      minPoints: 150,
      color: '#C0C0C0',
      icon: '🥈',
      benefits: [
        {
          id: 'silver-points',
          type: 'discount',
          title: '1.25 Points per $1',
          description: 'Earn 1.25 points for every dollar spent',
          tier: ['Silver', 'Gold', 'Platinum'],
          active: true,
        },
        {
          id: 'silver-shipping',
          type: 'free_shipping',
          title: 'Free Shipping',
          description: 'Free standard shipping on all orders',
          tier: ['Silver', 'Gold', 'Platinum'],
          active: true,
        },
        {
          id: 'silver-early-access',
          type: 'early_access',
          title: 'Early Access',
          description: '24-hour early access to new collections',
          tier: ['Silver', 'Gold', 'Platinum'],
          active: true,
        },
      ],
      welcomeBonus: 200,
    },
    {
      level: 'Gold',
      name: 'Golden Goddess',
      minSpent: 500,
      minPoints: 500,
      color: '#FFD700',
      icon: '🥇',
      benefits: [
        {
          id: 'gold-points',
          type: 'discount',
          title: '1.5 Points per $1',
          description: 'Earn 1.5 points for every dollar spent',
          tier: ['Gold', 'Platinum'],
          active: true,
        },
        {
          id: 'gold-discount',
          type: 'discount',
          title: '10% Member Discount',
          description: '10% off all full-price items',
          value: 10,
          tier: ['Gold', 'Platinum'],
          active: true,
        },
        {
          id: 'gold-exclusive',
          type: 'exclusive_products',
          title: 'Exclusive Products',
          description: 'Access to limited edition and exclusive products',
          tier: ['Gold', 'Platinum'],
          active: true,
        },
        {
          id: 'gold-priority',
          type: 'concierge',
          title: 'Priority Support',
          description: 'Priority customer service and beauty consultations',
          tier: ['Gold', 'Platinum'],
          active: true,
        },
      ],
      welcomeBonus: 500,
    },
    {
      level: 'Platinum',
      name: 'Platinum Elite',
      minSpent: 1500,
      minPoints: 1500,
      color: '#E5E4E2',
      icon: '💎',
      benefits: [
        {
          id: 'platinum-points',
          type: 'discount',
          title: '2 Points per $1',
          description: 'Earn 2 points for every dollar spent',
          tier: ['Platinum'],
          active: true,
        },
        {
          id: 'platinum-discount',
          type: 'discount',
          title: '15% Member Discount',
          description: '15% off all full-price items',
          value: 15,
          tier: ['Platinum'],
          active: true,
        },
        {
          id: 'platinum-concierge',
          type: 'concierge',
          title: 'Personal Beauty Concierge',
          description: 'Dedicated beauty advisor and personalized recommendations',
          tier: ['Platinum'],
          active: true,
        },
        {
          id: 'platinum-experiences',
          type: 'experience',
          title: 'Exclusive Experiences',
          description: 'Invitation to exclusive events and beauty masterclasses',
          tier: ['Platinum'],
          active: true,
        },
      ],
      welcomeBonus: 1000,
    },
  ];

  private pointsRules: PointsRule[] = [
    {
      id: 'purchase-bronze',
      action: 'purchase',
      pointsPerDollar: 1,
      tier: ['Bronze'],
      active: true,
    },
    {
      id: 'purchase-silver',
      action: 'purchase',
      pointsPerDollar: 1.25,
      tier: ['Silver'],
      active: true,
    },
    {
      id: 'purchase-gold',
      action: 'purchase',
      pointsPerDollar: 1.5,
      tier: ['Gold'],
      active: true,
    },
    {
      id: 'purchase-platinum',
      action: 'purchase',
      pointsPerDollar: 2,
      tier: ['Platinum'],
      active: true,
    },
    {
      id: 'review',
      action: 'review',
      fixedPoints: 25,
      active: true,
    },
    {
      id: 'referral',
      action: 'referral',
      fixedPoints: 500,
      conditions: { successful_order: true },
      active: true,
    },
    {
      id: 'birthday',
      action: 'birthday',
      fixedPoints: 200,
      active: true,
    },
    {
      id: 'social-share',
      action: 'social_share',
      fixedPoints: 10,
      conditions: { max_per_day: 3 },
      active: true,
    },
    {
      id: 'account-creation',
      action: 'account_creation',
      fixedPoints: 100,
      active: true,
    },
  ];

  // Get member info
  async getMemberInfo(userId: string): Promise<LoyaltyMember | null> {
    try {
      const response = await fetch(`/api/loyalty/member/${userId}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          return null; // Member not found
        }
        throw new Error('Failed to fetch member info');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching member info:', error);
      return null;
    }
  }

  // Join loyalty program
  async joinProgram(userId: string): Promise<LoyaltyMember | null> {
    try {
      const response = await fetch('/api/loyalty/join', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });

      if (!response.ok) {
        throw new Error('Failed to join loyalty program');
      }

      const member = await response.json();
      
      // Track event
      analytics.trackEvent({
        action: 'loyalty_program_joined',
        category: 'engagement',
        label: 'veloura_society',
      });

      return member;
    } catch (error) {
      console.error('Error joining loyalty program:', error);
      return null;
    }
  }

  // Calculate points for purchase
  calculatePurchasePoints(amount: number, tier: string): number {
    const rule = this.pointsRules.find(r => 
      r.action === 'purchase' && 
      r.tier?.includes(tier) && 
      r.active
    );

    if (!rule || !rule.pointsPerDollar) {
      return Math.floor(amount); // Default 1 point per dollar
    }

    return Math.floor(amount * rule.pointsPerDollar);
  }

  // Award points
  async awardPoints(
    userId: string, 
    amount: number, 
    reason: string, 
    orderId?: string
  ): Promise<PointsTransaction | null> {
    try {
      const response = await fetch('/api/loyalty/points/award', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          amount,
          reason,
          orderId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to award points');
      }

      const transaction = await response.json();
      
      // Track event
      analytics.trackEvent({
        action: 'loyalty_points_earned',
        category: 'engagement',
        value: amount,
        custom_parameters: { reason, orderId },
      });

      return transaction;
    } catch (error) {
      console.error('Error awarding points:', error);
      return null;
    }
  }

  // Redeem points
  async redeemPoints(
    userId: string, 
    rewardId: string
  ): Promise<EarnedReward | null> {
    try {
      const response = await fetch('/api/loyalty/redeem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          rewardId,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to redeem reward');
      }

      const earnedReward = await response.json();
      
      // Track event
      analytics.trackEvent({
        action: 'loyalty_reward_redeemed',
        category: 'engagement',
        value: earnedReward.reward.pointsCost,
        custom_parameters: { 
          reward_name: earnedReward.reward.name,
          reward_type: earnedReward.reward.type,
        },
      });

      return earnedReward;
    } catch (error) {
      console.error('Error redeeming points:', error);
      throw error;
    }
  }

  // Get available rewards
  async getAvailableRewards(userId: string): Promise<LoyaltyReward[]> {
    try {
      const response = await fetch(`/api/loyalty/rewards?userId=${userId}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch rewards');
      }

      const data = await response.json();
      return data.rewards;
    } catch (error) {
      console.error('Error fetching rewards:', error);
      return [];
    }
  }

  // Get points history
  async getPointsHistory(
    userId: string, 
    page: number = 1, 
    limit: number = 20
  ): Promise<{
    transactions: PointsTransaction[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    try {
      const response = await fetch(
        `/api/loyalty/points/history?userId=${userId}&page=${page}&limit=${limit}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch points history');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching points history:', error);
      return {
        transactions: [],
        total: 0,
        page: 1,
        totalPages: 1,
      };
    }
  }

  // Get tier info
  getTierInfo(tier: string): LoyaltyTier | null {
    return this.tiers.find(t => t.level === tier) || null;
  }

  // Get all tiers
  getAllTiers(): LoyaltyTier[] {
    return this.tiers;
  }

  // Calculate tier progress
  calculateTierProgress(member: LoyaltyMember): {
    currentTier: LoyaltyTier;
    nextTier: LoyaltyTier | null;
    progressPercentage: number;
    pointsToNext: number;
    spentToNext: number;
  } {
    const currentTier = this.getTierInfo(member.tierLevel)!;
    const currentTierIndex = this.tiers.findIndex(t => t.level === member.tierLevel);
    const nextTier = currentTierIndex < this.tiers.length - 1 ? this.tiers[currentTierIndex + 1] : null;
    
    if (!nextTier) {
      return {
        currentTier,
        nextTier: null,
        progressPercentage: 100,
        pointsToNext: 0,
        spentToNext: 0,
      };
    }

    const pointsToNext = Math.max(0, nextTier.minPoints - member.points);
    const spentToNext = Math.max(0, nextTier.minSpent - member.lifetimeSpent);
    
    const pointsProgress = Math.min(100, (member.points / nextTier.minPoints) * 100);
    const spentProgress = Math.min(100, (member.lifetimeSpent / nextTier.minSpent) * 100);
    const progressPercentage = Math.max(pointsProgress, spentProgress);

    return {
      currentTier,
      nextTier,
      progressPercentage,
      pointsToNext,
      spentToNext,
    };
  }

  // Check for tier upgrade
  async checkTierUpgrade(userId: string): Promise<{
    upgraded: boolean;
    newTier?: string;
    oldTier?: string;
  }> {
    try {
      const response = await fetch(`/api/loyalty/check-tier/${userId}`, {
        method: 'POST',
      });
      
      if (!response.ok) {
        throw new Error('Failed to check tier upgrade');
      }

      const result = await response.json();
      
      if (result.upgraded) {
        // Track tier upgrade
        analytics.trackEvent({
          action: 'loyalty_tier_upgraded',
          category: 'engagement',
          label: result.newTier,
          custom_parameters: {
            old_tier: result.oldTier,
            new_tier: result.newTier,
          },
        });
      }

      return result;
    } catch (error) {
      console.error('Error checking tier upgrade:', error);
      return { upgraded: false };
    }
  }

  // Get member benefits
  getMemberBenefits(tier: string): LoyaltyBenefit[] {
    const tierInfo = this.getTierInfo(tier);
    if (!tierInfo) return [];

    return tierInfo.benefits.filter(benefit => benefit.active);
  }

  // Calculate discount for member
  getMemberDiscount(tier: string): number {
    const benefits = this.getMemberBenefits(tier);
    const discountBenefit = benefits.find(b => b.type === 'discount' && b.value);
    return discountBenefit?.value || 0;
  }

  // Check if member has free shipping
  hasFreeShipping(tier: string): boolean {
    const benefits = this.getMemberBenefits(tier);
    return benefits.some(b => b.type === 'free_shipping');
  }

  // Get referral code
  async getReferralCode(userId: string): Promise<string | null> {
    try {
      const response = await fetch(`/api/loyalty/referral-code/${userId}`);
      
      if (!response.ok) {
        throw new Error('Failed to get referral code');
      }

      const data = await response.json();
      return data.code;
    } catch (error) {
      console.error('Error getting referral code:', error);
      return null;
    }
  }

  // Process referral
  async processReferral(referralCode: string, newUserId: string): Promise<boolean> {
    try {
      const response = await fetch('/api/loyalty/referral', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          referralCode,
          newUserId,
        }),
      });

      const result = await response.json();

      if (result.success) {
        analytics.trackEvent({
          action: 'loyalty_referral_completed',
          category: 'engagement',
          custom_parameters: {
            referrer_id: result.referrerId,
            new_user_id: newUserId,
          },
        });
      }

      return result.success;
    } catch (error) {
      console.error('Error processing referral:', error);
      return false;
    }
  }

  // Format points display
  formatPoints(points: number): string {
    return points.toLocaleString();
  }

  // Format currency value
  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  }
}

export const loyaltyService = new LoyaltyService();

// Utility functions
export const getTierColor = (tier: string): string => {
  const tierInfo = loyaltyService.getTierInfo(tier);
  return tierInfo?.color || '#CD7F32';
};

export const getTierIcon = (tier: string): string => {
  const tierInfo = loyaltyService.getTierInfo(tier);
  return tierInfo?.icon || '🥉';
};

export const formatPointsValue = (points: number, rate: number = 0.01): string => {
  const value = points * rate;
  return loyaltyService.formatCurrency(value);
};

export default loyaltyService;
