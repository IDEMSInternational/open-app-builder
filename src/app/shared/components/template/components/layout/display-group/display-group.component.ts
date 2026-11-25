import { Component, OnDestroy, OnInit } from "@angular/core";
import { TemplateBaseComponent } from "../../base";
import {
  getBooleanParamFromTemplateRow,
  getNumberParamFromTemplateRow,
  getStringParamFromTemplateRow,
} from "../../../../../utils";
import { NgStyle } from "@angular/common";
import { TemplateAssetService } from "../../../services/template-asset.service";
import { SystemBarsService } from "src/app/shared/services/system-bars/system-bars.service";
import {
  ISystemBarText,
  parseSystemBarText,
} from "src/app/shared/services/system-bars/system-bars.utils";

interface IDisplayGroupParams {
  /** TEMPLATE PARAMETER: "variant" */
  variant:
    | "box_gray"
    | "box_green"
    | "box_primary"
    | "box_secondary"
    | "box_white"
    | "dashed_box"
    | "inline_padding";
  /** TEMPLATE PARAMETER: "style". TODO: Various additional legacy styles, review and convert some to variants */
  style: "form" | "default" | string | null;
  /** TEMPLATE PARAMETER: "offset". Add a custom bottom margin */
  offset: number;
  /** TEMPLATE PARAMETER: "background_image_asset". Add a background to the display group */
  backgroundImageAsset: string;
  /** TEMPLATE PARAMETER: "background_image_position". Add a position to the background image */
  backgroundImagePosition: string;
  /** TEMPLATE PARAMETER: "sticky". Set to "top" or "bottom" to make the display group a sticky inline header/footer */
  sticky: "top" | "bottom" | null;
  /** TEMPLATE PARAMETER: "wrap". If true, content will wrap over multiple lines if there is not enough space */
  wrap: boolean;
  /**
   * TEMPLATE PARAMETER: "system_bar_text". Set to "light" or "dark" for the text and icons of a device
   * system bar shown over the group (status bar, or Android navigation bar), e.g. for a sticky group with
   * a background image. Otherwise they follow the background colour
   */
  systemBarText: ISystemBarText | null;
}

@Component({
  selector: "plh-tmpl-display-group",
  templateUrl: "./display-group.component.html",
  styleUrls: ["../../tmpl-components-common.scss", "./display-group.component.scss"],
  standalone: false,
})
export class TmplDisplayGroupComponent extends TemplateBaseComponent implements OnInit, OnDestroy {
  params: Partial<IDisplayGroupParams> = {};
  bgColor: string;
  type: "form" | "dashed_box" | "default";

  public backgroundImageStyles: NgStyle["ngStyle"] = {};

  constructor(
    private templateAssetService: TemplateAssetService,
    private systemBarsService: SystemBarsService
  ) {
    super();
  }

  ngOnInit() {
    this.getParams();
    this.makeStickyHostTransparent();
    if (this.params.systemBarText) this.systemBarsService.scheduleUpdate();
  }

  ngOnDestroy() {
    if (this.params.systemBarText) this.systemBarsService.scheduleUpdate();
  }

  public clickDisplayGroup() {
    this.triggerActions("click");
  }

  private getParams() {
    this.params.style = getStringParamFromTemplateRow(this._row, "style", "row");
    this.params.offset = getNumberParamFromTemplateRow(this._row, "offset", 0);
    this.params.variant = getStringParamFromTemplateRow(this._row, "variant", "")
      .split(",")
      .join(" ")
      .concat(" " + this.params.style) as IDisplayGroupParams["variant"];
    this.params.sticky = getStringParamFromTemplateRow(this._row, "sticky", null) as any;
    this.params.wrap = getBooleanParamFromTemplateRow(this._row, "wrap", false);
    this.params.systemBarText = parseSystemBarText(
      getStringParamFromTemplateRow(this._row, "system_bar_text", null)
    );
    this.type = this.getTypeFromStyles();
    this.backgroundImageStyles = this.getBackgroundImageStyles();
  }

  private getTypeFromStyles() {
    if (this.params.style?.includes("form") || this.params.variant?.includes("form")) return "form";
    if (this.params.style?.includes("dashed_box") || this.params.variant?.includes("dashed_box"))
      return "dashed_box";
    return "default";
  }

  private getBackgroundImageStyles() {
    // only generate background image styles if asset included
    const backgroundImageAsset = getStringParamFromTemplateRow(this._row, "background_image_asset");
    if (!backgroundImageAsset) return {};
    // retrieve the image asset url in the same way plh_asset pipe does
    // assign background position and size styles and return
    const url = this.templateAssetService.getTranslatedAssetPath(backgroundImageAsset);
    const backgroundImage = `url(${url})`;
    const backgroundPosition = getStringParamFromTemplateRow(
      this._row,
      "background_image_position",
      "top"
    );
    return { backgroundImage, backgroundPosition };
  }

  /**
   * As well as applying to the host element, as with all other components,
   * display-group styles are intentionally applied on the inner wrapper in the template.
   * For sticky groups, the dynamic host element can be rendered in a different place to the content,
   * so host-level background styles (from TemplateComponent.setStyleList) can cause visual issues.
   * Keep host transparent and preserve authored styling on the inner wrapper.
   */
  private makeStickyHostTransparent() {
    if (!this.params.sticky) return;

    const hostElement = this.parentTemplateComponentRef?.elRef?.nativeElement as
      | HTMLElement
      | undefined;
    if (!hostElement) return;
    hostElement.style.setProperty("background", "transparent");
    hostElement.style.setProperty("border", "none");
  }
}
