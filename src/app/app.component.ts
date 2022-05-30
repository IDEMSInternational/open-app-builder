import { Component } from "@angular/core";
import { Platform, MenuController } from "@ionic/angular";
import { Router } from "@angular/router";
import { Capacitor } from "@capacitor/core";
import { SplashScreen } from "@capacitor/splash-screen";
import { App } from "@capacitor/app";
import { DbService } from "./shared/services/db/db.service";
import { ThemeService } from "./feature/theme/theme-service/theme.service";
import { environment } from "src/environments/environment";
import { TaskActionService } from "./shared/services/task/task-action.service";
import { UserMetaService } from "./shared/services/userMeta/userMeta.service";
import { AppEventService } from "./shared/services/app-events/app-events.service";
import { TourService } from "./shared/services/tour/tour.service";
import { TemplateService } from "./shared/components/template/services/template.service";
import { CampaignService } from "./feature/campaign/campaign.service";
import { ServerService } from "./shared/services/server/server.service";
import { DataEvaluationService } from "./shared/services/data/data-evaluation.service";
import { TemplateProcessService } from "./shared/components/template/services/instance/template-process.service";
import { isSameDay } from "date-fns";
import { AnalyticsService } from "./shared/services/analytics/analytics.service";
import { LocalNotificationService } from "./shared/services/notification/local-notification.service";
import { TemplateFieldService } from "./shared/components/template/services/template-field.service";
import { TemplateTranslateService } from "./shared/components/template/services/template-translate.service";
import { LocalNotificationInteractionService } from "./shared/services/notification/local-notification-interaction.service";
import { DBSyncService } from "./shared/services/db/db-sync.service";

import { APP_CONSTANTS } from "./data";
import { CrashlyticsService } from "./shared/services/crashlytics/crashlytics.service";
import { AppDataService } from "./shared/services/data/app-data.service";
import { AuthService } from "./shared/services/auth/auth.service";

const {
  APP_FIELDS,
  APP_INITIALISATION_DEFAULTS,
  APP_SIDEMENU_DEFAULTS,
  APP_AUTHENTICATION_DEFAULTS,
} = APP_CONSTANTS;

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {
  APP_VERSION = environment.version;
  DEPLOYMENT_NAME = environment.deploymentName;
  sideMenuDefaults = APP_SIDEMENU_DEFAULTS;
  /** Track when app ready to render sidebar and route templates */
  public renderAppTemplates = false;

  constructor(
    private platform: Platform,
    private menuController: MenuController,
    private router: Router,
    private dbService: DbService,
    private dbSyncService: DBSyncService,
    private userMetaService: UserMetaService,
    private themeService: ThemeService,
    private tourService: TourService,
    private templateService: TemplateService,
    private templateFieldService: TemplateFieldService,
    private templateProcessService: TemplateProcessService,
    private appEventService: AppEventService,
    private campaignService: CampaignService,
    private dataEvaluationService: DataEvaluationService,
    private analyticsService: AnalyticsService,
    private localNotificationService: LocalNotificationService,
    private localNotificationInteractionService: LocalNotificationInteractionService,
    private templateTranslateService: TemplateTranslateService,
    private crashlyticsService: CrashlyticsService,
    private appDataService: AppDataService,
    private authService: AuthService,
    /** Inject in the main app component to start tracking actions immediately */
    public taskActions: TaskActionService,
    public serverService: ServerService
  ) {
    this.initializeApp();
  }

  async initializeApp() {
    this.platform.ready().then(async () => {
      // ensure deployment field set correctly for use in any startup services or templates
      localStorage.setItem(APP_FIELDS.DEPLOYMENT_NAME, this.DEPLOYMENT_NAME);
      await this.initialiseCoreServices();
      this.hackSetDeveloperOptions();
      const isDeveloperMode = this.templateFieldService.getField("user_mode") === false;
      const user = this.userMetaService.userMeta;
      // Authentication requires verified domain and app ids populated to firebase console
      // Currently only run on native where specified (but can comment out for testing locally)
      if (APP_AUTHENTICATION_DEFAULTS.enforceLogin && Capacitor.isNativePlatform()) {
        await this.ensureUserSignedIn();
      }
      await this.handleLaunchDataActions(user);
      if (!user.first_app_open) {
        await this.userMetaService.setUserMeta({ first_app_open: new Date().toISOString() });
      }
      this.menuController.enable(true, "main-side-menu");
      if (Capacitor.isNativePlatform()) {
        if (!isDeveloperMode) {
          this.removeConsoleLogs();
        }
        await SplashScreen.hide();
      }
      // Show main template
      this.renderAppTemplates = true;
      this.scheduleReinitialisation();
    });
  }

  async ensureUserSignedIn() {
    const authUser = await this.authService.getCurrentUser();
    if (!authUser) {
      const templatename = APP_AUTHENTICATION_DEFAULTS.signInTemplate;
      const { modal } = await this.templateService.runStandaloneTemplate(templatename, {
        showCloseButton: false,
        waitForDismiss: false,
      });
      await this.authService.waitForSignInComplete();
      await modal.dismiss();
    }
  }

  /**
   * Various services set core app data which may be used in templates such as current app day,
   * user id etc. Make sure these services have run their initialisation logic before proceeding.
   *
   * Note - For some of these services order will be important
   * (e.g. notifications before campaigns that require notifications)
   **/
  async initialiseCoreServices() {
    this.crashlyticsService.init(); // Start init but do not need to wait for complete
    await this.dbService.init();
    await this.userMetaService.init();
    this.themeService.init();
    /** CC 2021-05-14 - disabling reminders service until decide on full implementation (ideally not requiring evaluation of all reminders on init) */
    // this.remindersService.init();
    await this.appEventService.init();
    await this.serverService.init();
    await this.dataEvaluationService.refreshDBCache();
    await this.templateTranslateService.init();
    await this.appDataService.init();
    await this.templateService.init();
    await this.templateProcessService.init();
    await this.campaignService.init();
    await this.tourService.init();

    // Initialise additional services in a non-blocking way
    setTimeout(async () => {
      await this.localNotificationInteractionService.init();
      await this.localNotificationService.init();
      await this.dbSyncService.init();
      await this.analyticsService.init();
      /** CC 2022-04-01 - Disable service as not currently in use */
      // await this.pushNotificationService.init();
    }, 1000);
  }

  /**
   * Run app-specific launch tasks
   **/
  private async handleLaunchDataActions(user) {
    for (const initAction of APP_INITIALISATION_DEFAULTS.app_launch_actions) {
      if (initAction.first_launch_only && user.first_app_open) {
        continue;
      }
      if (initAction.condition) {
        const conditionMet = this.checkLaunchActionCondition(initAction.condition, user);
        if (!conditionMet) {
          continue;
        }
      }
      switch (initAction.type) {
        case "template_popup":
          await this.templateService.runStandaloneTemplate(initAction.value, {
            showCloseButton: false,
          });
          break;
        case "tour_start":
          await this.tourService.startTour(initAction.value);
          break;
        default:
          console.error("Startup action not defined:", initAction);
          break;
      }
    }
  }

  checkLaunchActionCondition(condition, user) {
    if (condition === "terms_not_accepted") {
      return !user.terms_accepted;
    }
    return false;
  }

  clickOnMenuItem(id: string) {
    this.menuController.close("main-side-menu");
    this.router.navigateByUrl("/" + id);
  }

  /** Rewrite default log functions for improved performance when running on device */
  private removeConsoleLogs() {
    if (window && window.console) {
      console.log("Disabling console logs");
      window.console.log = function (...args: any) {};
      window.console.warn = function (...args: any) {};
      window.console.error = function (...args: any) {};
    }
  }

  /**
   * The app might be left running in the background for multiple days
   * Ensure information such as the current app day are kept updated in this case
   *
   * Note - prefer use of listener to app resume instead of specific timer, as these can be paused when app minimised
   * https://stackoverflow.com/questions/6543325/what-happens-to-javascript-execution-settimeout-etc-when-iphone-android-goes
   */
  private async scheduleReinitialisation() {
    App.addListener("appStateChange", async ({ isActive }) => {
      if (isActive) {
        const lastLaunchEntry = await this.dbService
          .table("app_events")
          .orderBy("_created")
          .reverse()
          .first();
        const lastLaunchDay = new Date(lastLaunchEntry._created);
        // reprocess initialisation if the day has changed
        if (!isSameDay(lastLaunchDay, new Date())) {
          await this.initialiseCoreServices();
        } else {
          console.log("welcome back :D");
        }
      }
    });
  }

  /** ensure localhost dev can see all non-user content */
  private hackSetDeveloperOptions() {
    if (location.hostname === "localhost" && !environment.production) {
      const isUserMode = this.templateFieldService.getField("user_mode");
      if (isUserMode !== false) {
        this.templateFieldService.setField("user_mode", "false");
      }
    }
  }
}
