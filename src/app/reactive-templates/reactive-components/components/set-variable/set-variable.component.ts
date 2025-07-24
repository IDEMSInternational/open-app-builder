import { Component, OnInit } from "@angular/core";
import { ReactiveBaseComponent } from "../../reactive-base.component";

@Component({
  selector: "oab-set-variable",
  templateUrl: "./set-variable.component.html",
  styleUrls: ["./set-variable.component.scss"],
})
export class SetVariableComponent extends ReactiveBaseComponent implements OnInit {
  constructor() {
    super({}); // Has no parameters
  }

  ngOnInit() {
    super.ngOnInit();

    this.setValue(this.row().value);
  }
}
