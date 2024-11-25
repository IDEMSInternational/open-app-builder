import { Component, OnInit } from "@angular/core";
import { TemplateBaseComponent } from "src/app/shared/components/template/components/base";

@Component({
  selector: "plh-progress-wheel",
  templateUrl: "./progress-wheel.component.html",
  styleUrls: ["./progress-wheel.component.scss"],
})
export class PlhProgressWheelComponent extends TemplateBaseComponent implements OnInit {
  ngOnInit() {}
}
