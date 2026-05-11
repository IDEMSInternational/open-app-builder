import { Component } from "@angular/core";
import { RowBaseComponent } from "../../row-base.component";
import { IAction } from "src/app/reactive-templates/services/action.registry";
import { StoreType } from "src/app/reactive-templates/stores/store";

@Component({
  selector: "oab-set-global",
  template: "",
  styles: "",
  standalone: false,
})
export class SetGlobalComponent extends RowBaseComponent implements IAction {
  protected override storeType: StoreType = "global";

  async execute(): Promise<void> {
    this.setExpression(this.row().value);
  }
}
