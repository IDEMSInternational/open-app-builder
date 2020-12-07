import { Component, Input } from "@angular/core";
import { FlowTypes } from "src/app/shared/model/flowTypes";
import { MODULE_LIST } from "src/app/shared/services/data/data.service";

@Component({
  selector: "plh-module-focus-skin",
  templateUrl: "./module-focus.skin.html",
  styleUrls: ["./module-focus.skin.scss"],
})
/** The module-focus skin has nested routing, which is handled in a basic way here */
export class ModuleFocusSkin {
  @Input() moduleListRow: FlowTypes.Module_listRow;

  moduleList = MODULE_LIST[0].rows;

  constructor() {
    
  }

  onModuleChange(module: FlowTypes.Module_listRow) {
    this.moduleListRow = module;
  }
}
