import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { TEMPLATE } from "src/app/shared/services/data/data.service";

@Component({
  selector: "plh-template-testing",
  templateUrl: "./template-testing.page.html",
  styleUrls: ["./template-testing.page.scss"],
})
export class TemplateTestingPage implements OnInit {
  templateName: string;
  filterTerm: string;
  allTemplates = TEMPLATE.sort((a, b) => (a.flow_name > b.flow_name ? 1 : -1));
  data = this.allTemplates;
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.templateName = this.route.snapshot.params.templateName;
  }

  search() {
    this.allTemplates = this.data;
    this.allTemplates = this.allTemplates.filter(
      (i) => i.flow_name.toLocaleLowerCase().indexOf(this.filterTerm.toLowerCase()) > -1
    );
  }

  trackByFn(index) {
    return index;
  }
}
