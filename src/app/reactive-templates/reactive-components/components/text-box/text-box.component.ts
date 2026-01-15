import { Component } from "@angular/core";
import { ROW_PARAMETERS, RowBaseComponent } from "../../row-base.component";
import { defineParameters, Parameter } from "../../parameters";
import { IonicModule } from "@ionic/angular";

const parameters = () =>
  defineParameters({
    disabled: new Parameter("disabled", false),
    numberInput: new Parameter("number_input", false), // todo: this looks like something that we could remove / replace
    maxLength: new Parameter("max_length", -1),
    placeholder: new Parameter("placeholder", ""),
    style: new Parameter("style", ""),
    textAlign: new Parameter("text_align", ""),
  });

@Component({
  selector: "oab-text-box",
  templateUrl: "./text-box.component.html",
  styleUrls: ["./text-box.component.scss"],
  imports: [IonicModule], // todo: ionic standalone does not seem to work.
  providers: [{ provide: ROW_PARAMETERS, useFactory: parameters }],
})
export class TextBoxComponent extends RowBaseComponent<ReturnType<typeof parameters>> {
  public async handleChange(value: any) {
    this.setExpression(value);
  }
}
