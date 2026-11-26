import { Component, computed, forwardRef, inject } from "@angular/core";
import { TemplateTranslateService } from "src/app/shared/components/template/services/template-translate.service";
import { TemplatePipesModule } from "src/app/shared/components/template/pipes";
import { RowBaseComponent, ROW_PARAMETERS } from "../../row-base.component";
import { defineParameters, Parameter } from "../../parameters";
import { RowListComponent } from "../../row-list.component";

const VARIANTS = [
  "gray",
  "primary",
  "secondary",
  "no-border",
  "no_border",
  "speaker-3",
  "speaker-4",
] as const;

const parameters = () =>
  defineParameters({
    speakerImageAsset: new Parameter("speaker_image_asset", ""),
    speakerPosition: new Parameter<"left" | "right">("speaker_position", "left"),
    variant: new Parameter<string | string[]>("variant", []),
    speakerName: new Parameter("speaker_name", ""),
  });

@Component({
  selector: "tmpl-text-bubble",
  templateUrl: "./text-bubble.component.html",
  styleUrls: ["./text-bubble.component.scss"],
  imports: [TemplatePipesModule, forwardRef(() => RowListComponent)],
  providers: [{ provide: ROW_PARAMETERS, useFactory: parameters }],
})
export class TextBubbleComponent extends RowBaseComponent<ReturnType<typeof parameters>> {
  public templateTranslateService = inject(TemplateTranslateService);
  public rows = computed(() => this.row().rows || []);
  public speakerPosition = computed(() =>
    this.params.speakerPosition.value() === "right" ? "right" : "left"
  );
  public variantsString = computed(() => {
    const variant = this.params.variant.value();
    const variants = Array.isArray(variant) ? variant : variant.split(/[,\s]+/);
    return variants
      .filter((item) => VARIANTS.includes(item as (typeof VARIANTS)[number]))
      .join(" ");
  });
}
