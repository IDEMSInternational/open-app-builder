import { Injectable } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { IStackConfig, StackComponent } from "./components/stack/stack.component";
import { SyncServiceBase } from "src/app/shared/services/syncService.base";
import { TemplateActionRegistry } from "src/app/shared/components/template/services/instance/template-action.registry";

@Injectable({
  providedIn: "root",
})
export class StackService extends SyncServiceBase {
  openStacks: HTMLIonModalElement[] = [];

  constructor(
    private modalCtrl: ModalController,
    private templateActionRegistry: TemplateActionRegistry
  ) {
    super("stack");
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
            const { template, title, icon, show_close_button } = params;
            const stackConfig = {
              templateName: template,
              title,
              icon,
              showCloseButton: show_close_button,
            };
            this.pushStack(stackConfig);
          },
          close_top: async () => {
            this.closeTopStack();
          },
          close_all: () => {
            this.closeAllStacks();
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
   * Create a new stack modal and push it to openStacks array.
   * Await and remove from openStacks array on dismiss
   */
  private async pushStack(stackConfig: IStackConfig) {
    const modal = await this.modalCtrl.create({
      component: StackComponent,
      componentProps: { config: stackConfig },
      // update to this styling must be done in global theme scss as the modal is injected dynamically into the dom
      cssClass: "stack-modal",
    });
    modal.present();
    this.openStacks.push(modal);
    const stackIndex = this.getStackIndex(modal);
    modal.setAttribute("data-stack-index", stackIndex.toString());
    // Set property for dynamic CSS calculations
    modal.style.setProperty("--stack-index", stackIndex.toString());
    await modal.onWillDismiss();
    // Stack modal has already been closed by component, so just remove from array
    this.openStacks.splice(stackIndex, 1);
  }

  private closeTopStack() {
    if (this.openStacks.length === 0) return;
    this.closeStack(this.openStacks.length - 1);
  }

  private getStackIndex(modalElement: HTMLIonModalElement) {
    return this.openStacks.indexOf(modalElement);
  }

  private async closeStack(index: number) {
    await this.openStacks[index].dismiss();
    this.openStacks.splice(index, 1);
  }

  private closeAllStacks() {
    this.openStacks.forEach(async (_, index) => await this.closeStack(index));
  }
}
