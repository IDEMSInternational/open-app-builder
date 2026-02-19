import { Component, computed, ElementRef, Input } from "@angular/core";
import { defineAuthorParameterSchema, TemplateBaseComponentWithParams } from "../base";
import { TemplateTranslateService } from "../../services/template-translate.service";
import type { FlowTypes } from "../../models";

const VARIANTS = [
  "default",
  "alternative",
  "card",
  "card-portrait",
  "compact",
  "flexible",
  "full",
  "information",
  "medium",
  "navigation",
  "short",
  "standard",
  "tall",
] as const;

const AuthorSchema = defineAuthorParameterSchema((coerce) => ({
  /**
   * The display variant of the button. Can be comma-separated or space-separated for multiple variants.
   * Supported variants:
   * - "default"
   * - "alternative"
   * - "card"
   * - "card-portrait"
   * - "compact"
   * - "flexible"
   * - "full"
   * - "information"
   * - "medium"
   * - "navigation"
   * - "short"
   * - "standard"
   * - "tall"
   * Default: "default"
   */
  variant: coerce.allowedValuesList(VARIANTS, ["default"]),
  /** Legacy style parameter. Use "variant" instead. Default 'information'. */
  style: coerce.string("information"),
  /** When true, button is disabled and greyed out. */
  disabled: coerce.boolean(false),
  /** Text alignment within the button. */
  text_align: coerce.allowedValues(["left", "centre", "right", null], null),
  /** Button alignment within its container. */
  button_align: coerce.allowedValues(["left", "centre", "right"], "centre"),
  /** The path to an icon asset. This will be displayed in the 'start' slot (left for LTR languages). */
  icon: coerce.string(""),
  /**
   * The path to a secondary icon asset,
   * which will be displayed in the 'end' slot (right for LTR languages).
   */
  icon_secondary_asset: coerce.string(""),
  /** The path to an image asset. */
  image_asset: coerce.string(""),
  /** Aligns the primary icon to the left or right. */
  icon_align: coerce.allowedValues(["left", "right"], "left"),
}));

/**
 * A general-purpose button component
 */
@Component({
  selector: "plh-button",
  templateUrl: "./button.component.html",
  styleUrls: ["./button.component.scss"],
  standalone: false,
})
export class TmplButtonComponent extends TemplateBaseComponentWithParams(AuthorSchema) {
  @Input() override set row(row: FlowTypes.TemplateRow) {
    super.row = row;
  }

  /** Style with two_columns logic applied */
  public style = computed(() => {
    const baseStyle = this.params().style;
    return `${baseStyle}${this.isTwoColumns() ? " two_columns" : ""}`.trim();
  });

  /** Space-separated string of variants for template use */
  public variantsString = computed(() => this.params().variant.join(" "));

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

  /** Determine if the button is inside a display group with the style "two_columns" */
  private isTwoColumns(): boolean {
    const displayGroupElement = this.elRef.nativeElement.closest(".display-group-wrapper");
    if (displayGroupElement) {
      return displayGroupElement.classList.contains("two_columns");
    } else {
      return false;
    }
  }
}
