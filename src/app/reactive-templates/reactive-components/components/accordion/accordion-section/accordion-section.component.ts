import { Component, computed, effect, forwardRef, inject, untracked } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { defineParameters, Parameter } from "../../../parameters";
import { ROW_PARAMETERS, RowBaseComponent } from "../../../row-base.component";
import { RowListComponent } from "../../../row-list.component";
import { AccordionComponent } from "../accordion.component";

const parameters = () =>
  defineParameters({
    disabled: new Parameter("disabled", false),
    iconName: new Parameter("icon_name", "arrow-down-circle"),
    state: new Parameter<"open" | "closed">("state", "closed"),
    title: new Parameter("title", ""),
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
   * Disabled if either this section or the whole accordion is disabled
   * (ion-accordion-group only passes `disabled` down to ion-accordions that are its direct children)
   */
  public disabled = computed(
    () => this.params.disabled.value() || !!this.accordion?.params.disabled.value()
  );

  public title = computed(() => this.params.title.value() || this.value() || "");

  /** Whether ion-accordion-group shows this section as open */
  private isOpen = computed(() => {
    const groupValue = this.accordion?.groupValue();
    return Array.isArray(groupValue)
      ? groupValue.includes(this.name())
      : groupValue === this.name();
  });

  /**
   * The section's `icon_name`, or the accordion's `open_icon_src`. Either is rotated when the
   * section opens. With both `open_icon_src` and `close_icon_src`, the icon is swapped instead.
   */
  public icon = computed(() => {
    const openIcon = this.accordion?.params.openIcon.value();
    const closeIcon = this.accordion?.params.closeIcon.value();
    if (!openIcon || "icon_name" in (this.row().parameter_list ?? {})) {
      return { name: this.params.iconName.value(), rotates: true };
    }
    if (!closeIcon) return { name: openIcon, rotates: true };
    return { name: this.isOpen() ? closeIcon : openIcon, rotates: false };
  });

  /** Position among the accordion's visible sections, or -1 if hidden or not within an accordion */
  public sectionIndex = computed(
    () => this.accordion?.visibleSections().indexOf(this.elementRef.nativeElement) ?? -1
  );

  /** Stack each section above the next so that it overlaps the top of the section below */
  public zIndex = computed(() => {
    const sectionCount = this.accordion?.visibleSections().length ?? 0;
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
    this.accordion?.registerSection({
      element: this.elementRef.nativeElement,
      visible: this.condition,
    });
  }

  public ngOnDestroy(): void {
    super.ngOnDestroy();
    this.accordion?.unregisterSection(this.elementRef.nativeElement);
    this.accordion?.setSectionOpen(this.name(), false);
  }
}
