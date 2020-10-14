import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToolboxTopicType } from 'src/app/shared/services/toolbox/toolbox.model';

@Component({
  selector: 'plh-toolbox-topic',
  templateUrl: './toolbox-topic.page.html',
  styleUrls: ['./toolbox-topic.page.scss'],
})
export class ToolboxTopicPage implements OnInit {

  type: ToolboxTopicType = "ONE_ON_ONE_TIME";

  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe((params) => {
      this.type = params["type"];
    });
  }

  ngOnInit() {
  }

}
