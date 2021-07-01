import { Component, OnInit } from "@angular/core";
import { getStringParamFromTemplateRow } from "src/app/shared/utils";
import { TemplateBaseComponent } from "./base";

@Component({
  selector: "plh-tmpl-help-icon",
  template: ` <div (click)="triggerActions('click')" class="wrapper-icon">
    <ion-icon [name]="icon_src"></ion-icon>
  </div>`,
  styles: [
    `
      .wrapper-icon {
        margin-top: var(--regular-margin);
        height: 100%;
      }
      ion-icon {
        width: 40px;
        height: 40px;
        --ionicon-stroke-width: 10px;
      }
    `,
  ],
})
export class TmplHelpIconComponent extends TemplateBaseComponent implements OnInit {
  public icon_src: string | null;

  constructor() {
    super();
  }

  ngOnInit() {
    this.getParams();
  }

  getParams() {
    this.icon_src = getStringParamFromTemplateRow(this._row, "icon_src", "help-circle-outline");
  }
}
