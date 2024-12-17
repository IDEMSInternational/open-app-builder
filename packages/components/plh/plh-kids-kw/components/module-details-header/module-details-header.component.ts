import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { TemplateBaseComponent } from "src/app/shared/components/template/components/base";
import { TemplateTranslateService } from "src/app/shared/components/template/services/template-translate.service";
import {
  getBooleanParamFromTemplateRow,
  getStringParamFromTemplateRow,
} from "src/app/shared/utils";

interface IModuleHeaderParams {
  backgroundImageAsset?: string;
  moduleImageAsset?: string;
  hideBackButton?: boolean;
}
@Component({
  selector: "plh-module-details-header",
  templateUrl: "./module-details-header.component.html",
  styleUrls: ["./module-details-header.component.scss"],
})
export class PlhModuleDetailsHeaderComponent extends TemplateBaseComponent implements OnInit {
  params: Partial<IModuleHeaderParams> = {};

  constructor(
    public templateTranslateService: TemplateTranslateService,
    private location: Location
  ) {
    super();
  }

  ngOnInit() {
    this.getParams();
  }

  public handleBackButtonClick() {
    this.location.back();
  }

  private getParams() {
    this.params.backgroundImageAsset = getStringParamFromTemplateRow(
      this._row,
      "background_image_asset",
      null
    );
    this.params.moduleImageAsset = getStringParamFromTemplateRow(
      this._row,
      "module_image_asset",
      null
    );
    this.params.hideBackButton = getBooleanParamFromTemplateRow(
      this._row,
      "hide_back_button",
      false
    );
  }
}
