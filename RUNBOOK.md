# Runbook: AI Cover Letter

## First Run

1. **Clone the repository**
2. **Install dependencies**: `npm install`
3. **Start Expo**: `npx expo start`
4. **Scan QR code** with iOS/Android device

## Development

### File Organization

- `app/` - Expo Router screens
- `src/` - Source code (components, hooks, services)
- `assets/` - Images and fonts

### Key Screens

| Screen | File | Purpose |
|--------|------|---------|
| Home/Generator | `app/index.tsx` | Input resume & job desc |
| Letter View | `app/home.tsx` | Display generated letter |
| Paywall | `app/paywall.tsx` | Premium upgrade |
| Settings | `app/settings.tsx` | App settings |

### Making Changes

1. Edit files in `app/` or `src/`
2. Changes hot-reload automatically
3. Rebuild for production: `npx expo prebuild && npx expo run:ios`

## Testing

### Manual Testing Checklist

- [ ] Generate cover letter with valid inputs
- [ ] Test with empty inputs (validation)
- [ ] Save letter to library
- [ ] Edit generated letter
- [ ] Copy letter to clipboard
- [ ] Navigate to paywall
- [ ] Test settings toggles

### Build Testing

```bash
# iOS
npx expo prebuild --platform ios
cd ios && xcodebuild -workspace *.xcworkspace -scheme * -configuration Debug -destination "platform=iOS Simulator" build

# Android
npx expo prebuild --platform android
cd android && ./gradlew assembleDebug
```

## Troubleshooting

### Metro Bundler Issues

```bash
npx expo start --reset-cache
```

### TypeScript Errors

```bash
npx tsc --noEmit
```

### iOS Build Errors

```bash
cd ios && pod install
```
