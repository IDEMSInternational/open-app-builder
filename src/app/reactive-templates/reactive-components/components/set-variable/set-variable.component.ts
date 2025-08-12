import { Component } from "@angular/core";
import { ROW_PARAMETERS, RowBaseComponent } from "../../row-base.component";

@Component({
  selector: "oab-set-variable",
  templateUrl: "./set-variable.component.html",
  styleUrls: ["./set-variable.component.scss"],
  providers: [{ provide: ROW_PARAMETERS, useValue: null }],
})
export class SetVariableComponent extends RowBaseComponent<null> {}
