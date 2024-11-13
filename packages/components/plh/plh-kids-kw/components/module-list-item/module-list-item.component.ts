import { Component, OnInit } from "@angular/core";
import { FlowTypes } from "packages/data-models";
import { TemplateBaseComponent } from "src/app/shared/components/template/components/base";
import {
  getBooleanParamFromTemplateRow,
  getStringParamFromTemplateRow,
} from "src/app/shared/utils";

interface IModuleListItemParams {
  /* TEMPLATE PARAMETER: "module_image_asset". The image attached to the module */
  moduleImageAsset: string | null;
  /* TEMPLATE PARAMETER: "module_alignment". The alignment of elements within the module item. Default "large" */
  moduleAlignment: "left" | "right";
  /* TEMPLATE PARAMETER: "text_transform". The format of the text on the module item. Default null */
  textTransform: "capitalise" | "uppercase" | null;
  /* TEMPLATE PARAMETER: "target_template". Points toward the page to be navigated to */
  targetTemplate: string | null;
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

  ngOnInit() {
    this.getParams();
  }

  private getParams() {
    this.params.moduleImageAsset = getStringParamFromTemplateRow(
      this._row,
      "module_image_asset",
      ""
    );
    this.params.moduleAlignment = getStringParamFromTemplateRow(
      this._row,
      "module_alignment",
      "left"
    ) as "left" | "right";
    this.params.textTransform = getStringParamFromTemplateRow(this._row, "text_transform", null) as
      | "capitalise"
      | "uppercase";
    this.params.targetTemplate = getStringParamFromTemplateRow(this._row, "target_template", null);
    this.params.isLocked = getBooleanParamFromTemplateRow(this._row, "is_locked", false);
    this.params.navImageAsset = getStringParamFromTemplateRow(this._row, "nav_image_asset", null);
    this.params.lockedImageAsset = getStringParamFromTemplateRow(
      this._row,
      "locked_image_asset",
      null
    );
  }
}
