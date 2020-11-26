import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToolboxTopicMetadata } from "src/app/feature/toolbox/models/toolbox.model";
import { ToolboxService } from "src/app/feature/toolbox/services/toolbox.service";

@Component({
  selector: "plh-toolbox",
  templateUrl: "./toolbox.page.html",
  styleUrls: ["./toolbox.page.scss"],
})
export class ToolboxPage implements OnInit {
  toolboxTopicMetadatas: ToolboxTopicMetadata[] = [];

  constructor(private toolboxService: ToolboxService, private router: Router) {
    this.toolboxService.getTopicMetadatas().subscribe((topics) => {
      this.toolboxTopicMetadatas = topics;
    });
  }

  ngOnInit() {}

  onClickTopic(topicMetadata: ToolboxTopicMetadata) {
    if (topicMetadata.unlocked) {
      this.router.navigateByUrl("/toolbox/topic/" + topicMetadata.type);
    }
  }
}
