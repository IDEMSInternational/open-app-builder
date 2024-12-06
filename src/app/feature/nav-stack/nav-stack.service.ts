import { Injectable } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { INavStackConfig, NavStackComponent } from "./components/nav-stack/nav-stack.component";
import { SyncServiceBase } from "src/app/shared/services/syncService.base";
import { TemplateNavService } from "src/app/shared/components/template/services/template-nav.service";

interface NavStackModal extends HTMLIonModalElement {}

// Modal dismiss 'roles' that are allowed to dismiss the nav-stack
const ALLOWED_DISMISS_ROLES = ["close-button", "backdrop", "programmatic"];

@Injectable({
  providedIn: "root",
})
export class NavStackService extends SyncServiceBase {
  private openNavStacks: HTMLIonModalElement[] = [];
  private readonly MAX_NAV_STACKS = 10;

  constructor(
    private modalCtrl: ModalController,
    private templateNavService: TemplateNavService
  ) {
    super("navStack");
    // NB: Actions are registered in nav-stack module
  }

  /**
   * Create and present a new nav-stack modal and push it to openNavStacks array.
   * Await and remove from openNavStacks array on dismiss
   */
  public async pushNavStack(navStackConfig: INavStackConfig) {
    if (this.openNavStacks.length >= this.MAX_NAV_STACKS) {
      console.warn(`[NAV STACK] Maximum number of nav stacks reached: ${this.MAX_NAV_STACKS}`);
      return null;
    }
    const modal = await this.createNavStackModal(navStackConfig);
    await this.presentAndTrackModal(modal);
    return modal;
  }

  public async closeAllNavStacks() {
    await Promise.all(
      this.openNavStacks.map(async (navStack) => await this.dismissNavStackModal(navStack))
    );
  }

  public async closeTopNavStack() {
    if (this.openNavStacks.length === 0) return;
    await this.closeNavStackAtIndex(this.openNavStacks.length - 1);
  }

  /**
   * Creates a new nav-stack modal instance
   */
  private async createNavStackModal(config: INavStackConfig) {
    console.log("[NAV STACK] config", config);
    const modal = await this.modalCtrl.create({
      component: NavStackComponent,
      componentProps: { config },
      // Styling must be done in global theme scss as the modal is injected dynamically into the dom
      cssClass: "nav-stack-modal",
      canDismiss: (data, role) => {
        console.log("Dismiss requested", data, role);
        console.log("Allowed dismiss roles", ALLOWED_DISMISS_ROLES);
        if (ALLOWED_DISMISS_ROLES.includes(role)) {
          console.log("Dismiss allowed");
          return Promise.resolve(true);
        }
        return Promise.resolve(false);
      },
    });
    return modal as NavStackModal;
  }

  private async presentAndTrackModal(modal: NavStackModal) {
    const navStackIndex = this.openNavStacks.length;
    modal.setAttribute("data-nav-stack-index", navStackIndex.toString());
    modal.style.setProperty("--nav-stack-index", navStackIndex.toString());

    // Handle nav stack dismissal here (whether programmatically from service or from nav-stack component)
    modal.onWillDismiss().then(() => this.handleNavStackDismissal(modal));

    this.addNavStackToArray(modal);
    await modal.present();
  }

  private handleNavStackDismissal(modal: NavStackModal) {
    const index = this.getNavStackIndex(modal);
    if (index === -1) return;
    this.removeNavStackFromArray(index);
  }

  private getNavStackIndex(modalElement: HTMLIonModalElement) {
    return this.openNavStacks.indexOf(modalElement);
  }

  /**
   * Programmiatcally dismiss a nav-stack. Handling removing from openNavStacks array is done elsewhere
   * to handle both programmatic dismissal and dismissal from nav-stack component (e.g. via close button)
   */
  private async closeNavStackAtIndex(index: number) {
    const modal = this.openNavStacks[index];
    if (modal) {
      await this.dismissNavStackModal(modal);
    }
  }

  private async dismissNavStackModal(modal: NavStackModal) {
    modal.dismiss("", "programmatic");
  }

  private addNavStackToArray(modal: NavStackModal) {
    if (this.openNavStacks.length === 0) {
      this.setCustomBackHandler();
    }
    this.openNavStacks.push(modal);
  }

  private removeNavStackFromArray(index: number) {
    this.openNavStacks.splice(index, 1);
    if (this.openNavStacks.length === 0) {
      this.templateNavService.destroyBackButtonHandler();
    }
  }

  private setCustomBackHandler() {
    this.templateNavService.initializeBackButtonHandler(() => this.closeAllNavStacks());
  }
}
