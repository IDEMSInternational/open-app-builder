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
import { PrivacyPageModule } from "src/app/pages/privacy/privacy.module";
import { AppTermsPageModule } from "src/app/pages/app-terms/app-terms.module";
import { ThemeEditorComponent } from "src/app/feature/theme/theme-editor/theme-editor.component";
import { ColorSketchModule } from "ngx-color/sketch";
import { FormsModule } from "@angular/forms";
import { SurveyModule } from "src/app/feature/survey/survey.module";

const introModules = [AppTermsPageModule, PrivacyPageModule];

@NgModule({
  declarations: [AppComponent, ThemeEditorComponent],

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
    ...introModules,
    SurveyModule,
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, HTTP, Device],
  bootstrap: [AppComponent],
})
export class AppModule {}
