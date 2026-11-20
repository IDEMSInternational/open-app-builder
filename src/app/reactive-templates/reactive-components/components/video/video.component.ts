import { Component } from "@angular/core";
import { TemplatePipesModule } from "src/app/shared/components/template/pipes";
import { defineParameters, Parameter } from "../../parameters";
import { ROW_PARAMETERS, RowBaseComponent } from "../../row-base.component";

const parameters = () =>
  defineParameters({
    style: new Parameter("style", null),
    subtitlesSrc: new Parameter("subtitles_src", null),
  });

@Component({
  selector: "oab-video",
  templateUrl: "./video.component.html",
  imports: [TemplatePipesModule],
  providers: [{ provide: ROW_PARAMETERS, useFactory: parameters }],
})
export class VideoComponent extends RowBaseComponent<ReturnType<typeof parameters>> {}
