import { Component, OnInit } from "@angular/core";
import { TemplateBaseComponent } from "../base";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import {
  getBooleanParamFromTemplateRow,
  getStringParamFromTemplateRow,
} from "src/app/shared/utils";

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

  constructor(private domSanitizer: DomSanitizer) {
    super();
  }

  ngOnInit() {
    this.getParams();
  }

  getParams() {
    this.params.videoId =
      this._row.value || getStringParamFromTemplateRow(this._row, "video_id", "");
    // The `?rel=0` param prevents showing related videos after the original video finishes
    // see https://developers.google.com/youtube/player_parameters
    this.src = this.domSanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${this.params.videoId}?rel=0`
    );
    this.params.allowFullScreen = getBooleanParamFromTemplateRow(
      this._row,
      "allow_fullscreen",
      true
    );
  }
}
