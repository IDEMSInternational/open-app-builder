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
import { ChatService } from './shared/services/chat/chat.service';
import { OfflineChatService } from './shared/services/chat/offline/offline-chat.service';
import { OnlineChatService } from './shared/services/chat/online/online-chat.service';
import { FormsModule } from '@angular/forms';

const introModules = [
  IntroTutorialPageModule,
  AppTermsPageModule,
  PrivacyPageModule,
];

@NgModule({
  declarations: [AppComponent],

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
    ...introModules,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: ChatService, useClass: OnlineChatService },
    HTTP,
    Device,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
