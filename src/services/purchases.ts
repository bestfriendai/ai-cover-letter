import Purchases, { LOG_LEVEL } from 'expo-purchases';

// RevenueCat Configuration
// IMPORTANT: Replace these with your actual RevenueCat API keys
const REVENUECAT_API_KEYS = {
  ios: 'your_ios_api_key_here',
  android: 'your_android_api_key_here',
};

// Subscription Package IDs (from RevenueCat Dashboard)
export const PACKAGE_IDS = {
  monthly: '$monthly_sub',
  annual: '$annual_sub',
};

// Feature flags based on premium status
export interface PremiumFeatures {
  unlimitedLetters: boolean;
  aiTailoring: boolean;
  templates: number; // 0 = none, 20+ = all
  atsOptimized: boolean;
  exportPdf: boolean;
  prioritySupport: boolean;
  marketInsights: boolean;
}

const FREE_FEATURES: PremiumFeatures = {
  unlimitedLetters: false,
  aiTailoring: false,
  templates: 0,
  atsOptimized: false,
  exportPdf: false,
  prioritySupport: false,
  marketInsights: false,
};

const PREMIUM_FEATURES: PremiumFeatures = {
  unlimitedLetters: true,
  aiTailoring: true,
  templates: 999,
  atsOptimized: true,
  exportPdf: true,
  prioritySupport: true,
  marketInsights: true,
};

class RevenueCatService {
  private initialized = false;
  private isAnnual = false;

  async initialize() {
    if (this.initialized) return;

    try {
      // Configure logging
      Purchases.setLogLevel(LOG_LEVEL.DEBUG);

      // Initialize with API key (platform auto-detected)
      await Purchases.configure({ 
        apiKey: REVENUECAT_API_KEYS.ios 
      });

      this.initialized = true;
      console.log('RevenueCat initialized successfully');
    } catch (error) {
      console.error('Failed to initialize RevenueCat:', error);
    }
  }

  async getPremiumStatus(): Promise<{
    isPremium: boolean;
    features: PremiumFeatures;
    expiryDate: Date | null;
  }> {
    await this.initialize();

    try {
      const customerInfo = await Purchases.getCustomerInfo();
      
      // Check if any active subscription exists
      const isPremium = customerInfo.entitlements.active['premium'] !== undefined;
      
      if (isPremium) {
        const entitlement = customerInfo.entitlements.active['premium'];
        const expiryDate = entitlement?.expirationDate 
          ? new Date(entitlement.expirationDate) 
          : null;
        
        return {
          isPremium: true,
          features: PREMIUM_FEATURES,
          expiryDate,
        };
      }

      return {
        isPremium: false,
        features: FREE_FEATURES,
        expiryDate: null,
      };
    } catch (error) {
      console.error('Error getting premium status:', error);
      // Default to free on error
      return {
        isPremium: false,
        features: FREE_FEATURES,
        expiryDate: null,
      };
    }
  }

  async purchasePackage(packageId: string): Promise<boolean> {
    await this.initialize();

    try {
      const { customerInfo } = await Purchases.purchasePackage(packageId);
      
      // Check if purchase was successful
      const isPremium = customerInfo.entitlements.active['premium'] !== undefined;
      return isPremium;
    } catch (error) {
      // User cancelled or error
      console.error('Purchase error:', error);
      return false;
    }
  }

  async restorePurchases(): Promise<boolean> {
    await this.initialize();

    try {
      const customerInfo = await Purchases.restorePurchases();
      const isPremium = customerInfo.entitlements.active['premium'] !== undefined;
      return isPremium;
    } catch (error) {
      console.error('Restore error:', error);
      return false;
    }
  }

  // Check if user can generate more letters (for free tier limit)
  async canGenerateLetter(): Promise<boolean> {
    const { features } = await this.getPremiumStatus();
    return features.unlimitedLetters;
  }

  // Get remaining free letters (simulated - in production, track in your backend)
  async getRemainingFreeLetters(): Promise<number> {
    // This would typically be tracked in your backend
    // For now, return 0 to indicate no free letters remaining
    return 0;
  }
}

export const revenueCat = new RevenueCatService();
export default revenueCat;
