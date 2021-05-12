import { Component } from "@angular/core";
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
import { RemindersService } from "./feature/reminders/reminders.service";
import { AppEventService } from "./shared/services/app-events/app-events.service";
import { TourService } from "./shared/services/tour/tour.service";
import { TemplateService } from "./shared/components/template/services/template.service";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {
  APP_VERSION = environment.version;
  ENV_NAME = environment.envName;
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
    private tourService: TourService,
    private templateService: TemplateService,
    private remindersService: RemindersService,
    private appEventService: AppEventService,
    /** Inject in the main app component to start tracking actions immediately */
    public taskActions: TaskActionService
  ) {
    this.initializeApp();
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
        // temporary fix: set initial fields to avoid doubling up of quickstart buttons
        this.templateService.setField(".w_1on1_completion_status", "uncompleted");
        this.templateService.setField("second_week", "false");
        await this.tourService.startTour("intro_tour");
      }
      this.skipTutorial = true;
      this.menuController.enable(true, "main-side-menu");
      let old_date = this.userMetaService.getUserMeta("current_date");
      await this.userMetaService.setUserMeta({ current_date: new Date().toISOString() });
      let current_date = this.userMetaService.getUserMeta("current_date");
      this.templateService.setField("first_app_open", user.first_app_open);
      this.templateService.setField("current_date", current_date);
      if (old_date != current_date) {
        this.templateService.setField("daily_relax_done", "false");
      }
      if (Date.parse(current_date) - Date.parse(user.first_app_open) > 6 * 24 * 60 * 60 * 1000) {
        this.templateService.setField("second_week", "true");
        this.templateService.setField("w_1on1_disabled", "false");
      } else {
        this.templateService.setField("second_week", "false");
      }
      this.templateService.setField(
        "days_since_start",
        (
          (Date.parse(current_date) - Date.parse(user.first_app_open)) /
          (24 * 60 * 60 * 1000)
        ).toString()
      );
      if (Capacitor.isNative) {
        SplashScreen.hide();
        this.notifications.init();
      }
      this.remindersService.init();
      this.appEventService.init();
    });
  }

  clickOnMenuItem(id: string) {
    this.menuController.close("main-side-menu");
    this.router.navigateByUrl("/" + id);
  }
}
