import { Component, OnInit } from "@angular/core";
import { RowBaseComponent } from "../../row-base.component";

@Component({
  selector: "oab-set-variable",
  templateUrl: "./set-variable.component.html",
  styleUrls: ["./set-variable.component.scss"],
})
export class SetVariableComponent extends RowBaseComponent {
  constructor() {
    super({}); // Has no parameters
  }
}
