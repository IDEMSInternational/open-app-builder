import { Component } from "@angular/core";
import { defineParameters, Parameter } from "../../parameters";
import { ROW_PARAMETERS, RowBaseComponent } from "../../row-base.component";
import { IonicModule } from "@ionic/angular";

const parameters = () =>
  defineParameters({
    options: new Parameter("options", [], "script"),
    optionsKey: new Parameter("options_key", "key"),
    optionsValue: new Parameter("options_value", "value"),
  });

@Component({
  selector: "oab-radio-list",
  templateUrl: "./radio-list.component.html",
  styleUrls: ["./radio-list.component.scss"],
  imports: [IonicModule],
  providers: [{ provide: ROW_PARAMETERS, useFactory: parameters }],
})
export class RadioListComponent extends RowBaseComponent<ReturnType<typeof parameters>> {
  public options = this.params.options.value;
  public optionsKey = this.params.optionsKey.value;
  public optionsValue = this.params.optionsValue.value;

  public async onChange(event: CustomEvent) {
    const value = event.detail.value;
    this.setExpression(value);
    this.triggerActions("changed");
  }
}
