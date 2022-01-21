/// <reference types="@capacitor/local-notifications" />
/// <reference types="@capacitor/splash-screen" />

import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "international.idems.family_based_math",
  appName: "Family Based Math",
  bundledWebRuntime: false,
  webDir: "www",
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,
    },
    CapacitorFirebaseAuth: {
      providers: ["google.com"],
      languageCode: "en",
      nativeAuth: false,
      permissions: {
        google: ["profile"],
      },
    },
  },
};

export default config;
