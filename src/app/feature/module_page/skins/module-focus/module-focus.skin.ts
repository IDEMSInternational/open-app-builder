import { Component, Input, OnInit } from "@angular/core";
import { FlowTypes } from "src/app/shared/model/flowTypes";

@Component({
  selector: "plh-module-focus-skin",
  templateUrl: "./module-focus.skin.html",
  styleUrls: ["./module-focus.skin.scss"],
})
export class ModuleFocusSkin implements OnInit {
  /** The main flow passed from parent component */
  @Input() flow: FlowTypes.Module_page;
  /** display component handlers for all possible row types defined in excel */

  constructor() {}

  ngOnInit() {
    console.log("page flow", this.flow);
    this.processFlow(this.flow);
  }

  processFlow(flow: FlowTypes.Module_page) {
    // extract nested items
    const processedRows = [];

    for (let row of flow.rows) {
    }
  }
}
