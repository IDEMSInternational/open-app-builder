import { AfterViewInit, Component, OnInit } from "@angular/core";
import { TemplateBaseComponent } from "./base";
import { ITemplateRowProps } from "../models";
import { getStringParamFromTemplateRow } from "../../../utils";
import { Platform } from "@ionic/angular";

@Component({
  selector: "plh-tmpl-toggle-bar",
  template: `
    <div class="container margin-t-regular" [class]="position">
      <div class="toggle_wrapper">
        <ion-toggle
          [mode]="mode"
          [checked]="_row.value"
          #toggleEl
          (ionChange)="handleChange(toggleEl.checked)"
        ></ion-toggle>
      </div>
      <span class="label">{{ _row.value ? true_text : false_text }}</span>
    </div>
  `,
  styles: [
    `
      .container {
        position: relative;
        display: flex;
        align-items: center;
      }
      .label {
        margin-left: var(--small-margin);
        margin-right: var(--small-margin);
      }
      .center {
        justify-content: center;
      }
      .center .label {
        position: absolute;
        right: 0;
        max-width: calc(50% - 45px);
      }
      .right {
        justify-content: flex-end;
      }
      .right .label {
        order: 1;
      }
      .right .toggle_wrapper {
        order: 2;
      }
    `,
  ],
})
export class TmplToggleBarComponent
  extends TemplateBaseComponent
  implements ITemplateRowProps, OnInit {
  public false_text: string;
  public true_text: string;
  public position: string;
  public mode: string;

  constructor(private platform: Platform) {
    super();
    this.mode = this.platform.is("android") ? "md" : "ios" || "ios";
  }

  ngOnInit() {
    this.getParams();
  }

  public async handleChange(isChecked: boolean) {
    await this.setValue(isChecked);
    this.triggerActions("changed");
  }

  getParams() {
    this.false_text = getStringParamFromTemplateRow(this._row, "false_text", "");
    this.true_text = getStringParamFromTemplateRow(this._row, "true_text", "");
    this.position = getStringParamFromTemplateRow(this._row, "position", "left");
  }
}
