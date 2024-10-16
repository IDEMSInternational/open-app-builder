import { Location } from "@angular/common";
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { computed, effect, signal } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { NavigationEnd, NavigationStart, Router } from "@angular/router";
import { App } from "@capacitor/app";
import { Capacitor, PluginListenerHandle } from "@capacitor/core";
import { Subscription, fromEvent, map } from "rxjs";
import type { IHeaderVariantOptions } from "data-models/appConfig";
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
  changeDetection: ChangeDetectionStrategy.OnPush,
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
        if (e instanceof NavigationEnd) {
          this.handleRouteChange();
        }
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
    const { should_show_back_button, should_show_menu_button } = this.headerConfig();
    this.showBackButton.set(should_show_back_button(location));
    this.showMenuButton.set(should_show_menu_button(location));
    this.marginTop.set(0);
  }

  /** When device back button evaluate conditions to handle app minimise */
  private handleHardwareBackPress() {
    const { should_minimize_app_on_back } = this.headerConfig();
    if (should_minimize_app_on_back(location)) {
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
    if (shouldCollapse) {
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
