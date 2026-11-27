import { effect, Injectable } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { Capacitor, SystemBars, SystemBarsStyle, SystemBarType } from "@capacitor/core";
import { filter } from "rxjs";
import { ThemeService } from "src/app/feature/theme/services/theme.service";
import { AppConfigService } from "../app-config/app-config.service";
import { SyncServiceBase } from "../syncService.base";
import {
  flattenColours,
  getBackgroundForSystemBarText,
  getElementColour,
  getStyleOverride,
  IRGBA,
  isLightColour,
  parseSystemBarText,
} from "./system-bars.utils";

/** First Android WebView version that Capacitor draws behind the system bars */
const MIN_EDGE_TO_EDGE_WEBVIEW_VERSION = 140;

/** Delays after a change to re-check the bars, covering page and modal transitions (ms) */
const UPDATE_DELAYS = [50, 400, 800];

/**
 * The app draws behind the device status bar and navigation bar. This service keeps the text and
 * icons of each bar readable, by checking the colour the app shows behind it:
 * dark icons on light colours, light icons on dark colours.
 *
 * A theme can fix the style of a bar with the css variables `--system-bar-style-status` and
 * `--system-bar-style-nav`, set to `light` (light background, dark icons) or `dark`.
 * Content under a bar can set the text colour it needs with `data-system-bar-text` (`light` or `dark`),
 * e.g. a display group with a background image, which is not detected. It takes precedence over the theme.
 */
@Injectable({
  providedIn: "root",
})
export class SystemBarsService extends SyncServiceBase {
  private currentStyles: Partial<Record<SystemBarType, SystemBarsStyle>> = {};
  private updateTimeouts: ReturnType<typeof setTimeout>[] = [];
  private isActive = false;

  constructor(
    private appConfigService: AppConfigService,
    private themeService: ThemeService,
    private router: Router
  ) {
    super("SystemBars");
    if (!Capacitor.isNativePlatform()) return;

    // With an older WebView, Capacitor keeps the web view clear of the system bars, which then show
    // the native window background. The default style suits that background (light or dark mode)
    if (!this.isWebViewBehindSystemBars()) {
      SystemBars.setStyle({ style: SystemBarsStyle.Default });
      return;
    }

    this.isActive = true;
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

  private isWebViewBehindSystemBars() {
    if (Capacitor.getPlatform() !== "android") return true;
    const webViewVersion = Number(navigator.userAgent.match(/Chrome\/(\d+)/)?.[1]);
    return webViewVersion >= MIN_EDGE_TO_EDGE_WEBVIEW_VERSION;
  }

  /** Check the bars again, e.g. when content that sets their text colour is added or removed */
  public scheduleUpdate() {
    if (!this.isActive) return;
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
    const { colour, isSetByContent } = this.getBackgroundAt(x, y);
    const override = isSetByContent ? null : getStyleOverride(overrideVariable);
    const isLight = override ? override === "light" : isLightColour(colour);
    // "Light" is the style for a light background, i.e. dark text and icons
    const style = isLight ? SystemBarsStyle.Light : SystemBarsStyle.Dark;
    if (this.currentStyles[bar] === style) return;
    this.currentStyles[bar] = style;
    SystemBars.setStyle({ bar, style }).catch((error) => {
      // so that the next update tries again
      if (this.currentStyles[bar] === style) delete this.currentStyles[bar];
      console.error("[SYSTEM BARS] could not set style", error);
    });
  }

  /**
   * The background colour shown at a point on the screen. Content that sets the text colour it needs
   * counts as a black or white background, below any translucent layers above it (e.g. a modal backdrop)
   */
  private getBackgroundAt(x: number, y: number): { colour: IRGBA; isSetByContent: boolean } {
    const layers: IRGBA[] = [];
    for (const element of this.getElementsAt(document, x, y)) {
      const text = parseSystemBarText(element.getAttribute("data-system-bar-text"));
      if (text) {
        return {
          colour: flattenColours(layers, getBackgroundForSystemBarText(text)),
          isSetByContent: true,
        };
      }
      const colour = getElementColour(getComputedStyle(element));
      if (colour && colour[3] > 0) {
        layers.push(colour);
        if (colour[3] >= 1) break;
      }
    }
    return { colour: flattenColours(layers), isSetByContent: false };
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
