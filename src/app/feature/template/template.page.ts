import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { FlowTypes } from "data-models";
import { AppDataService } from "src/app/shared/services/data/app-data.service";

@Component({
  selector: "plh-template-page",
  templateUrl: "./template.page.html",
  styleUrls: ["./template.page.scss"],
})
export class TemplatePage implements OnInit {
  templateName: string;
  filterTerm: string;
  allTemplates: FlowTypes.FlowTypeBase[] = [];
  filteredTemplates: FlowTypes.FlowTypeBase[] = [];
  constructor(private route: ActivatedRoute, private appDataService: AppDataService) {}

  ngOnInit() {
    this.templateName = this.route.snapshot.params.templateName;
    const allTemplates = this.appDataService.listSheetsByType("template");

    this.allTemplates = allTemplates.sort((a, b) => (a.flow_name > b.flow_name ? 1 : -1));
    this.filteredTemplates = allTemplates;
  }

  search() {
    this.allTemplates = this.allTemplates;
    this.filteredTemplates = this.allTemplates.filter(
      (i) => i.flow_name.toLocaleLowerCase().indexOf(this.filterTerm.toLowerCase()) > -1
    );
  }

  trackByFn(index) {
    return index;
  }
}
