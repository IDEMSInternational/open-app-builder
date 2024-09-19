import { ErrorHandler, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouteReuseStrategy } from "@angular/router";
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { IonicModule, IonicRouteStrategy } from "@ionic/angular";

// Libs
import { LottieModule } from "ngx-lottie";
import player from "lottie-web";

// Native
import { HTTP } from "@ionic-native/http/ngx";
import { Device } from "@ionic-native/device/ngx";

// Components
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { SharedModule } from "./shared/shared.module";
import { TemplateComponentsModule } from "./shared/components/template/template.module";
import { ContextMenuModule } from "./shared/modules/context-menu/context-menu.module";
import { TourModule } from "./feature/tour/tour.module";
import { ErrorHandlerService } from "./shared/services/error-handler/error-handler.service";
import { ServerAPIInterceptor } from "./shared/services/server/interceptors";
import { DeploymentFeaturesModule } from "./deployment-features.module";

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
    SharedModule,
    FormsModule,
    LottieModule.forRoot({ player: lottiePlayerFactory }),
    // NOTE CC 2021-11-04 not sure if cache causes issues or not https://github.com/ngx-lottie/ngx-lottie/issues/115
    // LottieCacheModule.forRoot(),
    TemplateComponentsModule,
    TourModule,
    ContextMenuModule,
    DeploymentFeaturesModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    HTTP,
    Device,
    // Use custom api interceptor to handle interaction with server backend
    { provide: HTTP_INTERCEPTORS, useClass: ServerAPIInterceptor, multi: true },
    // Use custom error handler
    { provide: ErrorHandler, useClass: ErrorHandlerService },
    provideHttpClient(withInterceptorsFromDi()),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
