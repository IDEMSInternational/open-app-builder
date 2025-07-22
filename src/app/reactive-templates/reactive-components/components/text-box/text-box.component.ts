import { Component } from "@angular/core";
import { Parameters, ReactiveBaseComponent } from "../../reactive-base.component";
import { max } from "date-fns";
import { style } from "@angular/animations";
import { text } from "stream/consumers";
import { VariableStore } from "src/app/reactive-templates/stores/variable-store";
import { IonicModule } from "@ionic/angular";
import { RowService } from "src/app/reactive-templates/services/row-service";

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
  constructor(variableStore: VariableStore, rowService: RowService) {
    super(variableStore, parameters, rowService);
  }

  public async handleChange(value: any) {
    await this.setValue(value);
  }
}
