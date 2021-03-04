import { Component, Input } from "@angular/core";
import { FlowTypes, ITemplateRowProps } from "../models";
import { TemplateContainerComponent } from "../template-container.component";

@Component({
  selector: "plh-template-component-base",
  template: ``,
})
export class TemplateBaseComponent implements ITemplateRowProps {
  _row: FlowTypes.TemplateRow;
  _localVariables: { [name: string]: any };
  /** specific data used in component rendering */
  @Input() set row(row: FlowTypes.TemplateRow) {
    this._row = row;
  }
  /** compiled list of variables used across all template rows */
  @Input() set localVariables(localVariables: { [name: string]: any }) {
    this._localVariables = localVariables;
  }
  /** reference to parent template container */
  @Input() parent: { name: string; component: TemplateContainerComponent };
  constructor() {}
}
