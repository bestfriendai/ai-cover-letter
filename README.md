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

## License

MIT
