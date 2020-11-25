import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalNotificationService } from 'src/app/shared/services/notification/local-notification.service';
import { ToolboxTip } from 'src/app/feature/toolbox/models/toolbox.model';
import { ToolboxService } from 'src/app/feature/toolbox/services/toolbox.service';
import {OpenClose} from 'src/app/feature/goals/animations'

@Component({
  selector: 'plh-toolbox-flows',
  templateUrl: './toolbox-flows.page.html',
  styleUrls: ['../toolbox-topic.page.scss'],
  animations: [OpenClose]
})
export class ToolboxFlowsPage implements OnInit {

  Flow_Name: string
  flow: ToolboxTip

  constructor(private activatedRoute: ActivatedRoute, private toolboxService: ToolboxService, private router: Router, 
    private localNotificationService: LocalNotificationService) {
      this.activatedRoute.params.subscribe((params) => {
        this.Flow_Name = params.flow_name
        console.log("Flow name", this.Flow_Name)
        this.toolboxService.getFlows(this.Flow_Name).subscribe((module)=>{
          this.flow = module
          console.log("Modules", this.flow)

        })
      });
    }

  ngOnInit() {
  }

  
}
