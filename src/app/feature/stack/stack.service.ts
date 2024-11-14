import { Injectable } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { StackComponent } from "./components/stack/stack.component";
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
          push: async () => {
            const { template } = params;
            this.navStackPush(template);
          },
          pop: async () => {
            this.navStackPop();
          },
        };
        if (!(actionId in childActions)) {
          console.error("app_update does not have action", actionId);
          return;
        }
        return childActions[actionId]();
      },
    });
  }

  navStackPush(templateName: string) {
    console.log("templateName", templateName);
    this.openModal(templateName);
  }

  navStackPop() {}

  async openModal(templatename: string) {
    const modal = await this.modalCtrl.create({
      component: StackComponent,
      componentProps: { templatename },
      // update to this styling must be done in global theme scss as the modal is injected dynamically into the dom
      cssClass: "stack-modal",
    });
    modal.present();

    this.openStacks.push(modal);

    const { data, role } = await modal.onWillDismiss();
  }
}
