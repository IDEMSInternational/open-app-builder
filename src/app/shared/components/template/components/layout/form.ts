import { Component, OnInit, ViewChild, ViewChildren } from "@angular/core";
import { TemplateBaseComponent } from "../base";
import { Plugins } from "@capacitor/core";

const { Device } = Plugins;

@Component({
  selector: "plh-tmpl-form",
  template: ` <div>
    <plh-template-component
      *ngFor="let childRow of _row.rows; let idx = index"
      [row]="childRow"
      [parent]="parent"
    >
    </plh-template-component>
    <ion-button style="width: 100%; margin-top: 20px;" (click)="submit()">Submit</ion-button>
  </div>`,
})
export class FormComponent extends TemplateBaseComponent implements OnInit {
  private deviceInfo;
  private form = {};
  constructor() {
    super();
    this.deviceInfo = Device.getInfo();
  }

  ngOnInit() {}

  public submit() {
    this.fillInForm();
    console.log(this.form);
  }

  private fillInForm() {
    this._row.rows.forEach((r) => {
      if (
        r.value &&
        (r.type === "text_box" || r.type === "simple_checkbox" || r.type === "text_area")
      ) {
        this.form[r.name] = r.value;
      }
    });
    this.form["device_info"] = this.deviceInfo["__zone_symbol__value"];
  }
}
