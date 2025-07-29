import { Component, OnInit } from "@angular/core";
import { ReactiveBaseComponent } from "../../reactive-base.component";

@Component({
  selector: "oab-set-variable",
  templateUrl: "./set-variable.component.html",
  styleUrls: ["./set-variable.component.scss"],
})
export class SetVariableComponent extends ReactiveBaseComponent {
  constructor() {
    super({}); // Has no parameters
  }
}
