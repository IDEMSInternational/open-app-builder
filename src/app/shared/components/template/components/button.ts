import { Component, Input, OnInit } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { FlowTypes } from 'src/app/shared/model/flowTypes';
import { ITemplateComponent } from "./tmpl.component";

@Component({
  selector: "plh-tmpl-button",
  template: `<ion-button (click)="onClick()">{{row.value | localVarsReplace: localVariables}}</ion-button>`,
  styleUrls: ["./tmpl-components-common.scss"]
})
export class TmplButtonComponent implements ITemplateComponent {
  @Input() row: FlowTypes.TemplateRow;
  @Input() template: FlowTypes.Template;
  @Input() localVariables: { [name: string]: any };

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
