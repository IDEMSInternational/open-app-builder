import { Component } from "@angular/core";
import { Parameters, ReactiveBaseComponent } from "../../reactive-base.component";
import { max } from "date-fns";
import { style } from "@angular/animations";
import { text } from "stream/consumers";
import { IonicModule } from "@ionic/angular";

const parameters: Parameters = {
  disabled: { name: "disabled", value: false },
  isNumberInput: { name: "number_input", value: false },
  maxLength: { name: "max_length", value: -1 },
  placeholder: { name: "placeholder", value: "" },
  prioritisePlaceholder: { name: "prioritise_placeholder", value: false },
  style: { name: "style", value: "" },
  textAlign: { name: "text_align", value: "" },
};

@Component({
  selector: "oab-text-box",
  templateUrl: "./text-box.component.html",
  styleUrls: ["./text-box.component.scss"],
  standalone: true,
  imports: [IonicModule], // todo: ionic standalone doe snot seem to work.
})
export class TextBoxComponent extends ReactiveBaseComponent {
  constructor() {
    super(parameters);
  }

  public async handleChange(value: any) {
    await this.setValue(value);
  }
}
