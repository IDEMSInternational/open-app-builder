import { Component, OnInit } from "@angular/core";
import { Capacitor } from "@capacitor/core";
import { defineAuthorParameterSchema, RowBaseComponentWithParams } from "../../row-base.component";
import { IonicModule } from "@ionic/angular";
import { TemplatePipesModule } from "src/app/shared/components/template/pipes";

const AuthorSchema = defineAuthorParameterSchema((coerce) => ({
  variant: coerce.string(""),
  style: coerce.string(""),
  show_icons: coerce.boolean(true),
  show_tick_and_cross: coerce.boolean(true),
  position: coerce.allowedValues(["left", "center", "right"], "left"),
  false_text: coerce.string(""),
  true_text: coerce.string(""),
  icon_true_asset: coerce.string(""),
  icon_false_asset: coerce.string(""),
}));

@Component({
  selector: "oab-toggle-bar",
  templateUrl: "./toggle-bar.html",
  styleUrls: ["./toggle-bar.scss"],
  imports: [IonicModule, TemplatePipesModule], // todo: ionic standalone does not seem to work.
})
export class ToggleBarComponent extends RowBaseComponentWithParams(AuthorSchema) implements OnInit {
  /**
   * The ion-toggle component uses "md" ("material design") and "ios" to refer to visual styles of the component
   * corresponding to the respective platforms. See docs here: https://ionicframework.com/docs/api/toggle
   */
  public platformVariant: "ios" | "md" = "ios";
  /** @ignore */
  public variantMap: { icon: boolean };

  ngOnInit() {
    super.ngOnInit();
    this.setPlatformVariant(this.params().variant);
    this.populateVariantMap();
  }

  /**
   * As its not possible to stop click events bubbling from the ionChange event,
   * use click handlers to handle state change
   */
  public handleClick(e: Event) {
    e.preventDefault();
    e.stopImmediatePropagation();
    this.setExpression(!this.value());
    this.triggerActions("click");
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
    const variantArray = this.params().variant.split(" ");
    this.variantMap = {
      icon: variantArray.includes("icon"),
    };
  }
}
