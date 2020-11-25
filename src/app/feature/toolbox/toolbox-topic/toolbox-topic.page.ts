import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { title } from 'process';
import { LocalNotificationService } from 'src/app/shared/services/notification/local-notification.service';
import { ToolboxTopic, ToolboxTopicType, ToolboxSection, ToolboxTip } from 'src/app/feature/toolbox/models/toolbox.model';
import { ToolboxService } from 'src/app/feature/toolbox/services/toolbox.service';

@Component({
  selector: 'plh-toolbox-topic',
  templateUrl: './toolbox-topic.page.html',
  styleUrls: ['../toolbox.page.scss'],
})
export class ToolboxTopicPage implements OnInit {

  type: ToolboxTopicType;
  modules: ToolboxTip[];
  title: string = null

  constructor(private activatedRoute: ActivatedRoute, private toolboxService: ToolboxService, private router: Router, 
    private localNotificationService: LocalNotificationService) {
     
    this.activatedRoute.params.subscribe((params) => {
      this.type = params["type"] as ToolboxTopicType;
      console.log("check params", params)
      this.toolboxService.getModules(this.type).subscribe((module)=>{
        this.modules = module
        this.title = this.replaceTitle(module[0].Module)
        console.log("Modules", this.modules)
      })
    });
  }

  ngOnInit() {
  }
  onClickFlow(module: ToolboxTip){
    this.router.navigate([module.Flow_Name],{relativeTo: this.activatedRoute})
  }

  replaceTitle(title: string){
    return title.replace(/_/g, " ");
  }
}
