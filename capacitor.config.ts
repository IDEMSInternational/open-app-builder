/// <reference types="@capacitor/local-notifications" />
/// <reference types="@capacitor/splash-screen" />

import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "international.idems.plh_teens_tz",
  appName: "PLH Teens TZ",
  bundledWebRuntime: false,
  webDir: "www",
  plugins: {
    SplashScreen: {
      launchShowDuration: 7000, // app.component.ts should manually dismiss before duration
      launchAutoHide: true,
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
