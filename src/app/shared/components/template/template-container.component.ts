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

/**
 * These data types will be used to populate local state at the start only and not reprocessed
 */
const DATA_INIT_TYPES: FlowTypes.TemplateRowType[] = [
  "set_variable",
  "nested_properties",
  "set_local",
];

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
    // console.log("template initialised", { name, templatename, parent, row, templateBreadcrumbs });
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
      console.group(`Process Actions - ${this.name}`, [...this.actionsQueue]);
      this.actionsQueueProcessing$.next(true);
      while (this.actionsQueue.length > 0) {
        const action = this.actionsQueue[0];
        await this.processAction(action);
        this.actionsQueue.shift();
        processedActions.push(action);
      }
      this.actionsQueueProcessing$.next(false);
      console.groupEnd();
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
          console.log(
            "Emiting",
            emit_value,
            ` from ${row?.name || "(no row)"} to parent ${parent?.name || "(no parent)"}`,
            parent
          );
          if (row && row.action_list) {
            const actionsForEmittedEvent = row.action_list.filter((a) => a.trigger === emit_value);
            console.log("Excuting actions matching event ", { emit_value, actionsForEmittedEvent });
            // process in parallel, do not return/await

            // TODO - check if should be parent row or current row
            parent.handleActions(actionsForEmittedEvent, row);
          } else {
            console.log("No action list for row ", row, "on template name ", name);
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
    // When processing local variables check parent in case there are any variables
    // that have already been set/overridden
    const parentVariables = this.parent?.localVariables?.[this.name] || {};
    console.log("[Template Init]", { name: this.name, parentVariables });
    const { rows } = this.template;
    this.localVariables = this.processVariables(rows, parentVariables);
    if (!this.parent) {
      console.log({ localVariables: this.localVariables });
    }
    this.template.rows = this.processRows(rows, this.localVariables);
    // keep track of path to this template from any parents
    this.templateBreadcrumbs = [...(this.parent?.templateBreadcrumbs || []), this.name];
    if (this.parent) {
      this.parent.children[this.name] = this;
    }
  }

  /**
   * Template are processed in order of nesting, and so any parent templates which contain
   * variable setters or nested property setters will be processed first.
   * As such build an overall map of all variables nested by template naming,
   * with first recorded (from parent templates) taking priority over current.
   *
   * @param variables - set of parent or existing variables to take priority
   * @param localVariables - working set of variables available to this template
   *
   */
  private processVariables(
    templateRows: FlowTypes.TemplateRow[],
    variables: ILocalVariables = {},
    localVariables: ILocalVariables = {}
  ): ILocalVariables {
    // console.log("process variables", { templateRows, variables, localvariables });
    templateRows.forEach((row) => {
      let { name, value, rows, type } = row;
      // Do not continue to process variable if fails condition statement
      if (row.hasOwnProperty("condition") && this.shouldFilterRowOnCondition(row, localVariables)) {
        return;
      }
      // TODO - set_variable / set_nested_properties should have consistent naming
      // set_variable is actually setting the _value field, so should be called accordingly
      if (DATA_INIT_TYPES.includes(type)) {
        variables[name] = variables[name] || {};
        localVariables[name] = variables[name] || {};
        // handle merging updated properties

        // Replace any dynamic fields with their evaluations
        const evalContext = { localVariables, template: this.template, row, field: null };
        const parsedRow = this.templateVariables.evaluatePLHData(row, evalContext, ["comments"]);
        Object.keys(parsedRow).forEach((field) => {
          const fieldValue = parsedRow[field];
          // don't override values that have otherwise been set from parent or nested properties
          // local variables within r[field] are parsed
          if (!variables[name].hasOwnProperty(field)) {
            variables[name][field] = fieldValue;
          }
          if (!localVariables[name].hasOwnProperty(field)) {
            // local variables on a given excel sheet are managed together
            localVariables[name][field] = fieldValue;
          }
        });
      }
      if (type === "display_theme") {
        // TODO - inherited variable should be defined in better/consistent way
      }

      if (type === "set_field") {
        this.templateService.setField(name, value);
      }

      // handle rows which have nested structures
      if (rows) {
        // TODO - don't like overwriting this, be nicer to handle elsewhere
        if (DISPLAY_TYPES.includes(type)) {
          type = "display_group";
        }
        switch (type) {
          // nested properties assign specific value further down the tree
          // TODO handle case where name is further nested (e.g. templateA.child1.someField)
          case "nested_properties":
            variables[name] = this.processVariables(rows, variables[name], localVariables);
            break;
          // nested templates are handled in the same way as nested properties
          case "template":
            variables[name] = this.processVariables(rows, variables[name], localVariables);
            break;
          // display groups are visual distinction only, process the rest of the variables as if they were inline
          case "display_group":
            variables = { ...variables, ...this.processVariables(rows, variables, localVariables) };
            break;
          // otherwise treat nested rows as value-namespaced local variables
          default:
            variables[value] = this.processVariables(rows, variables[name]);
            break;
        }
      }
    });
    return variables;
  }

  /**
   * Once the full tree of parent variable setters/overrides has been established
   * remove the variable setter row types and override row values where specified
   */
  private processRows(templateRows: FlowTypes.TemplateRow[], variables = {}) {
    // remove row types that have already been processed or should be filtered out by condition
    const filteredRows = templateRows
      .filter((r) => !this.shouldFilterRowOnCondition(r, variables))
      .filter((r) => !DATA_INIT_TYPES.includes(r.type));

    const rowsWithReplacedValues = filteredRows.map((row) => {
      // update row fields as spefied in local variables replacement
      // handle updates where field defined with dynamic expressions
      const template = this.template;
      const evaluationContext = { localVariables: variables, template, row, field: null };
      const evaluationOmit = ["rows"];
      row = this.templateVariables.evaluatePLHData(row, evaluationContext, evaluationOmit);

      // handle nested templates
      if (row.rows) {
        // TODO - don't like overwriting this, be nicer to handle elsewhere
        let type = row.type;
        if (DISPLAY_TYPES.includes(type)) {
          type = "display_group";
        }
        switch (type) {
          case "display_group":
            // display groups are visual distinction only, process the rest of the variables as if they were inline
            row.rows = this.processRows(row.rows, variables);
            break;
          // could add logic here to ignore/remove template rows (already processed), leaving as will be overwritten on init anyways
          case "template":
          //  row.rows = this.processRows(row.rows, variables[row.name]);
          default:
            // otherwise treat nested rows as value-namespaced local variables
            row.rows = this.processRows(row.rows, variables[row.name]);
        }
      }
      return row;
    });
    console.log(`[${this.template.flow_name}]`, "process rows", {
      variables,
      rowsWithReplacedValues,
    });
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
