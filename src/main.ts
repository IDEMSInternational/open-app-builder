import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { Capacitor } from "@capacitor/core";
import { defineCustomElements } from "@ionic/pwa-elements/loader";

import { AppModule } from "./app/app.module";
import { environment } from "./environments/environment";

if (environment.production) {
  enableProdMode();
}

if (Capacitor.isNative) {
  /** Rewrite default log functions for improved performance when running on device */
  if (window && window.console) {
    window.console.log = function (...args: any) {};
    window.console.warn = function (...args: any) {};
    window.console.error = function (...args: any) {};
  }
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.log(err));

if (!Capacitor.isNative) {
  // Call PWA custom element loader after the platform has been bootstrapped
  defineCustomElements(window);
}
