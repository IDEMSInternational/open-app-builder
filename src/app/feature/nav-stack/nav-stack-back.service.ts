import { computed, effect, Injectable } from "@angular/core";
import { NavStackService } from "./nav-stack.service";
import { App } from "@capacitor/app";
import { Capacitor, PluginListenerHandle } from "@capacitor/core";

@Injectable({ providedIn: "root" })
/**
 * Utility service to help manage intercepting back button presses when working with nav stacks
 * Currently just supports hardware back button press on android, used to dismiss top nav stack
 */
export class NavStackBackService {
  /** Track whether navStacks are currently open or not to enable back interception */
  private navStacksOpen = computed(() => this.navStackService.openNavStacks().length > 0);

  private backButtonListener: PluginListenerHandle;

  constructor(private navStackService: NavStackService) {
    effect(async () => {
      const platform = Capacitor.getPlatform();
      if (platform !== "android") return;

      if (this.navStacksOpen()) {
        await this.addBackButtonListener();
      } else {
        await this.removeBackButtonListener();
      }
    });
  }

  private async addBackButtonListener() {
    const listener = await App.addListener("backButton", async (e) => {
      await this.navStackService.closeTopNavStack();
    });
    this.backButtonListener = listener;
  }

  private async removeBackButtonListener() {
    if (this.backButtonListener) {
      await this.backButtonListener.remove();
      this.backButtonListener = undefined;
    }
  }
}
