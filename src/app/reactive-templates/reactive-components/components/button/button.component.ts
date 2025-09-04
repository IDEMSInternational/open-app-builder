import { Component, computed, forwardRef, inject } from "@angular/core";
import { defineParameters, Parameter } from "../../parameters";
import { ROW_PARAMETERS, RowBaseComponent } from "../../row-base.component";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { TemplateTranslateService } from "src/app/shared/components/template/services/template-translate.service";
import { TemplatePipesModule } from "src/app/shared/components/template/pipes";
import { RowListComponent } from "../../row-list.component";

const parameters = () =>
  defineParameters({
    variant: new Parameter<
      | "default"
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
      | "tall"
    >("variant", "default"),
    style: new Parameter("style", "information"),
    disabled: new Parameter("disabled", false),
    textAlign: new Parameter<"left" | "centre" | "right">("text_align", "centre"),
    buttonAlign: new Parameter<"left" | "centre" | "right">("button_align", "centre"),
    icon: new Parameter("icon", null),
    iconSecondary: new Parameter("icon_secondary_asset", null),
    image: new Parameter("image_asset", null),
    iconAlign: new Parameter<"left" | "right">("icon_align", "left"),
  });

interface IVariantMap {
  cardPortrait?: boolean;
}

/**
 * A general-purpose button component
 */
@Component({
  selector: "oab-button",
  templateUrl: "./button.component.html",
  styleUrls: ["./button.component.scss"],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    TemplatePipesModule, // todo: make pipes standalone
    [forwardRef(() => RowListComponent)],
  ],
  providers: [{ provide: ROW_PARAMETERS, useFactory: parameters }],
})
export class ButtonComponent extends RowBaseComponent<ReturnType<typeof parameters>> {
  /** @ignore */
  public variantMap = computed(() => this.populateVariantMap(this.params.variant.value()));
  public templateTranslateService = inject(TemplateTranslateService);

  public handleClick() {
    if (this.params.disabled.value()) return;

    this.triggerActions("click");
  }

  private populateVariantMap(variant: string): IVariantMap {
    const variantArray = variant.split(" ");
    return {
      cardPortrait: variantArray.includes("card-portrait"),
    };
  }
}
