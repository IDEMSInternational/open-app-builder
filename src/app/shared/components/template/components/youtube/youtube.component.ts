import { Component, computed, inject } from "@angular/core";
import { defineAuthorParameterSchema, TemplateBaseComponentWithParams } from "../base";
import { DomSanitizer } from "@angular/platform-browser";
import { TemplateTranslateService } from "../../services/template-translate.service";
import { Capacitor } from "@capacitor/core";

/**
 * Deployed URL of iframe proxy. This allows embedding target url within an https site,
 * instead of local capacitor:// (youtube has error on mismatched protocols)
 * e.g. https://idemsinternational.github.io/youtube-iframe-proxy/?v=YE7VzlLtp-4
 * See https://github.com/ionic-team/capacitor/issues/8205
 */
const IFRAME_PROXY_URL = "https://idemsinternational.github.io/youtube-iframe-proxy/";

const AuthorSchema = defineAuthorParameterSchema((coerce) => ({
  allow_fullscreen: coerce.boolean(true),
}));

/**
 * Partial list of query params passed by URL
 * These will be set via a combination of defaults and derived values
 *
 * All other params will be passed without modification
 * For a full list and explanation, see https://developers.google.com/youtube/player_parameters
 */
interface YoutubeQueryParams {
  /** Video Id - extracted from URL */
  v: string;
  /** Player color - prefer white for more theme compatibility */
  color: "red" | "white";
  /** Show full screen - default "1" can can be disabled via authoring param */
  fs: "0" | "1";
  /** Interface language - 2-letter ISO 639-1 code extracted from language service */
  hl: string;
  /** Show related videos - prefer to disable (will still show same-channel related) */
  rel: "0" | "1";
  /** Plays inline - Always enable for iOS compatibility */
  playsinline: "1";
}

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

  public urlParams = computed(() => {
    const value = this.value();
    // Expect valid url. Don't specify domain as could start youtube.com, youtu.be, m.youtube.com, etc.
    // https://stackoverflow.com/a/70512384/5693245
    if (value && typeof value === "string" && value.startsWith("https://")) {
      const url = new URL(value);
      const currentParams = Object.fromEntries(url.searchParams.entries());
      const videoId = url.searchParams.get("v");
      // only support urls that include video id through parameter (e.g. not youtu.be/12345678901)
      if (videoId) {
        return {
          ...currentParams,
          // Favour white over red for more theme compatibility
          color: "white",
          fs: this.showFullScreenButton() ? "1" : "0",
          // Attempt to set the player's interface language to match the app language
          hl: this.templateTranslateService.app_language_code,
          // Always enable playsinline for iOS compatibility
          playsinline: "1",
          // Disable related videos (at least those from external channels)
          rel: "0",
          v: videoId,
        } satisfies YoutubeQueryParams;
      }
    }
    console.error("[Youtube] Invalid value:", value);
    return undefined;
  });

  public iframeSrc = computed(() => {
    const urlParams = this.urlParams();
    if (urlParams) {
      let url: URL;
      // Proxy Iframe - forward all url params
      if (this.useProxyIframe) {
        url = new URL(IFRAME_PROXY_URL);
        for (const [key, value] of Object.entries(urlParams)) {
          url.searchParams.set(key, value);
        }
        return this.domSanitizer.bypassSecurityTrustResourceUrl(url.toString());
      }
      // Regular IFrame - rewrite to use no-cookie embed variant of video id with params
      else {
        const { v, ...keptParams } = urlParams;
        url = new URL(`https://www.youtube-nocookie.com/embed/${v}`);
        for (const [key, value] of Object.entries(keptParams)) {
          url.searchParams.set(key, value);
        }
      }
      // Sanitize response for use in component
      return this.domSanitizer.bypassSecurityTrustResourceUrl(url.toString());
    }
  });
}
