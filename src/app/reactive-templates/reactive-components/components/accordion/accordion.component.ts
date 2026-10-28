import { Component, computed, forwardRef, Signal, signal } from "@angular/core";
import { defineParameters, Parameter } from "../../parameters";
import { ROW_PARAMETERS, RowBaseComponent } from "../../row-base.component";
import { RowListComponent } from "../../row-list.component";
import { AccordionGroupCustomEvent, IonicModule } from "@ionic/angular";

interface AccordionSection {
  element: HTMLElement;
  visible: Signal<boolean>;
}

const parameters = () =>
  defineParameters({
    disabled: new Parameter("disabled", false),
    multiple: new Parameter("multiple", true),
  });

@Component({
  selector: "oab-accordion",
  templateUrl: "./accordion.component.html",
  styleUrls: ["./accordion.component.scss"],
  imports: [IonicModule, forwardRef(() => RowListComponent)],
  providers: [{ provide: ROW_PARAMETERS, useFactory: parameters }],
})
export class AccordionComponent extends RowBaseComponent<ReturnType<typeof parameters>> {
  /** Full names of the open sections, set by each section's `state` and updated when the user toggles a section */
  public openSections = signal<string[]>([]);

  /** ion-accordion-group expects a single value rather than an array when only one section can be open */
  public groupValue = computed(() =>
    this.params.multiple.value() ? this.openSections() : this.openSections().at(-1)
  );

  /** All child sections (including those within loops), in document order */
  private sections = signal<AccordionSection[]>([]);

  /** Host elements of the child sections that aren't hidden by their `condition`, in document order */
  public visibleSections = computed(() =>
    this.sections()
      .filter((section) => section.visible())
      .map((section) => section.element)
  );

  public registerSection(section: AccordionSection): void {
    this.sections.update((sections) =>
      [...sections, section].sort((a, b) =>
        a.element.compareDocumentPosition(b.element) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1
      )
    );
  }

  public unregisterSection(element: HTMLElement): void {
    this.sections.update((sections) => sections.filter((section) => section.element !== element));
  }

  /** Called by child sections whenever their `state` changes */
  public setSectionOpen(sectionName: string, open: boolean): void {
    this.openSections.update((openSections) => {
      if (openSections.includes(sectionName) === open) {
        return openSections;
      }
      if (!open) {
        return openSections.filter((name) => name !== sectionName);
      }
      // As when the user opens a section, opening one closes any others unless `multiple` is set
      return this.params.multiple.value() ? [...openSections, sectionName] : [sectionName];
    });
  }

  public handleChange(event: AccordionGroupCustomEvent<string | string[] | null | undefined>) {
    // ionChange bubbles up from nested accordion groups and from inputs within sections,
    // so ignore any event that wasn't emitted by this component's own group
    if (event.target !== event.currentTarget) {
      return;
    }
    const { value } = event.detail;
    this.openSections.set(Array.isArray(value) ? value : value ? [value] : []);
  }
}
