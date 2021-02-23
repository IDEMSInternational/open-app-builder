import { Component, Input, OnInit } from "@angular/core";
import { FlowTypes } from 'src/app/shared/model/flowTypes';
import { ITemplateComponent } from "../tmpl.component";
import { LocalVarsReplacePipe } from "../../local-vars-replace.pipe";
@Component({
  selector: 'plh-round-button',
  templateUrl: './round-icon-button.component.html',
  styleUrls: ['./round-icon-button.component.scss'],
})
export class RoundIconButtonComponent implements ITemplateComponent {
  @Input() row: FlowTypes.TemplateRow;
  @Input() template: FlowTypes.Template;
  @Input() localVariables: { [name: string]: any };
  LocalVarsReplacePipe = LocalVarsReplacePipe;

  onClick() {
    if (this.row && this.row.action_list) {
      for (let actionString of this.row.action_list) {
        let parts = actionString.split("|").map((part) => part.trim());
        let actionId = parts[0];
        switch (actionId) {
          case "set_value": this.setValue(parts[1], parts[2]);
        }
      }
    }
  }

  private setValue(name: string, value: string) {
    this.template._setLocalVariable(name, value);
  }
}
