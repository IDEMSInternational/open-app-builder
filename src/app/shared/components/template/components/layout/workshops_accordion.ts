import { Component, OnInit } from "@angular/core";
import { FlowTypes } from "src/app/shared/model";
import { TemplateBaseComponent } from "../base";

@Component({
  selector: "plh-tmpl-workshops-accordion",
  template: `<div class="workshops-accordion">
    <div>
      <plh-tmpl-accordion-section
        *ngFor="let childRow of rows; let idx = index"
        [row]="childRow"
        [parent]="parent"
        [id]="idx.toString()"
        (toggleState)="toggleState($event)"
      >
      </plh-tmpl-accordion-section>
    </div>
  </div>`,
  styleUrls: ["./workshops_accordion.scss"],
})
export class WorkshopsComponent extends TemplateBaseComponent implements OnInit {
  rows: FlowTypes.TemplateRow[];

  ngOnInit() {
    this.rows = [...this._row.rows];
  }

  toggleState(rowId: string) {
    const updatedRows = this.rows.map((row, idx) => {
      if (idx === +rowId) {
        if (row.parameter_list.state === "open") {
          row.parameter_list.state = "closed";
        } else {
          row.parameter_list.state = "open";
        }
      } else {
        row.parameter_list.state = "closed";
      }
      return row;
    });
    this.rows = updatedRows;
  }
}
