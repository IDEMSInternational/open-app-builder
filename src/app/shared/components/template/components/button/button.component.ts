import { Component, ElementRef, OnInit } from "@angular/core";
import {
  getStringParamFromTemplateRow,
  getBooleanParamFromTemplateRow,
} from "src/app/shared/utils";
import { TemplateBaseComponent } from "../base";

interface IButtonParams {
  /** TEMPLATE PARAMETER: "variant" */
  variant:
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
  /** TEMPLATE PARAMETER: "icon". The path to an icon asset */
  icon: string;
  /** TEMPLATE PARAMETER: "image_asset". The path to an image asset */
  image: string;
  /** TEMPLATE PARAMETER: "icon_position". The alignment of the icon on the button */
  iconPosition: "left" | "right";
}

/**
 * A general-purpose button component
 */
@Component({
  selector: "plh-button",
  templateUrl: "./button.component.html",
  styleUrls: ["./button.component.scss"],
})
export class TmplButtonComponent extends TemplateBaseComponent implements OnInit {
  params: Partial<IButtonParams> = {};
  /** @ignore */
  variantMap: { cardPortrait: boolean };

  /** @ignore */
  constructor(private elRef: ElementRef) {
    super();
  }

  ngOnInit() {
    this.getParams();
  }

  private getParams() {
    this.params.style = `${getStringParamFromTemplateRow(this._row, "style", "information")} ${
      this.isTwoColumns() ? "two_columns" : ""
    }` as any;
    this.params.variant = getStringParamFromTemplateRow(this._row, "variant", "")
      .split(",")
      .join(" ") as IButtonParams["variant"];
    this.populateVariantMap();
    this.params.disabled = getBooleanParamFromTemplateRow(this._row, "disabled", false);
    this.params.image = getStringParamFromTemplateRow(this._row, "image_asset", null);
    if (this._row.disabled) {
      this.params.disabled = true;
    }
    this.params.textAlign = getStringParamFromTemplateRow(this._row, "text_align", null) as any;
    this.params.buttonAlign = getStringParamFromTemplateRow(
      this._row,
      "button_align",
      "center"
    ) as any;
    this.params.icon = getStringParamFromTemplateRow(this._row, "icon", null);
    this.params.iconPosition = getStringParamFromTemplateRow(
      this._row,
      "icon_position",
      "left"
    ) as any;
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

  private populateVariantMap() {
    const variantArray = this.params.variant.split(" ");
    this.variantMap = {
      cardPortrait: variantArray.includes("card-portrait"),
    };
  }
}
