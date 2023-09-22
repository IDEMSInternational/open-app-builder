import { Component, Input, OnInit } from "@angular/core";
import { TemplateBaseComponent } from "../base";
import { FlowTypes } from "../../models";
import {
  getBooleanParamFromTemplateRow,
  getStringParamFromTemplateRow,
} from "src/app/shared/utils";

import { Device } from "@capacitor/device";

@Component({
  selector: "plh-tmpl-form",
  template: ` <div>
    <plh-template-component
      *ngFor="let childRow of _row.rows | filterDisplayComponent; trackBy: trackByRow"
      [row]="childRow"
      [parent]="parent"
    >
    </plh-template-component>
    <ion-button (click)="submit()">{{ button_text }}</ion-button>
  </div>`,
  styleUrls: ["./form.scss"],
})
export class FormComponent extends TemplateBaseComponent implements OnInit {
  @Input() inputRow: FlowTypes.TemplateRow;
  private deviceInfo;
  private form = {};
  private isAllowedDeviceInfo: boolean;
  public button_text: string;
  private pop_up_action_arg: string | null;
  private go_to_action_arg: string | null;
  private actions: FlowTypes.TemplateRowAction[];

  constructor() {
    super();
    this.deviceInfo = Device.getInfo();
  }

  ngOnInit() {
    if (this.inputRow) this._row = this.inputRow;
    this.getParams();
  }

  public submit(): void {
    this.fillInForm();
    this.actions = this.createActions();
    if (this.actions) this.parent.handleActions(this.actions, this._row);
    console.log(this.form);
  }

  private getParams(): void {
    this.button_text = getStringParamFromTemplateRow(this._row, "button_text", "Submit");
    this.pop_up_action_arg = getStringParamFromTemplateRow(this._row, "button_pop_up", null);
    this.go_to_action_arg = getStringParamFromTemplateRow(this._row, "button_go_to", null);
    this.isAllowedDeviceInfo = getBooleanParamFromTemplateRow(this._row, "get_device_info", false);
  }

  private createActions(): FlowTypes.TemplateRowAction[] {
    let result: FlowTypes.TemplateRowAction[] = [];
    if (this.pop_up_action_arg || this.go_to_action_arg) {
      result.push({
        trigger: "click",
        action_id: this.pop_up_action_arg ? "pop_up" : "go_to",
        args: [this.pop_up_action_arg ? this.pop_up_action_arg : this.go_to_action_arg],
      });
    }
    return result;
  }

  private fillInForm(): void {
    this._row.rows.forEach((r) => {
      if (
        r.value &&
        (r.type === "text_box" || r.type === "simple_checkbox" || r.type === "text_area")
      ) {
        this.form[r.name] = r.value;
      }
    });
    if (this.isAllowedDeviceInfo) {
      this.form["device_info"] = this.deviceInfo["__zone_symbol__value"];
    }
  }
}
