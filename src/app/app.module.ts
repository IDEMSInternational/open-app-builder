import { ErrorHandler, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouteReuseStrategy } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
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

@NgModule({
  declarations: [AppComponent],
  imports: [
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
  ],
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
