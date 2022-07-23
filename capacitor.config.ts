/// <reference types="@capacitor/local-notifications" />
/// <reference types="@capacitor/splash-screen" />

import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "international.idems.plh_teens",
  appName: "PLH Teens",
  bundledWebRuntime: false,
  webDir: "www",
  plugins: {
    SplashScreen: {
      launchShowDuration: 7000, // app.component.ts should manually dismiss before duration
      launchAutoHide: true,
      androidScaleType: "CENTER_CROP",
    },
    FirebaseAuthentication: {
      skipNativeAuth: false,
      providers: ["google.com"],
    },
  },
};

export default config;
