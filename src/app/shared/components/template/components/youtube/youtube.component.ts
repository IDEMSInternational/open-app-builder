import { Component, OnInit } from "@angular/core";
import { TemplateBaseComponent } from "../base";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import {
  getBooleanParamFromTemplateRow,
  getStringParamFromTemplateRow,
} from "src/app/shared/utils";
import { TemplateTranslateService } from "../../services/template-translate.service";

interface IYoutubeParams {
  /** TEMPLATE PARAMETER: video_id */
  videoId: string;
  /** TEMPLATE PARAMETER: allow_full_screen. Default true */
  allowFullScreen?: boolean;
}

@Component({
  selector: "youtube",
  templateUrl: "./youtube.component.html",
  styleUrls: ["./youtube.component.scss"],
})
export class YoutubeComponent extends TemplateBaseComponent implements OnInit {
  params: Partial<IYoutubeParams> = {};
  src: SafeResourceUrl;

  constructor(
    private domSanitizer: DomSanitizer,
    private templateTranslateService: TemplateTranslateService
  ) {
    super();
  }

  ngOnInit() {
    this.getParams();
    this.getYoutubeSrc();
  }

  private getParams() {
    this.params.videoId =
      this._row.value || getStringParamFromTemplateRow(this._row, "video_id", "");
    this.params.allowFullScreen = getBooleanParamFromTemplateRow(
      this._row,
      "allow_fullscreen",
      true
    );
  }

  private getYoutubeSrc() {
    const baseYoutubeUrl = `https://www.youtube.com/embed/${this.params.videoId}`;

    // See https://developers.google.com/youtube/player_parameters
    const youtubeQueryParams = {
      // Favour white over red for more theme compatibility
      color: "white",
      // hide the fullscreen button if allow_fullscreen is false
      fs: this.params.allowFullScreen ? "1" : "0",
      // Attempt to set the player's interface language to match the app language
      hl: this.templateTranslateService.app_language$.value,
      // Disable related videos (at least those from external channels)
      rel: "0",
    };

    const youtubeUrl = this.addQueryParamsToUrl(baseYoutubeUrl, youtubeQueryParams);
    this.src = this.domSanitizer.bypassSecurityTrustResourceUrl(youtubeUrl);
  }

  /** Add key/value query params to a url string */
  private addQueryParamsToUrl(url: string, params: { [key: string]: string }): string {
    const urlObj = new URL(url);
    Object.keys(params).forEach((key) => {
      urlObj.searchParams.set(key, params[key]);
    });
    return urlObj.toString();
  }
}
