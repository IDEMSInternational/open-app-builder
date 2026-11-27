import { Component } from "@angular/core";
import { TranslatedAssetPipe } from "src/app/shared/components/template/pipes/plh-asset.pipe";
import { defineParameters, Parameter } from "../../parameters";
import { ROW_PARAMETERS, RowBaseComponent } from "../../row-base.component";

const parameters = () =>
  defineParameters({
    style: new Parameter("style", ""),
    subtitlesSrc: new Parameter("subtitles_src", ""),
  });

@Component({
  selector: "oab-video",
  templateUrl: "./video.component.html",
  styleUrls: ["./video.component.scss"],
  imports: [TranslatedAssetPipe],
  providers: [{ provide: ROW_PARAMETERS, useFactory: parameters }],
})
export class VideoComponent extends RowBaseComponent<ReturnType<typeof parameters>> {}
