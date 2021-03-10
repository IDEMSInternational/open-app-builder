import { Component, Input, OnInit } from "@angular/core";
import { FlowTypes } from "../../../../model";
import { getBooleanParamFromTemplateRow, getStringParamFromTemplateRow } from "../../../../utils";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "plh-ion-modal",
  templateUrl: "./ion-modal.component.html",
  styleUrls: ["./ion-modal.component.scss"]
})
export class IonModalComponent implements OnInit {
  @Input() row: FlowTypes.TemplateRow;
  @Input() template: FlowTypes.Template;
  @Input() localVariables: { [name: string]: any };
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
    if (this.listAnswers) {
      this.valuesFromListAnswers = this.listAnswers.replace(/\s/g, "").split(";");
      this.buildForm()
    } else {

    }
  }

  buildForm() {
    this.form = this.fb.group({
      checkboxes: [this.valuesFromListAnswers ? this.valuesFromListAnswers : null, []]
    });
    console.log(this.form)
  }
}
