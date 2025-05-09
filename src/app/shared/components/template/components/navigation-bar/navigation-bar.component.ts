import { Component, computed } from "@angular/core";
import { TemplateBaseComponent } from "../base";
import { getParamFromTemplateRow } from "src/app/shared/utils";
import { FlowTypes } from "packages/data-models";

interface INavigationBarParams {
  /** TEMPLATE PARAMETER: "button_list" */
  buttonList: INavigationBarButton[];
  /** TEMPLATE PARAMETER: "variant". Default: "text_primary_contrast" */
  variant: "text_primary_contrast" | "text_primary" | "background_primary" | "background_none";
}

interface INavigationBarButton {
  image: string | null;
  text: string | null;
  target_template: string | null;
  name: string | null;
}

@Component({
  selector: "plh-navigation-bar",
  templateUrl: "./navigation-bar.component.html",
  styleUrls: ["./navigation-bar.component.scss"],
})
export class TmplNavigationBarComponent extends TemplateBaseComponent {
  params = computed(() => this.getParams(this.parameterList()));

  getParams(authorParams: FlowTypes.TemplateRow["parameter_list"]): INavigationBarParams {
    return {
      buttonList: getParamFromTemplateRow(this._row, "button_list", []),
      variant: getParamFromTemplateRow(this._row, "variant", "text_primary_contrast")
        .split(",")
        .join(" "),
    };
  }
}
