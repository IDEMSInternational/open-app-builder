import { Component, Input, OnInit } from "@angular/core";
import { TEMPLATE } from "../../services/data/data.service";
import { FlowTypes, ITemplateContainerProps } from "./models";

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
  localVariables: { [name: string]: string } = {};

  ngOnInit() {
    // TODO - handle fallback template
    this.template = TEMPLATE.find((t) => t.flow_name === this.name) || TEMPLATE[1];
    this.localVariables = this.processLocalVariables(this.template.rows);
  }

  handleActions(actions: FlowTypes.TemplateRowAction[]) {
    console.log("handling actions", actions);
  }

  setLocalVariable(key: string, value: any) {
    console.log("setting local variable in container", key, value);

    console.log("local variables", this.localVariables);
  }

  private processLocalVariables(rows: FlowTypes.TemplateRow[], localVariables = {}) {
    rows.forEach((r) => {
      // TODO - set_variable / set_nested_properties should have consistent naming
      if (r.type === "set_variable") {
        console.log("set local variable", r);
        // don't override values that have otherwise been set from nested properties
        localVariables[r.name] = localVariables[r.name] || r.value;
      }
      // TODO - inherited variable should be defined in better/consistent way
      if (r.type === "display_theme") {
        // handle theme specification
      }

      if (r.rows) {
        // if using nested properties assign with name namespace
        if (r.type === "nested_properties") {
          localVariables[r.name] = this.processLocalVariables(r.rows);
        } else {
          // if general nesting apply any variables with value namespace
          localVariables[r.value] = this.processLocalVariables(r.rows);
        }
      }
    });
    return localVariables;
  }
}
