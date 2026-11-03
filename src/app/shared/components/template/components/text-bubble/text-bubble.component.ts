import { Component, computed } from "@angular/core";
import { defineAuthorParameterSchema, TemplateBaseComponentWithParams } from "../base";
import { TemplateTranslateService } from "../../services/template-translate.service";

const VARIANTS = [
  "gray",
  "primary",
  "secondary",
  "no-border",
  "no_border",
  "speaker-3",
  "speaker-4",
] as const;

const AuthorSchema = defineAuthorParameterSchema((coerce) => ({
  /** The path to an image to be used as the speaker. */
  speaker_image_asset: coerce.string(""),
  /** The position of the speaker image and speech bubble tail. Default 'left'. */
  speaker_position: coerce.allowedValues(["left", "right"], "left"),
  /**
   * The display variant of the text bubble. Can be comma-separated or space-separated for multiple variants.
   * Supported variants:
   * - "gray"
   * - "primary"
   * - "secondary"
   * - "no-border" / "no_border"
   * - "speaker-3"
   * - "speaker-4"
   */
  variant: coerce.allowedValuesList(VARIANTS, []),
  /** The name of the speaker. */
  speaker_name: coerce.string(""),
}));

@Component({
  selector: "tmpl-text-bubble",
  templateUrl: "text-bubble.component.html",
  styleUrl: "text-bubble.component.scss",
  standalone: false,
})
export class TmplTextBubbleComponent extends TemplateBaseComponentWithParams(AuthorSchema) {
  /** Space-separated string of variants for template use */
  public variantsString = computed(() => this.params().variant.join(" "));

  constructor(public templateTranslateService: TemplateTranslateService) {
    super();
  }
}
