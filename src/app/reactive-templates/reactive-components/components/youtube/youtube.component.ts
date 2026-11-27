import { Component, computed, inject } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { Capacitor } from "@capacitor/core";
import { getYoutubeEmbedUrl } from "src/app/shared/components/template/components/youtube/youtube.utils";
import { TemplateTranslateService } from "src/app/shared/components/template/services/template-translate.service";
import { defineParameters, Parameter } from "../../parameters";
import { ROW_PARAMETERS, RowBaseComponent } from "../../row-base.component";

const parameters = () =>
  defineParameters({
    allowFullscreen: new Parameter("allow_fullscreen", true),
    /** Player shape: `landscape` (16:9) or `portrait` (9:16, for vertical videos) */
    orientation: Parameter.oneOf("orientation", ["landscape", "portrait"], "landscape"),
  });

@Component({
  selector: "oab-youtube",
  templateUrl: "./youtube.component.html",
  styleUrls: ["./youtube.component.scss"],
  providers: [{ provide: ROW_PARAMETERS, useFactory: parameters }],
})
export class YoutubeComponent extends RowBaseComponent<ReturnType<typeof parameters>> {
  private domSanitizer = inject(DomSanitizer);
  private templateTranslateService = inject(TemplateTranslateService);

  /** Use the iframe proxy site (fixes a protocol issue on iOS) */
  private useProxyIframe = Capacitor.getPlatform() === "ios";

  /** Read through the `appLanguage` signal so that the player language follows language changes */
  private languageCode = computed(() =>
    this.templateTranslateService.appLanguage()
      ? this.templateTranslateService.app_language_code
      : undefined
  );

  public iframeSrc = computed(() => {
    const value = this.value();
    // The value is undefined until the row is first evaluated
    if (value === undefined) return undefined;
    const embedUrl = getYoutubeEmbedUrl(value, {
      allowFullscreen: this.params.allowFullscreen.value(),
      languageCode: this.languageCode(),
      useProxy: this.useProxyIframe,
    });
    if (!embedUrl) {
      console.error("[Youtube] Invalid value:", value);
      return undefined;
    }
    return this.domSanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  });
}
