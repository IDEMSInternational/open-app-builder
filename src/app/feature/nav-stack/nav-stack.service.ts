import { Injectable } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { INavStackConfig, NavStackComponent } from "./components/nav-stack/nav-stack.component";
import { SyncServiceBase } from "src/app/shared/services/syncService.base";

interface NavStackModal extends HTMLIonModalElement {}

@Injectable({
  providedIn: "root",
})
export class NavStackService extends SyncServiceBase {
  openNavStacks: HTMLIonModalElement[] = [];

  constructor(private modalCtrl: ModalController) {
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
    await this.handleModalDismissal(modal);
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
    modal.setAttribute("data-stack-index", navStackIndex.toString());
    modal.style.setProperty("--stack-index", navStackIndex.toString());

    // Remove focus from active element before presenting modal to avoid accessibility warning
    // See https://stackoverflow.com/a/79210442
    const activeElement = document.activeElement as HTMLElement;
    if (activeElement) {
      activeElement.blur();
    }
    await modal.present();
    this.openNavStacks.push(modal);
  }

  private async handleModalDismissal(modal: NavStackModal): Promise<void> {
    await modal.onWillDismiss();
    // Nav-stack modal has already been closed by component, so just remove from array
    const index = this.getNavStackIndex(modal);
    if (index === -1) return;
    this.openNavStacks.splice(index, 1);
  }

  public async closeTopNavStack() {
    if (this.openNavStacks.length === 0) return;
    await this.closeNavStack(this.openNavStacks.length - 1);
  }

  private getNavStackIndex(modalElement: HTMLIonModalElement) {
    return this.openNavStacks.indexOf(modalElement);
  }

  private async closeNavStack(index: number) {
    await this.openNavStacks[index].dismiss();
    this.openNavStacks.splice(index, 1);
  }

  public async closeAllNavStacks() {
    // Close nav-stacks in reverse order
    for (let index = this.openNavStacks.length - 1; index >= 0; index--) {
      await this.closeNavStack(index);
    }
  }
}
