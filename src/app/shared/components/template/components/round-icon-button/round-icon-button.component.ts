import { AfterViewInit, Component, computed, ElementRef, inject } from "@angular/core";
import { defineAuthorParameterSchema, TemplateBaseComponentWithParams } from "../base";

const VARIANTS = [
  "alternative",
  "category",
  "dark_orange",
  "get_me_going",
  "home_screen",
  "information",
  "make_me_smile",
  "module",
  "navigation",
  "no-background",
  "options",
  "orange",
  "primary_light",
  "standard",
  "yellow",
] as const;

const AuthorSchema = defineAuthorParameterSchema((coerce) => ({
  /**
   * The display variant of the button. Can be comma-separated or space-separated for multiple variants.
   * Supported variants:
   * - "alternative"
   * - "category"
   * - "dark_orange"
   * - "get_me_going"
   * - "home_screen"
   * - "information"
   * - "make_me_smile"
   * - "module"
   * - "navigation"
   * - "no-background"
   * - "options"
   * - "orange"
   * - "primary_light"
   * - "standard"
   * - "yellow"
   */
  variant: coerce.allowedValuesList(VARIANTS, []),
  /** Legacy style parameter. Use "variant" instead. Default 'information'. */
  style: coerce.string("information"),
  /** When true, button is disabled and greyed out. */
  disabled: coerce.boolean(false),
  /** The path to an icon asset, or the name of an ion-icon. */
  icon_src: coerce.string(""),
  /** Text displayed below the icon. */
  text: coerce.string(""),
  /** Button alignment within its container. */
  button_align: coerce.allowedValues(["left", "center", "right", "centre"], "center"),
}));

@Component({
  selector: "plh-round-button",
  templateUrl: "./round-icon-button.component.html",
  styleUrls: ["../button/button.component.scss", "./round-icon-button.component.scss"],
  standalone: false,
})
export class RoundIconButtonComponent
  extends TemplateBaseComponentWithParams(AuthorSchema)
  implements AfterViewInit
{
  private elRef = inject(ElementRef);

  /** Space-separated string of variants for template use */
  public variantsString = computed(() => this.params().variant.join(" "));

  public isHomeScreen = computed(
    () =>
      this.params().style.includes("home_screen") || this.params().variant.includes("home_screen")
  );

  /** True when icon_src is an asset path rather than an ion-icon name */
  public isCustomIcon = computed(() => this.params().iconSrc.includes("/"));

  public isDisabled = computed(() => !!(this.params().disabled || this.rowSignal()?.disabled));

  ngAfterViewInit() {
    const el = this.elRef.nativeElement.closest(".display-group-wrapper");
    if (el && el.classList.value.includes("navigation")) {
      this.elRef.nativeElement.parentElement.parentElement.style.setProperty("flex", "0");
    }
  }

  onClick(event: Event) {
    this.triggerActions("click");
    event.stopPropagation();
  }
}
