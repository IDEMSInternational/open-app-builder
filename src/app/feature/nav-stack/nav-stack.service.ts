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
    const modal = await this.createNavStackModal(navStackConfig);
    await this.presentAndTrackModal(modal);
    return modal;
  }

  public async closeAllNavStacks() {
    // Close nav-stacks in reverse order
    for (let index = this.openNavStacks.length - 1; index >= 0; index--) {
      await this.closeNavStack(index);
    }
  }

  public async closeTopNavStack() {
    if (this.openNavStacks.length === 0) return;
    await this.closeNavStack(this.openNavStacks.length - 1);
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
      this.removeNavStackFromArray(index);
      this.removeNavStackHistoryState(modal);
    });
    this.addNavStackToArray(modal);
    // add a history entry so that we can navigate back on dismissal without changing page
    history.pushState({ modalId: modal.id }, "");
    await modal.present();
  }

  private getNavStackIndex(modalElement: HTMLIonModalElement) {
    return this.openNavStacks.indexOf(modalElement);
  }

  private async closeNavStack(index: number) {
    await this.dismissNavStackModal(this.openNavStacks[index]);
    this.openNavStacks.splice(index, 1);
  }

  private async dismissNavStackModal(modal: NavStackModal) {
    await modal.dismiss();
  }

  private removeNavStackHistoryState(modal: NavStackModal) {
    const modalId = modal.id;
    // If we pushed a state for this modal, go back
    if (history.state?.modalId === modalId) {
      this.templateNavService.suppressPopState = true;
      history.back();
    }
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
    this.templateNavService.initializeBackButtonHandler(() => this.closeTopNavStack());
  }
}
