import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";

import Events from "./libs/enketo/js/event";
import { Form } from "./libs/enketo/js/form";
import { TemplateBaseComponent } from "../base";
import { TemplateAssetService } from "../../services/template-asset.service";

/** Enketo-transformed form representation */
interface IEnketoFormData {
  enketoId: string;
  externalData: [];
  /** html string representation of form */
  form: string;
  hash: string;
  languageMap: {};
  maxSize: number;
  media: {};
  /** xml string representation of model */
  model: string;
  theme: "grid";
}

interface IFormEntry {
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

interface IEventFormSaved {
  entry: IFormEntry;
}

interface IODKFormComponentParameters {
  /**
   * Path to asset file containing form data in enketo-transformed json format
   */
  form_asset?: string;
}

@Component({
  selector: "tmpl-odk-form",
  templateUrl: "./odk-form.component.html",
  styleUrls: ["./odk-form.component.scss"],
  encapsulation: ViewEncapsulation.ShadowDom,
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
  /** Authoring parameters */
  public parameter_list: IODKFormComponentParameters;

  /**
   * Form container element binding to render form
   * @ignore
   */
  @ViewChild("formContainerEl", { static: true }) formContainerEl: ElementRef<HTMLDivElement>;

  constructor(private templateAssetService: TemplateAssetService) {
    super();
  }

  ngOnInit() {
    this.processParameterList();
  }

  private async processParameterList() {
    this.parameter_list = this._row.parameter_list || ({} as any);
    // load form from form_asset parameter
    const { form_asset } = this.parameter_list;
    if (!form_asset) {
      console.error("[odk_form] form_asset parameter required");
      return;
    }
    const formData: IEnketoFormData = await this.templateAssetService.fetchAsset(form_asset);
    if (!formData) {
      console.error("[odk_form] form_asset does not exist");
      return;
    }
    this.loadForm(formData);
  }

  private enketoForm: Form;

  public async save(opts = { draft: false }) {
    await this.setValue(this.xmlFormValue);
    await this.triggerActions("changed");
  }

  private get xmlFormValue() {
    return this.enketoForm.getDataStr();
  }

  private async handleEventDataUpdate(e: ReturnType<typeof Events.DataUpdate>) {
    await this.setValue(this.xmlFormValue);
    await this.triggerActions("changed");
  }

  private async handleEventXmlFormChange(e: ReturnType<typeof Events.XFormsValueChanged>) {
    // Value saved in autoSave method of https://github.com/enketo/enketo-express/blob/master/public/js/src/module/controller-webform.js
    // await this.setValue(this.xmlFormValue);
  }

  /**
   * Load the form xml and data models and render intial form components
   * https://github.com/enketo/enketo-core#usage-as-a-library
   */
  private loadForm(formData: IEnketoFormData) {
    const { formContainerEl } = this;
    const { form, model } = formData;
    console.log({ form, model, formContainerEl });
    if (form && model && formContainerEl) {
      this.formContainerEl.nativeElement.innerHTML = form;
      const formEl = this.formContainerEl.nativeElement.querySelector("form");
      if (formEl) {
        this.enketoForm = new Form(formEl, model, {});
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
