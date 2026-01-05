import { Component } from "@angular/core";
import { ROW_PARAMETERS, RowBaseComponent } from "../../row-base.component";

@Component({
  selector: "oab-set-variable",
  template: "",
  styles: "",
  providers: [{ provide: ROW_PARAMETERS, useValue: null }],
  standalone: false,
})
export class SetVariableComponent extends RowBaseComponent<null> {}
