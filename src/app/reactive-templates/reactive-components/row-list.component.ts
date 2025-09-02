import { NgComponentOutlet } from "@angular/common";
import { Component, computed, input, QueryList, viewChildren, ViewChildren } from "@angular/core";
import { FlowTypes } from "packages/data-models";
import { REACTIVE_COMPONENT_MAP } from "./components";
import { RowBaseComponent } from "./row-base.component";

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
  private rowComponents = viewChildren(RowBaseComponent);

  public readonly initialised = computed(() => {
    const children = this.rowComponents();

    console.log("Row list children:", children.length);

    let initialised = children.every((child) => child.initialised());

    if (initialised) {
      console.log(
        "Row list initialised:",
        this.namespace(),
        this.rows().map((r) => r.name)
      );
    } else {
      console.log(
        "Row list not initialised:",
        this.namespace(),
        this.rows().map((r) => r.name)
      );
    }

    return initialised;
  });

  constructor() {}

  public getComponent(row: FlowTypes.TemplateRow) {
    return REACTIVE_COMPONENT_MAP[row.type];
  }
}
