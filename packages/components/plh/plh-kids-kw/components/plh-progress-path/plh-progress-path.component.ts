import { Component, OnInit } from "@angular/core";
import { TemplateBaseComponent } from "src/app/shared/components/template/components/base";
import { TemplateTranslateService } from "src/app/shared/components/template/services/template-translate.service";
import { getStringParamFromTemplateRow } from "src/app/shared/utils";

interface IPlhProgressPathParams {
  /** TEMPLATE_PARAMETER: "background_image_asset". Used to set the progress path background */
  backgroundImageAsset: string;
}

@Component({
  selector: "plh-plh-progress-path",
  templateUrl: "./plh-progress-path.component.html",
  styleUrls: ["./plh-progress-path.component.scss"],
})
export class PlhProgressPathComponent extends TemplateBaseComponent implements OnInit {
  public svgPath: string;
  public svgViewBox: string;
  public width = `420px`;
  params: Partial<IPlhProgressPathParams> = {};

  constructor(public templateTranslateService: TemplateTranslateService) {
    super();
  }

  ngOnInit() {
    this.generateSVGPath();
    this.getParams();
  }

  private getParams() {
    this.params.backgroundImageAsset = getStringParamFromTemplateRow(
      this._row,
      "background_image_asset",
      null
    );
  }

  private generateSVGPath() {
    const curvedPath = () =>
      `
    M 92,58
    c 80,110 290,-30 310,150
    c -10,40 -90,100 -248,46
    c -160,-54 -180,270 40,204
    c 90,-36 140,0 210,80
    c -6,12 -40,50 -160,96
    v 0
    `.trim();

    this.svgPath = curvedPath();
    this.svgViewBox = `0 0 450 700`;
  }
}
