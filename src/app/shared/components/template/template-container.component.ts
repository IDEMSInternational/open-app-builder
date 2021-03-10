import { Component, Input, OnInit } from "@angular/core";
import { TEMPLATE } from "../../services/data/data.service";
import { FlowTypes, ITemplateContainerProps } from "./models";

type ILocalVariables = { [name: string]: any };

/** list of fields where overwrites will be allowed */
const VARIABLE_FIELDS: (keyof FlowTypes.TemplateRow)[] = [
  "hidden",
  "value",
  "action_list",
  "parameter_list",
  "action_list",
];

@Component({
  selector: "plh-template-container",
  templateUrl: "./template-container.component.html",
  styleUrls: ["./template-container.component.scss"],
})
export class TemplateContainerComponent implements OnInit, ITemplateContainerProps {
  @Input() name: string;
  @Input() parent?: TemplateContainerComponent;
  template: FlowTypes.Template;
  /** local state tree used to handle default and overwritten row properties */
  localVariables: ILocalVariables = {};
  debugMode = false;

  ngOnInit() {
    // Lookup template and provide fallback
    this.template =
      TEMPLATE.find((t) => t.flow_name === this.name) || NOT_FOUND_TEMPLATE(this.name);
    // When processing local variables check parent in case there are any variables
    // that have already been set/overridden
    const parentVariables = this.parent?.localVariables?.[this.template.flow_name];
    this.localVariables = this.processVariables(this.template.rows, parentVariables);
    console.log("[Template Init]", { name: this.name, parentVariables });
    if (!this.parent) {
      console.log({ localVariables: this.localVariables });
    }
    this.template.rows = this.processRows(this.template.rows, this.localVariables);
  }

  public handleActions(actions: FlowTypes.TemplateRowAction[]) {
    console.log("handling actions", actions);
  }

  /**
   * When a child triggers the changing of a local variable... TODO
   */
  public setLocalVariable(key: string, value: any) {
    this.localVariables[key] = { value };
    this.template.rows = this.processRows(this.template.rows, this.localVariables);
    // TODO - row processing should also evaluate hidden states and make field replacements (?) -
    // TODO - ngfor loop should have comparison function and key
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
    variables: ILocalVariables = {}
  ): ILocalVariables {
    templateRows.forEach((r) => {
      const { name, value, rows, type } = r;
      // TODO - set_variable / set_nested_properties should have consistent naming
      // set_variable is actually setting the _value field, so should be called accordingly
      if (type === "set_variable") {
        variables[name] = variables[name] || {};
        // handle merging updated properties
        VARIABLE_FIELDS.forEach((field) => {
          if (r[field]) {
            // don't override values that have otherwise been set from parent or nested properties
            variables[name][field] = variables[name][field] || r[field];
          }
        });
      }
      if (type === "display_theme") {
        // TODO - inherited variable should be defined in better/consistent way
      }

      // handle rows which have nested structures
      if (rows) {
        switch (type) {
          // nested properties assign specific value further down the tree
          // TODO handle case where name is further nested
          case "nested_properties":
            variables[name] = this.processVariables(rows, variables[name]);
            break;
          // nested templates are handled in the same way as nested properties
          case "template":
            variables[name] = this.processVariables(rows, variables[name]);
            break;
          // display groups are visual distinction only, process the rest of the variables as if they were inline
          case "display_group":
            variables = { ...variables, ...this.processVariables(rows, variables) };
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
    // console.log(`[${this.template.flow_name}]`, "process rows", variables);
    // remove row types that have already been processed during processVariables step
    const filterTypes: FlowTypes.TemplateRowType[] = ["set_variable", "nested_properties"];
    const filteredRows = templateRows.filter((r) => !filterTypes.includes(r.type));
    // TODO - handle hidden evaluation
    const rowsWithReplacedValues = filteredRows.map((r) => {
      // update row fields as spefied in local variables replacement
      // handle updates where field defined with dynamic expressions
      r._dynamicFields = r._dynamicFields || {};
      VARIABLE_FIELDS.forEach((field) => {
        r[field] = variables[r.name]?.[field] || r[field];
        const dynamicEvaluator = _isDynamicValue(r[field] || r._dynamicFields[field]);
        if (dynamicEvaluator) {
          // evaluate dynamic field, keeping reference for future
          r._dynamicFields[field] = dynamicEvaluator;
          r[field] = this.parseDynamicValue(r._dynamicFields[field]);
        }
        // TODO - evaulate function expressions (e.g. !@fields.something)
      });
      // handle nested templates
      if (r.rows) {
        switch (r.type) {
          case "display_group":
            // display groups are visual distinction only, process the rest of the variables as if they were inline
            r.rows = this.processRows(r.rows, variables);
            break;
          // could add logic here to ignore/remove template rows (already processed), leaving as will be overwritten on init anyways
          default:
            // otherwise treat nested rows as value-namespaced local variables
            r.rows = this.processRows(r.rows, variables[r.name]);
        }
      }
      return r;
    });
    return rowsWithReplacedValues;
  }

  private parseDynamicValue(evaluators: FlowTypes.TemplateRowDynamicEvaluator[]) {
    let parsedExpression = evaluators[0].fullExpression;
    for (let evaluator of evaluators) {
      let parsedValue: any;
      const { matchedExpression, type, fieldName } = evaluator;
      switch (type) {
        case "local":
          console.log("evaluate local", fieldName, this.localVariables);
          parsedValue = this.localVariables[fieldName]?.value || "";
          break;
        // case 'fields':
        // TODO
        default:
          console.error("No evaluator for dynamic field:", evaluator.matchedExpression);
          parsedValue = evaluator.matchedExpression;
      }
      parsedExpression = parsedExpression.replace(matchedExpression, parsedValue);
    }
  }

  // private _testSetLocalVariables() {
  //   if (this.template.flow_name === "buttons") {
  //     setTimeout(() => {
  //       this.setLocalVariable("button_completed", "Next 4");
  //     }, 2000);
  //   }
  // }
}

/** Some strings contain a variable expression such as "/assets/@fields.name/happy.jpg" or "welcome @local.name!" */
function _isDynamicValue(fullExpression: any) {
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
  return false;
}

const NOT_FOUND_TEMPLATE = (name: string): FlowTypes.Template => ({
  flow_name: "Template_not_found",
  flow_type: "template",
  rows: [{ type: "title", value: `Template "${name}" not found` }],
  status: "released",
});
