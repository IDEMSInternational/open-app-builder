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

  constructor(private route: ActivatedRoute) {
    
  }

  ngOnInit() {
    const matchingTemplate = TEMPLATE.find((t) => t.flow_name === this.route.snapshot.params.templateName);
    if (matchingTemplate) {
      this.testTemplate = matchingTemplate;
      console.log("Matched template", this.testTemplate);
    } else {
      this.testTemplate = TEMPLATE[1];
      console.log("Default template", this.testTemplate);
    }
  }

}
