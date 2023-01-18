import { Component } from "@angular/core";
import { Platform, MenuController } from "@ionic/angular";
import { Router } from "@angular/router";
import { Capacitor } from "@capacitor/core";
import { SplashScreen } from "@capacitor/splash-screen";
import { App } from "@capacitor/app";
import { DbService } from "./shared/services/db/db.service";
import { SkinService } from "./shared/services/skin/skin.service";
import { ThemeService } from "./feature/theme/services/theme.service";
import { environment } from "src/environments/environment";
import { TaskActionService } from "./shared/services/task/task-action.service";
import { UserMetaService } from "./shared/services/userMeta/userMeta.service";
import { AppEventService } from "./shared/services/app-events/app-events.service";
import { TourService } from "./feature/tour/tour.service";
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
import { CrashlyticsService } from "./shared/services/crashlytics/crashlytics.service";
import { AppDataService } from "./shared/services/data/app-data.service";
import { AuthService } from "./shared/services/auth/auth.service";
import { LifecycleActionsService } from "./shared/services/lifecycle-actions/lifecycle-actions.service";
import { AppConfigService } from "./shared/services/app-config/app-config.service";
import { IAppConfig } from "./shared/model";
import { TaskService } from "./shared/services/task/task.service";
import { AsyncServiceBase } from "./shared/services/asyncService.base";
import { SyncServiceBase } from "./shared/services/syncService.base";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {
  APP_VERSION = environment.version;
  DEPLOYMENT_NAME = environment.deploymentName;
  appConfig: IAppConfig;
  appFields: IAppConfig["APP_FIELDS"];
  appAuthenticationDefaults: IAppConfig["APP_AUTHENTICATION_DEFAULTS"];
  sideMenuDefaults: IAppConfig["APP_SIDEMENU_DEFAULTS"];
  footerDefaults: IAppConfig["APP_FOOTER_DEFAULTS"];
  /** Track when app ready to render sidebar and route templates */
  public renderAppTemplates = false;

  constructor(
    // 3rd Party Services
    private platform: Platform,
    private menuController: MenuController,
    private router: Router,
    // App services
    private skinService: SkinService,
    private appConfigService: AppConfigService,
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
    private taskService: TaskService,
    /** Inject in the main app component to start tracking actions immediately */
    private taskActions: TaskActionService,
    private lifecycleActionsService: LifecycleActionsService,
    private serverService: ServerService
  ) {
    this.initializeApp();
  }

  private async initializeApp() {
    this.platform.ready().then(async () => {
      this.subscribeToAppConfigChanges();
      // ensure deployment field set correctly for use in any startup services or templates
      localStorage.setItem(this.appFields.DEPLOYMENT_NAME, this.DEPLOYMENT_NAME);
      localStorage.setItem(this.appFields.APP_VERSION, this.APP_VERSION);
      await this.initialiseCoreServices();
      this.hackSetDeveloperOptions();
      const isDeveloperMode = this.templateFieldService.getField("user_mode") === false;
      const user = this.userMetaService.userMeta;
      // Authentication requires verified domain and app ids populated to firebase console
      // Currently only run on native where specified (but can comment out for testing locally)
      if (this.appAuthenticationDefaults.enforceLogin && Capacitor.isNativePlatform()) {
        await this.ensureUserSignedIn();
      }
      if (!user.first_app_open) {
        await this.userMetaService.setUserMeta({ first_app_open: new Date().toISOString() });
      }
      // Run app-specific launch tasks

      // Re-initialise default field and globals on init in case sheets have been updated
      // TODO - ideally this should just be triggered on first launch of new app update
      await this.templateService.initialiseDefaultFieldAndGlobals();
      await this.templateProcessService.initialiseStartupTemplates();
      await this.lifecycleActionsService.handleLaunchActions();

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

      // Testing
      this.templateFieldService.getSnapshot();
    });
  }

  private async ensureUserSignedIn() {
    const authUser = await this.authService.getCurrentUser();
    if (!authUser) {
      const templatename = this.appAuthenticationDefaults.signInTemplate;
      const { modal } = await this.templateService.runStandaloneTemplate(templatename, {
        showCloseButton: false,
        waitForDismiss: false,
      });
      await this.authService.waitForSignInComplete();
      await modal.dismiss();
    }
  }

  /** Initialise appConfig and set dependent properties */
  private subscribeToAppConfigChanges() {
    this.appConfigService.appConfig$.subscribe((appConfig: IAppConfig) => {
      this.appConfig = appConfig;
      this.sideMenuDefaults = this.appConfig.APP_SIDEMENU_DEFAULTS;
      this.footerDefaults = this.appConfig.APP_FOOTER_DEFAULTS;
      this.appAuthenticationDefaults = this.appConfig.APP_AUTHENTICATION_DEFAULTS;
      this.appFields = this.appConfig.APP_FIELDS;
    });
  }

  /**
   * Various services set core app data which may be used in templates such as current app day,
   * user id etc. Make sure these services have run their initialisation logic before proceeding.
   *
   * Note - For some of these services order will be important
   * (e.g. notifications before campaigns that require notifications)
   **/
  private async initialiseCoreServices() {
    // Organise all services into groups
    const services: {
      /** should be called early but don't need to be waited for */
      eager: AsyncServiceBase[];
      /** require async init and may be depended on by other services */
      blocking: AsyncServiceBase[];
      /** handle own init in synchronous function (will be ready on inject) */
      nonBlocking: SyncServiceBase[];
      /** async but not depended on for init of other services (can be intialised after timeout) */
      deferred: (AsyncServiceBase | SyncServiceBase)[];
      /** do not strictly need to be initialised as done by other services (but kept for reference) */
      implicit: (AsyncServiceBase | SyncServiceBase)[];
      /** likely no longer required, should be removed in future (impact can be tested by moving into group) */
      deprecated: (AsyncServiceBase | SyncServiceBase)[];
    } = {
      eager: [this.crashlyticsService],
      blocking: [
        this.dbSyncService,
        this.userMetaService,
        this.tourService,
        this.localNotificationService,
        this.localNotificationInteractionService,
        this.taskService,
        this.taskActions,
        this.campaignService,
      ],
      nonBlocking: [
        this.skinService,
        this.appConfigService,
        this.themeService,
        this.templateService,
        this.templateProcessService,
        this.appDataService,
        this.authService,
        this.serverService,
      ],
      deferred: [this.analyticsService],
      implicit: [
        this.dbService,
        this.templateTranslateService,
        this.templateFieldService,
        this.dataEvaluationService,
        this.appEventService,
      ],
      deprecated: [this.lifecycleActionsService],
    };

    // log all init logs in a group. Note, some services may sit outside this group in cases
    // where non-blocking services import blocking (non-blocking call init on import into constructor).
    // could be resolved by importing via injector instead of constructor (assumed not very important)
    console.group("Core Services");
    const start = performance.now();
    for (const service of services.eager) {
      service.ready();
    }
    await Promise.all(services.blocking.map(async (service) => await service.ready()));
    for (const service of services.nonBlocking) {
      service.ready();
    }
    setTimeout(() => {
      for (const service of services.deferred) {
        service.ready();
      }
    }, 5000);
    console.log("Total time:", Math.round(performance.now() - start) + "ms");
    console.groupEnd();
  }

  private clickOnMenuItem(id: string) {
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
