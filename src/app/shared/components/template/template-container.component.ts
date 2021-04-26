import { Component, ElementRef, Input, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { takeUntil, takeWhile } from "rxjs/operators";
import { BehaviorSubject, Subject } from "scripts/node_modules/rxjs";
import { TEMPLATE } from "../../services/data/data.service";
import { mapToJson } from "../../utils";
import { FlowTypes, ITemplateContainerProps } from "./models";
import { TemplateNavService } from "./services/template-nav.service";
import { TemplateVariablesService } from "./services/template-variables.service";
import { TemplateService } from "./services/template.service";
import { mergeNestedTemplates } from "./utils/template-utils";

/** Logging Toggle - rewrite default functions to enable or disable inline logs */
let SHOW_DEBUG_LOGS = false;
let log = SHOW_DEBUG_LOGS ? console.log : () => null;
let log_group = SHOW_DEBUG_LOGS ? console.group : () => null;
let log_groupEnd = SHOW_DEBUG_LOGS ? console.groupEnd : () => null;

@Component({
  selector: "plh-template-container",
  templateUrl: "./template-container.component.html",
  styleUrls: ["./template-container.component.scss"],
})
/**
 * TODOs
 * - Separate out initialisation variables and updated runtime variables for easier change detection/reprocessing
 * - Track dynamic variable dependency (to know when to trigger row change based on set_local/field/global events)
 * - Consider case of template container re-render (some draft cached code exists, but not sure if this is a valid use-case or not)
 */
export class TemplateContainerComponent implements OnInit, OnDestroy, ITemplateContainerProps {
  /** unique instance_name of template if created as a child of another template */
  @Input() name: string;
  /** flow_name of template for lookup */
  @Input() templatename: string;
  @Input() parent?: TemplateContainerComponent;
  @Input() row?: FlowTypes.TemplateRow;
  children: { [name: string]: TemplateContainerComponent } = {};

  /** Hashmap of all rows keyed by nested row name (e.g. contentBox1.row1.title)  */
  templateRowMap: Map<string, FlowTypes.TemplateRow> = new Map();

  /** Local variables track specific updates that have been made via set_local in this template
   *  The are used to help restore correct state if reprocessing rows after parent-triggered render
   * (note, we can't use templateRowMap for this as duplicate named rows would override each other during init) */
  localVariables: any = {};

  /** List of rows that have passed the condition statement for rendering */
  renderedRows: FlowTypes.TemplateRow[];

  /** List of overrides set by parent templates for access during parent processing */
  rowOverrides: {
    [row_nested_name: string]: Partial<FlowTypes.TemplateRow> & { _processed?: boolean };
  };

  template: FlowTypes.Template;

  /** track path to template from top parent (not currently used) */
  templateBreadcrumbs: string[] = [];
  componentDestroyed$ = new Subject();
  debugMode: boolean;
  private actionsQueue: FlowTypes.TemplateRowAction[] = [];
  private actionsQueueProcessing$ = new BehaviorSubject<boolean>(false);

  constructor(
    private templateService: TemplateService,
    private templateVariables: TemplateVariablesService,
    public router: Router,
    public route: ActivatedRoute,
    public elRef: ElementRef,
    private templateNavService: TemplateNavService
  ) {}

  async ngOnInit() {
    this.subscribeToQueryParamChanges();
    // add logging if default disabled and in debug view
    if (this.debugMode) {
      this.setLogging(true);
    }
    this.renderTemplate();
  }

  ngOnDestroy(): void {
    // allow any subscriptions to be removed by binding to these events (avoid memory leak)
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.unsubscribe();
  }

  /***************************************************************************************
   * Action Handling
   * TODO - Ideally this should be separated into own service and somehow linked with container
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
    const processedActions: FlowTypes.TemplateRowAction[] = [];
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
      // assume rows might need re-evaluation if actions contain at least 1 non-emit event
      // TODO - further optimise
      if (processedActions.find((a) => a.action_id === "set_local")) this.processRowUpdates();
    }
  }
  private async processAction(action: FlowTypes.TemplateRowAction) {
    let { action_id, args } = action;
    let [key, value] = args;

    switch (action_id) {
      case "set_local":
        console.log("[SET LOCAL]", { key, value });
        return this.setLocalVariable(key, value);
      case "set_global":
        console.log("[SET GLOBAL]", key, value);
        return this.templateService.setGlobal(key, value);
      case "go_to":
        return this.templateNavService.handleNavAction(action, this);
      case "pop_up":
        return this.templateNavService.handlePopupAction(action, this);
      case "set_field":
        console.log("[SET FIELD]", key, value);
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
        console.warn("[W] No handler for action", { action_id, args });
        return;
    }
  }

  /**
   * Update a local template row
   *
   */
  public setLocalVariable(key: string, value: any) {
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
      this.templateRowMap.set(rowEntry._nested_name, rowEntry);
      this.localVariables[rowEntry._nested_name] = rowEntry;
    } else {
      // TODO
      console.warn("Setting local variable which does not exist", { key, value }, "TODO");
    }
    // TODO - prompt any rows to re-process if they depend on the value (and other @ types)
    this.templateRowMap.forEach((r) => {
      if (r._dynamicDependencies?.[`@local.${key}`]) {
        // console.warn("[Dynamic Deps] - TODO - handle single row update]", r);
      }
    });

    // update parent reference in case actions force a re-intialisation
    // (not currently implemented)
    if (this.parent) {
      this.parent.children[this.name] = this;
    }
  }

  /**
   * When actions have triggered updates this method is called to handle updating the current template
   * TODO - Design more efficient way to determine if re-rendering necessary
   */
  public processRowUpdates() {
    console.group(`[Reprocess Template]`, this.name, { rowMap: mapToJson(this.templateRowMap) });
    this.template.rows = this.processRows(this.template.rows, this.template);
    this.renderedRows = this.template.rows.filter((r) => r.condition !== false);
    console.groupEnd();
  }

  /***************************************************************************************
   *  Template Initialisation
   **************************************************************************************/

  private renderTemplate() {
    // Lookup template
    const foundTemplate: FlowTypes.Template = TEMPLATE.find(
      (t) => t.flow_name === this.templatename
    );
    if (foundTemplate) {
      // create a deep clone of the object to prevent accidental reference changes
      // assign a name (in case top-level template) and store breadcrumb path for nested
      const template = JSON.parse(JSON.stringify(foundTemplate));
      this.name = this.name || this.templatename;
      this.templateBreadcrumbs = [...(this.parent?.templateBreadcrumbs || []), this.name];

      // If the template has previously been rendered but forced to re-initialise from parent
      // try to restore previous state (WiP - TODO / Re-evaluate CC 2021-04-21)
      const cachedRender = this.parent?.children?.[this.name];
      log_group("[Template Render Start]", this.name);

      log("[Process Template]", { template: { ...template }, ctxt: { ...this } });
      const rowsWithOverrides = this.processParentOverrides(template.rows);
      const processedRows = this.processRows(rowsWithOverrides, template);
      this.template = { ...template, rows: processedRows };
      this.renderedRows = this.template.rows.filter((r) => r.condition !== false);
      log("[Template] Render", {
        template,
        renderedRows: { ...this.renderedRows },
        rowMap: mapToJson(this.templateRowMap),
      });

      // if a parent exists also provide parent reference to this as a child
      if (this.parent) {
        this.parent.children[this.name] = this;
      }
      log_groupEnd();
    }
    // Template not found
    else {
      console.error(`[Template] - Not Found -`, { ...this });
      this.template = NOT_FOUND_TEMPLATE(this.templatename);
    }
  }

  /**
   * Lookup list of template row overrides from parent and use to merge into existing rows
   */
  private processParentOverrides(originalRows: FlowTypes.TemplateRow[]) {
    const parentRows: any = this.row?.rows || [];
    this.rowOverrides = {};
    for (const row of parentRows) {
      const { _nested_name, _dynamicFields, _dynamicDependencies, type, ...overrideFields } = row;
      this.rowOverrides[row.name] = overrideFields;
    }
    // process main overrides (if they exist), logging any mismatches and adding as additional set_variable
    if (Object.keys(this.rowOverrides).length > 0) {
      const overrides = { ...this.rowOverrides };
      log("[Overrides Start]", { overrides, originalRows: [...originalRows], parentRows });
      const processedRows = originalRows.map((r) => this.processRowOverride(r));
      const unprocessedOverrides = Object.values(this.rowOverrides).filter((o) => !o._processed);
      if (unprocessedOverrides.length > 0) {
        console.warn("[W] Overrides could not find target row; Assuming set_variables", {
          unprocessedOverrides,
          rows: { ...processedRows },
        });
        // if an override exists but no corresponding template row assume it is an additional set_variable statement
        unprocessedOverrides.forEach((override) => {
          const { name, value } = override as any;
          const type = "set_variable";
          const rowEntry: FlowTypes.TemplateRow = { name, value, type, _nested_name: name };
          processedRows.unshift(rowEntry);
        });
      }
      log("[Overrides End]", { rows: { ...processedRows } });
      return processedRows;
    } else {
      log("[Overrides Skip]", { parentRows });
      return originalRows;
    }
  }

  /**
   *  Lookup any overrides for a row or a row's nested child rows and apply
   */
  private processRowOverride(originalRow: FlowTypes.TemplateRow) {
    const override = this.rowOverrides[originalRow.name];
    let overriddenRow: FlowTypes.TemplateRow = { ...originalRow };

    if (originalRow.rows) {
      const processedNestedRows: FlowTypes.TemplateRow[] = [];
      originalRow.rows.forEach((r) => {
        const processed = this.processRowOverride(r);
        processedNestedRows.push(processed);
      });
      overriddenRow = { ...overriddenRow, rows: processedNestedRows };
    }

    if (override) {
      const { rows, _processed, ...mergeFields } = override;
      // If an override has child rows this implies we are in a deep nested_properties structure
      // As the template may also have a deep nested properties structure we need to merge the two
      if (override.rows) {
        this.rowOverrides[originalRow.name]._processed = true;
        overriddenRow = mergeNestedTemplates(override as any, originalRow) as any;
      }
      // merge and remove dynamic references
      // TODO - also remove _dynamicDependencies references
      else {
        Object.keys(mergeFields).forEach((field) => {
          overriddenRow[field] = override[field];
          if (overriddenRow._dynamicFields && overriddenRow._dynamicFields.hasOwnProperty(field)) {
            delete overriddenRow._dynamicFields[field];
            if (Object.keys(overriddenRow._dynamicFields).length === 0) {
              delete overriddenRow._dynamicFields;
            }
          }
        });
        // keep track of applied overrides for debugging
        this.rowOverrides[originalRow.name]._processed = true;
      }
      log(["Override"], {
        originalRow,
        overriddenRow: { ...overriddenRow },
        override: { ...override },
      });
    }

    return overriddenRow;
  }

  /**
   * Process the main template rows, filtering by condition, processing variables
   * and extracting template references for child overrides
   *
   * @param template used only during dynamic row evaluation for sibling lookup
   * @param isNestedRows if processing rows for use in the a nested template, specify
   * to prevent the variables being processed within the current template
   *
   */
  private processRows(
    rows: FlowTypes.TemplateRow[],
    template: FlowTypes.Template,
    isNestedRows = false
  ) {
    log("[Process Rows Start]", [...rows]);
    const processedRows = [];
    rows.forEach((preProcessedRow) => {
      const { _nested_name } = preProcessedRow;
      // TODO - CC 2021-04-26 - decide if required, seems to break
      // if (this.localVariables[_nested_name]) {
      // log("[Local Override]", this.localVariables[_nested_name]);
      // preProcessedRow = this.localVariables[_nested_name];
      // }

      log_group("[Row start]", preProcessedRow.name, { preProcessedRow });

      // Evaluate row variables in context of current local state
      const evalContext = { templateRowMap: this.templateRowMap, row: preProcessedRow };

      // create a new object with data from evaluation
      const parsedRow: FlowTypes.TemplateRow = this.templateVariables.evaluatePLHData(
        preProcessedRow,
        evalContext
      );
      const { name, value, condition, hidden, type } = parsedRow;

      log("parsedRow", { ...parsedRow });

      // Filter out if specified by condition. This might be string or boolean
      // depending on the parser and related calculations (so check for both)
      // when dealing with nested rows we want to filter out to not pass to child,
      // but if dealing with local rows we want to keep for future processing (will be filtered later)
      if (condition === (false as any) || condition === "false") {
        parsedRow.condition = false;
        log("[Row end (condition)]", name);
        log_groupEnd();
        if (isNestedRows) {
          return;
        } else {
          processedRows.push(parsedRow);
          return;
        }
      }

      // Make type assigned to hidden consistent
      if (hidden === (true as any) || hidden === "true") {
        parsedRow.hidden = true;
      }

      // when processing a template's child rows skip setting variables on this template
      // and let them be passed through rows to the child instead
      if (type === "template") {
        isNestedRows = true;
      }

      // store global reference for use in future initialisation logic
      this.templateRowMap.set(_nested_name, parsedRow);

      // once set_variable rows have been processed they can be removed from the row list
      if (type === "set_variable" && !isNestedRows) {
        log("[Row end (variable)]", name);
        log_groupEnd();
        return;
      }

      // Handle rows that set external data and filter out
      // TODO - confirm no other externally processed rows
      if (type === "set_field") {
        console.warn("[W] Setting fields from template rows is not advised", { ...parsedRow });
        this.templateService.setField(name, value);
        // stop processing and remove from future processing
        log("[Row end]", name, "(set field)");
        log_groupEnd();
        return;
      }

      // Process child rows, ignoring set_variable statement if row type
      // will be used as part of child template overrides
      if (parsedRow.hasOwnProperty("rows")) {
        parsedRow.rows = this.processRows(parsedRow.rows, template, isNestedRows);
      }

      log("[Row end]", name, "(push)", { ...parsedRow });
      log_groupEnd();
      processedRows.push(parsedRow);
    });
    log("[Process Rows End]", [...processedRows], { map: mapToJson(this.templateRowMap) });
    return processedRows;
  }

  /**
   * Lookup a template row by name within the nested template structure
   * If multiple rows are found with the same name the least nested will be returned
   */
  private getTemplateRowByName(name: string): FlowTypes.TemplateRow {
    // find any rows where nested path corresponds to match path
    let matchedRows: { row: FlowTypes.TemplateRow; nestedName: string }[] = [];
    this.templateRowMap.forEach((row, nestedName) => {
      if (nestedName === name || nestedName.endsWith(`.${name}`)) {
        matchedRows.push({ row, nestedName });
      }
    });
    // no match found
    if (matchedRows.length === 0) {
      console.error(`row [${name}] not found`, mapToJson(this.templateRowMap));
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

  /**
   * When using ngFor loop track by to ensure updates correctly propagated on change
   * Most important is to keep track of row value as updates to this will want UI refresh
   * Note - we do not track row value change as most likely any value change will come from within
   * the component itself and will not require re-render
   */
  public trackByRow(index: number, row: FlowTypes.TemplateRow) {
    return `${row._nested_name}`;
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

  private setLogging(showLogs: boolean) {
    SHOW_DEBUG_LOGS = showLogs;
    log = SHOW_DEBUG_LOGS ? console.log : () => null;
    log_group = SHOW_DEBUG_LOGS ? console.group : () => null;
    log_groupEnd = SHOW_DEBUG_LOGS ? console.groupEnd : () => null;
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
  rows: [
    { type: "title", value: `Template "${name}" not found`, name: "title", _nested_name: "title" },
  ],
  status: "released",
});
