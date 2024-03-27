import { Location } from "@angular/common";
import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { NavigationEnd, NavigationStart, Router } from "@angular/router";
import { App } from "@capacitor/app";
import { Capacitor, PluginListenerHandle } from "@capacitor/core";
import { Subscription, fromEvent, debounceTime, map } from "rxjs";
import { IAppConfig, IHeaderColourOptions, IHeaderVariantOptions } from "../../model";
import { AppConfigService } from "../../services/app-config/app-config.service";
import { IonHeader, ScrollBaseCustomEvent, ScrollDetail } from "@ionic/angular";
import { _wait } from "packages/shared/src/utils/async-utils";

interface ScrollCustomEvent extends ScrollBaseCustomEvent {
  detail: ScrollDetail;
}

// Heights (in px) of different header variants
const heightsMap = {
  compact: 36,
  default: 56,
};

@Component({
  selector: "plh-main-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class headerComponent implements OnInit, OnDestroy {
  @ViewChild(IonHeader) headerElement: IonHeader & { el: HTMLElement };

  showMenuButton = false;
  showBackButton = false;
  appConfigChanges$: Subscription;
  headerConfig: IAppConfig["APP_HEADER_DEFAULTS"];
  routeChanges$: Subscription;
  /** listen to hardware back button presses (on android device only) */
  hardwareBackButton$: PluginListenerHandle;
  /** track if navigation has been used to handle back button click behaviour */
  hasBackHistory = false;
  colour: IHeaderColourOptions;
  variant: IHeaderVariantOptions;

  /** Modify margin to move off-screen when using collapsed mode */
  public marginTop = "0px";

  /** Track scroll events when using header collapse mode */
  private scrollEvents$: Subscription;

  constructor(
    private router: Router,
    private location: Location,
    private appConfigService: AppConfigService
  ) {}

  async ngOnInit() {
    this.subscribeToAppConfigChanges();
    // subscribe to and handle route changes
    this.routeChanges$ = this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        this.handleRouteChange();
      }
      if (e instanceof NavigationStart) {
        this.hasBackHistory = true;
      }
    });
    this.handleRouteChange();
    // subscribe to and handle hardware back button press
    if (Capacitor.getPlatform() === "android") {
      this.hardwareBackButton$ = await App.addListener("backButton", () => {
        this.handleHardwareBackPress();
      });
    }
    // HACK - uncomment to test collapse
    // this.appConfigService.updateAppConfig({ APP_HEADER_DEFAULTS: { collapse: true } });
  }

  subscribeToAppConfigChanges() {
    this.appConfigChanges$ = this.appConfigService.changesWithInitialValue$.subscribe(
      (changes: IAppConfig) => {
        if (changes.APP_HEADER_DEFAULTS) {
          const headerConfig = this.appConfigService.APP_CONFIG.APP_HEADER_DEFAULTS;
          this.headerConfig = headerConfig;
          this.updateHeaderConfig();
          // handle collapse config changes
          if (changes.APP_HEADER_DEFAULTS?.collapse !== undefined) {
            this.handleHeaderCollapseConfigChange(changes.APP_HEADER_DEFAULTS?.collapse);
          }
        }
      }
    );
  }

  public handleBackButtonClick() {
    if (this.hasBackHistory) {
      this.location.back();
    } else {
      this.router.navigateByUrl("/");
    }
  }

  /**
   * Optional methods that can respond to route changes from within the header component
   * It cannot subscribe to standard router methods as sits outside ion-router-outlet
   */
  private handleRouteChange() {
    const { should_show_back_button, should_show_menu_button } = this.headerConfig;
    this.showBackButton = should_show_back_button(location);
    this.showMenuButton = should_show_menu_button(location);
    this.marginTop = "0px";
  }

  /** When device back button evaluate conditions to handle app minimise */
  private handleHardwareBackPress() {
    const { should_minimize_app_on_back } = this.headerConfig;
    if (should_minimize_app_on_back(location)) {
      App.minimizeApp();
    }
  }

  private updateHeaderConfig() {
    this.colour = this.headerConfig.colour;
    const { variant } = this.headerConfig;
    this.variant = variant;
    // Set CSS property dynamically in component so that it can be exposed to deployment config/skins
    document.documentElement.style.setProperty(
      "--header-height",
      `${heightsMap[this.variant] || heightsMap.default}px`
    );
  }

  /**
   * When enabling header collapse listen add scroll event listeners to detect when to collapse
   * If disabling dispose of previous scroll event listeners
   */
  private handleHeaderCollapseConfigChange(shouldCollapse: boolean) {
    // TODO: current header collapse implementation does not work on ios, so do not enable on this platform
    if (Capacitor.getPlatform() === "ios") return;

    // If previously scroll events were subscribed then should be able to unsubscribe.
    // If initial config change undefined->false can ignore
    if (this.scrollEvents$) {
      this.scrollEvents$.unsubscribe();
      this.scrollEvents$ = undefined;
      this.marginTop = "0px";
      // unset height
    }
    if (shouldCollapse) {
      this.listenToScrollEvents();
    }
  }

  /** Listen to scroll events to trigger header collapse */
  private listenToScrollEvents() {
    this.scrollEvents$ = fromEvent(window, "ionScroll")
      .pipe(map((e: ScrollCustomEvent) => e.detail))
      .subscribe(async (detail) => {
        const headerHeight = this.headerElement.el.clientHeight;
        const { deltaY, currentY } = detail;
        // bring header into view when scrolling in reverse or at top of page
        if (deltaY <= 0 || currentY < headerHeight) {
          this.marginTop = "0px";
        } else {
          // hide header after scrolled further than header height
          if (currentY >= headerHeight) {
            // temporarily disable scroll events whilst animation moves bar
            // as that would trigger negative scroll direction
            this.scrollEvents$.unsubscribe();
            // set negative margin to move header off-screen
            this.marginTop = `-${headerHeight}px`;
            await _wait(500);
            this.listenToScrollEvents();
          }
        }
      });
  }

  ngOnDestroy() {
    this.appConfigChanges$.unsubscribe();
    this.routeChanges$.unsubscribe();
    if (this.hardwareBackButton$) {
      this.hardwareBackButton$.remove();
    }
  }
}
