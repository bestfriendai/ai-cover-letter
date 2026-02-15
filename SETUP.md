# AI Cover Letter - Setup Guide

## Prerequisites

### Required Accounts
- Apple Developer Account ($99/year)
- Google Play Console ($25 one-time)
- RevenueCat Account (free tier available)

### Development Environment
- Node.js 18+
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- Xcode (for iOS builds)
- Android Studio (for Android builds)

### System Requirements
- macOS (for iOS builds) or Windows/Linux (Android only)
- 8GB RAM minimum
- 20GB disk space

---

## Installation

### Step 1: Clone and Install Dependencies

```bash
cd ai-cover-letter
npm install
```

### Step 2: Configure RevenueCat

1. Open `src/services/purchases.ts`
2. Replace the API keys with your RevenueCat keys:

```typescript
const REVENUECAT_API_KEYS = {
  ios: 'your_ios_api_key_here',
  android: 'your_android_api_key_here',
};
```

### Step 3: Run Development Server

```bash
npx expo start
```

### Step 4: Run on Device

- Press `i` for iOS simulator
- Press `a` for Android emulator
- Scan QR code with Expo Go app

---

## RevenueCat Setup

### Step 1: Create Project
1. Go to [RevenueCat.com](https://www.revenuecat.com)
2. Click "New Project"
3. Name: "AI Cover Letter"
4. Platform: iOS + Android

### Step 2: Add Apps
- iOS: Enter Bundle ID `com.startupstartup.aicoverletter`
- Android: Enter Package Name `com.startupstartup.aicoverletter`

### Step 3: Create Products

#### Monthly Subscription
- Product ID: `$monthly_sub`
- Price: $4.99
- Duration: 1 month
- Trial: 7 days (optional)

#### Annual Subscription
- Product ID: `$annual_sub`
- Price: $39.99
- Duration: 1 year
- Trial: 7 days (optional)

### Step 4: Create Entitlements
1. Create entitlement called "premium"
2. Link both products to the entitlement
3. Set as default

### Step 5: Get API Keys
1. Go to Project Settings → API Keys
2. Copy your iOS and Android keys
3. Update `src/services/purchases.ts`

---

## App Store Connect Setup

### iOS (Apple Developer)

#### Step 1: Create Bundle ID
1. Go to [developer.apple.com](https://developer.apple.com)
2. Navigate to Certificates, Identifiers & Profiles
3. Create Identifier: `com.startupstartup.aicoverletter`
4. Type: App IDs → App

#### Step 2: Create App Record
1. Go to [App Store Connect](https://appstoreconnect.apple.com)
2. Create new App
3. Name: AI Cover Letter
4. Bundle ID: `com.startupstartup.aicoverletter`
5. Category: Business

#### Step 3: Upload Screenshots
Required sizes:
- 6.5" (iPhone 13/14 Pro Max): 1242 × 2688
- 5.5" (iPhone 8 Plus): 1242 × 2208
- 12.9" (iPad Pro): 2048 × 2732

#### Step 4: Submit for Review
- Review Time: 24-48 hours typically
- Notes: Include demo account if needed

---

## Google Play Console Setup

### Step 1: Create Application
1. Go to [play.google.com/console](https://play.google.com/console)
2. Create application
3. Package name: `com.startupstartup.aicoverletter`

### Step 2: Complete Store Listing
- Title: AI Cover Letter
- Short description: Generate cover letters with AI
- Full description: (detailed features)
- Screenshots: 1080 × 1920

### Step 3: App Bundle
- Upload your signed .aab file
- Minimum SDK: 24 (Android 7.0)
- Target SDK: 34 (Android 14)

### Step 4: Pricing & Distribution
- Select countries
- Set pricing (free with IAP)

---

## EAS Build Commands

### Step 1: Install EAS CLI
```bash
npm install -g eas-cli
```

### Step 2: Login
```bash
eas login
```

### Step 3: Configure EAS
```bash
eas build:configure
```

### Step 4: Build for iOS
```bash
# Development build
eas build --platform ios --profile development

# Production build (App Store)
eas build --platform ios --profile production
```

### Step 5: Build for Android
```bash
# Development build
eas build --platform android --profile development

# Production build (Play Store)
eas build --platform android --profile production
```

---

## Submission Checklist

### Pre-Submission
- [ ] App builds successfully
- [ ] All screens render correctly
- [ ] RevenueCat integration working
- [ ] Premium features properly gated
- [ ] Privacy policy URL ready
- [ ] Support URL ready
- [ ] App icon (1024×1024)
- [ ] Screenshots captured

### iOS Specific
- [ ] Bundle ID registered
- [ ] App Store listing complete
- [ ] Screenshots uploaded (all required sizes)
- [ ] Test account provided (if needed)
- [ ] Build uploaded via EAS

### Android Specific
- [ ] Package name registered
- [ ] Play Store listing complete
- [ ] Screenshots uploaded
- [ ] AAB uploaded via EAS

### After Submission
- [ ] Monitor for rejection emails
- [ ] Address any feedback promptly
- [ ] Approve release when ready

---

## Troubleshooting

### Common Issues

#### Build Fails
- Run `npx expo install` to fix dependency issues
- Clear cache: `npx expo start --clear`

#### RevenueCat Not Working
- Verify API keys are correct
- Check entitlements are configured
- Test in sandbox mode first

#### App Crashes
- Check console logs in development
- Verify all assets are included
- Test on physical device

---

## Support

- Email: support@startupstartup.app
- Website: https://startupstartup.app
