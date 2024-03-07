import { Location } from "@angular/common";
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { NavigationEnd, NavigationStart, Router } from "@angular/router";
import { App } from "@capacitor/app";
import { Capacitor, PluginListenerHandle } from "@capacitor/core";
import { Subscription } from "rxjs";
import { IAppConfig, IHeaderColourOptions, IHeaderVariantOptions } from "../../model";
import { AppConfigService } from "../../services/app-config/app-config.service";

@Component({
  selector: "plh-main-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class headerComponent implements OnInit, OnDestroy {
  @ViewChild("headerElement") headerElement: ElementRef;

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
  }

  subscribeToAppConfigChanges() {
    this.appConfigChanges$ = this.appConfigService.appConfig$.subscribe((appConfig: IAppConfig) => {
      this.headerConfig = appConfig.APP_HEADER_DEFAULTS;
      this.updateHeaderConfig();
    });
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
    const { variant, heightsMap } = this.headerConfig;
    this.variant = variant;
    // Set CSS property dynamically in component so that it can be exposed to deployment config/skins
    document.documentElement.style.setProperty(
      "--header-height",
      `${heightsMap[this.variant] || heightsMap.default}px`
    );
  }

  ngOnDestroy() {
    this.appConfigChanges$.unsubscribe();
    this.routeChanges$.unsubscribe();
    if (this.hardwareBackButton$) {
      this.hardwareBackButton$.remove();
    }
  }
}