import { Component, Input, OnInit } from "@angular/core";
import { FlowTypes } from "../../../../model";
import { getBooleanParamFromTemplateRow, getStringParamFromTemplateRow } from "../../../../utils";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { ModalController } from "@ionic/angular";

@Component({
  selector: "plh-ion-modal",
  templateUrl: "./ion-modal.component.html",
  styleUrls: ["./ion-modal.component.scss"]
})
export class IonModalComponent implements OnInit {
  @Input() row: FlowTypes.TemplateRow;
  @Input() template: FlowTypes.Template;
  @Input() localVariables: { [name: string]: any };
  @Input() formData: FormGroup | null;
  listAnswers: string | null;
  valuesFromListAnswers: string[];
  textTitle: string | null;
  inputAllowed: boolean = false;
  form: FormGroup;
  inputPosition: boolean = false;
  constructor(private fb: FormBuilder,
              private modalController: ModalController) {
  }

  ngOnInit() {
    this.getParams();
  }

  getParams() {
    this.listAnswers = getStringParamFromTemplateRow(this.row, "list_of_answers", null);
    this.textTitle = getStringParamFromTemplateRow(this.row, "text", null);
    this.inputAllowed = getBooleanParamFromTemplateRow(this.row, "input_allowed", false);
    this.inputPosition = getBooleanParamFromTemplateRow(this.row, 'input_position', false);
    this.valuesFromListAnswers = this.listAnswers ? this.listAnswers.split(";") : null;
    if (this.formData) {
      this.form = this.formData;
    } else {
      this.buildForm();
    }
  }

  buildForm() {
    this.form = this.fb.group({
      answer: new FormControl(null, [])
    });
    if (this.inputAllowed) {
      this.form.addControl("customAnswer", new FormControl("", []));
    }
  }

  check(el) {
    return this.form.get("answer").value === el ? this.form.get("answer").setValue(null) : this.closeModal();
  }

  closeModal() {
    this.form.disable();
    setTimeout(async () => {
      this.form.enable();
      await this.modalController.dismiss(this.form);
    }, 1000);
  }

  changeCustomAnswer() {
    return this.form.get("customAnswer").value.length > 0 ? this.form.get("answer").disable() : this.form.get("answer").enable();
  }

  get checkValidCustomAnswer() {
    return this.form.get("customAnswer").value !== "";
  }

}
