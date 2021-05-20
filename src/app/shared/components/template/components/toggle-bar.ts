import { AfterViewInit, Component, OnInit } from "@angular/core";
import { TemplateBaseComponent } from "./base";
import { ITemplateRowProps } from "../models";
import { getStringParamFromTemplateRow } from "../../../utils";

@Component({
  selector: "plh-tmpl-toggle-bar",
  template: `
    <div class="container margin-t-regular" [class]="position">
      <ion-toggle #toggleEl (ionChange)="handleChange(toggleEl.checked)"></ion-toggle>
      <span class="label">{{ label }}</span>
    </div>
  `,
  styles: [
    `
      .container {
        display: flex;
        align-items: center;
      }
      .label {
        margin-left: var(--small-margin);
      }
      .center {
        justify-content: center;
      }
      .rignt {
        justify-content: flex-end;
      }
    `,
  ],
})
export class TmplToggleBarComponent
  extends TemplateBaseComponent
  implements ITemplateRowProps, OnInit {
  public label: string;
  public position: string;

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
    this.position = getStringParamFromTemplateRow(this._row, "position", "left");
  }
}
