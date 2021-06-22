import { Component, OnInit } from "@angular/core";
import { TemplateBaseComponent } from "../base";
import { ITemplateRowProps } from "../../models";
import { getStringParamFromTemplateRow, getBooleanParamFromTemplateRow } from "../../../../utils";
import { Platform } from "@ionic/angular";

@Component({
  selector: "plh-tmpl-toggle-bar",
  template: `
    <div class="container margin-t-regular" [class]="position">
      <div class="toggle_wrapper" [class.with_icons]="withIcons">
        <ion-toggle
          [mode]="mode"
          [checked]="_row.value"
          #toggleEl
          (ionChange)="handleChange(toggleEl.checked)"
        >
        </ion-toggle>
      </div>
      <span class="label">{{ _row.value ? true_text : false_text }}</span>
    </div>
  `,
  styleUrls: ["./toggle-bar.scss"],
})
export class TmplToggleBarComponent
  extends TemplateBaseComponent
  implements ITemplateRowProps, OnInit {
  public false_text: string;
  public true_text: string;
  public position: string;
  public mode: string;
  public withIcons: boolean;

  constructor(private platform: Platform) {
    super();
    this.mode = this.platform.is("android") ? "md" : "ios" || "ios";
  }

  ngOnInit() {
    this.getParams();
    console.log(this.withIcons);
  }

  public async handleChange(isChecked: boolean) {
    await this.setValue(isChecked);
    this.triggerActions("changed");
  }

  getParams() {
    this.false_text = getStringParamFromTemplateRow(this._row, "false_text", "");
    this.true_text = getStringParamFromTemplateRow(this._row, "true_text", "");
    this.position = getStringParamFromTemplateRow(this._row, "position", "left");
    this.withIcons = getBooleanParamFromTemplateRow(this._row, "show_tick_and_cross", false);
  }
}
