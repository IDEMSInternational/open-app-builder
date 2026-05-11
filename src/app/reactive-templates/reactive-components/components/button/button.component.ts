import { Component, computed, forwardRef, inject } from "@angular/core";
import { defineAuthorParameterSchema, RowBaseComponentWithParams } from "../../row-base.component";

import { IonicModule } from "@ionic/angular";
import { TemplateTranslateService } from "src/app/shared/components/template/services/template-translate.service";
import { TemplatePipesModule } from "src/app/shared/components/template/pipes";
import { RowListComponent } from "../../row-list.component";

const AuthorSchema = defineAuthorParameterSchema((coerce) => ({
  variant: coerce.string("default"),
  style: coerce.string("information"),
  disabled: coerce.boolean(),
  text_align: coerce.allowedValues(["left", "centre", "right"], "centre"),
  button_align: coerce.allowedValues(["left", "centre", "right"], "centre"),
  icon: coerce.string(""),
  icon_secondary_asset: coerce.string(""),
  image_asset: coerce.string(""),
  icon_align: coerce.allowedValues(["left", "right"], "left"),
}));

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
  imports: [IonicModule, TemplatePipesModule, [forwardRef(() => RowListComponent)]],
})
export class ButtonComponent extends RowBaseComponentWithParams(AuthorSchema) {
  /** @ignore */
  public variantMap = computed(() => this.populateVariantMap(this.params().variant));
  public templateTranslateService = inject(TemplateTranslateService);

  public handleClick() {
    if (this.params().disabled) return;

    this.triggerActions("click");
  }

  private populateVariantMap(variant: string): IVariantMap {
    const variantArray = variant.split(" ");
    return {
      cardPortrait: variantArray.includes("card-portrait"),
    };
  }
}
