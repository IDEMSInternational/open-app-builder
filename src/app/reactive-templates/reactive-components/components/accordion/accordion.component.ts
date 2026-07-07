import { Component, forwardRef } from "@angular/core";
import { defineParameters, Parameter } from "../../parameters";
import { ROW_PARAMETERS, RowBaseComponent } from "../../row-base.component";
import { RowListComponent } from "../../row-list.component";
import { IonicModule } from "@ionic/angular";

const parameters = () =>
  defineParameters({
    disabled: new Parameter("disabled", false),
    multiple: new Parameter("multiple", true),
  });

@Component({
  selector: "aob-accordion-component",
  templateUrl: "accordion.component.html",
  styleUrls: ["./accordion.component.scss"],
  imports: [IonicModule, forwardRef(() => RowListComponent)],
  providers: [{ provide: ROW_PARAMETERS, useFactory: parameters }],
})
export class AccordionComponent extends RowBaseComponent<ReturnType<typeof parameters>> {
  public openSections = [];
}
