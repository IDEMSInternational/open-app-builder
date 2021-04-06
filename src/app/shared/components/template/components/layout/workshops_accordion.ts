import { Component, OnInit, QueryList, ViewChild, ViewChildren } from "@angular/core";
import { FlowTypes } from "scripts/types";
import { TemplateBaseComponent } from "../base";
import { AccordionSectionComponent } from "./accordion_section";

@Component({
  selector: "plh-tmpl-workshops-accordion",
  template: `<div class="workshops-accordion">
    <div>
      <plh-tmpl-accordion-section
        *ngFor="let childRow of rows; let idx = index"
        [row]="childRow"
        [parent]="parent"
        [id]="idx"
        (toggleState)="toggleState($event)"
      >
      </plh-tmpl-accordion-section>
    </div>
  </div>`,
  styleUrls: ["./accordion.scss"],
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
