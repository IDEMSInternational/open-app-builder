import { Component, OnInit } from "@angular/core";
import { TemplateService } from "src/app/shared/components/template/services/template.service";

@Component({
  selector: "oab-reactive-template",
  templateUrl: "./reactive-template.component.html",
  styleUrls: ["./reactive-template.component.scss"],
})
export class ReactiveTemplateComponent implements OnInit {
  constructor(templateService: TemplateService) {}

  ngOnInit() {}
}
