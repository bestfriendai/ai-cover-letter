import 'expo-router';

export default {
  expo: {
    name: "AI Cover Letter",
    slug: "ai-cover-letter",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    scheme: "aicoverletter",
    newArchEnabled: true,
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#4F46E5"
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.aicoverletter.app"
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/icon.png",
        backgroundColor: "#4F46E5"
      },
      package: "com.aicoverletter.app"
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/favicon.png"
    },
    plugins: [
      "expo-router",
      [
        "expo-purchases",
        {
          "apiKey": "YOUR_REVENUECAT_API_KEY"
        }
      ]
    ],
    extra: {
      eas: {
        projectId: "ai-cover-letter"
      }
    }
  }
};
