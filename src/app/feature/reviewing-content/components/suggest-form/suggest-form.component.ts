import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { FlowTypes } from "../../../../shared/model/flowTypes";

@Component({
  selector: "suggest-form",
  templateUrl: "suggest-form.component.html",
  styleUrls: ["suggest-form.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuggestFormComponent {
  public row: FlowTypes.TemplateRow;
  @Input() isComment = true;
  @Input() isSuggest = false;
  @Input() isInPopUp = false;

  @Input() set targetRow(row: FlowTypes.TemplateRow) {
    this.row = row;
    this.reviewingForm.currentValue = row?.value;
  }

  public reviewingForm = {
    comment: "",
    currentValue: "",
    suggestChange: "",
  };

  constructor(private modalCtrl: ModalController) {}

  submit() {
    console.log(this.reviewingForm);
    if (this.isInPopUp) {
      this.modalCtrl.dismiss();
    }
  }
}
