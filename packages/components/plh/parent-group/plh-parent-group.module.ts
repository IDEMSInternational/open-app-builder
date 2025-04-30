import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TemplateActionRegistry } from "src/app/shared/components/template/services/instance/template-action.registry";
import { PlhParentGroupService } from "./plh-parent-group.service";
import { PlhParentGroupActionFactory } from "./plh-parent-group.actions";

@NgModule({
  imports: [CommonModule],
  providers: [PlhParentGroupService],
})
export class PlhParentGroupModule {
  constructor(
    templateActionRegistry: TemplateActionRegistry,
    plhParentGroupService: PlhParentGroupService
  ) {
    const { plh_parent_group } = new PlhParentGroupActionFactory(plhParentGroupService);
    templateActionRegistry.register({ plh_parent_group });
  }
}
