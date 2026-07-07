import { Component, forwardRef } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { defineParameters, Parameter } from "../../../parameters";
import { ROW_PARAMETERS, RowBaseComponent } from "../../../row-base.component";
import { RowListComponent } from "../../../row-list.component";

const parameters = () =>
  defineParameters({
    disabled: new Parameter("disabled", false),
    iconName: new Parameter("icon_name", "chevron-down-outline"),
  });

@Component({
  selector: "oab-accordion-section",
  templateUrl: "./accordion-section.component.html",
  styleUrls: ["./accordion-section.component.scss"],
  imports: [IonicModule, forwardRef(() => RowListComponent)],
  providers: [{ provide: ROW_PARAMETERS, useFactory: parameters }],
})
export class AccordionSectionComponent extends RowBaseComponent<ReturnType<typeof parameters>> {}
