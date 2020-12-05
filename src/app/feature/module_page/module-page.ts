import { Component, OnInit } from "@angular/core";
import { FlowTypes } from "src/app/shared/model/flowTypes";
import { MODULE_PAGE } from "src/app/shared/services/data/data.service";

@Component({
  selector: "plh-module-page",
  templateUrl: "./module-page.html",
  styleUrls: ["./module-page.scss"],
})
export class ModulePage implements OnInit {
  appSkin = "MODULE_FOCUS_SKIN";
  modulePageFlow: FlowTypes.Module_page;
  constructor() {}

  ngOnInit() {
    this.loadActiveModule();
  }

  async loadActiveModule() {
    // TODO - determine what is the last user-set active module and if the module has been updated/rotated
    // via the stored trigger actions
    this.modulePageFlow = MODULE_PAGE[0];
  }
}
