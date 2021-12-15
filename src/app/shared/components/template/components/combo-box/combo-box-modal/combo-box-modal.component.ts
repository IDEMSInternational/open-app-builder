import { Component, Input, OnInit } from "@angular/core";
import { FlowTypes } from "src/app/shared/model";
import {
  getBooleanParamFromTemplateRow,
  getNumberParamFromTemplateRow,
  getParamFromTemplateRow,
  getStringParamFromTemplateRow,
} from "src/app/shared/utils";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { ModalController } from "@ionic/angular";

interface AnswerBody {
  name: string | null;
  text: string | null;
}

@Component({
  selector: "plh-ion-modal",
  templateUrl: "./combo-box-modal.component.html",
  styleUrls: ["./combo-box-modal.component.scss"],
})
export class ComboBoxModalComponent implements OnInit {
  @Input() row: FlowTypes.TemplateRow;
  @Input() template: FlowTypes.Template;
  @Input() selectedValue: string;
  @Input() customAnswerSelected: boolean;
  @Input() style: string;
  formData: FormGroup | null;
  valuesFromListAnswers: AnswerBody[];
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
    this.valuesFromListAnswers = this.convertToObject(
      getParamFromTemplateRow(this.row, "answer_list", null)
    );
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

  convertToObject(answers_list: string[]): AnswerBody[] {
    let answers: AnswerBody[] = [];
    if (answers_list) {
      answers_list.map((item) => {
        const obj: AnswerBody = {
          text: null,
          name: null,
        };
        const stringProperties = item.split("|");
        stringProperties.forEach((s) => {
          const [field, value] = s.split(":").map((v) => v.trim());
          if (field && value) {
            obj[field] = value;
          }
        });
        answers.push(obj);
      });
      return answers;
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
    if (this.form.get("answer").value === el.name) {
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
          answer: { text: this.form.get("customAnswer").value, name: "other" },
        });
      } else {
        this.form.get("answer").setValue(null);
        this.customAnswerSelected = true;
        this.closeModal({
          customAnswerSelected: this.customAnswerSelected,
          answer: { text: this.form.get("customAnswer").value, name: "other" },
        });
      }
    }
  }

  get customAnswerClass() {
    return this.customAnswerSelected ? "text-box-input checked-radion" : "text-box-input";
  }
}
