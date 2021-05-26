import { Component, Input, OnInit } from "@angular/core";
import { FlowTypes } from "scripts/types";
import { getStringParamFromTemplateRow } from "src/app/shared/utils";
import { TemplateBaseComponent } from "../../base";

@Component({
  selector: "plh-advanced-dashed-box",
  templateUrl: "./advanced-dashed-box.component.html",
  styleUrls: ["./advanced-dashed-box.component.scss"],
})
export class TmplAdvancedDashedBoxComponent extends TemplateBaseComponent implements OnInit {
  @Input() templateRow: FlowTypes.TemplateRow;
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
    this.icon_src = getStringParamFromTemplateRow(this.templateRow, "icon_src", "");
    this.style = getStringParamFromTemplateRow(this.templateRow, "style", "default");
    this.icon_result = this.getPathImg();
    this.icon_position = getStringParamFromTemplateRow(
      this.templateRow,
      "icon_position",
      "top-left"
    );
  }

  getPathImg(): string {
    const src = this.assetsPrefix + this.icon_src;
    return src.replace("//", "/");
  }
}
