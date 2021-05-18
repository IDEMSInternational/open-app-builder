import { Component, Input, OnInit } from "@angular/core";
import { TemplateBaseComponent } from "../base";
import { ITemplateRowProps } from "../../models";
import { TemplateContainerComponent } from "../../template-container.component";
import { getStringParamFromTemplateRow } from "../../../../utils";

@Component({
  selector: "plh-simple-checkbox",
  templateUrl: "./simple-checkbox.component.html",
  styleUrls: ["./simple-checkbox.component.scss"],
})
export class TmplSimpleCheckboxComponent
  extends TemplateBaseComponent
  implements ITemplateRowProps, OnInit {
  @Input() parent: TemplateContainerComponent;
  position: boolean;
  label_text: string | null;
  style: string;
  constructor() {
    super();
  }

  ngOnInit() {
    this.getParams();
  }
  public async handleChange(isChecked: boolean) {
    await this.setValue(isChecked);
    this.triggerActions("changed");
  }

  getParams() {
    this.position = getStringParamFromTemplateRow(this._row, "position", "left") !== "left";
    this.label_text = getStringParamFromTemplateRow(this._row, "label_text", null);
    this.style = getStringParamFromTemplateRow(this._row, "style", "");
  }
}
