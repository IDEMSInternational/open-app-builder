import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { TemplateBaseComponent } from "../base";
import { getStringParamFromTemplateRow } from "src/app/shared/utils";

interface ITextBubbleParams {
  /** TEMPLATE PARAMETER: "speaker_image_asset". The path to an image to be used as the speaker */
  speakerImageAsset: string;
  /** TEMPLATE PARAMETER: "speaker_position". The position of the speaker image and speech bubble tail */
  speakerPosition: "left" | "right";
  /** TEMPLATE PARAMETER: "variant" */
  variant: "gray" | "primary" | "secondary" | "no-border" | "orange" | "yellow";
  /** TEMPLATE PARAMETER: "avatar_name". The name of the speaker */
  avatarName: string;
}

@Component({
  selector: "tmpl-text-bubble",
  templateUrl: "text-bubble.component.html",
  styleUrl: "text-bubble.component.scss",
})
export class TmplTextBubbleComponent extends TemplateBaseComponent implements OnInit {
  params: Partial<ITextBubbleParams> = {};
  ngOnInit() {
    this.getParams();
  }

  getParams() {
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
    this.params.variant = getStringParamFromTemplateRow(this._row, "variant", "")
      .split(",")
      .join(" ") as ITextBubbleParams["variant"];
    this.params.avatarName = getStringParamFromTemplateRow(this._row, "avatar_name", "");
  }
}
