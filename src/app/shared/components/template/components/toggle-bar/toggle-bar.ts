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
  /** TEMPLATE PARAMETER: "show_tick_and_cross" */
  showTickAndCross: boolean;
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
  /** TEMPLATE PARAMETER: "false_text". Label text to display when value is false */
  public falseText: IToggleParams["falseText"];
  /** TEMPLATE PARAMETER: "true_text". Label text to display when value is true */
  public trueText: IToggleParams["trueText"];
  /** TEMPLATE PARAMETER: "position". Default "left" */
  public position: IToggleParams["position"];
  /** TEMPLATE PARAMETER: "show_tick_and_cross" */
  public showTickAndCross: IToggleParams["showTickAndCross"];
  /** TEMPLATE PARAMETER: "icon_true_asset". Clickable icon to display when value is true */
  public iconTrue: IToggleParams["iconTrue"];
  /** TEMPLATE PARAMETER: "icon_false_asset". Clickable icon to display when value is false */
  public iconFalse: IToggleParams["iconFalse"];
  /** TEMPLATE PARAMETER: "style". Legacy, use "variant" instead. */
  style: IToggleParams["style"];
  /** TEMPLATE PARAMETER: "variant" */
  variant: IToggleParams["variant"];
  /** @ignore */
  variantIsCardPortrait: boolean;

  ngOnInit() {
    this.getParams();
  }

  /**
   * As its not possible to stop click events bubbling from the ionChange event,
   * use click handlers to handle state change
   */
  public async handleClick(e: Event) {
    e.stopImmediatePropagation();
    await this.setValue(!this._row.value);
    this.triggerActions("changed");
  }

  getParams() {
    this.falseText = getStringParamFromTemplateRow(this._row, "false_text", "");
    this.trueText = getStringParamFromTemplateRow(this._row, "true_text", "");
    this.position = getStringParamFromTemplateRow(
      this._row,
      "position",
      "left"
    ) as IToggleParams["position"];
    this.showTickAndCross = getBooleanParamFromTemplateRow(this._row, "show_tick_and_cross", true);
    this.style = getStringParamFromTemplateRow(this._row, "style", "");
    this.variant = getStringParamFromTemplateRow(this._row, "variant", "")
      .split(",")
      .join(" ") as IToggleParams["variant"];
    this.variantIsCardPortrait = this.variant.split(" ").includes("icon");
    this.iconTrue = getStringParamFromTemplateRow(this._row, "icon_true_asset", "");
    this.iconFalse = getStringParamFromTemplateRow(this._row, "icon_false_asset", "");
  }
}
