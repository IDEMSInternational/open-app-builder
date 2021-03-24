import { Component, HostBinding, OnInit } from "@angular/core";
import { TemplateBaseComponent } from "../base";
import { ITemplateRowProps } from "../../models";
import { getStringParamFromTemplateRow } from "../../../../utils";

@Component({
  selector: "plh-tile-component",
  templateUrl: "./tile-component.component.html",
  styleUrls: ["./tile-component.component.scss"],
})
export class TmplTileComponent extends TemplateBaseComponent implements ITemplateRowProps, OnInit {
  first_line_text: string | null;
  second_line_text: string | null;
  icon_src: string | null;
  value: any;
  style: string | null;

  defaultBackgroundGradient: string = "168.87deg, #FFB833 28.12%, #F88923 100%";

  backgroundGradient: string = this.defaultBackgroundGradient;

  @HostBinding("style.--bg-gradient") get bgGradientStart() {
    return this.backgroundGradient;
  }

  constructor() {
    super();
  }

  ngOnInit() {
    this.getParams();
  }

  getParams() {
    const assetsPath = "assets/plh_assets/";
    this.first_line_text = getStringParamFromTemplateRow(this._row, "first_line_text", null);
    this.second_line_text = getStringParamFromTemplateRow(this._row, "second_line_text", null);
    this.icon_src = assetsPath + getStringParamFromTemplateRow(this._row, "icon_src", null);
    this.backgroundGradient = getStringParamFromTemplateRow(
      this._row,
      "background_gradient",
      this.defaultBackgroundGradient
    );
    this.value = this._row.value;
    this.style = getStringParamFromTemplateRow(this._row, "style", "quick_start");
  }
}
