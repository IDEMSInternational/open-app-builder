import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { FlowTypes } from "scripts/types";
import { IAppSkin } from "src/app/shared/model";
import { TIPS } from "src/app/shared/services/data/data.service";

@Component({
  selector: "plh-tips",
  templateUrl: "./tips.html",
  styleUrls: ["./tips.scss"],
})
export class TipsComponent implements OnInit {
  dataLoaded = false;
  appSkin: IAppSkin = "MODULE_FOCUS_SKIN";
  tip: FlowTypes.Tips;
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.setDefaultModule();
  }
  async setDefaultModule() {
    const flow_name = this.route.snapshot.params.flow_name;
    console.log("loading tip", flow_name);
    const tip = TIPS.find((t) => t.flow_name === flow_name);
    if (tip) {
      this.tip = tip;
    } else {
      throw new Error(`could not find tip: ${flow_name}`);
    }
    this.dataLoaded = true;
  }
}
