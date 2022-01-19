/// <reference types="@capacitor/local-notifications" />
/// <reference types="@capacitor/splash-screen" />

import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "international.idems.plh_tz_dev",
  appName: "PLH TZ Dev",
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
