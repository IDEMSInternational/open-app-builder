import { Component, Input, OnInit } from "@angular/core";
import { TEMPLATE } from "../../services/data/data.service";
import { FlowTypes, ITemplateContainerProps } from "./models";

type ILocalVariables = { [name: string]: any };

@Component({
  selector: "plh-template-container",
  templateUrl: "./template-container.component.html",
  styleUrls: ["./template-container.component.scss"],
})
export class TemplateContainerComponent implements OnInit, ITemplateContainerProps {
  @Input() name: string;
  @Input() parent?: TemplateContainerComponent;
  template: FlowTypes.Template;
  debug = true;
  localVariables: ILocalVariables = {};
  children = {};

  ngOnInit() {
    // Lookup template and provide fallback
    this.template =
      TEMPLATE.find((t) => t.flow_name === this.name) || NOT_FOUND_TEMPLATE(this.name);

    // When processing local variables check parent in case there are any variables
    // that have already been set/overridden
    const parentVariables = this.parent?.localVariables?.[this.template.flow_name];
    console.log("[Template Init]", { name: this.name, parentVariables });
    this.localVariables = this.processVariables(this.template.rows, parentVariables);
    if (!this.parent) {
      const localVariables = this.localVariables;
      console.log({ localVariables });
    }
    this.template.rows = this.processRows(this.template.rows, this.localVariables);

    // if (this.template.flow_name === "buttons") {
    //   setTimeout(() => {
    //     this.setLocalVariable("button_completed", "Next 4");
    //   }, 2000);
    // }
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
    // TODO - row processing should also evaluate hidden states and make field replacements
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
        // don't override values that have otherwise been set from parent or nested properties
        // TODO - also handle when additional fields are defined (deep merge each prop, e.g. {value, hidden, action_list})
        // console.log("set variable", r);
        variables[name] = variables[name] || { value };
      }
      if (type === "display_theme") {
        // TODO - inherited variable should be defined in better/consistent way
      }

      // handle rows which have nested structures
      if (rows) {
        switch (type) {
          // nested properties assign specific value further down the tree
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
    console.log(`[${this.template.flow_name}]`, "process rows", variables);
    // remove row types that have already been processed during processVariables step
    const filterTypes: FlowTypes.TemplateRowType[] = ["set_variable", "nested_properties"];
    const filteredRows = templateRows.filter((r) => !filterTypes.includes(r.type));
    // TODO - handle hidden evaluation
    // TODO - handle local var replacement
    const rowsWithReplacedValues = filteredRows.map((r) => {
      // update row values as spefied in local variables replacement
      r.value = variables[r.name]?.value || r.value;
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
}

const NOT_FOUND_TEMPLATE = (name: string): FlowTypes.Template => ({
  flow_name: "Template_not_found",
  flow_type: "template",
  rows: [{ type: "title", value: `Template "${name}" not found` }],
  status: "released",
});
