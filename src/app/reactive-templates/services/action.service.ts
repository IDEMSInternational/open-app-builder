import { Injectable } from "@angular/core";
import { FlowTypes } from "packages/data-models";
import { TemplateActionRegistry } from "src/app/shared/components/template/services/instance/template-action.registry";
import { CoreActionsService } from "./core-actions.service";
import { EvaluationService } from "./evaluation.service";
import { RowBaseComponent } from "../reactive-components/row-base.component";
import { ActionHandler } from "./action.handler";

@Injectable({
  providedIn: "root",
})
export class ActionService {
  constructor(
    private templateActionRegistry: TemplateActionRegistry,
    private evaluationService: EvaluationService,
    private coreActionsService: CoreActionsService, // Not used, just forces initialisation - todo: replace with individual action registers & use APP_INITIALIZER
    private actionHandler: ActionHandler // Also just to force initialisation - todo: as above
  ) {}

  public async handleActions(
    rowComponent: RowBaseComponent<any>,
    trigger: string,
    namespace: string
  ) {
    const actions = rowComponent.row().action_list?.filter((a) => a.trigger === trigger);

    if (!actions || !actions.length) return;

    actions
      .map((a) => {
        return {
          ...a,
          // We replace "this.value" with the actual field name, so that it can be evaluated in context
          // this.value is a hack used in the old templates to refer to the current field value
          //
          args: a.args.map((arg) => arg.replace("this.value", `@local.${rowComponent.row().name}`)),
        };
      })
      .map((a) => {
        return {
          ...a,
          args: a.args.map((arg) => this.evaluationService.evaluateExpression(arg, namespace)),
          rawArgs: a.args,
        };
      })
      .forEach(async (action) => await this.handleAction(action));
  }

  private async handleAction(action: FlowTypes.TemplateRowAction) {
    return this.templateActionRegistry.trigger(action);
  }
}
