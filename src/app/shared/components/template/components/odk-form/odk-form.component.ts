import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import TEST_FORM_BASIC from "./test/form-basic.json";

import Events from "./libs/enketo/js/event";
import { Form } from "./libs/enketo/js/form";
import { TemplateBaseComponent } from "../base";

export interface IFormEntry {
  created: number;
  draft: boolean;
  enketoId: string;
  files: any[];
  instanceId: string;
  name: string;
  // TODO - check if actually updated
  updated: number;
  xml: string;
}

export interface IEventFormSaved {
  entry: IFormEntry;
}

@Component({
  selector: "tmpl-odk-form",
  templateUrl: "./odk-form.component.html",
  styleUrls: ["./odk-form.component.scss"],
})
/**
 * A lightweight port of enketo-core to render a form within an angular component
 *
 * NOTE - this component is also under development as part of an external repo,
 * and as such the implementation included may be lacking features
 *
 * It is preferable to import from external project when available to remove additional
 * imports as noted below
 *
 * Opt-Out (additional changes to make if removing component)
 * - Remove modules:
 *   jquery jquery-touchswipe mergexml/mergexml bootstrap-datepicker signature_pad html5sortable node-forge
 * - Remove js file import in tsconfig.app.json
 * - Reduce build budget styles 200kb -> 16kb
 * - Reduce build budget js 5MB -> 4MB
 */
export class TmplOdkFormComponent extends TemplateBaseComponent implements OnInit {
  /** HTML form template */
  @Input() form: string = TEST_FORM_BASIC.form;

  /** XML form model, as processed by an Enketo Transformer */
  @Input() model: string = TEST_FORM_BASIC.model;

  @ViewChild("formContainerEl", { static: true }) formContainerEl: ElementRef<HTMLDivElement>;

  private enketoForm: Form;

  ngOnInit(): void {
    this.loadForm();
  }

  public async save(opts = { draft: false }) {
    await this.setValue(this.xmlFormValue);
  }

  private get xmlFormValue() {
    return this.enketoForm.getDataStr();
  }

  private async handleEventDataUpdate(e: ReturnType<typeof Events.DataUpdate>) {
    await this.setValue(this.xmlFormValue);
  }

  private handleEventXmlFormChange(e: ReturnType<typeof Events.XFormsValueChanged>) {
    console.log("handle xml form change", e.detail);
    // Value saved in autoSave method of https://github.com/enketo/enketo-express/blob/master/public/js/src/module/controller-webform.js
    const formXML = this.xmlFormValue;
    console.log("XFormsValueChanged", { formXML });
  }

  /**
   * Load the form xml and data models and render intial form components
   * https://enketo.github.io/enketo-core/tutorial-00-getting-started.html
   */
  private loadForm() {
    const { form, model, formContainerEl } = this;
    console.log({ form, model, formContainerEl });
    if (form && model && formContainerEl) {
      this.formContainerEl.nativeElement.innerHTML = this.form;
      const formEl = this.formContainerEl.nativeElement.querySelector("form");
      if (formEl) {
        this.enketoForm = new Form(formEl, this.model, {});
        // Initialize the form and capture any load errors
        let loadErrors = this.enketoForm.init();
        if (loadErrors.length > 0) {
          console.error(loadErrors);
        }
        // If desired, scroll to a specific question with any XPath location expression,
        // and aggregate any loadErrors.
        loadErrors = loadErrors.concat(this.enketoForm.goTo("//repeat[3]/node"));

        // Additional events can be bound directly to form (as opposed to component-propogated)
        this.enketoForm.model.events.addEventListener(
          Events.DataUpdate().type,
          this.handleEventDataUpdate.bind(this)
        );

        // Extract updated form xml on change (triggered at document and form level)
        this.enketoForm.view.html.addEventListener(
          Events.XFormsValueChanged().type,
          this.handleEventXmlFormChange.bind(this)
        );
      }
    }
  }
}
