import { Component, OnInit } from "@angular/core";
import { TemplateBaseComponent } from "../base";
import { getStringParamFromTemplateRow } from "src/app/shared/utils";

interface IProgressPathParams {
  /** TEMPLATE PARAMETER: path_segment_asset */
  pathSegmentAsset: string;
}
@Component({
  selector: "plh-progress-path",
  templateUrl: "./progress-path.component.html",
  styleUrls: ["./progress-path.component.scss"],
})
export class TmplProgressPathComponent extends TemplateBaseComponent implements OnInit {
  params: Partial<IProgressPathParams> = {};

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
