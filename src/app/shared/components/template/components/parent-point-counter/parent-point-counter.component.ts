import { Component, OnChanges, OnInit } from "@angular/core";
import { getNumberParamFromTemplateRow, getStringParamFromTemplateRow } from "src/app/shared/utils";
import { TemplateBaseComponent } from "../base";

@Component({
  selector: "plh-parent-point-counter",
  templateUrl: "./parent-point-counter.component.html",
  styleUrls: ["./parent-point-counter.component.scss"],
})
export class TmplParentPointCounterComponent
  extends TemplateBaseComponent
  implements OnInit, OnChanges
{
  public icon_src: string | null;
  public count: number | null;

  constructor() {
    super();
  }

  ngOnInit() {
    this.getParams();
  }

  ngOnChanges() {
    this.count = getNumberParamFromTemplateRow(this._row, "count", null);
  }

  getParams() {
    this.icon_src = getStringParamFromTemplateRow(this._row, "icon_src", null);
    this.count = getNumberParamFromTemplateRow(this._row, "count", null);
  }
}
