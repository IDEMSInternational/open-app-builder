import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { FlowTypes } from "scripts/types";
import { TEMPLATE } from "src/app/shared/services/data/data.service";

@Component({
  selector: "plh-template-testing",
  templateUrl: "./template-testing.page.html",
  styleUrls: ["./template-testing.page.scss"],
})
export class TemplateTestingPage implements OnInit {
  testTemplate: FlowTypes.Template;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // TODO - decide what to do if template not found
    const fallbackTemplate = TEMPLATE[1];
    const matchingTemplate = TEMPLATE.find(
      (t) => t.flow_name === this.route.snapshot.params.templateName
    );
    this.testTemplate = matchingTemplate || fallbackTemplate;
    console.log(matchingTemplate ? "matched template" : "fallback template", this.testTemplate);
  }
}
