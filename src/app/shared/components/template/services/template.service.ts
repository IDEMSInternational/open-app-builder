import { Injectable } from "@angular/core";
import { LocalStorageService } from "src/app/shared/services/local-storage/local-storage.service";
import { GLOBAL, TEMPLATE } from "src/app/shared/services/data/data.service";
import { DbService } from "src/app/shared/services/db/db.service";
import { FlowTypes } from "src/app/shared/model";
import { BehaviorSubject } from "rxjs";
import { ModalController } from "@ionic/angular";
import { TemplatePopupComponent } from "../components/layout/popup";
import { TemplateTranslateService } from "./template-translate.service";
import { IFlowEvent } from "data-models/db.model";
import { TemplateVariablesService } from "./template-variables.service";
import { TemplateFieldService } from "./template-field.service";

@Injectable({
  providedIn: "root",
})
export class TemplateService {
  private themeValue = new BehaviorSubject("passive");
  currentTheme = this.themeValue.asObservable();
  constructor(
    private localStorageService: LocalStorageService,
    private dbService: DbService,
    private modalCtrl: ModalController,
    private translateService: TemplateTranslateService,
    private templateVariablesService: TemplateVariablesService,
    private templateFieldService: TemplateFieldService
  ) {}

  /** Initialise global and startup templates */
  async init() {
    // Re-initialise default field and globals on init in case sheets have been updated
    // TODO - ideally this should just be triggered on first launch of new app update
    this.initialiseDefaultFieldAndGlobals();
    // Update default values when language changed to allow for global translations
    this.translateService.app_language$.subscribe((lang) => {
      this.initialiseDefaultFieldAndGlobals();
    });
  }

  /**
   * Load a specified template in a full-screen popup, dismissing on emit:completed/uncompleted
   * This differs from the pop_up action as it can be run independent of other templates (e.g. on startup)
   * It will not respond to nav actions so is only designed for basic templates
   * TODO - could be better-merged with template-nav service popup creation methods
   */
  async runStandaloneTemplate(templatename: string) {
    const modal = await this.modalCtrl.create({
      component: TemplatePopupComponent,
      cssClass: "template-popup-modal",
      componentProps: { templatename, standalone: true },
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    return data;
  }

  /**
   * Iterate over global template rows, assigning `declare_field_default` values to fields if they do not already exist,
   * and `declare_global_constant` values to global regardless.
   * NOTE - globals will always show the latest value as defined in app sheets (with any translations processed)
   * NOTE - fields will not update if already set
   */
  private initialiseDefaultFieldAndGlobals() {
    GLOBAL.forEach((flow) => {
      flow.rows?.forEach((row) => {
        switch (row.type) {
          case "declare_field_default":
            if (this.localStorageService.getString("rp-contact-field." + row.name) === null) {
              this.templateFieldService.setField(row.name, row.value);
            }
            break;
          case "declare_global_constant":
            const translatedGlobal = this.translateService.translateRow(row as any);
            this.templateFieldService.setGlobal(translatedGlobal as any);
            break;
          default:
            console.warn(`[${row.type}] row type not supported in global template`);
            break;
        }
      });
    });
  }

  /**
   * Load a template by a given name. If overrides exist for the template they will be evaluated
   * and returned instead.
   * @param templateName name of template to load
   * @param is_override_target boolean (passed from row property) to identify if self has been overridden
   * (and could therefore lead to infinite loop overwise)
   */
  public async getTemplateByName(
    templateName: string,
    is_override_target: boolean
  ): Promise<FlowTypes.Template> {
    const foundTemplate: FlowTypes.Template = TEMPLATE.find((t) => t.flow_name === templateName);
    if (foundTemplate) {
      const overiddenTemplate = await this.getTemplateOverride(foundTemplate, is_override_target);
      // create a deep clone of the object to prevent accidental reference changes
      // assign a name (in case top-level template) and store breadcrumb path for nested
      // (NOTE - would no longer be required if reading in json objects instead of ts import)
      const template = JSON.parse(JSON.stringify(overiddenTemplate));
      return template;
    }
    // Template not found
    else {
      console.error(`[Template] - Not Found -`, templateName);
      return NOT_FOUND_TEMPLATE(templateName);
    }
  }

  /**
   * Check if target template contains any conditional overrides. Evaluate condition and override if satisfied.
   * @param isOverrideTarget indicate if self-referencing override target from override (prevent infinite loop)
   */
  private async getTemplateOverride(foundTemplate: FlowTypes.Template, isOverrideTarget?: boolean) {
    const { _overrides } = foundTemplate;
    if (_overrides && !isOverrideTarget) {
      for (const [templatename, condition] of Object.entries(_overrides)) {
        const satisfied = await this.templateVariablesService.evaluateConditionString(condition);
        if (satisfied) {
          // retrieve override template via main methods (avoid re-override by providing is_override_target)
          const overrideTemplate = await this.getTemplateByName(templatename, {
            is_override_target: true,
          } as any);
          // return if a template has been found
          if (overrideTemplate) {
            return overrideTemplate;
          }
        }
      }
    }
    return foundTemplate;
  }

  /** Record a template event to the database */
  recordEvent(template: FlowTypes.Template, event: "emit", value: any) {
    const { flow_name, db_ignore_events } = template;
    if (!db_ignore_events) {
      const evt: IFlowEvent = {
        ...this.dbService.generateDBMeta(),
        event,
        name: flow_name,
        type: "template",
        value,
      };
      return this.dbService.table("flow_events").add(evt);
    }
  }

  setTheme(template: FlowTypes.Template, event: "set_theme", value: any) {
    if (value && value.length) {
      const mainBgBodyColor = `var(--${
        value[0] === "active" ? "ion-main-bg-active" : "ion-main-bg-passive"
      })`;
      const dgBodyColor = `var(--${
        value[0] === "active" ? "ion-banner-secondary" : "ion-banner-primary"
      })`;
      document.body.style.setProperty("--ion-dg-bg-default", dgBodyColor);
      document.body.style.setProperty("--ion-background-color", mainBgBodyColor);
      this.themeValue.next(value[0]);
    }
  }
}

const NOT_FOUND_TEMPLATE = (name: string): FlowTypes.Template => ({
  flow_name: "Template_not_found",
  flow_type: "template",
  rows: [
    { type: "title", value: `Template "${name}" not found`, name: "title", _nested_name: "title" },
  ],
  status: "released",
});
