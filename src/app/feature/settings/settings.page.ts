import { Component, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { Router } from "@angular/router";
import { DbService } from "src/app/shared/services/db/db.service";
import { LocalStorageService } from "src/app/shared/services/local-storage/local-storage.service";
import { ThemeService } from "src/app/feature/theme/theme-service/theme.service";
import { SurveyService } from "../survey/survey.service";
import { Capacitor } from "@capacitor/core";

@Component({
  selector: "plh-settings",
  templateUrl: "./settings.page.html",
  styleUrls: ["./settings.page.scss"],
})
export class SettingsPage implements OnInit {
  public useOfflineChat = false;
  public isNative = Capacitor.isNative;
  public useButtonHomeScreen = false;

  public themeNames: string[] = [];
  public currentThemeName: string;

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router,
    private themeService: ThemeService,
    private surveyService: SurveyService,
    private dbService: DbService
  ) {
    this.themeNames = this.themeService.getThemes().map((theme) => theme.name);
    this.currentThemeName = this.themeService.getCurrentTheme().name;
  }

  toggleButtonHomeScreen() {
    this.localStorageService.setBoolean("home_screen.use_button_version", this.useButtonHomeScreen);
  }

  toggleUseOfflineChat() {
    const useOfflineChat = this.localStorageService.getBoolean("use_offline_chat");
    this.localStorageService.setBoolean("use_offline_chat", useOfflineChat ? false : true);
  }

  ngOnInit() {
    this.useOfflineChat = this.localStorageService.getBoolean("use_offline_chat");
    this.useButtonHomeScreen = this.localStorageService.getBoolean(
      "home_screen.use_button_version"
    );
  }

  openWelcomeFlow() {
    this.localStorageService.setBoolean("weclome_skipped", false);
    this.localStorageService.setBoolean("weclome_finished", false);
    this.router.navigateByUrl("/chat?trigger=welcome");
  }

  selectThemeName(themeName: string) {
    this.currentThemeName = themeName;
    this.themeService.setCurrentTheme(themeName);
  }

  openWelcomeSurvey() {
    this.surveyService.runSurvey("welcome");
  }

  resetApp() {
    this.localStorageService.clear();
    this.dbService.db.delete();
  }
}
