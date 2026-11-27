import { Component } from "@angular/core";
import { TranslatedAssetPipe } from "src/app/shared/components/template/pipes/plh-asset.pipe";
import { defineParameters, Parameter } from "../../parameters";
import { ROW_PARAMETERS, RowBaseComponent } from "../../row-base.component";

const parameters = () =>
  defineParameters({
    style: new Parameter<string | null>("style", null),
  });

@Component({
  selector: "oab-image",
  templateUrl: "./image.component.html",
  styleUrls: ["./image.component.scss"],
  imports: [TranslatedAssetPipe],
  providers: [{ provide: ROW_PARAMETERS, useFactory: parameters }],
})
export class ImageComponent extends RowBaseComponent<ReturnType<typeof parameters>> {}
