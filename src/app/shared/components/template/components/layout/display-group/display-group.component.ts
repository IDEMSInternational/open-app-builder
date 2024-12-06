import { Component, OnInit } from "@angular/core";
import { TemplateBaseComponent } from "../../base";
import { getNumberParamFromTemplateRow, getStringParamFromTemplateRow } from "../../../../../utils";

interface IDisplayGroupParams {
  /** TEMPLATE PARAMETER: "variant" */
  variant:
    | "box_gray"
    | "box_primary"
    | "box_secondary"
    | "box_white"
    | "dashed_box"
    | "inline_padding";
  /** TEMPLATE PARAMETER: "style". TODO: Various additional legacy styles, review and convert some to variants */
  style: "form" | "default" | string | null;
  /** TEMPLATE PARAMETER: "offset". Add a custom bottom margin */
  offset: number;
  /** TEMPLATE PARAMETER: "background_image_asset". Add a background to the display group */
  backgroundImageAsset: string;
  /** TEMPLATE PARAMETER: "background_image_asset". Add a position to the background image */
  backgroundImagePosition: string;
  /** TEMPLATE PARAMETER: "sticky". Set to "top" or "bottom" to make the display group a sticky inline header/footer */
  sticky: "top" | "bottom" | null;
  /**
   * TEMPLATE PARAMETER: "sticky_background". Set the background colour of the display group if sticky.
   * Defaults to using the main app background colour determined by the theme.
   */
  stickyBackground: "default" | "transparent";
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

  public clickDisplayGroup() {
    this.triggerActions("click");
  }

  private getParams() {
    this.params.style = getStringParamFromTemplateRow(this._row, "style", "row");
    this.params.offset = getNumberParamFromTemplateRow(this._row, "offset", 0);
    this.params.variant = getStringParamFromTemplateRow(this._row, "variant", "")
      .split(",")
      .join(" ")
      .concat(" " + this.params.style) as IDisplayGroupParams["variant"];
    this.params.sticky = getStringParamFromTemplateRow(this._row, "sticky", null) as any;
    this.type = this.getTypeFromStyles();
    this.params.backgroundImageAsset = getStringParamFromTemplateRow(
      this._row,
      "background_image_asset",
      null
    );
    this.params.backgroundImagePosition = getStringParamFromTemplateRow(
      this._row,
      "background_image_position",
      "top"
    );
    this.params.stickyBackground = getStringParamFromTemplateRow(
      this._row,
      "sticky_background",
      "default"
    ) as IDisplayGroupParams["stickyBackground"];
  }

  private getTypeFromStyles() {
    if (this.params.style?.includes("form") || this.params.variant?.includes("form")) return "form";
    if (this.params.style?.includes("dashed_box") || this.params.variant?.includes("dashed_box"))
      return "dashed_box";
    return "default";
  }
}
