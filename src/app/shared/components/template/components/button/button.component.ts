import { Component, computed, effect, ElementRef } from "@angular/core";
import { getStringParamFromTemplateRow, parseBoolean } from "src/app/shared/utils";
import { TemplateBaseComponent } from "../base";
import { TemplateTranslateService } from "../../services/template-translate.service";
import { FlowTypes } from "packages/data-models";

interface IButtonParams {
  /** TEMPLATE PARAMETER: "variant" */
  variant:
    | ""
    | "alternative"
    | "card"
    | "card-portrait"
    | "flexible"
    | "full"
    | "information"
    | "medium"
    | "navigation"
    | "short"
    | "standard"
    | "tall";
  /** TEMPLATE PARAMETER: "style". Legacy, use "variant" instead. */
  style: string;
  /** TEMPLATE PARAMETER: "disabled". If true, button is disabled and greyed out */
  disabled: boolean;
  /** TEMPLATE PARAMETER: "text_align" */
  textAlign: "left" | "centre" | "right";
  /** TEMPLATE PARAMETER: "button_align" */
  buttonAlign: "left" | "centre" | "right";
  /** TEMPLATE PARAMETER: "icon". The path to an icon asset. This will be displayed in the 'start' slot (left for LTR languages) */
  icon: string;
  /**
   * TEMPLATE PARAMETER: "icon_secondary_asset". The path to a secondary icon asset,
   * which will be displayed in the 'end' slot (right for LTR languages)
   * */
  iconSecondary: string;
  /** TEMPLATE PARAMETER: "image_asset". The path to an image asset */
  image: string;
  /** TEMPLATE PARAMETER: "icon_align". Aligns the Primary icon to the left or right */
  iconAlign: "left" | "right";
}

interface IVariantMap {
  cardPortrait?: boolean;
}

/**
 * A general-purpose button component
 */
@Component({
  selector: "plh-button",
  templateUrl: "./button.component.html",
  styleUrls: ["./button.component.scss"],
  standalone: false,
})
export class TmplButtonComponent extends TemplateBaseComponent {
  params = computed(() => this.getParams(this.parameterList()));
  /** @ignore */
  variantMap = computed(() => this.populateVariantMap(this.params().variant));

  /** @ignore */
  constructor(
    private elRef: ElementRef,
    public templateTranslateService: TemplateTranslateService
  ) {
    super();
  }

  public handleClick() {
    if (this.params().disabled) return;
    this.triggerActions("click");
  }

  private getParams(authorParams: FlowTypes.TemplateRow["parameter_list"]): IButtonParams {
    return {
      disabled: parseBoolean(this.parameterList().disabled),
      style: `${getStringParamFromTemplateRow(this._row, "style", "information")} ${
        this.isTwoColumns() ? "two_columns" : ""
      }` as any,
      variant: getStringParamFromTemplateRow(this._row, "variant", "")
        .split(",")
        .join(" ") as IButtonParams["variant"],
      image: getStringParamFromTemplateRow(this._row, "image_asset", null),
      textAlign: getStringParamFromTemplateRow(this._row, "text_align", null) as any,
      buttonAlign: getStringParamFromTemplateRow(this._row, "button_align", "center") as any,
      icon: getStringParamFromTemplateRow(this._row, "icon", null),
      iconSecondary: getStringParamFromTemplateRow(this._row, "icon_secondary_asset", null),
      iconAlign: getStringParamFromTemplateRow(this._row, "icon_align", "left") as any,
    };
  }

  /** Determine if the button is inside a display group with the style "two_columns" */
  private isTwoColumns(): boolean {
    const displayGroupElement = this.elRef.nativeElement.closest(".display-group-wrapper");
    if (displayGroupElement) {
      return displayGroupElement.classList.contains("two_columns");
    } else {
      return false;
    }
  }

  private populateVariantMap(variant: IButtonParams["variant"] = ""): IVariantMap {
    const variantArray = variant.split(" ");
    return {
      cardPortrait: variantArray.includes("card-portrait"),
    };
  }
}
