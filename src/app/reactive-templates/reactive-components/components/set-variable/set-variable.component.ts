import { Component } from "@angular/core";
import { ROW_PARAMETERS, RowBaseComponent } from "../../row-base.component";
import { IAction } from "src/app/reactive-templates/services/action.registry";

@Component({
  selector: "oab-set-variable",
  template: "",
  styles: "",
  providers: [{ provide: ROW_PARAMETERS, useValue: null }],
})
export class SetVariableComponent extends RowBaseComponent<null> implements IAction {
  execute(): void {
    this.setExpression(this.row().value);
  }
}
