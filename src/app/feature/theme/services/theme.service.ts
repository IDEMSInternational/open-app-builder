import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { LocalStorageService } from "src/app/shared/services/local-storage/local-storage.service";
import { THEMES } from "src/theme/themes";
import { APP_CONSTANTS } from "src/app/data";

const { APP_FIELDS } = APP_CONSTANTS;

@Injectable({
  providedIn: "root",
})
export class ThemeService {
  currentTheme$ = new BehaviorSubject<string>(null);
  availableThemes = THEMES;

  constructor(private localStorageService: LocalStorageService) {}

  init() {
    const currentThemeName = this.getCurrentTheme();
    if (currentThemeName) {
      this.setTheme(currentThemeName);
    } else {
      this.setTheme("default");
    }
  }

  public setTheme(themeName: string) {
    if (this.availableThemes.includes(themeName)) {
      console.log("[SET THEME]", themeName);
      document.body.dataset.theme = themeName;
      this.currentTheme$.next(themeName);
      // Use local storage so that the current theme persists across app launches
      this.localStorageService.setString(APP_FIELDS.APP_THEME, themeName);
    } else {
      console.error(`No theme found with name "${themeName}"`);
    }
  }

  public getCurrentTheme() {
    return this.localStorageService.getString(APP_FIELDS.APP_THEME);
  }

  public getAllThemes() {
    return this.availableThemes;
  }

  /** Calculate all custom properties inherited for a particular element */
  public calculateElCustomProperties(el: Element) {
    const props = {};
    const customProps = this.listAllCssCustomProperties();
    const computedStyles = window.getComputedStyle(el);
    for (const prop of Object.keys(customProps)) {
      props[prop] = computedStyles.getPropertyValue(prop).trim();
    }
    return props;
  }

  /**
   * Iterate through all style sheets on a page to extract a list of custom css properties
   * @returns hashmap containing all properties and value corresponding to latest-processed sheet
   *
   * Adapted from https://css-tricks.com/how-to-get-all-custom-properties-on-a-page-in-javascript/
   */
  private listAllCssCustomProperties() {
    const customPropsHashmap = {};
    for (const styleSheet of Array.from(document.styleSheets)) {
      if (this.isSameDomain(styleSheet)) {
        for (const rule of Array.from(styleSheet.cssRules)) {
          if (rule instanceof CSSStyleRule) {
            const customStyleProps = Array.from(rule.style).filter((prop) => prop.startsWith("--"));
            for (const prop of customStyleProps) {
              customPropsHashmap[prop] = rule.style.getPropertyValue(prop).trim();
            }
          }
        }
      }
    }
    return customPropsHashmap;
  }

  /** Determine if style is local styleblock or from stylesheet on same domain */
  private isSameDomain = (styleSheet: CSSStyleSheet) =>
    styleSheet.href ? styleSheet.href.startsWith(location.origin) : true;
}
