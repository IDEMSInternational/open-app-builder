import { Location } from "@angular/common";
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { computed, effect, signal } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { NavigationStart, Router } from "@angular/router";
import { App } from "@capacitor/app";
import { Capacitor, PluginListenerHandle } from "@capacitor/core";
import { Subscription, fromEvent, map } from "rxjs";
import type { IHeaderVariantOptions } from "data-models/appConfig";
import { AppConfigService } from "../../services/app-config/app-config.service";
import { IonHeader, ScrollBaseCustomEvent, ScrollDetail } from "@ionic/angular";
import { _wait } from "packages/shared/src/utils/async-utils";
import { activeRoute } from "../../utils/angular.utils";

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
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class headerComponent implements OnInit, OnDestroy {
  @ViewChild(IonHeader) headerElement: IonHeader & { el: HTMLElement };

  showMenuButton = signal(false);
  showBackButton = signal(false);
  headerConfig = computed(() => this.appConfigService.appConfig().APP_HEADER_DEFAULTS);

  /**
   * Listen to router events to handle route change effects
   * NOTE - use events instead of route as header sits outside ion-router (limited access)
   **/
  private routeChanges = toSignal(this.router.events);

  /** listen to hardware back button presses (on android device only) */
  private hardwareBackButton$: PluginListenerHandle;
  /** track if navigation has been used to handle back button click behaviour */
  private hasBackHistory = false;

  /** Modify margin to move off-screen when using collapsed mode */
  public marginTop = signal(0);

  /** Track scroll events when using header collapse mode */
  private scrollEvents$: Subscription;

  /** Track whether on home route for back button and menu button side-effects */
  private isHomeRoute = true;

  constructor(
    private router: Router,
    private location: Location,
    private appConfigService: AppConfigService
  ) {
    effect(
      () => {
        // when header config changes set the height and collapse properties
        const { collapse, variant } = this.headerConfig();
        this.setHeaderHeightCSS(variant);
        if (collapse !== undefined) {
          this.setHeaderCollapse(collapse);
        }
      },
      { allowSignalWrites: true }
    );
    effect(
      () => {
        // when route changes handle side-effects
        const e = this.routeChanges();
        this.handleRouteChange();
        if (e instanceof NavigationStart) {
          this.hasBackHistory = true;
        }
      },
      { allowSignalWrites: true }
    );
  }

  async ngOnInit() {
    // trigger route change for initial configuration
    this.handleRouteChange();
    // subscribe to and handle hardware back button press
    if (Capacitor.getPlatform() === "android") {
      this.hardwareBackButton$ = await App.addListener("backButton", () => {
        this.handleHardwareBackPress();
      });
    }
  }

  public handleBackButtonClick() {
    if (this.hasBackHistory) {
      this.location.back();
    } else {
      this.router.navigateByUrl("/");
    }
  }

  /** Determine whether to show back and menu buttons based on location */
  private handleRouteChange() {
    // update whether home route or not
    const { APP_ROUTE_DEFAULTS } = this.appConfigService.appConfig();
    this.isHomeRoute = activeRoute(location) === APP_ROUTE_DEFAULTS.home_route;

    const { back_button, menu_button } = this.headerConfig();

    // The explicit `hidden` property should override the function of location
    // TODO: move functions to component code and out of app config, no use case for overriding them
    const showBackButton = !back_button.hidden && !this.isHomeRoute;
    const showMenuButton = !menu_button.hidden && this.isHomeRoute;
    this.showBackButton.set(showBackButton);
    this.showMenuButton.set(showMenuButton);
    this.marginTop.set(0);
  }

  /** When device back button evaluate conditions to handle app minimise */
  private handleHardwareBackPress() {
    if (this.isHomeRoute) {
      App.minimizeApp();
    }
  }

  private setHeaderHeightCSS(variant: IHeaderVariantOptions) {
    // Set CSS property dynamically in component so that it can be exposed to deployment config/skins
    const targetHeight = heightsMap[variant] || heightsMap.default;
    document.documentElement.style.setProperty("--header-height", `${targetHeight}px`);
  }

  /**
   * When enabling header collapse listen add scroll event listeners to detect when to collapse
   * If disabling dispose of previous scroll event listeners
   */
  private setHeaderCollapse(shouldCollapse: boolean) {
    // TODO: current header collapse implementation does not work on ios, so do not enable on this platform
    if (Capacitor.getPlatform() === "ios") return;
    this.removeScrollEventListeners();
    if (shouldCollapse && !this.headerConfig().hidden) {
      this.listenToScrollEvents();
    }
  }

  private removeScrollEventListeners() {
    // If previously scroll events were subscribed then should be able to unsubscribe.
    // If initial config change undefined->false can ignore
    if (this.scrollEvents$) {
      this.scrollEvents$.unsubscribe();
      this.scrollEvents$ = undefined;
      this.marginTop.set(0);
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
          this.marginTop.set(0);
        } else {
          // hide header after scrolled further than header height
          if (currentY >= headerHeight) {
            // temporarily disable scroll events whilst animation moves bar
            // as that would trigger negative scroll direction
            this.scrollEvents$.unsubscribe();
            // set negative margin to move header off-screen
            this.marginTop.set(headerHeight * -1);
            await _wait(500);
            this.listenToScrollEvents();
          }
        }
      });
  }

  ngOnDestroy() {
    this.removeScrollEventListeners();
    if (this.hardwareBackButton$) {
      this.hardwareBackButton$.remove();
    }
  }
}
