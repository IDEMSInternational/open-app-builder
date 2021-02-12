import { Component, Input, OnInit } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { FlowTypes } from 'src/app/shared/model/flowTypes';

@Component({
  selector: "plh-tmpl-button",
  template: `<ion-button (click)="onClick()">{{row.value}}</ion-button>`,
  styleUrls: ["./tmpl-components-common.scss"]
})
export class TmplButtonComponent {
  @Input() row: FlowTypes.TemplateRow;
  @Input() template: FlowTypes.Template;
  @Input() $localVariables: BehaviorSubject<{ [name: string]: string }>;

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
    const vars = this.$localVariables.getValue();
    vars[name] = value;
    this.$localVariables.next(vars);
  }
}
