import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { TemplateBaseComponent } from "../base";
import { getStringParamFromTemplateRow } from "src/app/shared/utils";

interface ITextBubbleParams {
  /** TEMPLATE PARAMETER: "speaker_image_asset". The path to an image to be used as the speaker for the 'speech_bubble' variant */
  speakerImageAsset: string;
  /** TEMPLATE PARAMETER: "speaker_position". The position of the speaker image and speech bubble tail for the 'speech_bubble' variant. Default 'left' */
  speakerPosition: "left" | "right";
}

@Component({
  selector: "tmpl-text-bubble",
  templateUrl: "text-bubble.component.html",
  styleUrl: "text-bubble.component.scss",
  encapsulation: ViewEncapsulation.None,
})
export class TmplTextBubbleComponent extends TemplateBaseComponent implements OnInit {
  params: Partial<ITextBubbleParams> = {};
  ngOnInit() {
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
  }
}
