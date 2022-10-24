import { Component, OnInit } from "@angular/core";
import { TemplateBaseComponent } from "../base";
import { ITemplateRowProps } from "../../models";
import {
  getStringParamFromTemplateRow,
  getBooleanParamFromTemplateRow,
} from "src/app/shared/utils";

@Component({
  selector: "plh-tmpl-toggle-bar",
  template: `
    <div class="container" [class]="position" [attr.data-param-style]="style">
      <div class="toggle_wrapper" [class.show-tick-cross]="showTickAndCross">
        <ion-toggle
          mode="md"
          [checked]="_row.value"
          #toggleEl
          (ionChange)="handleChange(toggleEl.checked)"
          (click)="handleClick($event, toggleEl.checked)"
        >
        </ion-toggle>
      </div>
      <span
        class="label"
        *ngIf="true_text && false_text"
        [innerHTML]="true_text && false_text | markdown"
        >{{ _row.value ? true_text : false_text }}</span
      >
    </div>
  `,
  styleUrls: ["./toggle-bar.scss"],
})
export class TmplToggleBarComponent
  extends TemplateBaseComponent
  implements ITemplateRowProps, OnInit
{
  public false_text: string;
  public true_text: string;
  public position: string;
  public showTickAndCross: boolean;
  style: string;

  ngOnInit() {
    this.getParams();
  }

  public async handleChange(isChecked: boolean) {
    await this.setValue(isChecked);
    this.triggerActions("changed");
  }
  /**
   * As its not possible to stop click events bubbling from the ionChange event,
   * include an additional click event handler to trigger the toggle change without bubbling
   */
  public async handleClick(e: Event, isChecked: boolean) {
    e.stopImmediatePropagation();
    this._row.value = !isChecked;
  }

  getParams() {
    this.false_text = getStringParamFromTemplateRow(this._row, "false_text", "");
    this.true_text = getStringParamFromTemplateRow(this._row, "true_text", "");
    this.position = getStringParamFromTemplateRow(this._row, "position", "left");
    this.showTickAndCross = getBooleanParamFromTemplateRow(this._row, "show_tick_and_cross", true);
    this.style = getStringParamFromTemplateRow(this._row, "style", "");
  }
}
