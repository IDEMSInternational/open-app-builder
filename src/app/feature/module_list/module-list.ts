import { Component, OnInit } from "@angular/core";
import { FlowTypes } from "scripts/types";
import { IAppSkin } from "src/app/shared/model";
import { MODULE_LIST } from "src/app/shared/services/data/data.service";
import { UserMetaService } from "src/app/shared/services/userMeta/userMeta.service";

@Component({
  selector: "plh-module-list",
  templateUrl: "./module-list.html",
  styleUrls: ["./module-list.scss"],
})
export class ModuleListComponent implements OnInit {
  dataLoaded = false;
  appSkin: IAppSkin = "MODULE_FOCUS_SKIN";
  moduleListRow: FlowTypes.Module_listRow;
  constructor(private userMetaService: UserMetaService) {}

  ngOnInit() {
    this.setDefaultModule();
  }
  async setDefaultModule() {
    const activeModule = this.userMetaService.getUserMeta("active_module");
    this.moduleListRow =
      MODULE_LIST[0].rows.find((r) => r.id === activeModule) || MODULE_LIST[0].rows[0];
    this.dataLoaded = true;
  }
}
