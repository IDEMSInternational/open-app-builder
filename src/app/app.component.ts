import { Component, ElementRef, ViewChild } from "@angular/core";
import { Platform, MenuController } from "@ionic/angular";
import { Router } from "@angular/router";
import { Plugins, Capacitor } from "@capacitor/core";
const { SplashScreen } = Plugins;
import { NotificationService } from "./shared/services/notification/notification.service";
import { DbService } from "./shared/services/db/db.service";
import { ThemeService } from "./feature/theme/theme-service/theme.service";
import { SurveyService } from "./feature/survey/survey.service";
import { environment } from "src/environments/environment";
import { TaskActionService } from "./shared/services/task/task-action.service";
import { UserMetaService } from "./shared/services/userMeta/userMeta.service";
import { TourService } from "./shared/services/tour/tour.service";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {
  APP_VERSION = environment.version;
  skipTutorial: boolean;

  constructor(
    private platform: Platform,
    private menuController: MenuController,
    private router: Router,
    private notifications: NotificationService,
    private dbService: DbService,
    private userMetaService: UserMetaService,
    private themeService: ThemeService,
    private surveyService: SurveyService,
    /** Inject in the main app component to start tracking actions immediately */
    public taskActions: TaskActionService,
    public tourService: TourService
  ) {
    this.initializeApp();
    this.tourService.setSteps([
      {
        route: "module_list",
        selector: "#main-content > plh-module-list > div > div > plh-module-focus-skin > div > plh-slide-panel-right > section > h3",
        instructions: "Click modules to see the list of modules"
      },
      {
        preStepClick: {
          selector: "#main-content > plh-module-list > div > div > plh-module-focus-skin > div > plh-slide-panel-right > section > h3",
          continueDelay: 1000
        },
        route: "module_list",
        selector: "#main-content > plh-module-list > div > div > plh-module-focus-skin > div > plh-slide-panel-right > section",
        instructions: "Now click a module circle to change the module"
      },
      {
        preStepClick: {
          selector: "#main-content > plh-module-list > div > div > plh-module-focus-skin > div > plh-slide-panel-right > section > h3",
          continueDelay: 1000
        },
        route: "module_list",
        selector: "#main-content > plh-module-list > div > div > plh-module-focus-skin > div > plh-habit-tracker > div > div.habit-list > ion-button",
        instructions: "Click here to track your daily habits"
      },
      {
        preStepClick: {
          selector: "#main-content > plh-module-list > div > div > plh-module-focus-skin > div > plh-habit-tracker > div > div.habit-list > ion-button",
          continueDelay: 1000
        },
        route: "module_list",
        selector: "#ion-overlay-1 > div.modal-wrapper.ion-overlay-wrapper.sc-ion-modal-md > plh-habit-add > ion-content",
        instructions: "Click one of the habits to mark it as done"
      },
      {
        preStepClick: {
          selector: "#ion-overlay-1 > div.modal-wrapper.ion-overlay-wrapper.sc-ion-modal-md > plh-habit-add > ion-header > ion-toolbar > ion-buttons > ion-button",
          continueDelay: 1000
        },
        route: "module_list",
        selector: "#ion-overlay-1 > div.modal-wrapper.ion-overlay-wrapper.sc-ion-modal-md > plh-habit-add > ion-content",
        instructions: "Click here to start a module"
      }
    ]);
    setTimeout(() => {
      this.tourService.start();
    }, 2000);
  }

  async initializeApp() {
    this.themeService.init();
    this.platform.ready().then(async () => {
      this.dbService.init();
      const user = await this.userMetaService.init();
      if (!user.first_app_open) {
        await this.surveyService.runSurvey("introSplash");
        await this.surveyService.runSurvey("analytics");
        await this.userMetaService.setUserMeta({ first_app_open: new Date().toISOString() });
      }
      this.skipTutorial = true;
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
