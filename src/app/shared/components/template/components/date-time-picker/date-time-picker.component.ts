import { Component, OnInit } from "@angular/core";
import { TemplateBaseComponent } from "../base";

@Component({
  selector: "plh-date-time-picker", // Updated selector
  templateUrl: "./date-time-picker.component.html", // Updated file reference
  styleUrls: ["./date-time-picker.component.scss"], // Updated file reference
})
export class TmplDateTimePickerComponent extends TemplateBaseComponent implements OnInit {
  // Updated class name
  public value = this.rowSignal;

  constructor() {
    super();
  }

  public ngOnInit() {}

  private getParams() {}
}
