import { Component, OnInit } from "@angular/core";
import { TemplateBaseComponent } from "../base";

@Component({
  selector: "plh-tmpl-workshops-accordion",
  template: `<div class="workshops-accordion">
    <div>
      <plh-template-component *ngFor="let childRow of _row.rows" [row]="childRow" [parent]="parent">
      </plh-template-component>
    </div>
  </div>`,
  styleUrls: ["./accordion.scss"],
})
export class WorkshopsComponent extends TemplateBaseComponent implements OnInit {
  ngOnInit() {
    this.getParams();
  }

  getParams() {}
}
