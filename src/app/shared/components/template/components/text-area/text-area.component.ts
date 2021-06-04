import { Component, Input, OnInit } from "@angular/core";
import { FlowTypes } from "../../../../model";
import { TemplateBaseComponent } from "../base";
import { ITemplateRowProps } from "../../models";
import { getStringParamFromTemplateRow } from "src/app/shared/utils";

@Component({
  selector: "plh-text-area",
  templateUrl: "./text-area.component.html",
  styleUrls: ["./text-area.component.scss"],
})
export class TmplTextAreaComponent
  extends TemplateBaseComponent
  implements ITemplateRowProps, OnInit {
  public placeholder: string;

  constructor() {
    super();
  }

  ngOnInit() {
    this.getParams();
  }

  getParams() {
    this.placeholder = getStringParamFromTemplateRow(this._row, "placeholder", "");
  }

  public handleChange(): void {
    this.setValue(this._row.value);
    this.triggerActions("changed");
  }
}
