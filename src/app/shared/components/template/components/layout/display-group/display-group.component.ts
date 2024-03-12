import { Component, OnInit } from "@angular/core";
import { TemplateBaseComponent } from "../../base";
import { getNumberParamFromTemplateRow, getStringParamFromTemplateRow } from "../../../../../utils";

interface IDisplayGroupParams {
  /** TEMPLATE PARAMETER: "variant" */
  variant: "box_gray" | "box_primary" | "box_secondary";
  /** TEMPLATE PARAMETER: "style". TODO: Various additional legacy styles, review and convert some to variants */
  style: "form" | "dashed_box" | "default" | string | null;
  /** TEMPLATE PARAMETER: "offset". Add a custom bottom margin */
  offset: number;
}

@Component({
  selector: "plh-tmpl-display-group",
  templateUrl: "./display-group.component.html",
  styleUrls: ["../../tmpl-components-common.scss", "./display-group.component.scss"],
})
export class TmplDisplayGroupComponent extends TemplateBaseComponent implements OnInit {
  params: Partial<IDisplayGroupParams> = {};
  bgColor: string;
  type: "form" | "dashed_box" | "default";

  ngOnInit() {
    this.getParams();
  }

  clickDisplayGroup() {
    this.triggerActions("click");
  }

  getParams() {
    this.params.style = getStringParamFromTemplateRow(this._row, "style", "row");
    this.params.offset = getNumberParamFromTemplateRow(this._row, "offset", 0);
    this.params.variant = getStringParamFromTemplateRow(this._row, "variant", "")
      .split(",")
      .join(" ") as IDisplayGroupParams["variant"];
    this.type = this.getTypeFromStyles(this.params.style || "");
  }

  private getTypeFromStyles(styles: string) {
    if (styles) {
      if (styles.includes("form")) return "form";
      if (styles.includes("dashed_box")) return "dashed_box";
    }
    return "default";
  }
}
