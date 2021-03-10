import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "plh-template-testing",
  templateUrl: "./template-testing.page.html",
  styleUrls: ["./template-testing.page.scss"],
})
export class TemplateTestingPage implements OnInit {
  templateName: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // TODO - decide what to do if template not found
    // const fallbackTemplate = TEMPLATE[1];
    this.templateName = this.route.snapshot.params.templateName;

    // const template = matchingTemplate || fallbackTemplate;
    // console.log(matchingTemplate ? "matched template" : "fallback template", template);
    // this.templateProps = {
    //   name: template.flow_name,
    //   rows: template.rows,
    // };
  }
}
