import { Component, Input, OnInit } from "@angular/core";
import { FlowTypes } from "../../../../model";
import {
  getBooleanParamFromTemplateRow,
  getNumberParamFromTemplateRow,
  getParamFromTemplateRow,
  getStringParamFromTemplateRow,
} from "../../../../utils";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { ModalController } from "@ionic/angular";

@Component({
  selector: "plh-ion-modal",
  templateUrl: "./combo-box-modal.component.html",
  styleUrls: ["./combo-box-modal.component.scss"],
})
export class ComboBoxModalComponent implements OnInit {
  @Input() row: FlowTypes.TemplateRow;
  @Input() template: FlowTypes.Template;
  @Input() localVariables: { [name: string]: any };
  @Input() selectedValue: string;
  @Input() customAnswerSelected: boolean;
  formData: FormGroup | null;
  listAnswers: string | null;
  valuesFromListAnswers: string[];
  textTitle: string | null;
  inputAllowed: boolean = false;
  form: FormGroup;
  inputPosition: boolean = false;
  maxLength: number = 30;
  placeholder: string = "";

  constructor(private fb: FormBuilder, private modalController: ModalController) {}

  ngOnInit() {
    this.getParams();
    this.calculateAnswer();
  }

  getParams() {
    this.listAnswers = getParamFromTemplateRow(this.row, "answer_list", null) as string;
    this.valuesFromListAnswers = this.listAnswers.split(",").filter((item) => item !== "");
    this.textTitle = getStringParamFromTemplateRow(this.row, "text", null);
    this.inputAllowed = getBooleanParamFromTemplateRow(this.row, "input_allowed", false);

    this.inputPosition =
      getStringParamFromTemplateRow(this.row, "input_position", "bottom") == "top";
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
    if (this.form.get("answer").value === el) {
      this.form.get("answer").setValue(null);
      this.closeModal({ customAnswerSelected: this.customAnswerSelected, answer: null });
    } else {
      this.form.get("answer").setValue(el);
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
      if (this.customAnswerSelected) {
        this.customAnswerSelected = true;
        this.closeModal({
          customAnswerSelected: this.customAnswerSelected,
          answer: this.form.get("customAnswer").value,
        });
      } else {
        this.form.get("answer").setValue(null);
        this.customAnswerSelected = true;
        this.closeModal({
          customAnswerSelected: this.customAnswerSelected,
          answer: this.form.get("customAnswer").value,
        });
      }
    }
  }

  get customAnswerClass() {
    return this.customAnswerSelected ? "text-box-input checked-radion" : "text-box-input";
  }
}
