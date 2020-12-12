import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { FlowTypes } from "scripts/types";
import { IAppSkin } from "src/app/shared/model";
import { MODULE_LIST } from "src/app/shared/services/data/data.service";
import { LocalStorageService } from 'src/app/shared/services/local-storage/local-storage.service';

@Component({
  selector: "plh-module-list",
  templateUrl: "./module-list.html",
  styleUrls: ["./module-list.scss"],
})
export class ModuleListComponent implements OnInit {
  dataLoaded = false;
  appSkin: IAppSkin = "MODULE_FOCUS_SKIN";
  moduleListRow: FlowTypes.Module_listRow;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private localStorageService: LocalStorageService) {}

  ngOnInit() {
    this.openInitialFlowIfFirstTime();
    this.setDefaultModule();
  }
  async setDefaultModule() {
    // TODO
    this.moduleListRow = MODULE_LIST[0].rows[0];
    this.dataLoaded = true;
  }

  private openInitialFlowIfFirstTime() {
    if (!this.localStorageService.getBoolean(LocalStorageService.OPENED_APP_BEFORE)) {
      this.localStorageService.setBoolean(LocalStorageService.OPENED_APP_BEFORE, true);
      this.router.navigateByUrl("/chat/flow/first_app_opening");
    }
  }
}
