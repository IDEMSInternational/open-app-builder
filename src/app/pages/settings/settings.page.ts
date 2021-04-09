import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { DbService } from "src/app/shared/services/db/db.service";
import { LocalStorageService } from "src/app/shared/services/local-storage/local-storage.service";
import { ThemeService } from "src/app/feature/theme/theme-service/theme.service";
import { SurveyService } from "src/app/feature/survey/survey.service";
import { Capacitor } from "@capacitor/core";
import { UserSetting } from "./user.settings.model";
import { SettingsService } from "./settings.service";
import { OfflineChatService } from "src/app/feature/chat/services/offline/offline-chat.service";
import { TIPS } from "src/app/shared/services/data/data.service";
import { TourService } from "src/app/shared/services/tour/tour.service";

@Component({
  selector: "plh-settings",
  templateUrl: "./settings.page.html",
  styleUrls: ["./settings.page.scss"],
})
export class SettingsPage {
  public isNative = Capacitor.isNative;

  public themeNames: string[] = [];
  public currentThemeName: string;

  public userSettings: UserSetting[] = [];
  public devOnlyUserSettings: UserSetting[] = [];

  public flowNames: string[] = [];
  public tipFlowNames = TIPS.map((t) => t.flow_name);

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router,
    private themeService: ThemeService,
    private surveyService: SurveyService,
    private dbService: DbService,
    private settingsService: SettingsService,
    private offlineChatService: OfflineChatService,
    private tourService: TourService
  ) {
    this.themeNames = this.themeService.getThemes().map((theme) => theme.name);
    this.currentThemeName = this.themeService.getCurrentTheme().name;
    this.settingsService.getAllUserSettings().subscribe((userSettings) => {
      this.userSettings = userSettings
        .filter((setting) => Capacitor.isNative || !setting.nativeOnly)
        .filter((setting) => !setting.devOnly);
      this.devOnlyUserSettings = userSettings.filter((setting) => setting.devOnly);
    });
    this.offlineChatService.getFlowNames().then((flowNames) => {
      this.flowNames = flowNames;
    });
  }

  onSettingChange(setting: UserSetting) {
    this.settingsService.setUserSetting(setting.id, setting.value);
  }

  openWelcomeFlow() {
    this.localStorageService.setBoolean("weclome_skipped", false);
    this.localStorageService.setBoolean("weclome_finished", false);
    this.router.navigateByUrl("/chat/Welcome_Intro");
  }

  selectThemeName(themeName: string) {
    this.currentThemeName = themeName;
    this.themeService.setCurrentTheme(themeName);
  }

  openWelcomeSurvey() {
    this.surveyService.runSurvey("welcome");
  }

  navigateByUrl(url: string) {
    this.router.navigateByUrl(url);
  }

  resetApp() {
    this.localStorageService.clear();
    this.dbService.deleteDatabase().then(() => {
      location.reload();
    });
  }

  launchFlowByName(flowName: string) {
    this.router.navigateByUrl("/chat/" + flowName);
  }
  launchTipFlowByName(flowName: string) {
    this.router.navigateByUrl("/tips/" + flowName);
  }

  openTours() {
    this.router.navigateByUrl("/tour");
  }
}
