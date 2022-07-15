import { Injectable, Injector } from "@angular/core";
import { TemplateActionService } from "../../components/template/services/instance/template-action.service";
import { TemplateVariablesService } from "../../components/template/services/template-variables.service";
import { AppDataService } from "../data/app-data.service";
import { FlowTypes } from "src/app/shared/model";
import { mergeArrayOfArrays, asyncEvery } from "src/app/shared/utils";

@Injectable({
  providedIn: "root",
})
export class LifecycleActionsService {
  constructor(
    private appDataService: AppDataService,
    private templateVariablesService: TemplateVariablesService,
    private injector: Injector
  ) {}

  public async handleLaunchActions() {
    const allLaunchActions = await this.getAllLifecycleActionsByEventType("app_start");

    // Order by priority
    for (const action of allLaunchActions) {
      if (!action.hasOwnProperty("priority")) action.priority = -Infinity;
    }
    allLaunchActions.sort((a, b) => a.priority - b.priority);

    // For each launch action row, evaluate its condition list and,
    // if all are satisfied, run its actions list
    const templateActionService = new TemplateActionService(this.injector);
    for (const launchAction of allLaunchActions) {
      const allConditionsSatisfied = await asyncEvery(
        launchAction.condition_list,
        async (condition: string) =>
          await this.templateVariablesService.evaluateConditionString(condition)
      );
      if (allConditionsSatisfied) {
        console.log(`[Lifecycle Actions] ${launchAction.id}`);
        await templateActionService.handleActions(launchAction.action_list);
      }
    }
    return;
  }

  private async getAllLifecycleActions() {
    const dataLists = await this.appDataService.getSheetsWithData(
      "data_list",
      (list) => list.flow_subtype === "lifecycle_actions"
    );
    const launchActionRows = dataLists.map((d) => d.rows);
    const allLifecycleActions: FlowTypes.Lifecycle_Action[] = mergeArrayOfArrays(launchActionRows);
    return allLifecycleActions;
  }

  private async getAllLifecycleActionsByEventType(lifecycleEvent: FlowTypes.LifecycleEvent) {
    const allLifecycleActions = await this.getAllLifecycleActions();
    return allLifecycleActions.filter(
      (launchAction) => launchAction.lifecycle_event === lifecycleEvent
    );
  }
}
