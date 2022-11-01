import { BehaviorSubject } from "rxjs";
import { takeWhile } from "rxjs/operators";
import { FlowTypes } from "src/app/shared/model";
import { TemplateContainerComponent } from "../../template-container.component";
import { SettingsService } from "src/app/shared/services/settings.service";
import { TemplateProcessService } from "./template-process.service";
import { ServerService } from "src/app/shared/services/server/server.service";
import { AnalyticsService } from "src/app/shared/services/analytics/analytics.service";
import { Injector } from "@angular/core";
import { TemplateInstanceService } from "./template-instance.service";
import { TemplateNavService } from "../template-nav.service";
import { TemplateService } from "../template.service";
import { TourService } from "src/app/feature/tour/tour.service";
import { TemplateTranslateService } from "../template-translate.service";
import { TemplateFieldService } from "../template-field.service";
import { EventService } from "src/app/shared/services/event/event.service";
import { DBSyncService } from "src/app/shared/services/db/db-sync.service";
import { AuthService } from "src/app/shared/services/auth/auth.service";
import { SkinService } from "src/app/shared/services/skin/skin.service";
import { ThemeService } from "src/app/feature/theme/services/theme.service";
import { TaskService } from "src/app/shared/services/task/task.service";

/** Logging Toggle - rewrite default functions to enable or disable inline logs */
let SHOW_DEBUG_LOGS = false;
let log = SHOW_DEBUG_LOGS ? console.log : () => null;
let log_group = SHOW_DEBUG_LOGS ? console.group : () => null;
let log_groupEnd = SHOW_DEBUG_LOGS ? console.groupEnd : () => null;

/**
 *
 *
 */
export class TemplateActionService extends TemplateInstanceService {
  private actionsQueue: FlowTypes.TemplateRowAction[] = [];
  private actionsQueueProcessing$ = new BehaviorSubject<boolean>(false);

  private settingsService: SettingsService;
  private serverService: ServerService;
  private analyticsService: AnalyticsService;
  private templateNavService: TemplateNavService;
  private templateService: TemplateService;
  private tourService: TourService;
  private templateTranslateService: TemplateTranslateService;
  private templateFieldService: TemplateFieldService;
  private eventService: EventService;
  private dbSyncService: DBSyncService;
  private authService: AuthService;
  private skinService: SkinService;
  private themeService: ThemeService;
  private taskService: TaskService;

  constructor(injector: Injector, public container?: TemplateContainerComponent) {
    super(injector);
    this.settingsService = this.getGlobalService(SettingsService);
    this.serverService = this.getGlobalService(ServerService);
    this.analyticsService = this.getGlobalService(AnalyticsService);
    this.templateNavService = this.getGlobalService(TemplateNavService);
    this.templateService = this.getGlobalService(TemplateService);
    this.tourService = this.getGlobalService(TourService);
    this.templateFieldService = this.getGlobalService(TemplateFieldService);
    this.templateTranslateService = this.getGlobalService(TemplateTranslateService);
    this.eventService = this.getGlobalService(EventService);
    this.dbSyncService = this.getGlobalService(DBSyncService);
    this.authService = this.getGlobalService(AuthService);
    this.skinService = this.getGlobalService(SkinService);
    this.themeService = this.getGlobalService(ThemeService);
    this.taskService = this.getGlobalService(TaskService);
  }

  /** Public method to add actions to processing queue and process */
  public async handleActions(
    actions: FlowTypes.TemplateRowAction[] = [],
    _triggeredBy?: FlowTypes.TemplateRow
  ) {
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
    await this.actionsQueueProcessing$.pipe(takeWhile((v) => v === true)).toPromise();
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
    let { action_id, args } = action;
    args = args.map((arg) => {
      // HACK - update any self referenced values (see note from template.parser method)
      if (arg === "this.value") {
        arg = this.container?.templateRowMap[action._triggeredBy?._nested_name]?.value;
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
        return this.templateNavService.handlePopupAction(action, this.container);
      case "set_field":
        console.log("[SET FIELD]", key, value);
        return this.templateFieldService.setField(key, value);
      case "toggle_field":
        const currentValue = this.templateFieldService.getField(key);
        const toggleValue = !currentValue;
        console.log("[SET FIELD]", key, toggleValue);
        return this.templateFieldService.setField(key, `${toggleValue}`);
      case "start_tour":
        return this.tourService.startTour(key);
      case "feedback": {
        const [subtopic, ...payload] = args;
        return this.eventService.publish({ topic: "FEEDBACK", subtopic, payload });
      }
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
      case "google_auth":
        return await this.authService.signInWithGoogle();
      case "task_group_set_highlighted":
        return this.taskService.setHighlightedTaskGroup(args[0]);
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
        console.warn("[W] No handler for action", { action_id, args });
        return;
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
