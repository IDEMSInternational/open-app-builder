import { Component, computed, effect, forwardRef, inject } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { defineParameters, Parameter } from "../../../parameters";
import { ROW_PARAMETERS, RowBaseComponent } from "../../../row-base.component";
import { RowListComponent } from "../../../row-list.component";
import { AccordionComponent } from "../accordion.component";

const parameters = () =>
  defineParameters({
    disabled: new Parameter("disabled", false),
    iconName: new Parameter("icon_name", "chevron-down-outline"),
    state: new Parameter<"open" | "closed">("state", "closed"),
  });

@Component({
  selector: "oab-accordion-section",
  templateUrl: "./accordion-section.component.html",
  styleUrls: ["./accordion-section.component.scss"],
  imports: [IonicModule, forwardRef(() => RowListComponent)],
  providers: [{ provide: ROW_PARAMETERS, useFactory: parameters }],
})
export class AccordionSectionComponent extends RowBaseComponent<ReturnType<typeof parameters>> {
  private accordion = inject(AccordionComponent, { optional: true });

  /**
   * Stack each section above the next so that it overlaps the top of the section below.
   * Sections that aren't direct children of the accordion (e.g. inside a loop) keep the default stacking
   */
  public zIndex = computed(() => {
    const siblingRows = this.accordion?.row().rows ?? [];
    const index = siblingRows.findIndex((row) => row.name === this.row().name);
    return index === -1 ? null : siblingRows.length - index;
  });

  constructor() {
    super();

    // Open or close this section whenever its `state` changes
    effect(() => {
      this.accordion?.setSectionOpen(this.name(), this.params.state.value() === "open");
    });
  }

  public ngOnDestroy(): void {
    super.ngOnDestroy();
    this.accordion?.setSectionOpen(this.name(), false);
  }
}
