import { Injectable } from "@angular/core";
import { FlowTypes } from "packages/data-models";
import { TemplateActionRegistry } from "src/app/shared/components/template/services/instance/template-action.registry";
import { CoreActionsService } from "./core-actions.service";
import { EvaluationService } from "./evaluation.service";

@Injectable({
  providedIn: "root",
})
export class ActionService {
  constructor(
    private templateActionRegistry: TemplateActionRegistry,
    private coreActionsService: CoreActionsService, // Not used, just forces initialisation - todo: replace with individual action registers & use APP_INITIALIZER
    private evaluationService: EvaluationService
  ) {}

  public async handleActions(row: FlowTypes.TemplateRow, trigger: string, namespace: string) {
    const actions = this.evaluationService.evaluateActions(row, trigger, namespace);
    actions.forEach(async (action) => await this.handleAction(action));
  }

  private async handleAction(action: FlowTypes.TemplateRowAction) {
    return this.templateActionRegistry.trigger(action);
  }
}
