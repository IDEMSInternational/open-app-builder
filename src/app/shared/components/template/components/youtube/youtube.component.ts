import { Component, computed, inject } from "@angular/core";
import { defineAuthorParameterSchema, TemplateBaseComponentWithParams } from "../base";
import { DomSanitizer } from "@angular/platform-browser";
import { TemplateTranslateService } from "../../services/template-translate.service";
import { Capacitor } from "@capacitor/core";
import { getYoutubeEmbedUrl } from "./youtube.utils";

const AuthorSchema = defineAuthorParameterSchema((coerce) => ({
  allow_fullscreen: coerce.boolean(true),
  /** Player shape: `landscape` (16:9) or `portrait` (9:16, for vertical videos) */
  orientation: coerce.allowedValues(["landscape", "portrait"], "landscape"),
}));

@Component({
  selector: "youtube",
  templateUrl: "./youtube.component.html",
  styleUrls: ["./youtube.component.scss"],
  standalone: false,
})
export class YoutubeComponent extends TemplateBaseComponentWithParams(AuthorSchema) {
  private domSanitizer = inject(DomSanitizer);
  private templateTranslateService = inject(TemplateTranslateService);

  public showFullScreenButton = computed(() => this.params().allowFullscreen);

  /** Specify whether to use iframe proxy site (fix protocol issue on ios) */
  private useProxyIframe = Capacitor.getPlatform() === "ios";

  public iframeSrc = computed(() => {
    const value = this.value();
    const embedUrl = getYoutubeEmbedUrl(value, {
      allowFullscreen: this.showFullScreenButton(),
      languageCode: this.templateTranslateService.app_language_code,
      useProxy: this.useProxyIframe,
    });
    if (!embedUrl) {
      console.error("[Youtube] Invalid value:", value);
      return undefined;
    }
    // Sanitize response for use in component
    return this.domSanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  });
}
