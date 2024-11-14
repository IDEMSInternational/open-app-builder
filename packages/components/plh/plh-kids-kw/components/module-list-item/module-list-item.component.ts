import { Component, OnInit } from "@angular/core";
import { FlowTypes } from "packages/data-models";
import { TemplateBaseComponent } from "src/app/shared/components/template/components/base";
import { TemplateTranslateService } from "src/app/shared/components/template/services/template-translate.service";
import {
  getBooleanParamFromTemplateRow,
  getStringParamFromTemplateRow,
} from "src/app/shared/utils";

interface IModuleListItemParams {
  /* TEMPLATE PARAMETER: "module_image_asset". The image attached to the module */
  moduleImageAsset: string | null;
  /* TEMPLATE PARAMETER: "text_transform". The format of the text on the module item. Default null */
  textTransform: "capitalise" | "uppercase" | null;
  /* TEMPLATE PARAMETER: "is_nav_item". Marks an item as navigable  in order to show the navigation image asset. Default "true"  */
  navItem: boolean;
  /* TEMPLATE PARAMETER: "is_locked". The boolean that marks the module as locked or unlocked */
  isLocked: boolean;
  /* TEMPLATE PARAMETER: "nav_image_asset". The navigation icon*/
  navImageAsset: string | null;
  /* TEMPLATE PARAMETER: "locked_image_asset". The locked icon*/
  lockedImageAsset: string | null;
}

@Component({
  selector: "plh-module-list-item",
  templateUrl: "./module-list-item.component.html",
  styleUrls: ["./module-list-item.component.scss"],
})
export class PlhModuleListItemComponent extends TemplateBaseComponent implements OnInit {
  params: Partial<IModuleListItemParams> = {};

  constructor(public templateTranslateService: TemplateTranslateService) {
    super();
  }

  ngOnInit() {
    this.getParams();
  }

  private getParams() {
    this.params.moduleImageAsset = getStringParamFromTemplateRow(
      this._row,
      "module_image_asset",
      ""
    );
    this.params.textTransform = getStringParamFromTemplateRow(this._row, "text_transform", null) as
      | "capitalise"
      | "uppercase";
    this.params.navItem = getBooleanParamFromTemplateRow(this._row, "is_nav_item", true);
    this.params.isLocked = getBooleanParamFromTemplateRow(this._row, "is_locked", false);
    this.params.navImageAsset = getStringParamFromTemplateRow(this._row, "nav_image_asset", null);
    this.params.lockedImageAsset = getStringParamFromTemplateRow(
      this._row,
      "locked_image_asset",
      null
    );
  }
}
