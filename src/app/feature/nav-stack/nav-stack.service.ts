import { Injectable } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { INavStackConfig, NavStackComponent } from "./components/nav-stack/nav-stack.component";
import { SyncServiceBase } from "src/app/shared/services/syncService.base";
import { TemplateNavService } from "src/app/shared/components/template/services/template-nav.service";

interface NavStackModal extends HTMLIonModalElement {}

@Injectable({
  providedIn: "root",
})
export class NavStackService extends SyncServiceBase {
  private openNavStacks: HTMLIonModalElement[] = [];
  handlerSet = false;

  constructor(
    private modalCtrl: ModalController,
    private templateNavService: TemplateNavService
  ) {
    super("navStack");
    // NB: Actions are registered in nav-stack module
  }

  setCustomBackHandler() {
    this.templateNavService.initializeBackButtonHandler(() => {
      this.closeTopNavStack();
      return true;
    });
  }

  /**
   * Create and present a new nav-stack modal and push it to openNavStacks array.
   * Await and remove from openNavStacks array on dismiss
   */
  public async pushNavStack(navStackConfig: INavStackConfig) {
    if (!this.handlerSet) {
      this.setCustomBackHandler();
      this.handlerSet = true;
    }
    const modal = await this.createNavStackModal(navStackConfig);
    await this.presentAndTrackModal(modal);
    return modal;
  }

  public async closeAllNavStacks() {
    await Promise.all(this.openNavStacks.map(async (navStack) => await navStack.dismiss()));
  }

  public async closeTopNavStack() {
    if (this.openNavStacks.length === 0) return;
    await this.closeNavStack(this.openNavStacks.length - 1);
    if (this.openNavStacks.length === 0) {
      this.templateNavService.destroyBackButtonHandler();
      this.handlerSet = false;
    }
  }

  /**
   * Creates a new nav-stack modal instance
   */
  private async createNavStackModal(config: INavStackConfig) {
    const modal = await this.modalCtrl.create({
      component: NavStackComponent,
      componentProps: { config },
      // Styling must be done in global theme scss as the modal is injected dynamically into the dom
      cssClass: "nav-stack-modal",
    });
    return modal as NavStackModal;
  }

  private async presentAndTrackModal(modal: NavStackModal) {
    const navStackIndex = this.openNavStacks.length;
    modal.setAttribute("data-nav-stack-index", navStackIndex.toString());
    modal.style.setProperty("--nav-stack-index", navStackIndex.toString());

    // Remove array entry whenever modal is dismissed
    modal.onWillDismiss().then(() => {
      const index = this.getNavStackIndex(modal);
      if (index === -1) return;
      this.openNavStacks.splice(index, 1);
    });
    await modal.present();
    this.openNavStacks.push(modal);
  }

  private getNavStackIndex(modalElement: HTMLIonModalElement) {
    return this.openNavStacks.indexOf(modalElement);
  }

  private async closeNavStack(index: number) {
    await this.openNavStacks[index].dismiss();
    this.openNavStacks.splice(index, 1);
  }
}
