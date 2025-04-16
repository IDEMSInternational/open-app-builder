import { Component, OnInit } from "@angular/core";
import { TemplateBaseComponent } from "../base";

@Component({
  selector: "plh-date-time-picker",
  templateUrl: "./date-time-picker.component.html",
  styleUrls: ["./date-time-picker.component.scss"],
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
