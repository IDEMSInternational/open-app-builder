import { Component, OnInit } from "@angular/core";
import { TemplateBaseComponent } from "../../base";
import { getNumberParamFromTemplateRow, getStringParamFromTemplateRow } from "../../../../../utils";
import { NgStyle } from "@angular/common";
import { TemplateAssetService } from "../../../services/template-asset.service";

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
  /** TEMPLATE PARAMETER: "background_image_position". Add a position to the background image */
  backgroundImagePosition: string;
  /** TEMPLATE PARAMETER: "sticky". Set to "top" or "bottom" to make the display group a sticky inline header/footer */
  sticky: "top" | "bottom" | null;
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

  public backgroundImageStyles: NgStyle["ngStyle"] = {};

  constructor(private templateAssetService: TemplateAssetService) {
    super();
  }

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
    this.backgroundImageStyles = this.getBackgroundImageStyles();
  }

  private getTypeFromStyles() {
    if (this.params.style?.includes("form") || this.params.variant?.includes("form")) return "form";
    if (this.params.style?.includes("dashed_box") || this.params.variant?.includes("dashed_box"))
      return "dashed_box";
    return "default";
  }

  private getBackgroundImageStyles() {
    // only generate background image styles if asset included
    const backgroundImageAsset = getStringParamFromTemplateRow(this._row, "background_image_asset");
    if (!backgroundImageAsset) return {};
    // retrieve the image asset url in the same way plh_asset pipe does
    // assign background position and size styles and return
    const url = this.templateAssetService.getTranslatedAssetPath(backgroundImageAsset);
    const backgroundImage = `url(${url})`;
    const backgroundPosition = getStringParamFromTemplateRow(
      this._row,
      "background_image_position",
      "top"
    );
    const backgroundSize = "contain";
    return { backgroundImage, backgroundPosition, backgroundSize };
  }
}
