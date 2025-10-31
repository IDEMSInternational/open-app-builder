import { Component, input, Input, OnInit } from "@angular/core";
import { FlowTypes } from "src/app/shared/model";
import {
  getBooleanParamFromTemplateRow,
  getNumberParamFromTemplateRow,
  getStringParamFromTemplateRow,
  IAnswerListItem,
} from "src/app/shared/utils";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { ModalController } from "@ionic/angular";

@Component({
  selector: "combo-box-modal",
  templateUrl: "./combo-box-modal.component.html",
  styleUrls: ["./combo-box-modal.component.scss"],
})
export class ComboBoxModalComponent implements OnInit {
  public answerOptions = input.required<IAnswerListItem[]>();
  @Input() row: FlowTypes.TemplateRow;
  @Input() selectedValue: string;
  @Input() customAnswerSelected: boolean;
  @Input() style: string;
  @Input() optionsKey: string = "name";
  @Input() optionsValue: string = "text";
  formData: FormGroup | null;
  valuesFromListAnswers: IAnswerListItem[];
  textTitle: string | null;
  inputAllowed: boolean = false;
  form: FormGroup;
  inputPosition: boolean = false;
  maxLength: number = 30;
  placeholder: string = "";
  constructor(
    private fb: FormBuilder,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.getParams();
    this.calculateAnswer();
  }

  getParams() {
    this.textTitle = getStringParamFromTemplateRow(this.row, "text", null);
    this.inputAllowed = getBooleanParamFromTemplateRow(this.row, "input_allowed", false);
    this.inputPosition =
      getStringParamFromTemplateRow(this.row, "input_position", "bottom") === "top";
    this.maxLength = getNumberParamFromTemplateRow(this.row, "max_length", 30);
    this.placeholder = getStringParamFromTemplateRow(this.row, "answer_placeholder", "");
    if (this.formData) {
      this.form = this.formData;
    } else {
      this.buildForm();
    }
  }

  calculateAnswer() {
    if (!this.customAnswerSelected) {
      this.form.get("answer").setValue(this.selectedValue);
    } else {
      this.form.get("customAnswer").setValue(this.selectedValue);
    }
  }

  buildForm() {
    this.form = this.fb.group({
      answer: new FormControl(null, []),
    });
    if (this.inputAllowed) {
      this.form.addControl("customAnswer", new FormControl("", []));
    }
  }

  check(el) {
    if (this.form.get("answer").value === el[this.optionsKey]) {
      this.form.get("answer").setValue(null);
      this.closeModal({ customAnswerSelected: this.customAnswerSelected, answer: null });
    } else {
      this.form.get("answer").setValue(el[this.optionsKey]);
      if (this.inputAllowed) {
        this.form.get("customAnswer").setValue(null);
      }
      this.customAnswerSelected = false;
      this.closeModal({ customAnswerSelected: this.customAnswerSelected, answer: el });
    }
  }

  closeModal(value) {
    setTimeout(async () => {
      await this.modalController.dismiss(value);
    }, 50);
  }

  enterCustomAnswer() {
    if (this.form.get("customAnswer").value !== "") {
      const customAnswer: any = {};
      customAnswer[this.optionsValue] = this.form.get("customAnswer").value;
      customAnswer[this.optionsKey] = "other";
      if (this.customAnswerSelected) {
        this.customAnswerSelected = true;
        this.closeModal({
          customAnswerSelected: this.customAnswerSelected,
          answer: customAnswer,
        });
      } else {
        this.form.get("answer").setValue(null);
        this.customAnswerSelected = true;
        this.closeModal({
          customAnswerSelected: this.customAnswerSelected,
          answer: customAnswer,
        });
      }
    }
  }

  get customAnswerClass() {
    return this.customAnswerSelected ? "text-box-input checked-radion" : "text-box-input";
  }
}
