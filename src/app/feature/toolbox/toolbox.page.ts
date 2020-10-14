import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToolboxTopic, ToolboxTopicMetadata, ToolboxTopicType } from 'src/app/shared/services/toolbox/toolbox.model';
import { ToolboxService } from 'src/app/shared/services/toolbox/toolbox.service';

@Component({
  selector: 'plh-toolbox',
  templateUrl: './toolbox.page.html',
  styleUrls: ['./toolbox.page.scss'],
})
export class ToolboxPage implements OnInit {

  toolboxTopics: ToolboxTopicMetadata[] = [];

  constructor(private toolboxService: ToolboxService, private router: Router) {
    this.toolboxService.getTopicMetadatas().subscribe((topics) => {
      this.toolboxTopics = topics;
    });
  }

  ngOnInit() {
  }

  onClickTopic(type: ToolboxTopicType) {
    this.router.navigateByUrl("/toolbox/topic/" + type);
  }

}
