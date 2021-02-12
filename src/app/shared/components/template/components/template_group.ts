import { Component, Input, OnChanges, OnInit } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { FlowTypes } from 'src/app/shared/model/flowTypes';
import { TEMPLATE } from "src/app/shared/services/data/data.service";

@Component({
  selector: "plh-tmpl-template-group",
  template: `<div class="template">
    <plh-tmpl-comp-host *ngFor="let innerRow of populatedRows"
      [row]="innerRow"
      [template]="template"
      [$localVariables]="$localVariables"
    ></plh-tmpl-comp-host>
  </div>`,
  styleUrls: ["./tmpl-components-common.scss"]
})
export class TmplTemplateGroupComponent {

  @Input() set row(value: FlowTypes.TemplateRow) {
    this.populateRowsFromParent(value);
  }
  @Input() template: FlowTypes.Template;
  @Input() $localVariables: BehaviorSubject<{ [name: string]: string }>;
  populatedRows: FlowTypes.TemplateRow[];

  constructor() {
  }

  stringify(obj) {
    return JSON.stringify(obj);
  }

  private populateRowsFromParent(ourRow: FlowTypes.TemplateRow) {

    const superTemplate = TEMPLATE.find((t) => t.flow_name === ourRow.name);
    if (superTemplate) {
      const overrideRowMap: Record<string, FlowTypes.TemplateRow> = {};
      for (let row of ourRow.rows) {
        overrideRowMap[row.name] = row;
      }
      this.populatedRows = superTemplate.rows.map((row) => {
        if (overrideRowMap[row.name]) {
          for (let prop of Object.keys(overrideRowMap[row.name])) {
            if (prop !== "type") {
              row[prop] = overrideRowMap[row.name][prop];
            }
          }
        }
        return row;
      });
      console.log("Populated rows are ", this.populatedRows);
    }
  }
}
