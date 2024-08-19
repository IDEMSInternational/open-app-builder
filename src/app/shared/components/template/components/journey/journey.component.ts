import { Component, OnInit } from "@angular/core";
import { TemplateBaseComponent } from "../base";
import { getStringParamFromTemplateRow } from "src/app/shared/utils";

interface IJourneyParams {
  /** TEMPLATE PARAMETER: path_segment_asset */
  pathSegmentAsset: string;
}
@Component({
  selector: "plh-journey",
  templateUrl: "./journey.component.html",
  styleUrls: ["./journey.component.scss"],
})
export class TmplJourneyComponent extends TemplateBaseComponent implements OnInit {
  params: Partial<IJourneyParams> = {};

  ngOnInit() {
    this.getParams();
  }

  getParams() {
    this.params.pathSegmentAsset = getStringParamFromTemplateRow(
      this._row,
      "path_segment_asset",
      ""
    );
  }
}
