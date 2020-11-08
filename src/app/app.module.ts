import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
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
import { IntroTutorialPageModule } from "./feature/intro-tutorial/intro-tutorial.module";
import { PrivacyPageModule } from "./feature/privacy/privacy.module";
import { AppTermsPageModule } from "./feature/app-terms/app-terms.module";
import { FormsModule } from '@angular/forms';
import { ThemeEditorComponent } from './feature/theme/theme-editor/theme-editor.component';
import { ColorSketchModule } from 'ngx-color/sketch';

const introModules = [
  IntroTutorialPageModule,
  AppTermsPageModule,
  PrivacyPageModule,
];

@NgModule({
  declarations: [AppComponent, ThemeEditorComponent],

  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    FormsModule,
    ColorSketchModule,
    ...introModules
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    HTTP,
    Device,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
