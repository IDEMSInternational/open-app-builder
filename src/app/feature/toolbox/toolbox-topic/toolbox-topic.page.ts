import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { title } from 'process';
import { LocalNotificationService } from 'src/app/shared/services/notification/local-notification.service';
import { ToolboxTopic, ToolboxTopicType, ToolboxSection } from 'src/app/shared/services/toolbox/toolbox.model';
import { ToolboxService } from 'src/app/shared/services/toolbox/toolbox.service';

@Component({
  selector: 'plh-toolbox-topic',
  templateUrl: './toolbox-topic.page.html',
  styleUrls: ['../toolbox.page.scss'],
})
export class ToolboxTopicPage implements OnInit {

  type: ToolboxTopicType = "ONE_ON_ONE_TIME";
  topic: ToolboxTopic;

  constructor(private activatedRoute: ActivatedRoute, private toolboxService: ToolboxService, private router: Router, 
    private localNotificationService: LocalNotificationService) {
    this.activatedRoute.params.subscribe((params) => {
      this.type = params["type"] as ToolboxTopicType;
      this.toolboxService.getTopic(this.type).subscribe((topic) => {
        this.topic = topic;
        console.log("topics ", this.topic)
      });
    });
  }

  ngOnInit() {
  }
  onClickFlow(toolboxSection: ToolboxSection){
    const slug = this.generateSlug(toolboxSection.title)
    this.router.navigate([slug],{relativeTo: this.activatedRoute})
  }

  generateSlug(title: String){
    return title.replace(/\s+/g, '-');
  }
}
