import { Component, Input } from "@angular/core";
import { FlowTypes } from 'src/app/shared/model/flowTypes';
import { TEMPLATE } from "src/app/shared/services/data/data.service";
import { LocalVarsReplacePipe } from "../local-vars-replace.pipe";
import { ITemplateComponent } from "./tmpl.component";

@Component({
  selector: "plh-tmpl-template-group",
  template: `<div class="template">
    <plh-tmpl-comp *ngFor="let innerRow of populatedRows"
      [row]="innerRow"
      [template]="template"
      [localVariables]="localVariables"
    ></plh-tmpl-comp>
  </div>`,
  styleUrls: ["./tmpl-components-common.scss"]
})
export class TmplTemplateGroupComponent implements ITemplateComponent {

  @Input() set row(value: FlowTypes.TemplateRow) {
    this.populateRowsFromParent(value);
  }
  @Input() template: FlowTypes.Template;
  @Input() localVariables: { [name: string]: any };
  populatedRows: FlowTypes.TemplateRow[];

  constructor() {
  }

  stringify(obj) {
    return JSON.stringify(obj);
  }

  private populateRowsFromParent(ourRow: FlowTypes.TemplateRow) {
    /* The value field is used to select a template. This field can have a @local.template_name var  */
    const parsedRowValue = LocalVarsReplacePipe.parseMessageTemplate(ourRow.value, this.localVariables);
    const superTemplate = TEMPLATE.find((t) => t.flow_name === parsedRowValue);
    if (superTemplate) {
      const overrideTree = this.createOverrideTree(ourRow.rows);
      console.log("Override tree", overrideTree);
      this.populatedRows = superTemplate.rows.map((row) => this.overrideRow(row, overrideTree));
      console.log("Populated rows are ", this.populatedRows);
    }
  }

  private createOverrideTree(overrideRows: FlowTypes.TemplateRow[]): Object {
    let tree = {};
    overrideRows.forEach((row) => {
      if (row.rows) {
        tree[row.name] = this.createOverrideTree(row.rows);
      } else {
        tree[row.name] = row;
      }
    });
    return tree;
  }

  private overrideRow(parentRow: FlowTypes.TemplateRow, overrideTree: Object) {
    if (!overrideTree) {
      return parentRow;
    }
    if (parentRow.rows) {
      parentRow.rows = parentRow.rows.map((r) => {
        const subtree = overrideTree[parentRow.name];
        return this.overrideRow(r, subtree);
      });
    }
    let matchingOurRow = Object.keys(overrideTree)
      .map((prop) => overrideTree[prop])
      .find((r) => r.name === parentRow.name);
    if (matchingOurRow) {
      const result = { ...parentRow, ...matchingOurRow, type: parentRow.type }
      return result;
    }
    return parentRow;
  }

  private mergeNameArrays(base: { name?: string }[], override: { name?: string }[]): { name: string }[] {
    const baseMap = {};
    base.forEach((obj) => baseMap[obj.name] = obj);
    const overrideMap = {};
    override.forEach((obj) => overrideMap[obj.name] = obj);
    const allNames = Object.keys(baseMap).concat(Object.keys(overrideMap));
    return allNames.map((name) => overrideMap[name] ? overrideMap[name] : baseMap[name]);
  }
}
