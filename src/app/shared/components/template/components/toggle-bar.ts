import { Component, OnInit } from "@angular/core";
import { TemplateBaseComponent } from "./base";
import { ITemplateRowProps } from "../models";
import { getStringParamFromTemplateRow } from "../../../utils";

@Component({
  selector: "plh-tmpl-toggle-bar",
  template: `
    <ion-toggle #toggleEl (ionChange)="handleChange(toggleEl.checked)"></ion-toggle>
    <span>{{ label }}</span>
  `,
})
export class TmplToggleBarComponent
  extends TemplateBaseComponent
  implements ITemplateRowProps, OnInit {
  label: string;
  constructor() {
    super();
  }

  ngOnInit() {
    this.getParams();
  }

  public async handleChange(isChecked: boolean) {
    await this.setValue(isChecked);
    this.triggerActions("changed");
  }

  getParams() {
    this.label = getStringParamFromTemplateRow(this._row, "label", "");
  }
}
