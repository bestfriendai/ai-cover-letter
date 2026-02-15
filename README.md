# AI Cover Letter

AI-powered mobile app that generates personalized, job-specific cover letters in seconds.

## Features

- 🤖 AI-powered cover letter generation
- 📱 Mobile-first design
- 🎯 ATS keyword optimization
- 💾 Letter library management
- ✏️ Full editing control
- ⭐ Premium features available

## Tech Stack

- Expo SDK 54
- React Native 0.79
- Expo Router
- RevenueCat (monetization)
- Zustand (state)
- AsyncStorage (persistence)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Expo CLI

### Installation

```bash
cd ai-cover-letter
npm install
npx expo start
```

### Running

```bash
# iOS
npx expo start --ios

# Android
npx expo start --android

# Web
npx expo start --web
```

## Project Structure

```
app/
├── _layout.tsx      # Root layout
├── index.tsx        # Landing/generator screen
├── home.tsx        # Generated letter view
├── paywall.tsx     # RevenueCat paywall
└── settings.tsx    # App settings

src/
├── services/
│   └── purchases.ts   
├── # RevenueCat integration hooks/              # Custom hooks
└── ui/                 # UI components
```

## RevenueCat Setup

1. Create account at [revenuecat.com](https://revenuecat.com)
2. Add iOS/Android app
3. Create products:
   - Monthly: $4.99/mo
   - Yearly: $29.99/yr
4. Copy API keys to `src/services/purchases.ts`

## API Configuration

This app uses **OpenAI** for AI-powered cover letter generation.

### Required .env Variables

```bash
# OpenAI API (for cover letter generation)
EXPO_PUBLIC_OPENAI_API_KEY=your_openai_api_key

# RevenueCat (for subscriptions - optional for basic functionality)
EXPO_PUBLIC_REVENUECAT_API_KEY=your_revenuecat_api_key
```

### Getting API Keys

1. **OpenAI API Key**:
   - Go to [OpenAI Platform](https://platform.openai.com/api-keys)
   - Create a new secret key
   - Add payment method (pay-as-you-go pricing)

2. **RevenueCat** (optional, for premium):
   - Go to [RevenueCat](https://www.revenuecat.com)
   - Create project and get API key
   - Configure products in App Store Connect / Google Play Console

### Type Check & Build

```bash
# Install dependencies
npm install

# Type check
npx tsc --noEmit

# Start development server
npx expo start

# Build for iOS
eas build --platform ios

# Build for Android
eas build --platform android
```

## License

MIT
