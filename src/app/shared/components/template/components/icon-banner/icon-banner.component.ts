import { Component, OnInit } from "@angular/core";
import { TemplateBaseComponent } from "../base";
import { ITemplateRowProps } from "../../models";
import { getStringParamFromTemplateRow } from "../../../../utils";

@Component({
  selector: "plh-icon-banner",
  templateUrl: "./icon-banner.component.html",
  styleUrls: ["./icon-banner.component.scss"],
})
export class TmplIconBannerComponent
  extends TemplateBaseComponent
  implements ITemplateRowProps, OnInit {
  image_src: string | null;
  title: string | null;
  text: string | null;
  style: string | null;
  baseSrcAssets = "/assets/plh_assets/";
  constructor() {
    super();
  }

  ngOnInit() {
    this.getParams();
  }

  getParams() {
    this.image_src = getStringParamFromTemplateRow(this._row, "image_src", null);
    this.title = getStringParamFromTemplateRow(this._row, "title", null);
    this.text = getStringParamFromTemplateRow(this._row, "text", null);
    this.style = getStringParamFromTemplateRow(this._row, "style", "primary");
  }
  getPathImg(path): string {
    const src = this.baseSrcAssets + path;
    return src.replace("//", "/");
  }
}
