import { Component, computed, effect, forwardRef, inject, untracked } from "@angular/core";
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

  /** Position among all of the accordion's sections, or -1 if not within an accordion */
  public sectionIndex = computed(
    () => this.accordion?.sections().indexOf(this.elementRef.nativeElement) ?? -1
  );

  /** Stack each section above the next so that it overlaps the top of the section below */
  public zIndex = computed(() => {
    const sectionCount = this.accordion?.sections().length ?? 0;
    return this.sectionIndex() === -1 ? null : sectionCount - this.sectionIndex();
  });

  constructor() {
    super();

    // Open or close this section whenever its `state` changes
    // (untracked so that signals read by the accordion, e.g. its `multiple` param, don't re-apply the state)
    effect(() => {
      const name = this.name();
      const open = this.params.state.value() === "open";
      untracked(() => this.accordion?.setSectionOpen(name, open));
    });
  }

  public ngOnInit(): void {
    super.ngOnInit();
    this.accordion?.registerSection(this.elementRef.nativeElement);
  }

  public ngOnDestroy(): void {
    super.ngOnDestroy();
    this.accordion?.unregisterSection(this.elementRef.nativeElement);
    this.accordion?.setSectionOpen(this.name(), false);
  }
}
