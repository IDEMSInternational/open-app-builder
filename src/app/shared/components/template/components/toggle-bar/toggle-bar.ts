import { Component, OnInit } from "@angular/core";
import { Capacitor } from "@capacitor/core";
import { TemplateBaseComponent } from "../base";
import {
  getStringParamFromTemplateRow,
  getBooleanParamFromTemplateRow,
} from "src/app/shared/utils";

interface IToggleParams {
  /**
   * TEMPLATE PARAMETER: "variant". Setting "ios" or "android" will style the toggle to match the respective
   * platform, otherwise the default is to match the current device platform, using "android" on web.
   * */
  variant: "" | "icon" | "in_button" | "ios" | "android";
  /** TEMPLATE PARAMETER: "style". Legacy, use "variant" instead. */
  style: string;
  /** TEMPLATE PARAMETER: "show_icons". Display icons within toggle to represent enabled/disabled state. Default true. */
  showIcons: boolean;
  /** TEMPLATE PARAMETER: "show_tick_and_cross". Legacy, use "show-icons" instead */
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
export class TmplToggleBarComponent extends TemplateBaseComponent implements OnInit {
  params: Partial<IToggleParams> = {};
  /**
   * The ion-toggle component uses "md" ("material design") and "ios" to refer to visual styles of the component
   * corresponding to the respective platforms. See docs here: https://ionicframework.com/docs/api/toggle
   */
  platformVariant: "ios" | "md" = "ios";
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
    this.params.showIcons = getBooleanParamFromTemplateRow(this._row, "show_icons", true);
    this.params.style = getStringParamFromTemplateRow(this._row, "style", "");
    this.params.variant = getStringParamFromTemplateRow(this._row, "variant", "")
      .split(",")
      .join(" ") as IToggleParams["variant"];
    this.setPlatformVariant(this.params.variant);
    this.populateVariantMap();
    this.params.iconTrue = getStringParamFromTemplateRow(this._row, "icon_true_asset", "");
    this.params.iconFalse = getStringParamFromTemplateRow(this._row, "icon_false_asset", "");
  }

  /**
   * Use the platform variant explicitly set by the author,
   * otherwise default to "ios" on iOS, and "md" on Android and web
   * @param variantString A space-separated string of variants
   */
  private setPlatformVariant(variantString: string) {
    const variantArray = variantString.split(" ");

    if (variantArray.includes("ios")) {
      this.platformVariant = "ios";
    } else if (variantArray.includes("android")) {
      this.platformVariant = "md";
    } else {
      this.platformVariant = Capacitor.getPlatform() === "ios" ? "ios" : "md";
    }
  }

  private populateVariantMap() {
    const variantArray = this.params.variant.split(" ");
    this.variantMap = {
      icon: variantArray.includes("icon"),
    };
  }
}
