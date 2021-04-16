import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { takeUntil, takeWhile } from "rxjs/operators";
import { BehaviorSubject, Subject } from "scripts/node_modules/rxjs";
import { TEMPLATE } from "../../services/data/data.service";
import { FlowTypes, ITemplateContainerProps } from "./models";
import { TemplateNavService } from "./services/template-nav.service";
import { TemplateVariablesService } from "./services/template-variables.service";
import { TemplateService } from "./services/template.service";

interface ILocalVariables {
  [name: string]: any;
}

/**
 * Some types that contain nested rows are nested in display only (not template properties)
 * Log here to handle accordingly
 * TODO - would be nice to unify
 */
const DISPLAY_TYPES: FlowTypes.TemplateRowType[] = [
  "animated_section",
  "animated_section_group",
  "nav_group",
  "nav_section",
];

const NESTED_TYPES: FlowTypes.TemplateRowType[] = ["template", "nested_properties"];

/**
 * These data types will be used to populate local state at the start only and not reprocessed
 */
const DATA_INIT_TYPES: FlowTypes.TemplateRowType[] = [
  "set_variable",
  "nested_properties",
  "set_local",
];

// Toggle logs used across full service for debugging purposes (there's quite a few and tedious to comment)
const SHOW_DEBUG_LOGS = false;
const log = SHOW_DEBUG_LOGS ? console.log : () => null;
const log_group = SHOW_DEBUG_LOGS ? console.group : () => null;
const log_groupEnd = SHOW_DEBUG_LOGS ? console.groupEnd : () => null;

@Component({
  selector: "plh-template-container",
  templateUrl: "./template-container.component.html",
  styleUrls: ["./template-container.component.scss"],
})
export class TemplateContainerComponent implements OnInit, OnDestroy, ITemplateContainerProps {
  @Input() name: string;
  @Input() templatename: string;
  @Input() parent?: TemplateContainerComponent;
  @Input() row?: FlowTypes.TemplateRow;
  children: { [name: string]: TemplateContainerComponent } = {};
  template: FlowTypes.Template;
  /** track path to template from top parent (not currently used) */
  templateBreadcrumbs: string[] = [];
  /** local state tree used to handle default and overwritten row properties */
  localVariables: ILocalVariables = {};
  componentDestroyed$ = new Subject();
  debugMode: boolean;
  private actionsQueue: FlowTypes.TemplateRowAction[] = [];
  private actionsQueueProcessing$ = new BehaviorSubject<boolean>(false);

  constructor(
    private templateService: TemplateService,
    private templateVariables: TemplateVariablesService,
    public router: Router,
    public route: ActivatedRoute,
    private templateNavService: TemplateNavService
  ) {}

  async ngOnInit() {
    this.initialiseTemplate();
    this.subscribeToQueryParamChanges();
    // const { name, templatename, parent, row, templateBreadcrumbs } = this;
    // log("template initialised", { name, templatename, parent, row, templateBreadcrumbs });
  }

  ngOnDestroy(): void {
    // allow any subscriptions to be removed by binding to these events (avoid memory leak)
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.unsubscribe();
  }

  /***************************************************************************************
   *  Action Handling
   **************************************************************************************/
  /** Public method to add actions to processing queue and process */
  public async handleActions(
    actions: FlowTypes.TemplateRowAction[] = [],
    _triggeredBy: FlowTypes.TemplateRow
  ) {
    const unhandledActions = await this.handleActionsInterceptor(actions);
    unhandledActions.forEach((action) => this.actionsQueue.push({ ...action, _triggeredBy }));
    const res = await this.processActionQueue();
    await this.handleActionsCallback([...unhandledActions], res);
    if (!this.parent) {
      await this.templateNavService.handleNavActionsFromChild(actions, this);
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
    const processedActions = [];
    // start the queue if it is not already running
    if (!this.actionsQueueProcessing$.value) {
      log_group(`Process Actions - ${this.name}`, [...this.actionsQueue]);
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
      this.template.rows = this.processRows(this.template.rows, this.localVariables);
    }
  }
  private async processAction(action: FlowTypes.TemplateRowAction) {
    let { action_id, args } = action;
    let [key, value] = args;

    switch (action_id) {
      case "set_local":
        log("[SET LOCAL]", { key, value });
        return this.setLocalVariable(key, value);
      case "set_global":
        log("[SET GLOBAL]", key, value);
        return this.templateService.setGlobal(key, value);
      case "go_to":
        return this.templateNavService.handleNavAction(action, this);
      case "pop_up":
        return this.templateNavService.handlePopupAction(action, this);
      case "set_field":
        log("[SET FIELD]", key, value);
        return this.templateService.setField(key, value);
      case "set_theme":
        return this.templateService.setTheme(this.template, "set_theme", action.args);
      case "emit":
        const [emit_value, emit_from] = args;
        let container: TemplateContainerComponent = this;
        if (emit_from) {
          // emit from the named template container instead of this one if specified (assumed sibling of current)
          const targetContainer = container.children[emit_from];
          if (targetContainer) {
            action.args = [emit_value];
            container = targetContainer;
          }
        }
        let { parent, row, name, template } = container;
        if (emit_value === "completed") {
          // write completions to the database for data tracking
          await this.templateService.recordEvent(template, "emit", emit_value);
        }
        if (parent) {
          // continue to emit any actions to parent where defined
          log(
            "Emiting",
            emit_value,
            ` from ${row?.name || "(no row)"} to parent ${parent?.name || "(no parent)"}`,
            parent
          );
          if (row && row.action_list) {
            const actionsForEmittedEvent = row.action_list.filter((a) => a.trigger === emit_value);
            log("Excuting actions matching event ", { emit_value, actionsForEmittedEvent });
            // process in parallel, do not return/await

            // TODO - check if should be parent row or current row
            parent.handleActions(actionsForEmittedEvent, row);
          } else {
            log("No action list for row ", row, "on template name ", name);
            parent.handleActions([action], row);
          }
        }
        break;
      default:
        console.warn("No handler for action", { action_id, args });
        return;
    }
  }

  /**
   * When a child triggers the changing of a local variable... TODO
   */
  public setLocalVariable(key: string, value: any) {
    this.localVariables[key] = { value };
  }

  /***************************************************************************************
   *  Template Initialisation
   **************************************************************************************/

  private initialiseTemplate() {
    // Lookup template and provide fallback
    const foundTemplate =
      TEMPLATE.find((t) => t.flow_name === this.templatename) ||
      NOT_FOUND_TEMPLATE(this.templatename);
    this.template = JSON.parse(JSON.stringify(foundTemplate));

    // if template created at top level also ensure it has a name
    this.name = this.name || this.templatename;
    log_group(`[Template Init] - ${this.name}`);

    // When processing local variables check parent in case there are any variables
    // that have already been set/overridden
    const inheritedRows = this.parent?.localVariables?.[this.name] || {};
    const { rows } = this.template;
    log({ rows: { ...rows }, variables: { ...inheritedRows } });
    // TODO - CC 2021-04-15 - Can consider merging variable and row processing to same method
    this.localVariables = this.processVariables(rows, inheritedRows);
    this.template.rows = this.processRows(rows, this.localVariables, inheritedRows);

    // keep track of path to this template from any parents
    this.templateBreadcrumbs = [...(this.parent?.templateBreadcrumbs || []), this.name];

    // if a parent exists also provide parent reference to this as a child
    if (this.parent) {
      this.parent.children[this.name] = this;
    }
    log_groupEnd();
  }

  /**
   * Template are processed in order of nesting, and so any parent templates which contain
   * variable setters or nested property setters will be processed first.
   * As such build an overall map of all variables nested by template naming,
   * with first recorded (from parent templates) taking priority over current.
   *
   * @param localVariables - working set of variables available to this template
   *
   * @param templateName - for logging purposes only (assumes current template)
   *
   */
  private processVariables(
    templateRows: FlowTypes.TemplateRow[],
    inheritedRows: { [name: string]: FlowTypes.TemplateRow } = {},
    logName?: string
  ): ILocalVariables {
    logName = logName || this.name;
    let localVariables = {};
    log_group(`[Vars - process] - ${logName}`);
    templateRows.forEach((row) => {
      let { name, value, rows, type } = row;

      // TODO - set_variable / set_nested_properties should have consistent naming
      // set_variable is actually setting the _value field, so should be called accordingly

      // TODO - these methods are closely linked with process rows. We could also filter
      // out the specific data init processes here so they don't need to be filtered in process rows

      // skip processing any row that is filtered by condition field
      if (row.hasOwnProperty("condition") && this.shouldFilterRowOnCondition(row, localVariables)) {
        return;
      }
      log({ name, row: { ...row }, inherited: { ...inheritedRows } });

      // if a row has been overwritten by the parent (currently specified as set_variable)
      // override the entire row except for (except the type, which will likely be the same)
      if (inheritedRows.hasOwnProperty(name)) {
        const inheritedRow = inheritedRows[name];
        log("[Vars - inherit]", { name, original: row, inheritedRow });
        localVariables[name] = inheritedRows[name];
        return;
      }
      //otherwise populate variables to local or nested properties
      else {
        if (NESTED_TYPES.includes(type)) {
          type = "nested_properties";
        }
        if (DISPLAY_TYPES.includes(type)) {
          type = "display_group";
        }
        const nestedLog = `${logName}.${name}`;
        /**
         * We have 4 cases for setting local variables
         * 1. Row prompts external action (e.g. set_field)
         * 2. Process current row at local variable level (e.g. set_variable)
         * 3. Process child rows at child level (e.g. template, nested_properties)
         * 4. Process child rows at current level (e.g. display_group)
         */
        switch (type) {
          // Case 1
          //  TODO - CC 2021-04-15 - Does this need to be evaluated here?
          case "set_field":
            return this.templateService.setField(name, value);
          // Case 2
          case "set_variable":
            localVariables[name] = {};
            // Replace any dynamic fields with their evaluations
            const evalContext = { localVariables, template: this.template, row };
            const parsedRow = this.templateVariables.evaluatePLHData(row, evalContext, [
              "comments",
            ]);
            Object.keys(parsedRow).forEach((field) => {
              const fieldValue = parsedRow[field];
              // don't override values that have otherwise been set from parent or nested properties
              // local variables within r[field] are parsed
              if (!localVariables[name].hasOwnProperty(field)) {
                localVariables[name][field] = fieldValue;
              }
            });
            return;
          // Case 3
          case "nested_properties":
            localVariables[name] = this.processVariables(rows, localVariables, nestedLog);
            return;
          // Case 4
          case "display_group":
            localVariables[name] = {
              ...localVariables,
              ...this.processVariables(rows, localVariables, nestedLog),
            };
            return;
          default:
            // All other regular template types can be skipped
            return;
        }
      }
    });
    log(`[Vars Processed] - ${logName}`, { ...localVariables });
    log_groupEnd();
    return localVariables;
  }

  /**
   * Once the full tree of parent variable setters/overrides has been established
   * remove the variable setter row types and override row values where specified
   */
  private processRows(
    templateRows: FlowTypes.TemplateRow[],
    localVariables = {},
    inheritedRows: { [name: string]: FlowTypes.TemplateRow } = {},
    logName?: string
  ) {
    logName = logName || this.name;
    log_group(`[Rows - process] - ${logName}`);
    log({ templateRows, localVariables, inheritedRows });
    const filteredRows = templateRows
      .filter((r) => !this.shouldFilterRowOnCondition(r, localVariables))
      .filter((r) => !DATA_INIT_TYPES.includes(r.type));

    const rowsWithReplacedValues = filteredRows.map((row) => {
      let { name, type, rows } = row;
      log({ row: { ...row } });

      // if a row has been overwritten by the parent (currently specified as set_variable)
      // override the entire row except for (except the type)
      if (inheritedRows.hasOwnProperty(name)) {
        const inheritedRow = inheritedRows[name];
        if (inheritedRow.type === "set_variable") {
          log("[Row - inherit]", { name, original: row, inheritedRow });
          row = { ...inheritedRow, type };
        }
      } else {
        // Parse any dynamic text in the rows
        const evalContext = { localVariables, template: this.template, row };
        row = this.templateVariables.evaluatePLHData(row, evalContext, ["comments", "rows"]);
        // Handle rows that have nested child rows
        if (rows) {
          // if they are a structural nesting (e.g. template), process with reference to child variables
          // otherwise display nesting (e.g. display_group) can be processed in same way as current row
          if (NESTED_TYPES.includes(type)) {
            localVariables = localVariables[name] || {};
            // note - inherited structure different than {name: row} as deeper nest {name1: name2:{row}}
            inheritedRows = (inheritedRows[name] as any) || {};
          }
          row.rows = this.processRows(rows, localVariables, inheritedRows, logName);
        }
      }
      return row;
    });
    log(`[Rows Processed] - ${logName}`, { ...rowsWithReplacedValues });
    log_groupEnd();
    return rowsWithReplacedValues;
  }

  private shouldFilterRowOnCondition(row: FlowTypes.TemplateRow, localVariables: ILocalVariables) {
    return (
      row.hasOwnProperty("condition") &&
      this.templateVariables.evaluatePLHData(row.condition, {
        localVariables,
        template: this.template,
        field: "condition",
        row,
      })
    );
  }

  /**
   * When using ngFor loop track by to ensure updates correctly propagated on change
   * Most important is to keep track of row value as updates to this will want UI refresh
   */
  public trackByRow(index: number, row: FlowTypes.TemplateRow) {
    return `${row.name}-${row.value}-${index}`;
  }

  /** Query params are used to track state across navigation events */
  private subscribeToQueryParamChanges() {
    this.route.queryParams
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe(async (params: any) => {
        this.debugMode = params.debugMode ? true : false;
        // allow templateNavService to process actions based on query param change
        await this.templateNavService.handleQueryParamChange(params, this);
      });
  }
}

/** helper function used for dev to wait a fixed amount of time */
function _wait(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

const NOT_FOUND_TEMPLATE = (name: string): FlowTypes.Template => ({
  flow_name: "Template_not_found",
  flow_type: "template",
  rows: [{ type: "title", value: `Template "${name}" not found` }],
  status: "released",
});
