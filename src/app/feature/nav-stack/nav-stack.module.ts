import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { NavStackComponent } from "./components/nav-stack/nav-stack.component";
import { TemplateComponentModule } from "../template/pages/component/component.module";
import { TemplateComponentsModule } from "../../shared/components/template/template.module";
import { TemplateActionRegistry } from "src/app/shared/components/template/services/instance/template-action.registry";
import { NavStackService } from "./nav-stack.service";

@NgModule({
  declarations: [NavStackComponent],
  imports: [CommonModule, IonicModule, TemplateComponentModule, TemplateComponentsModule],
})
export class NavStackModule {
  constructor(
    private templateActionRegistry: TemplateActionRegistry,
    private navStackService: NavStackService
  ) {
    this.reguisterTemplateActionHandlers();
  }
  reguisterTemplateActionHandlers() {
    this.templateActionRegistry.register({
      nav_stack: async ({ args, params }) => {
        const [actionId] = args;
        const childActions = {
          open: async () => {
            const { template, title, show_close_button = true } = params;
            const navStackConfig = {
              templateName: template,
              title,
              showCloseButton: show_close_button,
            };
            this.navStackService.pushNavStack(navStackConfig);
          },
          close_top: async () => {
            await this.navStackService.closeTopNavStack();
          },
          close_all: async () => {
            await this.navStackService.closeAllNavStacks();
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
}
