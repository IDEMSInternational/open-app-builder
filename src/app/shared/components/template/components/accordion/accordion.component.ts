import { Component, OnInit } from "@angular/core";
import { TemplateBaseComponent } from "../base";

@Component({
  selector: "plh-accordion-component",
  templateUrl: "accordion.component.html",
  styleUrls: ["./accordion.component.scss"],
})
export class TmplAccordionComponent extends TemplateBaseComponent implements OnInit {
  public openSections = [];
  ngOnInit() {
    // Initial list of section with state === 'open' must be calculated to provider open value
    this.openSections = this._row.rows
      .filter((childRow) => childRow.parameter_list?.state === "open")
      .map((childRow) => childRow.name);
  }
}
