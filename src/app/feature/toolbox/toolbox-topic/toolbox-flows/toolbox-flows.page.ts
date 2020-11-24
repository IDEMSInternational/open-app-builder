import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { LocalNotificationService } from 'src/app/shared/services/notification/local-notification.service';
import { ToolboxTopic, ToolboxTopicType, ToolboxSection } from 'src/app/shared/services/toolbox/toolbox.model';
import { ToolboxService } from 'src/app/shared/services/toolbox/toolbox.service';
import {OpenClose} from 'src/app/feature/goals/animations'

@Component({
  selector: 'plh-toolbox-flows',
  templateUrl: './toolbox-flows.page.html',
  styleUrls: ['./toolbox-flows.page.scss'],
  animations: [OpenClose]
})
export class ToolboxFlowsPage implements OnInit {

  type: ToolboxTopicType = "ONE_ON_ONE_TIME";
  topic: ToolboxTopic
  flow

  constructor(private activatedRoute: ActivatedRoute, private toolboxService: ToolboxService, private router: Router, 
    private localNotificationService: LocalNotificationService) {
      this.flow = this.router.getCurrentNavigation().extras.state;
      console.log("Router values", this.router.getCurrentNavigation().extras.state)
  }

  ngOnInit() {
  }

  
}
