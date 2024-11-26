import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { NavStackComponent } from "./components/nav-stack/nav-stack.component";
import { TemplateComponentModule } from "../template/pages/component/component.module";
import { TemplateComponentsModule } from "../../shared/components/template/template.module";
import { TemplateActionRegistry } from "src/app/shared/components/template/services/instance/template-action.registry";
import { NavStackService } from "./nav-stack.service";
import { NavStackActionFactory } from "./nav-stack.actions";

@NgModule({
  declarations: [NavStackComponent],
  imports: [CommonModule, IonicModule, TemplateComponentModule, TemplateComponentsModule],
})
export class NavStackModule {
  constructor(templateActionRegistry: TemplateActionRegistry, navStackService: NavStackService) {
    const { nav_stack } = new NavStackActionFactory(navStackService);
    templateActionRegistry.register({ nav_stack });
  }
}
