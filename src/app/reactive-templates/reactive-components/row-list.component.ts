import { NgComponentOutlet } from "@angular/common";
import { Component, computed, input } from "@angular/core";
import { FlowTypes } from "packages/data-models";
import { REACTIVE_COMPONENT_MAP } from "./components";

@Component({
  selector: "oab-row-list",
  template: `
    @for (row of rows(); track i; let i = $index) {
      <ng-container
        *ngComponentOutlet="
          getComponent(row);
          inputs: { row, namespace: namespace(), onInitialised: onRowInit(i) }
        "
      />
    }
  `,
  imports: [NgComponentOutlet],
})
export class RowListComponent {
  public namespace = input("");
  public rows = input<FlowTypes.TemplateRow[]>([]);

  public readonly initialised = computed(() => {
    // Initially zero rows will be reported we will
    // assume that a list with no rows is not initialised
    if (this.rows().length === 0) {
      return false;
    }

    return this.rowsInitialised.size === this.rows().length;
  });

  private rowsInitialised = new Set<number>();

  public getComponent(row: FlowTypes.TemplateRow) {
    return REACTIVE_COMPONENT_MAP[row.type];
  }

  /* 
    Each row will call this method when it is finished initialising.
    This allows us to override child variables after all rows are initialised.
    So that override values take precedence.

    Ideally this would be done by computing a signal 'initialised' field on each RowBaseComponent
    however it's not easy to do that with ngComponentOutlet.

    An alternative solution could be to create a 'RowHost' directive to expose the RowBaseComponent
  */
  public onRowInit(index: number) {
    this.rowsInitialised.add(index);
  }
}
