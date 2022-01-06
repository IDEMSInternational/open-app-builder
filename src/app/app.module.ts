import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouteReuseStrategy } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { IonicModule, IonicRouteStrategy } from "@ionic/angular";

// Native
import { HTTP } from "@ionic-native/http/ngx";
import { Device } from "@ionic-native/device/ngx";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { SharedModule } from "./shared/shared.module";

import { environment } from "src/environments/environment";
import { ThemeEditorComponent } from "src/app/feature/theme/theme-editor/theme-editor.component";
import { ColorSketchModule } from "ngx-color/sketch";
import { FormsModule } from "@angular/forms";
import { SurveyModule } from "src/app/feature/survey/survey.module";

import { LottieModule, LottieCacheModule } from "ngx-lottie";
import player from "lottie-web";
import { NgxMatomoTrackerModule } from "@ngx-matomo/tracker";
import { NgxMatomoRouterModule } from "@ngx-matomo/router";
import { TourComponent } from "./feature/tour/tour.component";
import { httpInterceptorProviders } from "./shared/services/server/interceptors";
import { TemplateComponentsModule } from "./shared/components/template/template.module";

// Note we need a separate function as it's required
// by the AOT compiler.
export function lottiePlayerFactory() {
  return player;
}

@NgModule({
  declarations: [AppComponent, ThemeEditorComponent, TourComponent],

  entryComponents: [],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    FormsModule,
    ColorSketchModule,
    SurveyModule,
    LottieModule.forRoot({ player: lottiePlayerFactory }),
    // NOTE CC 2021-11-04 not sure if cache causes issues or not https://github.com/ngx-lottie/ngx-lottie/issues/115
    // LottieCacheModule.forRoot(),
    TemplateComponentsModule,
    NgxMatomoTrackerModule.forRoot({
      siteId: environment.analytics.siteId,
      trackerUrl: environment.analytics.endpoint,
    }),
    NgxMatomoRouterModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    HTTP,
    Device,
    httpInterceptorProviders,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
