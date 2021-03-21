import { Component, Input, OnInit } from "@angular/core";
import { takeWhile } from "rxjs/operators";
import { BehaviorSubject } from "scripts/node_modules/rxjs";
import { TEMPLATE } from "../../services/data/data.service";
import { FlowTypes, ITemplateContainerProps } from "./models";
import { TemplateService } from "./services/template.service";

interface IVariables {
  [name: string]: any;
}

/** list of fields where overwrites will be allowed */
const VARIABLE_FIELDS: (keyof FlowTypes.TemplateRow)[] = [
  "hidden",
  "value",
  "action_list",
  "parameter_list",
  "action_list",
];

/**
 * List of row types that set variable states. These will be processed either during
 * initialisation or via global methods, and will be stripped from resulting output
 */
const VARIABLE_SETTER_TYPES: FlowTypes.TemplateRowType[] = [
  "declare_variable",
  "set_global",
  "set_variable",
  "nested_properties",
];

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

@Component({
  selector: "plh-template-container",
  templateUrl: "./template-container.component.html",
  styleUrls: ["./template-container.component.scss"],
})
export class TemplateContainerComponent implements OnInit, ITemplateContainerProps {
  @Input() name: string;
  @Input() templatename: string;
  @Input() parent?: TemplateContainerComponent;
  @Input() row?: FlowTypes.TemplateRow;
  template: FlowTypes.Template;

  /** state variables inherited and shared with template rows */
  localVariables: IVariables = {};

  /** variables declared in template sheet which will not be inherited by children  */
  sheetVariables: IVariables = {};

  debugMode = false;
  // TODO - link debug toggle to build environment or advanced setting (hide for general users)
  showDebugToggle = true;
  private actionsQueue: FlowTypes.TemplateRowAction[] = [];
  private actionsQueueProcessing$ = new BehaviorSubject<boolean>(false);

  constructor(private templateService: TemplateService) {}

  ngOnInit() {
    this.initialiseTemplate();
  }

  /***************************************************************************************
   *  Action Handling
   **************************************************************************************/
  /** Public method to add actions to processing queue and process */
  public async handleActions(actions: FlowTypes.TemplateRowAction[] = [], _triggeredBy: string) {
    actions.forEach((action) => this.actionsQueue.push({ ...action, _triggeredBy }));
    // TODO - pass back relevant info from processActionsQueue
    console.log("processActionQueue for ", this.name);
    const res = await this.processActionQueue();
    console.log("About to call handleActionsCallback", this.name);
    this.handleActionsCallback([...actions], res);
    // TODO - possibly attach unique id to action to passback action results
  }
  /** Optional method child component can add to handle post-action callback */
  public async handleActionsCallback(actions: FlowTypes.TemplateRowAction[], results: any) {}
  /**
   * To avoid actions potentially trying to write to same db records at the same time,
   * all actions are added to a queue and processed in order of addition
   */
  private async processActionQueue() {
    const processedActions = [];
    // start the queue if it is not already running
    if (!this.actionsQueueProcessing$.value) {
      console.group("Process Actions");
      console.log("Template:", this.name);
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
      this.processRows(this.template.rows, this.localVariables);
    }
  }
  private async processAction(action: FlowTypes.TemplateRowAction) {
    console.log("process action", action);
    const { action_id, args } = action;
    //part of temporary fix
    let actionsForEmittedEvent = [];
    const [key, value] = args;
    switch (action_id) {
      case "set_local":
        console.log("Setting local variable", key, value);
        return this.setLocalVariable(key, value);
      case "set_global":
        console.log("Setting global variable", key, value);
        return this.templateService.setGlobal(key, value);
      case "set_field":
        return this.templateService.setField(key, value);
      case "emit":
        // TODO - handle DB writes or similar for emit handling
        if (this.parent) {
          // continue to emit any actions to parent where defined

          // When emitting, tell parent template to execute actions in
          console.log("Emiting", args[0], " from ", this.row?.name, " to parent ", this.parent);
          if (this.row && this.row.action_list) {
            const actionsForEmittedEvent = this.row.action_list.filter(
              (action) => action.trigger === args[0]
            );
            console.log("Excuting actions matching event ", args[0], actionsForEmittedEvent);
            await this.parent.handleActions(
              actionsForEmittedEvent,
              `${this.name}.${action._triggeredBy}`
            );
            // Below needs discussion
            // await this.parent.handleActions([action], `${this.name}.${action._triggeredBy}`);
          } else {
            console.log("No action list for row ", this.row, "on template name ", this.name);
            this.parent.handleActions([action], `${this.name}.${action._triggeredBy}`);
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
    // When processing local variables check parent in case there are any variables
    // that have already been set/overridden
    const parentVariables = this.parent?.localVariables?.[this.name];
    const localVariables = this.processVariables(this.template.rows, parentVariables);
    this.localVariables = localVariables;
    // when initialising any sheet variables declared by the parent can also be used
    // console.log("[Template Init]", { name: this.name, parent: this.parent, localVariables });
    this.template.rows = this.processRows(this.template.rows, localVariables);
  }

  /**
   * Template are processed in order of nesting, and so any parent templates which contain
   * variable setters or nested property setters will be processed first.
   * As such build an overall map of all variables nested by template naming,
   * with first recorded (from parent templates) taking priority over current.
   *
   * @param variables - set of parent or existing variables to take priority
   *
   */
  private processVariables(
    templateRows: FlowTypes.TemplateRow[],
    variables: IVariables = {}
  ): IVariables {
    templateRows.forEach((r) => {
      let { name, value, rows, type } = r;
      // TODO - set_variable / set_nested_properties should have consistent naming
      // set_variable is actually setting the _value field, so should be called accordingly
      if (VARIABLE_SETTER_TYPES.includes(type)) {
        // assign sheet variables that can be called from child rows
        if (type === "declare_variable") {
          this.sheetVariables[name] = r;
          // assign all other local variables from setter types
        } else {
          variables[name] = variables[name] || {};
          // handle merging updated properties
          VARIABLE_FIELDS.forEach((field) => {
            if (r[field]) {
              // don't override values that have otherwise been set from parent or nested properties
              variables[name][field] = variables[name][field] || r[field];
            }
          });
        }
      }
      if (type === "display_theme") {
        // TODO - inherited variable should be defined in better/consistent way
      }

      if (type === "set_field") {
        this.templateService.setField(name, value);
      }

      // handle rows which have nested structures
      if (rows) {
        // when processing rows from this sheet provide access to relevant set and declare variables
        const childRowVariables = variables[name];
        const parentRowVariables = variables;
        // TODO - don't like overwriting this, be nicer to handle elsewhere
        if (DISPLAY_TYPES.includes(type)) {
          type = "display_group";
        }
        switch (type) {
          // nested properties assign specific value further down the tree
          // TODO handle case where name is further nested (e.g. templateA.child1.someField)
          case "nested_properties":
            variables[name] = this.processVariables(rows, childRowVariables);
            break;
          // nested templates are handled in the same way as nested properties
          case "template":
            variables[name] = this.processVariables(rows, childRowVariables);
            break;
          // display groups are visual distinction only, process the rest of the variables as if they were inline
          case "display_group":
            variables = { ...variables, ...this.processVariables(rows, parentRowVariables) };
            break;
          // otherwise treat nested rows as value-namespaced local variables
          default:
            variables[value] = this.processVariables(rows, childRowVariables);
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
  private processRows(templateRows: FlowTypes.TemplateRow[], variables: IVariables) {
    // ensure dynamic evaluators have access to both local variables and sheet variables
    variables = { ...variables, ...this.sheetVariables };
    if (this.parent) {
      variables = { ...variables, ...this.parent.sheetVariables };
    }
    // console.log(`[${this.template.flow_name}]`, "process rows", variables);
    // remove row types that have already been processed during processVariables step
    const filteredRows = templateRows.filter((r) => !VARIABLE_SETTER_TYPES.includes(r.type));
    const rowsWithReplacedValues = filteredRows.map((r) => {
      // update row fields as spefied in local variables replacement
      // handle updates where field defined with dynamic expressions
      VARIABLE_FIELDS.forEach((field) => {
        r[field] = variables[r.name]?.[field] || r[field];
        // identify if the current field-value has a dynamic expression, or a previous one
        // TODO - if a dynamic field is overwritten by static value (not just revaluated) that value
        // would also be overwritten on render (so needs fix, possibly moving dynamic fields to parser to merge)

        // TODO - Memoize evaluators for arrays
        if (Array.isArray(r[field]) && r[field].length > 0) {
          let array = r[field] as any[];
          let dynamicEvaluatorsPerItem = array.map((item) => _extractDynamicEvaluators(item));
          if (dynamicEvaluatorsPerItem.length > 0) {
            let oldList = r[field];
            r[field] = dynamicEvaluatorsPerItem.map((evaluator, idx) => {
              if (evaluator) {
                return this.parseDynamicValue(evaluator, variables);
              } else {
                return oldList[idx];
              }
            });
          }
        } else {
          let dynamicEvaluators = _extractDynamicEvaluators(r[field]) || r._dynamicFields?.[field];
          if (dynamicEvaluators) {
            r._dynamicFields = r._dynamicFields || {};
            // evaluate dynamic field, keeping reference for future
            r._dynamicFields[field] = dynamicEvaluators as any;
            r[field] = this.parseDynamicValue(r._dynamicFields[field], variables);
          }
        }

        // TODO - evaulate function expressions (e.g. !@fields.something)
      });
      // handle nested templates
      if (r.rows) {
        // TODO - don't like overwriting this, be nicer to handle elsewhere
        let type = r.type;
        if (DISPLAY_TYPES.includes(type)) {
          type = "display_group";
        }
        switch (type) {
          case "display_group":
            // display groups are visual distinction only, process the rest of the variables as if they were inline
            r.rows = this.processRows(r.rows, variables);
            break;
          // could add logic here to ignore/remove template rows (already processed), leaving as will be overwritten on init anyways
          case "template":
          //  r.rows = this.processRows(r.rows, variables[r.name]);
          default:
            const mergedChildVariables = { ...variables[r.name], ...this.sheetVariables };
            console.log({ variables, mergedChildVariables });
            // otherwise treat nested rows as value-namespaced local variables, with access to parent declared variables
            r.rows = this.processRows(r.rows, mergedChildVariables);
        }
      }
      return r;
    });
    return rowsWithReplacedValues;
  }

  private parseDynamicValue(
    evaluators: FlowTypes.TemplateRowDynamicEvaluator[],
    localVariables: IVariables
  ) {
    let parseSuccess = true;
    let parsedExpression = evaluators[0].fullExpression;
    // In case an expression contains multiple parts to evaluate we will handle 1 at a time and overwrite the original
    for (let evaluator of evaluators) {
      let parsedValue: any;
      const { matchedExpression, type, fieldName } = evaluator;
      switch (type) {
        case "local":
          parsedValue = localVariables[fieldName]?.value;
          if (!parsedValue) {
            console.error("could not parse local variable", { evaluator, localVariables });
            parsedValue = `{{local.${fieldName}}}`;
          }
          break;
        case "field":
        case "fields":
          parsedValue = this.templateService.getField(fieldName);
          break;
        case "global":
          parsedValue = this.templateService.getGlobal(fieldName);
          break;
        default:
          parseSuccess = false;
          console.error("No evaluator for dynamic field:", evaluator.matchedExpression);
          parsedValue = evaluator.matchedExpression;
      }
      parsedExpression = parsedExpression.replace(matchedExpression, parsedValue);
    }
    // Handle negated conditions - true/false will already have been filled as text so manually toggle
    if (parsedExpression.startsWith("!")) {
      parsedExpression = parsedExpression.replace("!true", "false").replace("!false", "true");
      if (parsedExpression.startsWith("!")) {
        console.error("Negation condition not handled correctly", parsedExpression);
      }
    }
    // handle case where parsed expression contains reference to another dynamic expression
    const recursiveDynamicExpression = _extractDynamicEvaluators(parsedExpression);
    if (recursiveDynamicExpression && parseSuccess) {
      return this.parseDynamicValue(recursiveDynamicExpression, localVariables);
    }

    return parsedExpression;
  }
  /** When using ngFor loop track by  */
  public trackByRow(index: number, row: FlowTypes.TemplateRow) {
    return row.name || row.value || index;
  }
}

/** Some strings contain a variable expression such as "/assets/@fields.name/happy.jpg" or "welcome @local.name!" */
function _extractDynamicEvaluators(fullExpression: any): FlowTypes.TemplateRowDynamicEvaluator[] {
  // match fields such as @local.someField or @fields.someField.deeperNested
  // first prefix should consist only of letters (e.g. @local, @fields)
  // second part can be any letter, number, or characters _ .
  const regex = /@([a-z]+)\.([0-9a-z_.]+)/gi;
  if (typeof fullExpression === "string") {
    let allMatches: FlowTypes.TemplateRowDynamicEvaluator[] = [];
    let match: RegExpExecArray;
    // run recursive match for all dynamic expressions
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec#finding_successive_matches
    // tslint:disable:no-conditional-assignment
    while ((match = regex.exec(fullExpression)) !== null) {
      const [matchedExpression, type, fieldName] = match as any[];
      allMatches.push({ fullExpression, matchedExpression, type, fieldName });
    }
    // expect the number of match statements to match the total number of @ characters (replace all non-@)
    // provide a warning if this is not the case
    const expectedMatchLength = fullExpression.replace(/[^@]/g, "").length;
    if (allMatches.length !== expectedMatchLength) {
      console.warn(
        `Expected ${expectedMatchLength} dynamic matches but recorded ${allMatches.length}`,
        fullExpression,
        allMatches
      );
    }
    if (allMatches.length > 0) {
      return allMatches;
    }
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
