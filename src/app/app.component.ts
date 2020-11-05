import { Component } from "@angular/core";

import { Platform, MenuController } from "@ionic/angular";
import { Router } from "@angular/router";
import { Plugins, Capacitor } from "@capacitor/core";
const { SplashScreen } = Plugins;
import { NotificationService } from "./shared/services/notification/notification.service";
import { DbService } from "./shared/services/db/db.service";
import { ChatService } from "./shared/services/chat/chat.service";
import { LocalStorageService } from "./shared/services/local-storage/local-storage.service";
import { SurveyService } from "./feature/survey/survey.service";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {
  skipTutorial: boolean;
  constructor(
    private platform: Platform,
    private menuController: MenuController,
    private router: Router,
    private notifications: NotificationService,
    private dbService: DbService,
    private chatService: ChatService,
    private localStorageService: LocalStorageService,
    private surveyService: SurveyService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(async () => {
      await this.surveyService.runSurvey("analytics");
      await this.surveyService.runSurvey("welcome");
      this.skipTutorial = true;
      this.dbService.init();
      this.menuController.enable(true, "main-side-menu");

      this.chatService.init(!Capacitor.isNative).subscribe();
      if (Capacitor.isNative) {
        SplashScreen.hide();
        this.notifications.init();
      }
    });
    this.localStorageService.setBoolean("welcome_skipped", false);
  }

  clickOnMenuItem(id: string) {
    this.menuController.close("main-side-menu");
    this.router.navigateByUrl("/" + id);
  }
}
