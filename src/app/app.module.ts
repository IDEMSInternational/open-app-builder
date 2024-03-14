import { ErrorHandler, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouteReuseStrategy } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { provideFirebaseApp, initializeApp } from "@angular/fire/app";
import { getAuth, provideAuth } from "@angular/fire/auth";
import { IonicModule, IonicRouteStrategy } from "@ionic/angular";

// Libs
import { LottieModule } from "ngx-lottie";
import player from "lottie-web";
import { MatomoModule, MatomoRouterModule } from "ngx-matomo-client";

// Native
import { HTTP } from "@ionic-native/http/ngx";
import { Device } from "@ionic-native/device/ngx";

// Components
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { SharedModule } from "./shared/shared.module";
import { environment } from "src/environments/environment";
import { httpInterceptorProviders } from "./shared/services/server/interceptors";
import { TemplateComponentsModule } from "./shared/components/template/template.module";
import { ContextMenuModule } from "./shared/modules/context-menu/context-menu.module";
import { TourModule } from "./feature/tour/tour.module";
import { ErrorHandlerService } from "./shared/services/error-handler/error-handler.service";

// Note we need a separate function as it's required
// by the AOT compiler.
export function lottiePlayerFactory() {
  return player;
}

// Common imports
const imports = [
  BrowserModule,
  BrowserAnimationsModule,
  IonicModule.forRoot(),
  AppRoutingModule,
  HttpClientModule,
  SharedModule,
  FormsModule,
  LottieModule.forRoot({ player: lottiePlayerFactory }),
  // NOTE CC 2021-11-04 not sure if cache causes issues or not https://github.com/ngx-lottie/ngx-lottie/issues/115
  // LottieCacheModule.forRoot(),
  TemplateComponentsModule,
  TourModule,
  MatomoModule.forRoot({
    siteId: environment.analytics.siteId,
    trackerUrl: environment.analytics.endpoint,
  }),
  MatomoRouterModule,
  ContextMenuModule,
];

// Deployment-specific imports
loadFirebaseImports();

@NgModule({
  declarations: [AppComponent],
  imports,
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    HTTP,
    Device,
    httpInterceptorProviders,
    { provide: ErrorHandler, useClass: ErrorHandlerService },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

/**
 * Configure app module imports dependent on what firebase features should be enabled
 */
function loadFirebaseImports() {
  const { firebase } = environment.deploymentConfig;

  // Check if any services are enabled, simply return if not
  const enabledServices = Object.entries(firebase)
    .filter(([key, v]) => v && v.constructor === {}.constructor && v["enabled"])
    .map(([key]) => key);
  if (enabledServices.length === 0) return;

  // Check config exists if services are enabled
  if (!firebase.config) {
    console.warn(`[Firebase] config missing, services disabled:\n`, enabledServices.join(", "));
    return;
  }

  // Add main firebase initialisation import
  imports.push(
    provideFirebaseApp(() => initializeApp(environment.deploymentConfig.firebase.config))
  );

  // Add feature-dependent imports
  if (firebase.auth.enabled) {
    imports.push(provideAuth(() => getAuth()));
  }
}
