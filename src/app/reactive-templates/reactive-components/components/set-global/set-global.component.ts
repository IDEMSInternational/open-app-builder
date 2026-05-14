import { Component } from "@angular/core";
import { ROW_PARAMETERS, RowBaseComponent } from "../../row-base.component";
import { IAction } from "src/app/reactive-templates/services/action.registry";
import { StoreType } from "src/app/reactive-templates/stores/store";

@Component({
  selector: "oab-set-global",
  template: "",
  styles: "",
  providers: [{ provide: ROW_PARAMETERS, useValue: null }],
  standalone: false,
})
export class SetGlobalComponent extends RowBaseComponent<null> implements IAction {
  protected override storeType: StoreType = "global";

  async execute(): Promise<void> {
    this.setExpression(this.row().value);
  }
}
