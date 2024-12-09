import { Component, OnInit } from "@angular/core";
import { TemplateBaseComponent } from "../base";
import { FlowTypes } from "packages/data-models";

@Component({
  selector: "plh-tmpl-workshops-accordion",
  template: `<div class="workshops-accordion">
    <div>
      <plh-tmpl-accordion-section
        *ngFor="let childRow of accordionRows; let idx = index"
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
  public accordionRows: FlowTypes.TemplateRow[] = [];

  ngOnInit() {
    this.accordionRows = [...this.rows()];
  }

  toggleState(rowId: string) {
    const updatedRows = this.accordionRows.map((row, idx) => {
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
    this.accordionRows = updatedRows;
  }
}
