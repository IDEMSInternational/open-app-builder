import { Component, Input, OnInit } from "@angular/core";
import { FlowTypes } from "../../model";
import { ITemplateComponent } from "./components/tmpl.component";

@Component({
  selector: "plh-template-container",
  templateUrl: "./template-container.component.html",
  styleUrls: ["./template-container.component.scss"],
})
export class TemplateContainerComponent implements OnInit {
  @Input() rows: FlowTypes.TemplateRow[];
  @Input() parent: { name: string; component?: ITemplateComponent };
  debug = true;
  localVariables: { [name: string]: string } = {};

  constructor() {}

  ngOnInit() {
    console.log("Template Init", { rows: this.rows, parent: this.parent });
    this.localVariables = this.processLocalVariables(this.rows);
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

      // TODO - could possibly be handled in the parser (no real need for nested properties when rows already nested)
      if (r.rows) {
        // if using nested properties ensure last element has a set_variable type, and assign with properties namespace
        if (r.type === "nested_properties") {
          r.rows = r.rows.map((nestedRow) => ({
            ...nestedRow,
            type: nestedRow.type || "set_variable",
          }));
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
