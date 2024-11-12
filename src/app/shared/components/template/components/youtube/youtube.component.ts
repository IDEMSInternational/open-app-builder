import { Component, computed } from "@angular/core";
import { TemplateBaseComponent } from "../base";
import { DomSanitizer } from "@angular/platform-browser";
import { getBooleanParamFromTemplateRow } from "src/app/shared/utils";
import { TemplateTranslateService } from "../../services/template-translate.service";

interface ITemplateParams {
  allow_fullscreen?: string;
}

interface IYoutubeParams {
  /** TEMPLATE PARAMETER: allow_fullscreen. Default true */
  allowFullScreen?: boolean;
}

/**
 * The names of the Youtube-specific query params that will be added to the url
 * For a full list and explanation, see https://developers.google.com/youtube/player_parameters
 * */
const YOUTUBE_URL_QUERY_PARAMS: { [K in keyof YouTubeUrlQueryParamValues]: string } = {
  videoId: "v",
  color: "color",
  showFullscreenButton: "fs",
  interfaceLanguage: "hl",
  showRelatedVideos: "rel",
};

/** Possible values of the supported query params */
interface YouTubeUrlQueryParamValues {
  videoId: string;
  color: "red" | "white";
  showFullscreenButton: "0" | "1";
  interfaceLanguage: string; // 2-letter ISO 639-1 code
  showRelatedVideos: "0" | "1";
}

@Component({
  selector: "youtube",
  templateUrl: "./youtube.component.html",
  styleUrls: ["./youtube.component.scss"],
})
export class YoutubeComponent extends TemplateBaseComponent {
  constructor(
    private domSanitizer: DomSanitizer,
    private templateTranslateService: TemplateTranslateService
  ) {
    super();
  }

  public params = computed(() => this.parseParams(this.parameterList()));

  public src = computed(() => {
    const url = this.parseValue(this.value());
    if (url) {
      const urlWithParams = this.setUrlParams(url, this.params());
      return this.domSanitizer.bypassSecurityTrustResourceUrl(urlWithParams.toString());
    }
    return undefined;
  });

  private parseParams(parameterList: ITemplateParams): IYoutubeParams {
    // NOTE - param parsing takes full row not just parameterList
    // Still included as function arg to prompt re-evaluate if parameters change
    return { allowFullScreen: getBooleanParamFromTemplateRow(this._row, "allow_fullscreen", true) };
  }

  /** Validate template value field and convert to URL object **/
  private parseValue(value: any) {
    // Expect valid url. Don't specify domain as could start youtube.com, youtu.be, m.youtube.com, etc.
    // https://stackoverflow.com/a/70512384/5693245
    if (value && typeof value === "string" && value.startsWith("https://")) {
      const url = new URL(value);
      // only support urls that include video id through parameter (e.g. not youtu.be/12345678901)
      const videoId = url.searchParams.get(YOUTUBE_URL_QUERY_PARAMS.videoId);
      if (videoId) {
        url.searchParams.delete(YOUTUBE_URL_QUERY_PARAMS.videoId);
        // rewrite host and pathname to use youtube embed version
        url.host = "youtube.com";
        url.pathname = `/embed/${videoId}`;
        return url;
      }
    }
    console.error("[Youtube] Invalid value:", value);
  }

  /**
   * Update player parameters from authored
   * See https://developers.google.com/youtube/player_parameters
   * NOTE - these will be merged with any params passed with the url itself
   */
  private setUrlParams(url: URL, params: IYoutubeParams) {
    // Favour white over red for more theme compatibility
    this.setYouTubeParam(url, "color", "white");
    // hide the fullscreen button if allow_fullscreen is false
    this.setYouTubeParam(url, "showFullscreenButton", params.allowFullScreen ? "1" : "0");
    // Attempt to set the player's interface language to match the app language
    const languageCode = this.templateTranslateService.app_language_code;
    this.setYouTubeParam(url, "interfaceLanguage", languageCode);
    // Disable related videos (at least those from external channels)
    this.setYouTubeParam(url, "showRelatedVideos", "0");
    return url;
  }

  private setYouTubeParam = <K extends keyof YouTubeUrlQueryParamValues>(
    url: URL,
    key: K,
    value: YouTubeUrlQueryParamValues[K]
  ) => {
    const paramName = YOUTUBE_URL_QUERY_PARAMS[key];
    url.searchParams.set(paramName, value);
  };
}
