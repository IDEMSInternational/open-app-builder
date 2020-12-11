import { Component, Input, OnInit } from "@angular/core";
import { FlowTypes } from "scripts/types";

@Component({
  selector: "plh-tips-module-focus-skin",
  templateUrl: "./module-focus.skin.html",
  styleUrls: ["./module-focus.skin.scss"],
})
export class TipsModuleFocusSkin implements OnInit {
  @Input() tip: FlowTypes.Tips;
  title: string = "";
  constructor() {}

  ngOnInit() {
    console.log("hello tip", this.tip);
  }
}
