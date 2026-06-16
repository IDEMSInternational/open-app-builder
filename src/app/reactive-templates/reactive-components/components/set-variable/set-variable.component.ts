import { Component } from "@angular/core";
import { RowBaseComponent } from "../../row-base.component";
import { IAction } from "src/app/reactive-templates/services/action.registry";

@Component({
  selector: "oab-set-variable",
  template: "",
  styles: "",
  standalone: false,
})
export class SetVariableComponent extends RowBaseComponent() implements IAction {
  async execute(): Promise<void> {
    this.setExpression(this.row().value);
  }
}
