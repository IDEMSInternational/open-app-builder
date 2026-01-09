import { Component } from "@angular/core";
import { defineParameters, Parameter } from "../../parameters";
import { ROW_PARAMETERS, RowBaseComponent } from "../../row-base.component";
import { IonicModule } from "@ionic/angular";
import { TemplatePipesModule } from "src/app/shared/components/template/pipes";
import { TooltipDirective } from "src/app/shared/components/common/directives/tooltip.directive";

const parameters = () =>
  defineParameters({
    help: new Parameter("help", null),
    tooltipPosition: new Parameter("tooltip_position", "right"),
    textAlign: new Parameter<"left" | "right" | "center">("text_align", "left"),
    style: new Parameter("style", "tiny standard"),
    variant: new Parameter<"" | "header" | "section_banner" | "page_banner">("variant", ""),
  });

@Component({
  selector: "oab-title",
  templateUrl: "./title.component.html",
  styleUrls: ["./title.component.scss"],
  imports: [IonicModule, TemplatePipesModule, TooltipDirective], // todo: ionic standalone does not seem to work.
  providers: [{ provide: ROW_PARAMETERS, useFactory: parameters }],
})
export class TitleComponent extends RowBaseComponent<ReturnType<typeof parameters>> {}
