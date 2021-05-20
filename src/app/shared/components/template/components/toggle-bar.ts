import { AfterViewInit, Component, OnInit } from "@angular/core";
import { TemplateBaseComponent } from "./base";
import { ITemplateRowProps } from "../models";
import { getStringParamFromTemplateRow } from "../../../utils";

@Component({
  selector: "plh-tmpl-toggle-bar",
  template: `
    <div class="wrapper margin-t-regular">
      <ion-toggle #toggleEl (ionChange)="handleChange(toggleEl.checked)"></ion-toggle>
      <span class="label">{{ label }}</span>
    </div>
  `,
  styles: [
    `
      .wrapper {
        display: flex;
        align-items: center;
      }
      .label {
        margin-left: var(--small-margin);
      }
    `,
  ],
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
