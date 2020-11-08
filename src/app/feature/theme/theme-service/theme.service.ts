import { Injectable } from '@angular/core';
import { IpcService } from 'src/app/shared/services/ipc/ipc.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage/local-storage.service';
import { BUILT_IN_THEMES, DEFAULT_THEME, THEME_2 } from '../built-in-themes';
import { AppTheme, colorIdToCSSVarName, ionColorNames, ThemeColor, ThemeColors } from '../theme.model';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  static THEME_UPDATE_CHANNEL = "THEME_UPDATE_CHANNEL";

  currentTheme: AppTheme;

  constructor(private ipcService: IpcService, private localStorageService: LocalStorageService) {

    this.currentTheme = this.getCurrentTheme();

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

  public getDefaultTheme(): AppTheme {
    return DEFAULT_THEME;
  }

  public getCurrentTheme(): AppTheme {
    let themeMap = this.getThemeMap();
    let currentThemeName = this.localStorageService.getString("currentThemeName");
    this.currentTheme = themeMap[currentThemeName];
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
    this.localStorageService.setString("currentThemeName", this.currentTheme.name);
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
    this.localStorageService.setJSON("themes", themeMap);
    if (theme.name === this.currentTheme.name) {
      this.currentTheme = theme;
      this.localStorageService.setJSON("currentTheme", theme);
    }
    this.ipcService.send(ThemeService.THEME_UPDATE_CHANNEL, theme.name);
  }

  public deleteTheme(theme: AppTheme) {
    this.localStorageService.setString("theme." + theme.name, null);
  }

  public getThemes(): AppTheme[] {
    return [DEFAULT_THEME, THEME_2];
  }

  private applyCSSVariablesForTheme(theme: AppTheme) {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    let colorId = Object.keys(theme.colors) as (keyof ThemeColors)[];
    let unchangedCount = 0;
    for (let colorName of colorId) {
      const colorObj: ThemeColor = theme.colors[colorName];
      let value = colorObj.lightValue;
      let cssVarName = colorIdToCSSVarName(colorName);
      if (prefersDark) {
        value = colorObj.darkValue;
      }
      if (document.body.style.getPropertyValue(cssVarName) !== value) {
        console.log("Setting CSS variable ", cssVarName, value);
        document.body.style.setProperty(cssVarName, value);
      } else {
        unchangedCount++;
      }
    }
    console.log(`${unchangedCount} colors unchanged by theme update`);
  }

}
