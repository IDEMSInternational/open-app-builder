import { Component, Input, OnInit } from "@angular/core";
import { TemplateBaseComponent } from "../base";
import { FlowTypes, ITemplateRowProps } from "../../models";
import { getStringParamFromTemplateRow } from "../../../../utils";

@Component({
  selector: "plh-points-item",
  templateUrl: "./points-item.component.html",
  styleUrls: ["./points-item.component.scss"],
})
export class TmplPointsItemComponent
  extends TemplateBaseComponent
  implements ITemplateRowProps, OnInit {
  @Input() template: FlowTypes.Template;
  @Input() localVariables: { [name: string]: any };

  icon_src: string | null;
  text: string | null;
  assetsPrefix = "/assets/plh_assets/";
  constructor() {
    super();
  }

  ngOnInit() {
    this.getParams();
  }

  getParams() {
    this.icon_src = this.assetsPrefix + getStringParamFromTemplateRow(this._row, "icon_src", null);
    this.text = getStringParamFromTemplateRow(this._row, "text", null);
  }

  getPathImg(): string {
    const src = this.assetsPrefix + this.icon_src;
    return src.replace("//", "/");
  }
}
