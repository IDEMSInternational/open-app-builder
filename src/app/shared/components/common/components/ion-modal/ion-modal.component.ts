import { Component, Input, OnInit } from "@angular/core";
import { FlowTypes } from "../../../../model";
import { getBooleanParamFromTemplateRow, getStringParamFromTemplateRow } from "../../../../utils";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

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
  noCheckedCssClass = "example";
  checkedCssClass = "example-checked";
  inputValue: string | null = "";
  form: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.getParams();
  }

  getParams() {
    this.listAnswers = getStringParamFromTemplateRow(this.row, "list_of_answers", null);
    this.textTitle = getStringParamFromTemplateRow(this.row, "text", null);
    this.inputAllowed = getBooleanParamFromTemplateRow(this.row, "input_allowed", false);
    console.log(this.inputAllowed)
    if (this.listAnswers) {
      this.valuesFromListAnswers = this.listAnswers.split(";");
      this.buildForm();
    } else {

    }
  }

  buildForm() {
    this.form = this.fb.group({
      answer: new FormControl(null, [])
    });
    if (this.inputAllowed) {
      this.form.addControl('customAnswer', new FormControl('', []))
    }
  }

  check(el) {
    return this.form.get('answer').value === el ? this.form.get('answer').setValue(null) : null;
  }
}
