import { Component, EventEmitter, Output, input } from "@angular/core";
import { IAnswerOption } from "src/app/shared/utils";

@Component({
  selector: "combo-box-dropdown",
  templateUrl: "./combo-box-dropdown.component.html",
  styleUrls: ["./combo-box-dropdown.component.scss"],
  standalone: false,
})
export class ComboBoxDropdownComponent {
  public value = input<any>();
  public placeholder = input<string>("");
  public disabled = input<boolean>(false);
  public answerOptions = input.required<IAnswerOption[]>();
  public optionsKey = input<string>("name");
  public optionsValue = input<string>("text");

  @Output()
  public selectionChange = new EventEmitter<any>();

  public onIonSelectChange(selectedValue: any) {
    this.selectionChange.emit(selectedValue);
  }
}
