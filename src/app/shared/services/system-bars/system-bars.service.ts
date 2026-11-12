import { effect, Injectable } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { Capacitor, SystemBars, SystemBarsStyle, SystemBarType } from "@capacitor/core";
import { filter } from "rxjs";
import { ThemeService } from "src/app/feature/theme/services/theme.service";
import { AppConfigService } from "../app-config/app-config.service";
import { SyncServiceBase } from "../syncService.base";
import { flattenColours, IRGBA, isLightColour, parseCssColour } from "./system-bars.utils";

/** Values of the css variables that fix a bar's style instead of detecting it */
type IStyleOverride = "light" | "dark";

/** Delays after a change to re-check the bars, covering page and modal transitions (ms) */
const UPDATE_DELAYS = [50, 400, 800];

/**
 * The app draws behind the device status bar and navigation bar. This service keeps the text and
 * icons of each bar readable, by checking the colour the app shows behind it:
 * dark icons on light colours, light icons on dark colours.
 *
 * A theme can fix the style of a bar with the css variables `--system-bar-style-status` and
 * `--system-bar-style-nav`, set to `light` (light background, dark icons) or `dark`.
 */
@Injectable({
  providedIn: "root",
})
export class SystemBarsService extends SyncServiceBase {
  private currentStyles: Partial<Record<SystemBarType, SystemBarsStyle>> = {};
  private updateTimeouts: ReturnType<typeof setTimeout>[] = [];

  constructor(
    private appConfigService: AppConfigService,
    private themeService: ThemeService,
    private router: Router
  ) {
    super("SystemBars");
    if (!Capacitor.isNativePlatform()) return;

    // Theme and layout (header, footer) changes
    effect(() => {
      this.themeService.currentTheme();
      this.appConfigService.appConfig();
      this.scheduleUpdate();
    });
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe(() => this.scheduleUpdate());
    // Pop-ups, nav-stacks and other overlays
    for (const eventName of ["ionModalWillPresent", "ionModalDidPresent", "ionModalDidDismiss"]) {
      document.addEventListener(eventName, () => this.scheduleUpdate());
    }
    window.addEventListener("resize", () => this.scheduleUpdate());
  }

  private scheduleUpdate() {
    this.updateTimeouts.forEach((timeout) => clearTimeout(timeout));
    this.updateTimeouts = UPDATE_DELAYS.map((delay) => setTimeout(() => this.update(), delay));
  }

  private update() {
    const x = window.innerWidth / 2;
    this.setStyle(SystemBarType.StatusBar, "--system-bar-style-status", x, 1);
    // iOS has one style for both bars, so setting the navigation bar would replace the status bar style
    if (Capacitor.getPlatform() === "android") {
      this.setStyle(
        SystemBarType.NavigationBar,
        "--system-bar-style-nav",
        x,
        window.innerHeight - 2
      );
    }
  }

  private setStyle(bar: SystemBarType, overrideVariable: string, x: number, y: number) {
    const override = getComputedStyle(document.documentElement)
      .getPropertyValue(overrideVariable)
      .trim() as IStyleOverride;
    let isLight: boolean;
    if (override === "light" || override === "dark") {
      isLight = override === "light";
    } else {
      isLight = isLightColour(this.getColourAt(x, y));
    }
    // "Light" is the style for a light background, i.e. dark text and icons
    const style = isLight ? SystemBarsStyle.Light : SystemBarsStyle.Dark;
    if (this.currentStyles[bar] === style) return;
    this.currentStyles[bar] = style;
    SystemBars.setStyle({ bar, style }).catch((error) =>
      console.error("[SYSTEM BARS] could not set style", error)
    );
  }

  /** The background colour shown at a point on the screen */
  private getColourAt(x: number, y: number): IRGBA {
    const layers: IRGBA[] = [];
    for (const element of this.getElementsAt(document, x, y)) {
      const colour = parseCssColour(getComputedStyle(element).backgroundColor);
      if (colour && colour[3] > 0) {
        layers.push(colour);
        if (colour[3] >= 1) break;
      }
    }
    return flattenColours(layers);
  }

  /** Elements at a point from the top layer down, including those inside web components */
  private getElementsAt(root: Document, x: number, y: number): Element[] {
    const elements: Element[] = [];
    for (const element of root.elementsFromPoint(x, y)) {
      if (element.shadowRoot) {
        elements.push(...this.getShadowElementsAt(element.shadowRoot, x, y));
      }
      elements.push(element);
    }
    return elements;
  }

  /**
   * Elements of a web component at a point. Ionic draws backgrounds on inner elements that ignore
   * pointer events (e.g. the toolbar background), which `elementsFromPoint` leaves out,
   * so compare positions instead
   */
  private getShadowElementsAt(shadowRoot: ShadowRoot, x: number, y: number): Element[] {
    const elements = Array.from(shadowRoot.querySelectorAll("*")).filter((element) => {
      const { left, right, top, bottom } = element.getBoundingClientRect();
      return x >= left && x <= right && y >= top && y <= bottom;
    });
    // later elements are drawn on top of earlier ones
    return elements.reverse();
  }
}
