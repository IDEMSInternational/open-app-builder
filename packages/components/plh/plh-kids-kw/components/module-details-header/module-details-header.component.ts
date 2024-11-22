import { Component, OnInit } from "@angular/core";
import { TemplateBaseComponent } from "src/app/shared/components/template/components/base";

@Component({
  selector: "plh-module-details-header",
  templateUrl: "./module-details-header.component.html",
  styleUrls: ["./module-details-header.component.scss"],
})
export class PlhModuleDetailsHeaderComponent extends TemplateBaseComponent implements OnInit {
  ngOnInit() {}
}
