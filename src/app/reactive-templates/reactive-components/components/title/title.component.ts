import { Component } from "@angular/core";
import { defineAuthorParameterSchema, RowBaseComponentWithParams } from "../../row-base.component";
import { IonicModule } from "@ionic/angular";
import { TemplatePipesModule } from "src/app/shared/components/template/pipes";
import { TooltipDirective } from "src/app/shared/components/common/directives/tooltip.directive";

const AuthorSchema = defineAuthorParameterSchema((coerce) => ({
  help: coerce.string(""),
  tooltip_position: coerce.string("right"),
  text_align: coerce.allowedValues(["left", "right", "center"], "left"),
  style: coerce.string("tiny standard"),
  variant: coerce.allowedValues(["", "header", "section_banner", "page_banner"], ""),
}));

@Component({
  selector: "oab-title",
  templateUrl: "./title.component.html",
  styleUrls: ["./title.component.scss"],
  imports: [IonicModule, TemplatePipesModule, TooltipDirective], // todo: ionic standalone does not seem to work.
})
export class TitleComponent extends RowBaseComponentWithParams(AuthorSchema) {}
