import { Injectable } from '@angular/core';
import { IpcService } from 'src/app/shared/services/ipc/ipc.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage/local-storage.service';
import { BUILT_IN_THEMES, DEFAULT_THEME, THEME_2 } from '../built-in-themes';
import { AppTheme, ionColorNames, ThemeColor } from '../theme.model';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  static THEME_UPDATE_CHANNEL = "THEME_UPDATE_CHANNEL";

  currentTheme: AppTheme;

  constructor(private ipcService: IpcService, private localStorageService: LocalStorageService) {

    this.currentTheme = this.localStorageService.getJSON("currentTheme");
    if (!this.currentTheme) {
      this.currentTheme = DEFAULT_THEME;
    }

    // Listens on IPC for updates to current theme
    this.ipcService.listen(ThemeService.THEME_UPDATE_CHANNEL).subscribe((themeName: string) => {
        let themeMap = this.getThemeMap();
        this.applyCSSVariablesForTheme(themeMap[themeName]);
        this.currentTheme = themeMap[themeName];
    });
  }

  private getThemeMap(): { [themeName: string]: AppTheme } {
    let themes = this.localStorageService.getJSON("themes");
    if (!themes || Object.keys(themes).length < 1) {
      let themeMap = {};
      BUILT_IN_THEMES.forEach((theme) => { themeMap[theme.name] = theme });
      this.localStorageService.setJSON("themes", themeMap);
      themes = themeMap;
    }
    return themes;
  }

  public getCurrentTheme(): AppTheme {
    if (!this.currentTheme) {
      this.currentTheme = DEFAULT_THEME;
    }
    return this.currentTheme;
  }

  public setCurrentTheme(themeName: string) {
    let themeMap = this.getThemeMap();
    if (themeMap[themeName]) {
      this.currentTheme = themeMap[themeName]
    } else {
      this.currentTheme = DEFAULT_THEME;
    }
    this.localStorageService.setJSON("currentTheme", this.currentTheme);
    this.ipcService.send(ThemeService.THEME_UPDATE_CHANNEL, themeName);
  }

  public createNewTheme(themeName: string) {
    let themeMap = this.getThemeMap();
    let newTheme: AppTheme = { ...DEFAULT_THEME, name: themeName };
    themeMap[newTheme.name] = newTheme;
    this.localStorageService.setJSON("themes", themeMap);
  }

  public updateTheme(theme: AppTheme) {
    let themeMap = this.getThemeMap();
    themeMap[theme.name] = theme;
    this.ipcService.send(ThemeService.THEME_UPDATE_CHANNEL, { theme: theme });
  }

  public deleteTheme(theme: AppTheme) {
    this.localStorageService.setString("theme." + theme.name, null);
  }

  public getThemes(): AppTheme[] {
    return [DEFAULT_THEME, THEME_2];
  }

  private applyCSSVariablesForTheme(theme: AppTheme) {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    let colorNames = Object.keys(theme.colors);
    for (let colorName of colorNames) {
      const colorObj = theme.colors[colorName];
      let value = colorObj.lightValue;
      if (prefersDark) {
        value = colorObj.darkValue;
      }
      if (ionColorNames.indexOf(colorName as any) > -1) {
        console.log("Setting CSS variable ", `--ion-color-${colorName}`, value);
        document.body.style.setProperty(`--ion-color-${colorName}`, value);
      } else {
        document.body.style.setProperty(`--theme-color-${colorName}`, value);
      }
    }
  }

}
