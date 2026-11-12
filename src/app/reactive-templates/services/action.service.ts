import { Injectable } from "@angular/core";
import { FlowTypes } from "packages/data-models";
import { TemplateActionRegistry } from "src/app/shared/components/template/services/instance/template-action.registry";
import { CoreActionsService } from "./core-actions.service";
import { EvaluationService } from "./evaluation.service";
import { RowBaseComponent } from "../reactive-components/row-base.component";
import { ActionHandler } from "./action.handler";
import { SetGlobalActionService } from "./actions/set-global.action";
import { ActionRegistry } from "./action.registry";
import { RowRegistry } from "./row.registry";
import { ActionContextService } from "./action-context.service";

@Injectable({
  providedIn: "root",
})
export class ActionService {
  constructor(
    private templateActionRegistry: TemplateActionRegistry,
    private evaluationService: EvaluationService,
    private coreActionsService: CoreActionsService,
    private actionHandler: ActionHandler,
    private setGlobalActionService: SetGlobalActionService, // Also just to force initialisation - todo: as above
    private actionRegistry: ActionRegistry,
    private rowRegistry: RowRegistry,
    private actionContext: ActionContextService
  ) {}

  public async handleActions(
    rowComponent: RowBaseComponent<any>,
    trigger: string,
    namespace: string
  ) {
    const actions = rowComponent.row().action_list?.filter((a) => a.trigger === trigger);

    if (!actions || !actions.length) return;

    const name = rowComponent.row().name;

    const actionArgs = actions
      .map((a) => {
        return {
          ...a,
          // We replace "this.value" with the actual field name, so that it can be evaluated in context
          // this.value is a hack used in the old templates to refer to the current field value
          //
          args: a.args.map((arg) => arg.replace("this.value", `@local.${name}`)),
        };
      })
      .map((a) => {
        return {
          ...a,
          args: a.args.map((arg) => this.evaluationService.evaluateExpression(arg, namespace)),
          rawArgs: a.args,
          namespace,
        };
      });

    await Promise.all(actionArgs.map((action) => this.handleAction(action)));
  }

  private async handleAction(action: FlowTypes.TemplateRowAction) {
    this.actionContext.set(action, this.actionRegistry, this.rowRegistry);
    return this.templateActionRegistry.trigger(action);
  }
}
