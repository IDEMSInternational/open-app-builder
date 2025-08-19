import { NgComponentOutlet } from "@angular/common";
import { Component, input } from "@angular/core";
import { FlowTypes } from "packages/data-models";
import { REACTIVE_COMPONENT_MAP } from "./components";

@Component({
  selector: "oab-row-list",
  template: `
    @for (row of rows(); track row.name) {
      <ng-container
        *ngComponentOutlet="getComponent(row); inputs: { row, namespace: namespace() }"
      />
    }
  `,
  standalone: true,
  imports: [NgComponentOutlet],
})
export class RowListComponent {
  public namespace = input("");
  public rows = input.required<FlowTypes.TemplateRow[]>();

  constructor() {}

  public getComponent(row: FlowTypes.TemplateRow) {
    return REACTIVE_COMPONENT_MAP[row.type];
  }
}
