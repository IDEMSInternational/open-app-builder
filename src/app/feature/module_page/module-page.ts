import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { FlowTypes } from "scripts/types";
import { MODULE_PAGE } from "src/app/shared/services/data/data.service";

@Component({
  selector: "plh-module-page",
  templateUrl: "./module-page.html",
  styleUrls: ["./module-page.scss"],
})
export class ModulePageComponent implements OnInit {
  dataLoaded = false;
  appSkin = "MODULE_FOCUS_SKIN";
  modulePageFlow: FlowTypes.Module_page;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const { flow_name } = this.route.snapshot.params;
    const modulePageFlow = MODULE_PAGE.find((m) => m.flow_name === flow_name);
    if (modulePageFlow) {
      this.modulePageFlow = modulePageFlow;
      console.log("module page flow", this.modulePageFlow);
      this.dataLoaded = true;
    } else {
      throw new Error(`Module Page Flow Not Found: ${flow_name}`);
    }
  }
}
