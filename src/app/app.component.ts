import { Component } from "@angular/core";
import { Platform, MenuController } from "@ionic/angular";
import { Router } from "@angular/router";
import { Plugins, Capacitor, App } from "@capacitor/core";
const { SplashScreen } = Plugins;
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
import { TemplateProcessService } from "./shared/components/template/services/template-process.service";
import { isSameDay } from "date-fns";
import { AnalyticsService } from "./shared/services/analytics/analytics.service";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {
  APP_VERSION = environment.version;
  ENV_NAME = environment.envName;
  /** Track when app ready to render sidebar and route templates */
  public renderAppTemplates = false;
  constructor(
    private platform: Platform,
    private menuController: MenuController,
    private router: Router,
    private pushNotificationService: PushNotificationService,
    private dbService: DbService,
    private userMetaService: UserMetaService,
    private themeService: ThemeService,
    private surveyService: SurveyService,
    private tourService: TourService,
    private templateService: TemplateService,
    private templateProcessService: TemplateProcessService,
    private appEventService: AppEventService,
    private campaignService: CampaignService,
    private dataEvaluationService: DataEvaluationService,
    private analyticsService: AnalyticsService,
    /** Inject in the main app component to start tracking actions immediately */
    public taskActions: TaskActionService,
    public serverService: ServerService
  ) {
    this.initializeApp();
  }

  async initializeApp() {
    this.themeService.init();
    this.platform.ready().then(async () => {
      await this.initialiseCoreServices();
      this.hackSetDeveloperOptions();
      const isDeveloperMode = this.templateService.getField("user_mode") === false;
      const user = await this.userMetaService.init();
      if (!user.first_app_open) {
        await this.surveyService.runSurvey("introSplash");
        await this.surveyService.runSurvey("analytics");
        await this.userMetaService.setUserMeta({ first_app_open: new Date().toISOString() });
        this.hackSetFirstOpenFields();
        await this.templateService.runStandaloneTemplate("language_select");
        await this.tourService.startTour("intro_tour");
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
   * user id etc. Make sure these services have run their initialisation logic before proceeding
   **/
  async initialiseCoreServices() {
    await this.dbService.init();
    // CC 2021-05-14 - disabling reminders service until decide on full implementation
    // (ideally not requiring evaluation of all reminders on init)
    // this.remindersService.init();
    await this.appEventService.init();
    await this.serverService.init();
    await this.dataEvaluationService.refreshDBCache();
    await this.templateService.init();
    await this.templateProcessService.init();
    await this.campaignService.init();
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
      const isUserMode = this.templateService.getField("user_mode");
      if (isUserMode !== false) {
        this.templateService.setField("user_mode", "false");
      }
    }
  }

  /**
   * temporary fix: set initial fields to avoid doubling up of quickstart buttons
   * TODO CC 2021-07-23 - Review if methods still required
   */
  private hackSetFirstOpenFields() {
    this.templateService.setField(".w_1on1_completion_status", "uncompleted");
    this.templateService.setField("second_week", "false");
    this.templateService.setField(".w_praise_completion_status", "uncompleted");
    this.templateService.setField("third_week", "false");
  }

  /**
   * temporary workaround for setting unlocked content
   * TODO CC 2021-07-23 - Review if methods still required
   */
  private async hackSetAppOpenFields(user: IUserMeta) {
    let old_date = this.userMetaService.getUserMeta("current_date");
    await this.userMetaService.setUserMeta({ current_date: new Date().toISOString() });
    let current_date = this.userMetaService.getUserMeta("current_date");
    this.templateService.setField("first_app_open", user.first_app_open);
    this.templateService.setField("current_date", current_date);
    if (old_date != current_date) {
      this.templateService.setField("daily_relax_done", "false");
    }
    this.templateService.setField("first_week", "true");
    if (Date.parse(current_date) - Date.parse(user.first_app_open) > 6 * 24 * 60 * 60 * 1000) {
      this.templateService.setField("second_week", "true");
      this.templateService.setField("w_1on1_disabled", "false");
    } else {
      this.templateService.setField("second_week", "false");
    }
    if (Date.parse(current_date) - Date.parse(user.first_app_open) > 13 * 24 * 60 * 60 * 1000) {
      this.templateService.setField("third_week", "true");
      this.templateService.setField("w_praise_disabled", "false");
    } else {
      this.templateService.setField("third_week", "false");
    }
    this.templateService.setField(
      "days_since_start",
      (
        (Date.parse(current_date) - Date.parse(user.first_app_open)) /
        (24 * 60 * 60 * 1000)
      ).toString()
    );
  }
}
