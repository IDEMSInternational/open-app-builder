import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FlowTypes } from "scripts/types";
import { ToolboxTopicType } from "src/app/feature/toolbox/models/toolbox.model";
import { ToolboxService } from "src/app/feature/toolbox/services/toolbox.service";

@Component({
  selector: "plh-toolbox-topic",
  templateUrl: "./toolbox-topic.page.html",
  styleUrls: ["../toolbox.page.scss"],
})
export class ToolboxTopicPage implements OnInit {
  type: ToolboxTopicType;
  modules: FlowTypes.Tips[];
  title: string = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private toolboxService: ToolboxService,
    private router: Router
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.type = params["type"] as ToolboxTopicType;
      this.toolboxService.getModules(this.type).subscribe((module) => {
        this.modules = module;
        this.title = this.replaceTitle(module[0].module);
      });
    });
  }

  ngOnInit() {}
  onClickFlow(module: FlowTypes.Tips) {
    this.router.navigate([module.flow_name], { relativeTo: this.activatedRoute });
  }

  replaceTitle(title: string) {
    return title.replace(/_/g, " ");
  }
}
