import { Component, Input } from "@angular/core";
import { FlowTypes } from 'src/app/shared/model/flowTypes';
import { TEMPLATE } from "src/app/shared/services/data/data.service";
import { ITemplateComponent } from "./tmpl-comp-host";

@Component({
  selector: "plh-tmpl-template-group",
  template: `<div class="template">
    <plh-tmpl-comp-host *ngFor="let innerRow of populatedRows"
      [row]="innerRow"
      [template]="template"
      [localVariables]="localVariables"
    ></plh-tmpl-comp-host>
  </div>`,
  styleUrls: ["./tmpl-components-common.scss"]
})
export class TmplTemplateGroupComponent implements ITemplateComponent {

  @Input() set row(value: FlowTypes.TemplateRow) {
    this.populateRowsFromParent(value);
  }
  @Input() template: FlowTypes.Template;
  @Input() localVariables: { [name: string]: string };
  populatedRows: FlowTypes.TemplateRow[];

  constructor() {
  }

  stringify(obj) {
    return JSON.stringify(obj);
  }

  private populateRowsFromParent(ourRow: FlowTypes.TemplateRow) {

    const superTemplate = TEMPLATE.find((t) => t.flow_name === ourRow.name);
    if (superTemplate) {
      const overrideValueMap: Record<string, string> = {};
      for (let row of ourRow.rows) {
        overrideValueMap[row.name] = row.value;
      }
      const newRows = [ ...superTemplate.rows ];
      newRows.forEach((row) => {
        this.overrideRow(row, overrideValueMap);
      });
      this.populatedRows = newRows;
      console.log("Populated rows are ", this.populatedRows);
    }
  }

  private overrideRow(row: FlowTypes.TemplateRow, overrideValueMap: Record<string, string>) {
    if (overrideValueMap[row.name]) {
      row.value = overrideValueMap[row.name];
    }
    if (row.rows) {
      for (let childRow of row.rows) {
        this.overrideRow(childRow, overrideValueMap);
      }
    }
  }
}
