import { Component, computed } from "@angular/core";
import { FlowTypes } from "packages/data-models";
import { TemplateBaseComponent } from "src/app/shared/components/template/components/base";
import { TemplateTranslateService } from "src/app/shared/components/template/services/template-translate.service";
import {
  getBooleanParamFromTemplateRow,
  getStringParamFromTemplateRow,
} from "src/app/shared/utils";

interface IModuleListItemParams {
  /* TEMPLATE PARAMETER: "completed". Apply "completed" styling */
  completed?: boolean;
  /* TEMPLATE PARAMETER: "highlighted". Apply "highlighted" styling */
  highlighted?: boolean;
  /* TEMPLATE PARAMETER: "is_locked". The boolean that marks the module as locked or unlocked */
  isLocked?: boolean;
  /* TEMPLATE PARAMETER: "locked_image_asset". The locked icon*/
  lockedImageAsset?: string;
  /* TEMPLATE PARAMETER: "module_image_asset". The image attached to the module */
  moduleImageAsset?: string;
  /* TEMPLATE PARAMETER: "nav_image_asset". The navigation icon*/
  navImageAsset?: string;
  /* TEMPLATE PARAMETER: "variant" */
  variant?: "default" | "circle";
  /* TEMPLATE PARAMETER: "background_color". This is used to define background colour of the item */
  background?: string;
}

@Component({
  selector: "plh-module-list-item",
  templateUrl: "./module-list-item.component.html",
  styleUrls: ["./module-list-item.component.scss"],
})
export class PlhModuleListItemComponent extends TemplateBaseComponent {
  params = computed(() => this.getParams(this.parameterList()));

  constructor(public templateTranslateService: TemplateTranslateService) {
    super();
  }

  public handleClick() {
    if (this.params().isLocked) return;
    this.triggerActions("click");
  }

  private getParams(authorParams: FlowTypes.TemplateRow["parameter_list"]): IModuleListItemParams {
    return {
      moduleImageAsset: getStringParamFromTemplateRow(this._row, "module_image_asset", ""),
      isLocked: getBooleanParamFromTemplateRow(this._row, "is_locked", false),
      navImageAsset: getStringParamFromTemplateRow(this._row, "nav_image_asset", null),
      lockedImageAsset: getStringParamFromTemplateRow(this._row, "locked_image_asset", null),
      highlighted: getBooleanParamFromTemplateRow(this._row, "highlighted", false),
      completed: getBooleanParamFromTemplateRow(this._row, "completed", false),
      variant: getStringParamFromTemplateRow(
        this._row,
        "variant",
        "default"
      ) as IModuleListItemParams["variant"],
      background: getStringParamFromTemplateRow(this._row, "background", null),
    };
  }
}
