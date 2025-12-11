import { computed, effect, Injectable } from "@angular/core";
import { NavStackService } from "./nav-stack.service";
import { App } from "@capacitor/app";
import { Capacitor, PluginListenerHandle } from "@capacitor/core";
import { Location } from "@angular/common";

@Injectable({ providedIn: "root" })
/**
 * Utility service to help manage intercepting back button presses when working with nav stacks.
 * Hardware back button press on android is fully supported, used to dismiss top nav stack.
 * Browser back button press is partially supported, currently dismisses all nav stacks.
 */
export class NavStackBackService {
  /** Track whether navStacks are currently open or not to enable back interception */
  private navStacksOpen = computed(() => this.navStackService.openNavStacks().length > 0);

  private androidBackButtonListener: PluginListenerHandle;
  private browserBackButtonHandler = () => {
    this.navStackService.closeAllNavStacks();
    // HACK: Default browser back button behaviour cannot be prevented, so navigate forward in history
    // to counteract back navigation and remain on the page that launched the nav-stack
    this.location.forward();
  };

  constructor(
    private navStackService: NavStackService,
    private location: Location
  ) {
    effect(async () => {
      if (this.navStacksOpen()) {
        await this.addBackButtonListener();
      } else {
        await this.removeBackButtonListener();
      }
    });
  }

  private async addBackButtonListener() {
    const platform = Capacitor.getPlatform();
    if (platform === "android") {
      const listener = await App.addListener("backButton", async (e) => {
        await this.navStackService.closeTopNavStack();
      });
      this.androidBackButtonListener = listener;
    } else {
      window.addEventListener("popstate", this.browserBackButtonHandler);
    }
  }

  private async removeBackButtonListener() {
    if (this.androidBackButtonListener) {
      await this.androidBackButtonListener.remove();
      this.androidBackButtonListener = undefined;
    } else {
      window.removeEventListener("popstate", this.browserBackButtonHandler);
    }
  }
}
