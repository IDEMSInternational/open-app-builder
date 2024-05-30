import { BehaviorSubject, lastValueFrom } from "rxjs";
import { takeWhile } from "rxjs/operators";
import { FlowTypes } from "src/app/shared/model";
import { TemplateContainerComponent } from "../../template-container.component";
import { SettingsService } from "src/app/shared/services/settings.service";
import { TemplateProcessService } from "./template-process.service";
import { ServerService } from "src/app/shared/services/server/server.service";
import { AnalyticsService } from "src/app/shared/services/analytics/analytics.service";
import { Injector } from "@angular/core";
import { TemplateNavService } from "../template-nav.service";
import { TemplateService } from "../template.service";
import { TemplateTranslateService } from "../template-translate.service";
import { EventService } from "src/app/shared/services/event/event.service";
import { DBSyncService } from "src/app/shared/services/db/db-sync.service";
import { AuthService } from "src/app/shared/services/auth/auth.service";
import { SkinService } from "src/app/shared/services/skin/skin.service";
import { ThemeService } from "src/app/feature/theme/services/theme.service";
import { TaskService } from "src/app/shared/services/task/task.service";
import { getGlobalService } from "src/app/shared/services/global.service";
import { SyncServiceBase } from "src/app/shared/services/syncService.base";
import { TemplateActionRegistry } from "./template-action.registry";
import { CampaignService } from "src/app/feature/campaign/campaign.service";

/** Logging Toggle - rewrite default functions to enable or disable inline logs */
let SHOW_DEBUG_LOGS = false;
let log = SHOW_DEBUG_LOGS ? console.log : () => null;
let log_group = SHOW_DEBUG_LOGS ? console.group : () => null;
let log_groupEnd = SHOW_DEBUG_LOGS ? console.groupEnd : () => null;

/**
 *
 *
 */
export class TemplateActionService extends SyncServiceBase {
  private actionsQueue: FlowTypes.TemplateRowAction[] = [];
  private actionsQueueProcessing$ = new BehaviorSubject<boolean>(false);

  constructor(
    private injector: Injector,
    public container?: TemplateContainerComponent
  ) {
    super("TemplateAction");
  }
  // Retrive all services on demand from global injector
  private get settingsService() {
    return getGlobalService(this.injector, SettingsService);
  }
  private get serverService() {
    return getGlobalService(this.injector, ServerService);
  }
  private get analyticsService() {
    return getGlobalService(this.injector, AnalyticsService);
  }
  private get templateNavService() {
    return getGlobalService(this.injector, TemplateNavService);
  }
  private get templateService() {
    return getGlobalService(this.injector, TemplateService);
  }
  private get templateTranslateService() {
    return getGlobalService(this.injector, TemplateTranslateService);
  }
  private get eventService() {
    return getGlobalService(this.injector, EventService);
  }
  private get dbSyncService() {
    return getGlobalService(this.injector, DBSyncService);
  }
  private get authService() {
    return getGlobalService(this.injector, AuthService);
  }
  private get skinService() {
    return getGlobalService(this.injector, SkinService);
  }
  private get themeService() {
    return getGlobalService(this.injector, ThemeService);
  }
  private get taskService() {
    return getGlobalService(this.injector, TaskService);
  }
  private get campaignService() {
    return getGlobalService(this.injector, CampaignService);
  }
  private get templateActionRegistry() {
    // HACK - as only service that does not extend sync/async base just return
    return this.injector.get(TemplateActionRegistry);
  }

  private async ensurePublicServicesReady() {
    await this.ensureAsyncServicesReady([
      this.templateTranslateService,
      this.dbSyncService,
      this.taskService,
    ]);
    this.ensureSyncServicesReady([
      this.serverService,
      this.templateNavService,
      this.themeService,
      this.settingsService,
      this.analyticsService,
      this.templateService,
      this.eventService,
      this.authService,
      this.skinService,
    ]);
  }

  /** Public method to add actions to processing queue and process */
  public async handleActions(
    actions: FlowTypes.TemplateRowAction[] = [],
    _triggeredBy?: FlowTypes.TemplateRow
  ) {
    await this.ensurePublicServicesReady();
    const unhandledActions = await this.handleActionsInterceptor(actions);
    unhandledActions.forEach((action) => this.actionsQueue.push({ ...action, _triggeredBy }));
    const res = await this.processActionQueue();
    await this.handleActionsCallback([...unhandledActions], res);
    if (!this.container?.parent) {
      await this.templateNavService.handleNavActionsFromChild(actions, this.container);
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
      log_group(`Process Actions - ${this.container?.name}`, [...this.actionsQueue]);
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
    await lastValueFrom(this.actionsQueueProcessing$.pipe(takeWhile((v) => v === true)), {
      defaultValue: "No action queue",
    });
    // once all actions have been processed re-render rows (ignore if running standalone without container)
    if (processedActions.length > 0 && this.container) {
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
    action.args = action.args.map((arg) => {
      // HACK - update any self referenced values (see note from template.parser method)
      if (typeof arg === "string" && arg.startsWith("this.")) {
        const selfField = arg.split(".")[1];
        arg = this.container?.templateRowMap[action._triggeredBy?._nested_name]?.[selfField];
      }
      return arg;
    });
    const { action_id, args } = action;

    // Call any action registered with global handler
    if (this.templateActionRegistry.has(action_id)) {
      return this.templateActionRegistry.trigger(action);
    }

    // Handle specific actions
    // TODO - Refactor action handlers that call global services to use registry instead
    // NOTE - instance-specific handlers will likely need to remain in service (e.g. set_local)
    let [key, value] = args;
    switch (action_id) {
      case "reset_app":
        return this.settingsService.resetApp();
      case "set_local":
        console.log("[SET LOCAL]", { key, value });
        return this.setLocalVariable(key, value);
      case "go_to":
        return this.templateNavService.handleNavAction(action);
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
        return this.templateNavService.handleNavActionExternal(value);
      case "pop_up":
        if (action.params?.fullscreen) {
          return this.templateService.runStandaloneTemplate(action.args[0], action.params);
        }
        if (action.params?.fullscreen_alt) {
          return this.templateNavService.handlePopupAction(action, this.container);
        }
        return this.templateNavService.handlePopupAction(action, this.container);

      case "track_event":
        this.analyticsService.trackEvent(key);
        break;
      case "trigger_actions":
        const triggeredActions: FlowTypes.TemplateRowAction[] = args[0] as any;
        // add actions to end of existing action queue for processing after current queue complete
        triggeredActions.forEach((a) =>
          this.actionsQueue.push({ ...a, _triggeredBy: action._triggeredBy })
        );
        return;
      case "process_template":
        // HACK - create an embedded template processor service instance to process template programatically
        const templateToProcess = await this.templateService.getTemplateByName(
          args[0],
          this.container?.row?.is_override_target
        );
        const processor = new TemplateProcessService(this.injector);
        return processor.processTemplateWithoutRender(templateToProcess);
      case "emit":
        const [emit_value, emit_data] = args;
        const container: TemplateContainerComponent = this.container;
        const { parent, row, name, template, templatename } = container || ({} as any);
        console.log("[EMIT]", `${name || templatename}:${emit_value}`);
        if (emit_value === "completed") {
          // write completions to the database for data tracking
          await this.templateService.recordEvent(template, "emit", emit_value);
        }
        // TODO - trigger emit in shared service to allow individual services/components to subscribe
        // themselves instead of relying on hardcoded calls here

        /* Emit actions
            emit:force_restart    // reload app window to home page
            emit:force_reload     // full re-render of all templates in current page
            emit:force_reprocess   // recalculate existing rows (not set_variable/set_nested)
        */
        if (emit_value === "force_restart") {
          location.href = "/";
        }
        if (emit_value === "force_reload") {
          await this.container?.forceRerender(true);
        }
        if (emit_value === "force_reprocess") {
          await this.container?.forceRerender(false);
        }
        if (emit_value === "set_language") {
          this.templateTranslateService.setLanguage(args[1]);
        }
        if (emit_value === "set_skin") {
          this.skinService.setSkin(args[1]);
        }
        if (emit_value === "set_theme") {
          this.themeService.setTheme(args[1]);
        }
        if (emit_value === "server_sync") {
          await this.serverService.syncUserData();
          await this.dbSyncService.syncToServer();
        }
        if (parent) {
          const msg = ` from ${row?.name || "(no row)"} to parent ${parent?.name || "(no parent)"}`;
          log("Emiting", emit_value, msg, emit_data, parent);
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
        this.container?.emittedValue.next({ emit_value, emit_data });
        break;
      default:
        throw new Error(`No handler for action\n${action_id} : ${args.join(", ")}`);
    }
  }

  /**
   * Update a local template row
   *
   */
  private setLocalVariable(key: string, value: any) {
    if (!this.container) return;
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
    Object.values(this.container?.templateRowService.templateRowMap).forEach((r) => {
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
    if (!this.container) return;
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
      console.error(`row "${name}" not found`, this.container.templateRowService.templateRowMap);
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
