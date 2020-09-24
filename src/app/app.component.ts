import { Component } from "@angular/core";

import { Platform, MenuController, ModalController } from "@ionic/angular";
import { Router } from "@angular/router";
import { Plugins, StatusBarStyle, Capacitor } from "@capacitor/core";
const { SplashScreen } = Plugins;
import { NotificationService } from "./shared/services/notification/notification.service";
import { DbService } from "./shared/services/db/db.service";
import { IntroTutorialPage } from "./feature/intro-tutorial/intro-tutorial.page";

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
    private modalCtrl: ModalController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.showTutorial();
      this.dbService.init();
      this.menuController.enable(true, "main-side-menu");

      if (Capacitor.isNative) {
        SplashScreen.hide();
        this.notifications.init();
      }
    });
  }

  async showTutorial() {
    // skip tutorial if already seen, or viewing policy pages direct (e.g. google bot)
    this.skipTutorial =
      ["/privacy", "/app-terms"].includes(location.pathname) ||
      localStorage.getItem("tutorialComplete")
        ? true
        : false;
    if (!this.skipTutorial) {
      const modal = await this.modalCtrl.create({
        component: IntroTutorialPage,
        backdropDismiss: false,
        componentProps: { isModal: true },
      });
      await modal.present();
      await modal.onDidDismiss();
      this.skipTutorial = true;
    }
  }

  clickOnMenuItem(id: string) {
    this.menuController.close("main-side-menu");
    this.router.navigateByUrl("/" + id);
  }
}
