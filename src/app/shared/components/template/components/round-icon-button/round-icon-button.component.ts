import { Component, Input, OnInit } from "@angular/core";
import { FlowTypes } from "src/app/shared/model/flowTypes";
import { ITemplateRowProps } from "../../models";
import { TemplateContainerComponent } from "../../template-container.component";
import { TemplateBaseComponent } from "../base";
@Component({
  selector: "plh-round-button",
  templateUrl: "./round-icon-button.component.html",
  styleUrls: ["./round-icon-button.component.scss"],
})
export class RoundIconButtonComponent extends TemplateBaseComponent implements ITemplateRowProps {
  @Input() parent: TemplateContainerComponent;
  @Input() template: FlowTypes.Template;

  onClick() {
    console.log("Templating action handling to be implemented");
  }
}
