import { Component, Input, OnInit, ViewChild, ViewChildren } from "@angular/core";
import { TemplateBaseComponent } from "../base";
import { Plugins } from "@capacitor/core";
import { FlowTypes } from "src/app/shared/model";
import {
  getBooleanParamFromTemplateRow,
  getStringParamFromTemplateRow,
} from "src/app/shared/utils";

const { Device } = Plugins;

@Component({
  selector: "plh-tmpl-form",
  template: ` <div>
    <plh-template-component
      *ngFor="let childRow of templateRow.rows"
      [row]="childRow"
      [parent]="parent"
    >
    </plh-template-component>
    <ion-button (click)="submit()">{{ button_text }}</ion-button>
  </div>`,
  styles: [
    `
      ion-button {
        font-size: 25px;
        font-family: Roboto, sans-serif;
        font-weight: 500;
        color: var(--ion-color-primary-contrast);
        text-transform: none;
        white-space: pre-line;
        min-height: 71px;
        padding: var(--regular-margin) var(--regular-padding) 0;
        --border-radius: 15px;
        --box-shadow: var(--ion-btn-dark-box-shadow);
        min-width: 100%;
        --background: var(--ion-btn-primary);
      }
    `,
  ],
})
export class FormComponent extends TemplateBaseComponent implements OnInit {
  @Input() templateRow: FlowTypes.TemplateRow;
  private deviceInfo;
  private form = {};
  private isAllowedDeviceInfo: boolean;
  public button_text: string;

  constructor() {
    super();
    this.deviceInfo = Device.getInfo();
  }

  ngOnInit() {
    this.getParams();
  }

  public submit(): void {
    this.fillInForm();
    console.log(this.form, this.isAllowedDeviceInfo);
  }

  private getParams(): void {
    this.button_text = getStringParamFromTemplateRow(this.templateRow, "button_text", "Submit");
    this.isAllowedDeviceInfo = getBooleanParamFromTemplateRow(
      this.templateRow,
      "get_device_info",
      false
    );
  }

  private fillInForm(): void {
    this.templateRow.rows.forEach((r) => {
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
