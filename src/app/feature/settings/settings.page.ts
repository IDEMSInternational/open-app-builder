import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from 'src/app/shared/services/chat/chat.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage/local-storage.service';
import { ThemeService } from '../theme/theme-service/theme.service';
import { AppTheme } from '../theme/theme.model';

@Component({
  selector: 'plh-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  public offlineChatEnabled = false;

  public useButtonHomeScreen = false;

  public themeNames: string[] = [];
  public currentThemeName: string;

  constructor(private chatService: ChatService, private localStorageService: LocalStorageService,
    private router: Router, private themeService: ThemeService) {
      this.themeNames = this.themeService.getThemes().map((theme) => theme.name);
      this.currentThemeName = this.themeService.getCurrentTheme().name;
    }

  toggleButtonHomeScreen() {
    localStorage.setItem("home_screen.use_button_version", "" + this.useButtonHomeScreen);
  }

  toggleOfflineChat() {
    this.chatService.init(this.offlineChatEnabled);
  }

  ngOnInit() {
    this.offlineChatEnabled = this.chatService.isUsingOffline();
    this.useButtonHomeScreen = localStorage.getItem("home_screen.use_button_version") === "true";
  }

  openWelcomeFlow() {
    this.localStorageService.setBoolean("weclome_skipped", false);
    this.localStorageService.setBoolean("weclome_finished", false);
    this.router.navigateByUrl("/chat?trigger=welcome");
  }

  selectThemeName(themeName: string) {
    this.themeService.setCurrentTheme(themeName);
  }

}
