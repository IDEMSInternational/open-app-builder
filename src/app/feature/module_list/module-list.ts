import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { FlowTypes } from "scripts/types";
import { IAppSkin } from "src/app/shared/model";
import { MODULE_LIST } from "src/app/shared/services/data/data.service";

@Component({
  selector: "plh-module-list",
  templateUrl: "./module-list.html",
  styleUrls: ["./module-list.scss"],
})
export class ModuleListComponent implements OnInit {
  dataLoaded = false;
  appSkin: IAppSkin = "MODULE_FOCUS_SKIN";
  moduleListRow: FlowTypes.Module_listRow;
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.setDefaultModule();
  }
  async setDefaultModule() {
    // TODO
    this.moduleListRow = MODULE_LIST[0].rows[0];
    this.dataLoaded = true;
  }
}
