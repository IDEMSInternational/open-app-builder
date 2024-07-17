import { Component, OnInit } from "@angular/core";
import { TemplateBaseComponent } from "../../base";
import { getNumberParamFromTemplateRow, getStringParamFromTemplateRow } from "../../../../../utils";

interface IDisplayGroupParams {
  /** TEMPLATE PARAMETER: "variant" */
  variant: "box_gray" | "box_primary" | "box_secondary" | "dashed_box" | "speech_bubble";
  /** TEMPLATE PARAMETER: "style". TODO: Various additional legacy styles, review and convert some to variants */
  style: "form" | "default" | string | null;
  /** TEMPLATE PARAMETER: "offset". Add a custom bottom margin */
  offset: number;
  /** TEMPLATE PARAMETER: "speaker_image_asset". The path to an image to be used as the speaker for the 'speech_bubble' variant */
  speakerImageAsset: string;
  /** TEMPLATE PARAMETER: "speaker_position". The position of the speaker image and speech bubble tail for the 'speech_bubble' variant. Default 'left' */
  speakerPosition: "left" | "right";
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
      .join(" ")
      .concat(" " + this.params.style) as IDisplayGroupParams["variant"];
    this.params.speakerImageAsset = getStringParamFromTemplateRow(
      this._row,
      "speaker_image_asset",
      ""
    );
    this.params.speakerPosition = getStringParamFromTemplateRow(
      this._row,
      "speaker_position",
      "left"
    ) as "left" | "right";
    this.type = this.getTypeFromStyles();
  }

  private getTypeFromStyles() {
    if (this.params.style?.includes("form") || this.params.variant?.includes("form")) return "form";
    if (this.params.style?.includes("dashed_box") || this.params.variant?.includes("dashed_box"))
      return "dashed_box";
    return "default";
  }
}
