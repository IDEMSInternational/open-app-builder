/// <reference types="@capacitor/local-notifications" />
/// <reference types="@capacitor/splash-screen" />

import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "international.idems.plh-facilitator-mx",
  appName: "Formando Conciencia+",
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
  server: {
    androidScheme: "http",
    /**
     * NOTE - to support live-reload on external device (e.g. emulator)
     * 1) Uncomment url and replace with local ip to serve live-reload on local device
     * 2) Sync to capacitor `npx cap sync`
     * 3) Serve via `yarn ng serve --configuration=external`
     * 4) Run app from android studio `npx cap open android` and run
     * Local browser (localhost:4000), device app and device browser ([ip]:4200) should all be able to access served app
     **/
    // url: "http://192.168.50.67:4200",
  },
};

export default config;
