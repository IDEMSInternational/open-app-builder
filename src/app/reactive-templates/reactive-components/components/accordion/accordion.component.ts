import { AfterViewInit, Component, effect, forwardRef, signal } from "@angular/core";
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
  selector: "oab-accordion-component",
  templateUrl: "accordion.component.html",
  styleUrls: ["./accordion.component.scss"],
  imports: [IonicModule, forwardRef(() => RowListComponent)],
  providers: [{ provide: ROW_PARAMETERS, useFactory: parameters }],
})
export class AccordionComponent
  extends RowBaseComponent<ReturnType<typeof parameters>>
  implements AfterViewInit
{
  public openSections = signal<string[]>([]);
  private viewInitialised = signal(false);

  constructor() {
    super();

    effect(() => {
      if (!this.viewInitialised()) {
        return;
      }

      this.setOpenSectionsFromRegistry();
    });
  }

  public ngAfterViewInit(): void {
    this.viewInitialised.set(true);
  }

  private setOpenSectionsFromRegistry(): void {
    const childRows = this.row().rows ?? [];
    const openSections = childRows
      .map((childRow) => {
        const fullName = this.namespaceService.getFullName(this.namespace(), childRow.name);
        if (!this.rowRegistry.has(fullName)) {
          return null;
        }

        const childInstance = this.rowRegistry.get(fullName);
        return childInstance.params["state"]?.value() === "open" ? childInstance.name() : null;
      })
      .filter((name): name is string => name !== null);

    this.openSections.set(openSections);
  }
}
