import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { TemplateBaseComponent } from "../base";
import { getNumberParamFromTemplateRow, getStringParamFromTemplateRow } from "src/app/shared/utils";

interface ITextBubbleParams {
  /** TEMPLATE PARAMETER: "speaker_image_asset". The path to an image to be used as the speaker */
  speakerImageAsset: string;
  /** TEMPLATE PARAMETER: "speaker_position". The position of the speaker image and speech bubble tail */
  speakerPosition: "left" | "right";
  /** TEMPLATE PARAMETER: "variant" */
  variant: "gray" | "primary" | "secondary" | "no-border" | "tertiary" | "quaternary";
  /** TEMPLATE PARAMETER: "avatar_name". The name of the speaker */
  speakerName: string;
  /** TEMPLATE PARAMETER: "speaker_number". Alternative way to handle both speaker position
   *  and speech bubble style (colour). Number 1-4. */
  speakerNumber: number;
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
    this.params.speakerName = getStringParamFromTemplateRow(this._row, "speaker_name", "");
    this.params.speakerNumber = getNumberParamFromTemplateRow(this._row, "speaker_number", 0);
    switch (this.params.speakerNumber) {
      case 1:
        this.params.variant = "primary";
        this.params.speakerPosition = "left";
        break;
      case 2:
        this.params.variant = "secondary";
        this.params.speakerPosition = "right";
        break;
      case 3:
        this.params.variant = "tertiary";
        this.params.speakerPosition = "left";
        break;
      case 4:
        this.params.variant = "quaternary";
        this.params.speakerPosition = "right";
        break;
    }
  }
}
