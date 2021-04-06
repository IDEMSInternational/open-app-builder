import { Component, OnInit } from "@angular/core";
import { TemplateBaseComponent } from "../base";
import { ITemplateRowProps } from "../../models";
import { getStringParamFromTemplateRow } from "../../../../utils";

@Component({
  selector: "plh-dashed-box",
  templateUrl: "./dashed-box.component.html",
  styleUrls: ["./dashed-box.component.scss"],
})
export class TmplDashedBoxComponent
  extends TemplateBaseComponent
  implements ITemplateRowProps, OnInit {
  style: string;
  icon_src: string | null;
  assetsPrefix = "/assets/plh_assets/";
  icon_result: string;
  icon_position: string;
  constructor() {
    super();
  }

  ngOnInit() {
    this.getParams();
  }

  getParams() {
    this.icon_src = getStringParamFromTemplateRow(this._row, "icon_src", "");
    this.style = getStringParamFromTemplateRow(this._row, "style", "default");
    this.icon_result = this.getPathImg();
    this.icon_position = getStringParamFromTemplateRow(this._row, "icon_position", "top-left");
  }

  getPathImg(): string {
    const src = this.assetsPrefix + this.icon_src;
    return src.replace("//", "/");
  }
}
