import { Component, OnInit } from "@angular/core";
import { Capacitor } from "@capacitor/core";
import { defineParameters, Parameter } from "../../parameters";
import { ROW_PARAMETERS, RowBaseComponent } from "../../row-base.component";
import { IonicModule } from "@ionic/angular";
import { TemplatePipesModule } from "src/app/shared/components/template/pipes";

const parameters = () =>
  defineParameters({
    variant: new Parameter<"" | "icon" | "in_button" | "ios" | "android">("variant", ""),
    style: new Parameter("style", ""),
    showIcons: new Parameter("show_icons", true),
    showTickAndCross: new Parameter("show_tick_and_cross", true),
    position: new Parameter<"left" | "center" | "right">("position", "left"),
    falseText: new Parameter("false_text", ""),
    trueText: new Parameter("true_text", ""),
    iconTrue: new Parameter("icon_true_asset", ""),
    iconFalse: new Parameter("icon_false_asset", ""),
  });

@Component({
  selector: "oab-toggle-bar",
  templateUrl: "./toggle-bar.html",
  styleUrls: ["./toggle-bar.scss"],
  imports: [IonicModule, TemplatePipesModule], // todo: ionic standalone does not seem to work.
  providers: [{ provide: ROW_PARAMETERS, useFactory: parameters }],
})
export class ToggleBarComponent
  extends RowBaseComponent<ReturnType<typeof parameters>>
  implements OnInit
{
  /**
   * The ion-toggle component uses "md" ("material design") and "ios" to refer to visual styles of the component
   * corresponding to the respective platforms. See docs here: https://ionicframework.com/docs/api/toggle
   */
  public platformVariant: "ios" | "md" = "ios";
  /** @ignore */
  public variantMap: { icon: boolean };

  ngOnInit() {
    super.ngOnInit();
    this.setPlatformVariant(this.params.variant.value());
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
    const variantArray = this.params.variant.value().split(" ");
    this.variantMap = {
      icon: variantArray.includes("icon"),
    };
  }
}
