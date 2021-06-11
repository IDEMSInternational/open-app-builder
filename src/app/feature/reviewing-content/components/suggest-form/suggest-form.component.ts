import { Component, Input, OnInit } from "@angular/core";
import { FlowTypes } from "../../../../shared/model/flowTypes";

@Component({
  selector: "suggest-form",
  templateUrl: "suggest-form.component.html",
  styleUrls: ["suggest-form.component.scss"],
})
export class SuggestFormComponent implements OnInit {
  @Input() isComment = true;
  @Input() isSuggest = false;
  @Input() targetRow: FlowTypes.TemplateRow;

  public reviewingForm = {
    comment: "",
    currentValue: "",
    suggestChange: "",
  };

  constructor() {}

  ngOnInit() {}

  submit() {}
}
