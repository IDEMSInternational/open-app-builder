import { Component } from "@angular/core";
import { ReactiveBaseComponent } from "../../reactive-base.component";
import { Parameter, Parameters } from "../../parameters";
import { IonicModule } from "@ionic/angular";

const parameters: Parameters = {
  disabled: new Parameter<boolean>("disabled", false),
  isNumberInput: new Parameter<boolean>("number_input", false),
  maxLength: new Parameter<number>("max_length", -1),
  placeholder: new Parameter<string>("placeholder", ""),
  prioritisePlaceholder: new Parameter<boolean>("prioritise_placeholder", false),
  style: new Parameter<string>("style", ""),
  textAlign: new Parameter<string>("text_align", ""),
};

@Component({
  selector: "oab-text-box",
  templateUrl: "./text-box.component.html",
  styleUrls: ["./text-box.component.scss"],
  standalone: true,
  imports: [IonicModule], // todo: ionic standalone does not seem to work.
})
export class TextBoxComponent extends ReactiveBaseComponent {
  constructor() {
    super(parameters);
  }

  public async handleChange(value: any) {
    await this.setValue(value);
  }
}
