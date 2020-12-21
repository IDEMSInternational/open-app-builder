import { Component, Input, ViewChild } from "@angular/core";
import { ITask } from "src/app/feature/goals/models/goals.model";
import { FlowTypes } from "src/app/shared/model/flowTypes";
import { MODULE_LIST } from "src/app/shared/services/data/data.service";
import { UserMetaService } from "src/app/shared/services/userMeta/userMeta.service";
import { SlidePanelBottomComponent } from "./components/slide-panel-bottom";

@Component({
  selector: "plh-module-focus-skin",
  templateUrl: "./module-focus.skin.html",
  styleUrls: ["./module-focus.skin.scss"],
})
/** The module-focus skin has nested routing, which is handled in a basic way here */
export class ModuleFocusSkin {
  @Input() moduleListRow: FlowTypes.Module_listRow;

  @ViewChild(SlidePanelBottomComponent) bottomSlider: SlidePanelBottomComponent;

  moduleList = MODULE_LIST[0].rows;

  constructor(private userMetaService: UserMetaService) {}

  onModuleChange(module: FlowTypes.Module_listRow) {
    this.moduleListRow = module;
    this.userMetaService.setUserMeta({ active_module: module.id });
  }

  onTaskClick(task: ITask) {
    console.log("Close the bottom slider?");
    this.bottomSlider.close();
  }
}
