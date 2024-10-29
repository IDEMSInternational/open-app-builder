import { Component, computed } from "@angular/core";
import { TemplateBaseComponent } from "../base";
import { DomSanitizer } from "@angular/platform-browser";
import { extractTwoLetterLanguageCode, getBooleanParamFromTemplateRow } from "src/app/shared/utils";
import { TemplateTranslateService } from "../../services/template-translate.service";

interface ITemplateParams {
  allow_full_screen?: string;
}

interface IYoutubeParams {
  /** TEMPLATE PARAMETER: allow_full_screen. Default true */
  allowFullScreen?: boolean;
}

/** The name of the query param in a YouTube URL that is used to specify the video ID */
const YOUTUBE_VIDEO_ID_QUERY_PARAM = "v";

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
      const videoId = url.searchParams.get(YOUTUBE_VIDEO_ID_QUERY_PARAM);
      if (videoId) {
        url.searchParams.delete(YOUTUBE_VIDEO_ID_QUERY_PARAM);
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
    url.searchParams.set("color", "white");
    // hide the fullscreen button if allow_fullscreen is false
    url.searchParams.set("fs", params.allowFullScreen ? "1" : "0");
    // Attempt to set the player's interface language to match the app language
    const languageCode = extractTwoLetterLanguageCode(
      this.templateTranslateService.app_language$.value
    );
    url.searchParams.set("hl", languageCode);
    // Disable related videos (at least those from external channels)
    url.searchParams.set("rel", "0");
    return url;
  }
}
