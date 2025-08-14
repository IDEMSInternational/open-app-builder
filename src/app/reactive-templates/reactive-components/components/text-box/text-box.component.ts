import { Component } from "@angular/core";
import { ROW_PARAMETERS, RowBaseComponent } from "../../row-base.component";
import { defineParameters, Parameter } from "../../parameters";
import { IonicModule } from "@ionic/angular";

const parameters = () =>
  defineParameters({
    disabled: new Parameter("disabled", false),
    isNumberInput: new Parameter("number_input", false),
    maxLength: new Parameter("max_length", -1),
    placeholder: new Parameter("placeholder", ""),
    prioritisePlaceholder: new Parameter("prioritise_placeholder", false),
    style: new Parameter("style", ""),
    textAlign: new Parameter("text_align", ""),
  });

@Component({
  selector: "oab-text-box",
  templateUrl: "./text-box.component.html",
  styleUrls: ["./text-box.component.scss"],
  standalone: true,
  imports: [IonicModule], // todo: ionic standalone does not seem to work.
  providers: [{ provide: ROW_PARAMETERS, useFactory: parameters }],
})
export class TextBoxComponent extends RowBaseComponent<ReturnType<typeof parameters>> {
  public async handleChange(value: any) {
    this.setValue(value);
  }
}
