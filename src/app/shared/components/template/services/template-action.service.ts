import { BehaviorSubject } from "rxjs";
import { takeWhile } from "rxjs/operators";
import { FlowTypes } from "src/app/shared/model";
import { TemplateContainerComponent } from "../template-container.component";
import { SettingsService } from "src/app/pages/settings/settings.service";
import { TemplateProcessService } from "./template-process.service";
import { ServerService } from "src/app/shared/services/server/server.service";

/** Logging Toggle - rewrite default functions to enable or disable inline logs */
let SHOW_DEBUG_LOGS = false;
let log = SHOW_DEBUG_LOGS ? console.log : () => null;
let log_group = SHOW_DEBUG_LOGS ? console.group : () => null;
let log_groupEnd = SHOW_DEBUG_LOGS ? console.groupEnd : () => null;

/**
 *
 *
 */
export class TemplateActionService {
  private actionsQueue: FlowTypes.TemplateRowAction[] = [];
  private actionsQueueProcessing$ = new BehaviorSubject<boolean>(false);

  constructor(
    public container: TemplateContainerComponent,
    private settingsService: SettingsService,
    private serverService: ServerService
  ) {}

  /** Public method to add actions to processing queue and process */
  public async handleActions(
    actions: FlowTypes.TemplateRowAction[] = [],
    _triggeredBy?: FlowTypes.TemplateRow
  ) {
    const unhandledActions = await this.handleActionsInterceptor(actions);
    unhandledActions.forEach((action) => this.actionsQueue.push({ ...action, _triggeredBy }));
    const res = await this.processActionQueue();
    await this.handleActionsCallback([...unhandledActions], res);
    if (!this.container.parent) {
      await this.container.templateNavService.handleNavActionsFromChild(actions, this.container);
    }
  }
  /** Optional method child component can add to handle post-action callback */
  public async handleActionsCallback(actions: FlowTypes.TemplateRowAction[], results: any) {}

  /** Optional method child component can filter action list to handle outside of default handlers */
  public async handleActionsInterceptor(
    actions: FlowTypes.TemplateRowAction[]
  ): Promise<FlowTypes.TemplateRowAction[]> {
    return actions;
  }

  /**
   * To avoid actions potentially trying to write to same db records at the same time,
   * all actions are added to a queue and processed in order of addition
   */
  private async processActionQueue() {
    const processedActions: FlowTypes.TemplateRowAction[] = [];
    // start the queue if it is not already running
    if (!this.actionsQueueProcessing$.value) {
      log_group(`Process Actions - ${this.container.name}`, [...this.actionsQueue]);
      this.actionsQueueProcessing$.next(true);
      while (this.actionsQueue.length > 0) {
        const action = this.actionsQueue[0];
        await this.processAction(action);
        this.actionsQueue.shift();
        processedActions.push(action);
      }
      this.actionsQueueProcessing$.next(false);
      log_groupEnd();
    }
    // resolve once full queue processed
    await this.actionsQueueProcessing$.pipe(takeWhile((v) => v === true)).toPromise();
    // once all actions have been processed re-render rows
    if (processedActions.length > 0) {
      // assume rows might need re-evaluation if actions contain set_field or set_local
      // TODO - further optimise (link to specific row dynamic dependencies)
      const reprocessActions: FlowTypes.TemplateRowAction["action_id"][] = [
        "set_field",
        "set_local",
        "trigger_actions",
      ];
      if (processedActions.find((a) => reprocessActions.includes(a.action_id))) {
        await this.container.templateRowService.processRowUpdates();
      }
    }
  }
  private async processAction(action: FlowTypes.TemplateRowAction) {
    let { action_id, args } = action;
    args = args.map((arg) => {
      // HACK - update any self referenced values (see note from template.parser method)
      if (arg === "this.value") {
        arg = this.container.templateRowMap[action._triggeredBy?._nested_name]?.value;
      }
      return arg;
    });
    let [key, value] = args;

    switch (action_id) {
      case "reset_app":
        return this.settingsService.resetApp();
      case "set_local":
        console.log("[SET LOCAL]", { key, value });
        return this.setLocalVariable(key, value);
      case "go_to":
        return this.container.templateNavService.handleNavAction(action, this.container);
      case "go_to_url":
        // because a normal url starts with https://, the ':' separates it into a key and a value and the value
        // is sufficient for the url to launch.
        console.log("[GO TO URL]", { key, value });
        // if there is no http or https then there is no : to separate and we only have a key in the url. This
        // case then adds '//' to the key so it recognises it as external and not local
        // This removes the need to have http or https in the url.
        if (!value) {
          value = "//" + key;
        }
        return this.container.templateNavService.handleNavActionExternal(value);
      case "pop_up":
        return this.container.templateNavService.handlePopupAction(action, this.container);
      case "set_field":
        console.log("[SET FIELD]", key, value);
        return this.container.templateService.setField(key, value);
      case "set_theme":
        return this.container.templateService.setTheme(
          this.container.template,
          "set_theme",
          action.args
        );
      case "start_tour":
        return this.container.tourService.startTour(key);
      case "trigger_actions":
        const triggeredActions: FlowTypes.TemplateRowAction[] = args[0] as any;
        // add actions to end of existing action queue for processing after current queue complete
        triggeredActions.forEach((a) =>
          this.actionsQueue.push({ ...a, _triggeredBy: action._triggeredBy })
        );
        return;
      case "process_template":
        // HACK - create an embedded template processor service instance to process template programatically
        const templateToProcess = this.container.templateService.getTemplateByName(args[0]);
        const processor = new TemplateProcessService(
          this.container.templateService,
          this.container.templateVariables,
          this.container.templateTranslateService,
          this.container.tourService,
          this.container.router,
          this.container.route,
          this.container.templateNavService,
          this.container.settingsService,
          this.container.serverService
        );
        return processor.processTemplateWithoutRender(templateToProcess);
      case "emit":
        const [emit_value, emit_from] = args;
        let container: TemplateContainerComponent = this.container;
        if (emit_from) {
          // emit from the named template container instead of this one if specified (assumed sibling of current)
          const targetContainer = container.children[emit_from];
          if (targetContainer) {
            action.args = [emit_value];
            container = targetContainer;
          }
        }
        let { parent, row, name, template, templatename } = container;
        console.log("[EMIT]", `${name || templatename}:${emit_value}`);
        if (emit_value === "completed") {
          // write completions to the database for data tracking
          await this.container.templateService.recordEvent(template, "emit", emit_value);
        }
        // TODO - trigger emit in shared service to allow individual services/components to subscribe
        // themselves instead of relying on hardcoded calls here

        // Handle a forced rerender
        if (emit_value === "force_reload") {
          await this.container.forceRerender(true);
        }
        if (emit_value === "force_reprocess") {
          await this.container.forceRerender(false);
        }
        if (emit_value === "set_language") {
          this.container.templateTranslateService.setLanguage(args[1]);
        }
        if (emit_value === "server_sync") {
          await this.serverService.syncUserData();
        }
        if (parent) {
          // continue to emit any actions to parent where defined
          log(
            "Emiting",
            emit_value,
            ` from ${row?.name || "(no row)"} to parent ${parent?.name || "(no parent)"}`,
            parent
          );
        }
        // Process any actions specified when row defined by parent (triggered on parent)
        // or from own update_action_list statement (triggered on self)
        if (row && row.action_list) {
          const actionsForEmittedEvent = row.action_list.filter((a) => a.trigger === emit_value);
          log("Excuting actions matching event ", { emit_value, actionsForEmittedEvent });
          const selfActions = actionsForEmittedEvent.filter((a) => a._self_triggered);
          const parentActions = actionsForEmittedEvent.filter((a) => !a._self_triggered);
          // process in parallel, do not return/await
          selfActions.forEach((a) => this.actionsQueue.push(a));
          if (parent && parentActions.length > 0) {
            parent.templateActionService.handleActions(parentActions, row);
          }
        }
        // Emit value so manual container bindings can also track (e.g. closing modal in popup from runStandaloneTemplate method)
        this.container.emittedValue.next(emit_value);
        break;
      default:
        console.warn("[W] No handler for action", { action_id, args });
        return;
    }
  }

  /**
   * Update a local template row
   *
   */
  private setLocalVariable(key: string, value: any) {
    const row_name = key;
    // convert values likely intended as boolean
    if (value === "true") value = true;
    if (value === "false") value = false;
    // check the namespaced entry exists in the template tree(could be the provided name or nested)
    // update the value of the entry for use in future reprocessing
    const rowEntry = this.getTemplateRowByName(row_name);
    if (rowEntry) {
      // remove previous dynamic value reference if exists
      // assign to both the overall row map and the runtime local variables
      if (rowEntry._dynamicFields && rowEntry._dynamicFields.value) {
        delete rowEntry._dynamicFields.value;
      }
      rowEntry.value = value;
      this.container.templateRowService.templateRowMap[rowEntry._nested_name] = rowEntry;
    } else {
      // TODO
      console.warn("Setting local variable which does not exist", { key, value }, "TODO");
    }
    // TODO - prompt any rows to re-process if they depend on the value (and other @ types)
    Object.values(this.container.templateRowService.templateRowMap).forEach((r) => {
      if (r._dynamicDependencies?.[`@local.${key}`]) {
        // console.warn("[Dynamic Deps] - TODO - handle single row update]", r);
      }
    });

    // update parent reference in case actions force a re-intialisation
    // (not currently implemented)
    if (this.container.parent) {
      this.container.parent.children[this.container.name] = this.container;
    }
  }

  /**
   * Lookup a template row by name within the nested template structure
   * If multiple rows are found with the same name the least nested will be returned
   */
  private getTemplateRowByName(name: string): FlowTypes.TemplateRow {
    // find any rows where nested path corresponds to match path
    let matchedRows: { row: FlowTypes.TemplateRow; nestedName: string }[] = [];
    Object.entries(this.container.templateRowService.templateRowMap).forEach(
      ([nestedName, row]) => {
        if (nestedName === name || nestedName.endsWith(`.${name}`)) {
          matchedRows.push({ row, nestedName });
        }
      }
    );
    // no match found
    if (matchedRows.length === 0) {
      console.error(`row [${name}] not found`, this.container.templateRowService.templateRowMap);
      return null;
    }
    // match found - return least nested (in case of duplicates)
    else {
      matchedRows = matchedRows.sort(
        (a, b) => a.nestedName.split(".").length - b.nestedName.split(".").length
      );
      if (matchedRows.length > 1) {
        console.warn(`[W] row [${name}] found multiple, returning least nested`, { matchedRows });
      }
      return matchedRows[0].row;
    }
  }
}
