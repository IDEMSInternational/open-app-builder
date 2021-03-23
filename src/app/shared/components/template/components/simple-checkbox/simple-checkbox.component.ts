import { Component, Input, OnInit } from "@angular/core";
import { TemplateBaseComponent } from "../base";
import { FlowTypes, ITemplateRowProps } from "../../models";
import { TemplateContainerComponent } from "../../template-container.component";
import { getBooleanParamFromTemplateRow, getStringParamFromTemplateRow } from "../../../../utils";


@Component({
  selector: "plh-simple-checkbox",
  templateUrl: "./simple-checkbox.component.html",
  styleUrls: ["./simple-checkbox.component.scss"]
})

export class TmplSimpleCheckboxComponent extends TemplateBaseComponent implements ITemplateRowProps, OnInit {
  @Input() parent: TemplateContainerComponent;
  position: boolean;
  label_text: string | null;
  constructor() {
    super();
  }

  ngOnInit() {
    this.getParams();
  }

  getParams() {
    this.position = getStringParamFromTemplateRow(this._row, 'position', 'left') != 'left';
    this.label_text = getStringParamFromTemplateRow(this._row, 'label_text', null);
  }
}
