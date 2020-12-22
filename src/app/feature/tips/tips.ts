import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { FlowTypes } from "scripts/types";
import { IAppSkin } from "src/app/shared/model";
import { TIPS } from "src/app/shared/services/data/data.service";
import { TaskActionService } from "src/app/shared/services/task/task-action.service";

@Component({
  selector: "plh-tips",
  templateUrl: "./tips.html",
  styleUrls: ["./tips.scss"],
})
export class TipsComponent implements OnInit, OnDestroy {
  dataLoaded = false;
  appSkin: IAppSkin = "MODULE_FOCUS_SKIN";
  tip: FlowTypes.Tips;
  constructor(private route: ActivatedRoute, private taskActionService: TaskActionService) {}

  ngOnInit() {
    this.setDefaultModule();
  }
  async ngOnDestroy() {
    // Assume flow content has been completed once page left
    await this.taskActionService.recordFlowTaskAction({
      flow_name: this.tip.flow_name,
      type: "completed",
    });
    // TODO - possibly add a route guard to finish updating data before unload
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
