import { Component, Input } from "@angular/core";
import { FlowTypes, ITemplateRowProps } from "../models";
import { TemplateContainerComponent } from "../template-container.component";

@Component({
  template: ``,
  styleUrls: ["./tmpl-components-common.scss"],
})
/**
 * Common methods and data made available to all other components
 * By default it provides input setters, and mapping to local variables
 *
 * Other components can either extend this one, or implement ITemplateRowProps
 * in their own way.
 * Note, if extending the base component access to data is provided by the declared properties,
 * e.g. `_row`
 */
export class TemplateBaseComponent implements ITemplateRowProps {
  _row: FlowTypes.TemplateRow;
  /** specific data used in component rendering */
  @Input() set row(row: FlowTypes.TemplateRow) {
    this._row = row;
  }
  /** reference to parent template container - does not have setter as should remain static */
  @Input() parent: TemplateContainerComponent;
  constructor() {}

  /**
   * Whenever actions are triggered handle in the parent template component
   * Actions are grouped by trigger, only emitting specific event handler (e.g. click)
   */
  triggerActions(trigger: FlowTypes.TemplateRowAction["trigger"] = "click") {
    if (this._row.disabled && this._row.type !== "accordion_section") {
      console.log("Click action disabled for ", this._row.name);
      return;
    }
    const action_list = this._row.action_list || [];
    const actionsForTrigger = action_list.filter((a) => a.trigger === trigger);
    return this.parent.handleActions(actionsForTrigger, this._row);
  }

  /** Update the current value of the row by setting a local variable that matches */
  setValue(value: any) {
    // console.log("setting value", value);
    const action: FlowTypes.TemplateRowAction = {
      action_id: "set_local",
      args: [this._row._nested_name, value],
      trigger: "click",
    };
    return this.parent.handleActions([action], this._row);
  }

  trackByRow = (index: number, row: FlowTypes.TemplateRow) => this.parent.trackByRow(index, row);
}
