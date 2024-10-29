import { Component, OnInit } from "@angular/core";
import { TemplateBaseComponent } from "../base";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import {
  getBooleanParamFromTemplateRow,
  addQueryParamsToUrl,
  getQueryParam,
  extractTwoLetterLanguageCode,
} from "src/app/shared/utils";
import { TemplateTranslateService } from "../../services/template-translate.service";

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
export class YoutubeComponent extends TemplateBaseComponent implements OnInit {
  params: Partial<IYoutubeParams> = {};
  src: SafeResourceUrl;
  videoId: string;

  constructor(
    private domSanitizer: DomSanitizer,
    private templateTranslateService: TemplateTranslateService
  ) {
    super();
  }

  ngOnInit() {
    this.getParams();
    if (this.videoId) {
      this.getYoutubeSrc();
    }
  }

  private getParams() {
    if (this.value()) {
      try {
        // Extract the video ID from the YouTube URL – this means any query params from
        // original URL are ignored (generally desirable)
        this.videoId = getQueryParam(this.value(), YOUTUBE_VIDEO_ID_QUERY_PARAM);
      } catch {
        console.error(`[YouTube Component] "${this.value()}" is not a valid YouTube URL`);
      }
    } else {
      console.error("[YouTube Component] A valid YouTube URL must be provided as value");
    }
    this.params.allowFullScreen = getBooleanParamFromTemplateRow(
      this._row,
      "allow_fullscreen",
      true
    );
  }

  private getYoutubeSrc() {
    const baseYoutubeUrl = `https://www.youtube.com/embed/${this.videoId}`;

    // See https://developers.google.com/youtube/player_parameters
    const youtubeQueryParams = {
      // Favour white over red for more theme compatibility
      color: "white",
      // hide the fullscreen button if allow_fullscreen is false
      fs: this.params.allowFullScreen ? "1" : "0",
      // Attempt to set the player's interface language to match the app language
      hl: extractTwoLetterLanguageCode(this.templateTranslateService.app_language$.value),
      // Disable related videos (at least those from external channels)
      rel: "0",
    };

    const youtubeUrl = addQueryParamsToUrl(baseYoutubeUrl, youtubeQueryParams);
    this.src = this.domSanitizer.bypassSecurityTrustResourceUrl(youtubeUrl);
  }
}
