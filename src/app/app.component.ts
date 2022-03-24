import { Component } from "@angular/core";
import { Platform, MenuController } from "@ionic/angular";
import { Router } from "@angular/router";
import { Capacitor } from "@capacitor/core";
import { SplashScreen } from "@capacitor/splash-screen";
import { App } from "@capacitor/app";
import { PushNotificationService } from "./shared/services/notification/push-notification.service";
import { DbService } from "./shared/services/db/db.service";
import { ThemeService } from "./feature/theme/theme-service/theme.service";
import { SurveyService } from "./feature/survey/survey.service";
import { environment } from "src/environments/environment";
import { TaskActionService } from "./shared/services/task/task-action.service";
import { UserMetaService, IUserMeta } from "./shared/services/userMeta/userMeta.service";
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

const { APP_FIELDS, APP_INITIALISATION_DEFAULTS, APP_SIDEMENU_DEFAULTS } = APP_CONSTANTS;

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {
  APP_VERSION = environment.version;
  DEPLOYMENT_NAME = environment.deploymentName;
  ENV_NAME = environment.envName;
  sideMenuDefaults = APP_SIDEMENU_DEFAULTS;
  /** Track when app ready to render sidebar and route templates */
  public renderAppTemplates = false;

  constructor(
    private platform: Platform,
    private menuController: MenuController,
    private router: Router,
    private pushNotificationService: PushNotificationService,
    private dbService: DbService,
    private dbSyncService: DBSyncService,
    private userMetaService: UserMetaService,
    private themeService: ThemeService,
    private surveyService: SurveyService,
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
    /** Inject in the main app component to start tracking actions immediately */
    public taskActions: TaskActionService,
    public serverService: ServerService
  ) {
    this.initializeApp();
  }

  async initializeApp() {
    this.themeService.init();
    this.platform.ready().then(async () => {
      // ensure deployment field set correctly for use in any startup services or templates
      localStorage.setItem(APP_FIELDS.DEPLOYMENT_NAME, this.DEPLOYMENT_NAME);
      await this.initialiseCoreServices();
      this.hackSetDeveloperOptions();
      const isDeveloperMode = this.templateFieldService.getField("user_mode") === false;
      const user = await this.userMetaService.init();
      if (!user.first_app_open) {
        await this.surveyService.runSurvey("introSplash");
        await this.userMetaService.setUserMeta({ first_app_open: new Date().toISOString() });
        this.hackSetFirstOpenFields();
        await this.handleFirstLaunchDataActions();
      }
      this.menuController.enable(true, "main-side-menu");
      await this.hackSetAppOpenFields(user);
      if (Capacitor.isNative) {
        if (!isDeveloperMode) {
          this.removeConsoleLogs();
        }
        SplashScreen.hide();
        this.pushNotificationService.init();
      }
      this.analyticsService.init();
      this.renderAppTemplates = true;
      this.scheduleReinitialisation();
    });
  }

  /**
   * Various services set core app data which may be used in templates such as current app day,
   * user id etc. Make sure these services have run their initialisation logic before proceeding.
   *
   * Note - For some of these services order will be important
   * (e.g. notifications before campaigns that require notifications)
   **/
  async initialiseCoreServices() {
    await this.dbService.init();
    // CC 2021-05-14 - disabling reminders service until decide on full implementation
    // (ideally not requiring evaluation of all reminders on init)
    // this.remindersService.init();
    await this.appEventService.init();
    await this.serverService.init();
    await this.dataEvaluationService.refreshDBCache();
    await this.templateTranslateService.init();
    await this.templateService.init();
    await this.templateProcessService.init();
    await this.localNotificationInteractionService.init();
    await this.localNotificationService.init();
    await this.campaignService.init();
    await this.dbSyncService.init();
  }

  /**
   * Run app-specific first launch tasks
   **/
  private async handleFirstLaunchDataActions() {
    for (const initAction of APP_INITIALISATION_DEFAULTS.app_first_launch_actions) {
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

  /**
   * temporary fix: set initial fields to avoid doubling up of quickstart buttons
   * TODO CC 2021-07-23 - Review if methods still required
   */
  private hackSetFirstOpenFields() {
    this.templateFieldService.setField(".w_1on1_completion_status", "uncompleted");
    this.templateFieldService.setField("second_week", "false");
    this.templateFieldService.setField(".w_praise_completion_status", "uncompleted");
    this.templateFieldService.setField("third_week", "false");
  }

  /**
   * temporary workaround for setting unlocked content
   */
  private async hackSetAppOpenFields(user: IUserMeta) {
    // TODO CC 2021-07-23 - Review if methods below still required
    let old_date = this.userMetaService.getUserMeta("current_date");
    await this.userMetaService.setUserMeta({ current_date: new Date().toISOString() });
    let current_date = this.userMetaService.getUserMeta("current_date");
    this.templateFieldService.setField("first_app_open", user.first_app_open);
    this.templateFieldService.setField("current_date", current_date);
    if (old_date != current_date) {
      this.templateFieldService.setField("daily_relax_done", "false");
    }
    this.templateFieldService.setField("first_week", "true");
    if (Date.parse(current_date) - Date.parse(user.first_app_open) > 6 * 24 * 60 * 60 * 1000) {
      this.templateFieldService.setField("second_week", "true");
      this.templateFieldService.setField("w_1on1_disabled", "false");
    } else {
      this.templateFieldService.setField("second_week", "false");
    }
    if (Date.parse(current_date) - Date.parse(user.first_app_open) > 13 * 24 * 60 * 60 * 1000) {
      this.templateFieldService.setField("third_week", "true");
      this.templateFieldService.setField("w_praise_disabled", "false");
    } else {
      this.templateFieldService.setField("third_week", "false");
    }
    this.templateFieldService.setField(
      "days_since_start",
      (
        (Date.parse(current_date) - Date.parse(user.first_app_open)) /
        (24 * 60 * 60 * 1000)
      ).toString()
    );
  }
}
