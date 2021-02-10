import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FlowTypes } from 'scripts/types';
import { TEMPLATE } from 'src/app/shared/services/data/data.service';
import { template } from 'src/data/template';

@Component({
  selector: 'plh-template-testing',
  templateUrl: './template-testing.page.html',
  styleUrls: ['./template-testing.page.scss'],
})
export class TemplateTestingPage implements OnInit {

  testTemplate: FlowTypes.Template;

  constructor(route: ActivatedRoute) {
    route.params.subscribe((params) => {
      const matchingTemplate = TEMPLATE.find((t) => t.flow_name === params.templateName);
      if (matchingTemplate) {
        this.testTemplate = matchingTemplate;
      } else {
        this.testTemplate = TEMPLATE[1];
      }
    })
  }

  ngOnInit() {
  }

}
