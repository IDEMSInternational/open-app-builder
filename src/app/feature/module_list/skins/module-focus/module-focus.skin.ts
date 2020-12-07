import { Component, Input } from "@angular/core";
import { FlowTypes } from "src/app/shared/model/flowTypes";

@Component({
  selector: "plh-module-focus-skin",
  templateUrl: "./module-focus.skin.html",
  styleUrls: ["./module-focus.skin.scss"],
})
/** The module-focus skin has nested routing, which is handled in a basic way here */
export class ModuleFocusSkin {
  @Input() moduleListRow: FlowTypes.Module_listRow;
}
