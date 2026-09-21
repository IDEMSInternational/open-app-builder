import { Component, computed, forwardRef, signal } from "@angular/core";
import { defineParameters, Parameter } from "../../parameters";
import { ROW_PARAMETERS, RowBaseComponent } from "../../row-base.component";
import { RowListComponent } from "../../row-list.component";
import { AccordionGroupCustomEvent, IonicModule } from "@ionic/angular";

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
export class AccordionComponent extends RowBaseComponent<ReturnType<typeof parameters>> {
  /** Full names of the open sections, set by each section's `state` and updated when the user toggles a section */
  public openSections = signal<string[]>([]);

  /** ion-accordion-group expects a single value rather than an array when only one section can be open */
  public groupValue = computed(() =>
    this.params.multiple.value() ? this.openSections() : this.openSections().at(-1)
  );

  /** Host elements of all child sections (including those within loops), in document order */
  private _sections = signal<HTMLElement[]>([]);
  public sections = this._sections.asReadonly();

  public registerSection(section: HTMLElement): void {
    this._sections.update((sections) =>
      [...sections, section].sort((a, b) =>
        a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1
      )
    );
  }

  public unregisterSection(section: HTMLElement): void {
    this._sections.update((sections) => sections.filter((s) => s !== section));
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
