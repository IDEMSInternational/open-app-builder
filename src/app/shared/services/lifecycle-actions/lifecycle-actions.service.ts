import { Injectable, Injector } from "@angular/core";
import { TemplateActionService } from "../../components/template/services/instance/template-action.service";
import { TemplateVariablesService } from "../../components/template/services/template-variables.service";
import { AppDataService } from "../data/app-data.service";
import { FlowTypes } from "src/app/shared/model";
import { mergeArrayOfArrays, asyncEvery } from "src/app/shared/utils";
import { SyncServiceBase } from "../syncService.base";

@Injectable({
  providedIn: "root",
})
export class LifecycleActionsService extends SyncServiceBase {
  constructor(
    private appDataService: AppDataService,
    private templateVariablesService: TemplateVariablesService,
    private injector: Injector
  ) {
    super("LifeCycleActions");
  }

  public async handleLaunchActions() {
    await this.ensureAsyncServicesReady([this.templateVariablesService]);
    this.ensureSyncServicesReady([this.appDataService]);
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
      let allConditionsSatisfied = true;
      if (Array.isArray(launchAction.condition_list) && launchAction.condition_list.length > 0) {
        allConditionsSatisfied = await asyncEvery(
          launchAction.condition_list,
          async (condition: string) =>
            await this.templateVariablesService.evaluateConditionString(condition)
        );
      }
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
