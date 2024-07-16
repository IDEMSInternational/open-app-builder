import { Component, OnInit } from "@angular/core";
import { TemplateBaseComponent } from "../base";
import { ITemplateRowProps } from "../../models";
import {
  getStringParamFromTemplateRow,
  getBooleanParamFromTemplateRow,
} from "src/app/shared/utils";

interface IToggleParams {
  /** TEMPLATE PARAMETER: "variant" */
  variant: "" | "icon" | "in_button";
  /** TEMPLATE PARAMETER: "style". Legacy, use "variant" instead. */
  style: string;
  /** TEMPLATE PARAMETER: "show_tick_and_cross". Legacy, use "show-icons" instead */
  showTickAndCross: boolean;
  showIcons: boolean;
  /** TEMPLATE PARAMETER: "position". Default "left" */
  position: "left" | "center" | "right";
  /** TEMPLATE PARAMETER: "false_text". Label text to display when value is false */
  falseText: string;
  /** TEMPLATE PARAMETER: "true_text". Label text to display when value is true */
  trueText: string;
  /** TEMPLATE PARAMETER: "icon_true_asset". Clickable icon to display when value is true */
  iconTrue: string;
  /** TEMPLATE PARAMETER: "icon_false_asset". Clickable icon to display when value is false */
  iconFalse: string;
}

@Component({
  selector: "plh-tmpl-toggle-bar",
  templateUrl: "./toggle-bar.html",
  styleUrls: ["./toggle-bar.scss"],
})
export class TmplToggleBarComponent
  extends TemplateBaseComponent
  implements ITemplateRowProps, OnInit
{
  params: Partial<IToggleParams> = {};
  /** @ignore */
  variantMap: { icon: boolean };

  ngOnInit() {
    this.getParams();
  }

  /**
   * As its not possible to stop click events bubbling from the ionChange event,
   * use click handlers to handle state change
   */
  public async handleClick(e: Event) {
    e.preventDefault();
    e.stopImmediatePropagation();
    await this.setValue(!this._row.value);
    this.triggerActions("changed");
  }

  getParams() {
    this.params.falseText = getStringParamFromTemplateRow(this._row, "false_text", "");
    this.params.trueText = getStringParamFromTemplateRow(this._row, "true_text", "");
    this.params.position = getStringParamFromTemplateRow(
      this._row,
      "position",
      "left"
    ) as IToggleParams["position"];
    this.params.showTickAndCross = getBooleanParamFromTemplateRow(
      this._row,
      "show_tick_and_cross",
      true
    );
    this.params.style = getStringParamFromTemplateRow(this._row, "style", "");
    this.params.variant = getStringParamFromTemplateRow(this._row, "variant", "")
      .split(",")
      .join(" ") as IToggleParams["variant"];
    this.populateVariantMap();
    this.params.iconTrue = getStringParamFromTemplateRow(this._row, "icon_true_asset", "");
    this.params.iconFalse = getStringParamFromTemplateRow(this._row, "icon_false_asset", "");
  }

  private populateVariantMap() {
    const variantArray = this.params.variant.split(" ");
    this.variantMap = {
      icon: variantArray.includes("icon"),
    };
  }
}
