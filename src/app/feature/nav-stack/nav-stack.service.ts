import { Injectable } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { INavStackConfig, NavStackComponent } from "./components/nav-stack/nav-stack.component";
import { SyncServiceBase } from "src/app/shared/services/syncService.base";
import { TemplateActionRegistry } from "src/app/shared/components/template/services/instance/template-action.registry";

interface NavStackModal extends HTMLIonModalElement {}

@Injectable({
  providedIn: "root",
})
export class NavStackService extends SyncServiceBase {
  openNavStacks: HTMLIonModalElement[] = [];

  constructor(
    private modalCtrl: ModalController,
    private templateActionRegistry: TemplateActionRegistry
  ) {
    super("navStack");
    this.init();
  }

  private init() {
    this.registerTemplateActionHandlers();
  }

  private registerTemplateActionHandlers() {
    this.templateActionRegistry.register({
      nav_stack: async ({ args, params }) => {
        const [actionId] = args;
        const childActions = {
          open: async () => {
            const { template, title, show_close_button } = params;
            const navStackConfig = {
              templateName: template,
              title,
              showCloseButton: show_close_button,
            };
            this.pushNavStack(navStackConfig);
          },
          close_top: async () => {
            this.closeTopNavStack();
          },
          close_all: () => {
            this.closeAllNavStacks();
          },
        };
        if (!(actionId in childActions)) {
          console.error(`[NAV_STACK] No action, ${actionId}`);
          return;
        }
        return childActions[actionId]();
      },
    });
  }

  /**
   * Create and present a new nav-stack modal and push it to openNavStacks array.
   * Await and remove from openNavStacks array on dismiss
   */
  private async pushNavStack(navStackConfig: INavStackConfig) {
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

  private closeTopNavStack() {
    if (this.openNavStacks.length === 0) return;
    this.closeNavStack(this.openNavStacks.length - 1);
  }

  private getNavStackIndex(modalElement: HTMLIonModalElement) {
    return this.openNavStacks.indexOf(modalElement);
  }

  private async closeNavStack(index: number) {
    await this.openNavStacks[index].dismiss();
    this.openNavStacks.splice(index, 1);
  }

  private closeAllNavStacks() {
    this.openNavStacks.forEach(async (_, index) => await this.closeNavStack(index));
  }
}
