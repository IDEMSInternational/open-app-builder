import { Component } from "@angular/core";

import { Platform, MenuController } from "@ionic/angular";
import { Router } from "@angular/router";
import { Plugins, StatusBarStyle, Capacitor } from "@capacitor/core";
const { SplashScreen } = Plugins;
import { NotificationService } from "./shared/services/notification/notification.service";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private menuController: MenuController,
    private router: Router,
    private notifications: NotificationService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.menuController.enable(true, "main-side-menu");
      if (Capacitor.isNative) {
        SplashScreen.hide();
        this.notifications.init();
      }
    });
  }

  clickOnMenuItem(id: string) {
    this.menuController.close("main-side-menu");
    this.router.navigateByUrl("/" + id);
  }
}
