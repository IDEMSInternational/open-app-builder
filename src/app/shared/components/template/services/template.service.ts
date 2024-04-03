import { Injectable } from "@angular/core";
import { LocalStorageService } from "src/app/shared/services/local-storage/local-storage.service";
import { AppDataService } from "src/app/shared/services/data/app-data.service";
import { DbService } from "src/app/shared/services/db/db.service";
import { FlowTypes } from "src/app/shared/model";
import { ModalController } from "@ionic/angular";
import {
  ITemplatePopupComponentProps,
  TemplatePopupComponent,
} from "../components/layout/popup/popup.component";
import { TemplateTranslateService } from "./template-translate.service";
import { IFlowEvent } from "data-models";
import { TemplateVariablesService } from "./template-variables.service";
import { TemplateFieldService } from "./template-field.service";
import { arrayToHashmap } from "src/app/shared/utils";
import { SyncServiceBase } from "src/app/shared/services/syncService.base";

@Injectable({
  providedIn: "root",
})
export class TemplateService extends SyncServiceBase {
  constructor(
    private localStorageService: LocalStorageService,
    private appDataService: AppDataService,
    private dbService: DbService,
    private modalCtrl: ModalController,
    private translateService: TemplateTranslateService,
    private templateVariablesService: TemplateVariablesService,
    private templateFieldService: TemplateFieldService
  ) {
    super("TemplateService");
    this.initialise();
    /**
     * Avoid initialisation logic and prefer to ensure services ready
     * on demand to avoid cyclic issues
     * Instead services are checked before public method calls
     * */
  }

  private async initialise() {
    // Update default values when language changed to allow for global translations
    this.translateService.app_language$.subscribe(async (lang) => {
      await this.initialiseDefaultFieldAndGlobals();
    });
  }

  private async ensurePublicServicesReady() {
    await this.ensureAsyncServicesReady([
      this.dbService,
      this.translateService,
      this.templateVariablesService,
      this.templateFieldService,
    ]);
    this.ensureSyncServicesReady([this.localStorageService, this.appDataService]);
  }

  /**
   * Load a specified template in a full-screen popup, dismissing on emit:completed/uncompleted
   * This differs from the pop_up action as it can be run independent of other templates (e.g. on startup)
   * It will not respond to nav actions so is only designed for basic templates
   * TODO - could be better-merged with template-nav service popup creation methods
   */
  async runStandaloneTemplate(
    templatename: string,
    options: Partial<ITemplatePopupComponentProps> = {}
  ) {
    await this.ensurePublicServicesReady();
    const props: ITemplatePopupComponentProps = {
      name: templatename,
      templatename,
      dismissOnEmit: true, // defaults will be overridden by passed options
      waitForDismiss: true,
      fullscreen: true,
      showCloseButton: true,
      ...options,
    };
    const modal = await this.modalCtrl.create({
      component: TemplatePopupComponent,
      cssClass: "template-popup-modal",
      componentProps: { props },
    });
    await modal.present();
    let dismissData: { emit_value?: string; emit_data?: any } = {};
    if (props.waitForDismiss) {
      const { data } = await modal.onDidDismiss();
      dismissData = data;
    }
    return { modal, ...dismissData };
  }

  /**
   * Iterate over global template rows, assigning `declare_field_default` values to fields if they do not already exist,
   * and `declare_global_constant` values to global regardless.
   * NOTE - globals will always show the latest value as defined in app sheets (with any translations processed)
   * NOTE - fields will not update if already set
   */
  public async initialiseDefaultFieldAndGlobals() {
    await this.ensurePublicServicesReady();
    // Evaluate overrides
    // TODO - should be generalised with other template and datalist retrieval methods
    const allGlobals = await this.appDataService.getSheetsWithData<FlowTypes.Global>("global");
    const baseGlobals = allGlobals.filter((flow) => !flow.hasOwnProperty("override_target"));
    const baseGlobalsHashmap = arrayToHashmap(baseGlobals, "flow_name");
    const globalOverrides = allGlobals.filter((flow) => flow.hasOwnProperty("override_target"));
    for (const flow of globalOverrides) {
      const satisfied = await this.templateVariablesService.evaluateConditionString(
        `${flow.override_condition}`
      );
      if (satisfied) {
        console.log(`[GLOBAL] override ${flow.override_target} -> ${flow.flow_name}`);
        baseGlobalsHashmap[flow.override_target] = flow;
      }
    }
    // Apply field default and global constants
    Object.values<any>(baseGlobalsHashmap).forEach((flow) => {
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
    await this.ensurePublicServicesReady();
    const foundTemplate = await this.appDataService.getSheet<FlowTypes.Template>(
      "template",
      templateName,
      is_override_target
    );
    // const foundTemplate: FlowTypes.Template = template.find((t) => t.flow_name === templateName);
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
  //   // write to local storage - this will cast to string
  //   this.localStorageService.setString("rp-contact-field." + key, value);

  //   // write to db - note this can handle more data formats but only string/number will be available to queries
  //   if (typeof value === "boolean") value = "value";
  //   const evt: IFlowEvent = {
  //     ...this.dbService.generateDBMeta(),
  //     event: "set",
  //     value,
  //     name: key,
  //     type: "contact_field" as any,
  //   };
  //   return this.dbService.table("data_events").add(evt);
  // }

  getGlobal(key: string): string {
    alert("TODO - getGlobal");
    return null as any;
    // // provide a fallback if the target global variable has never been set
    // if (!this.globals.hasOwnProperty(key)) {
    //   console.warn("global value not found for key:", key);
    //   return undefined;
    // }
    // let global = this.globals[key];
    // // HACK - ensure global value is translated (if exists)
    // // (could possibly be handled better from within translate service)
    // return this.translateService.translateValue(global.value);
  }

  // private setGlobal(row: FlowTypes.GlobalRow) {
  //   this.globals[row.name] = row;
  // }

  // /** Get the value of a data_list item as defined within templates */
  getDataListByPath(path: string) {
    // const data = getNestedProperty(this.appDataService.dataLists, path);
    // return data;
    // TODO
    alert("TODO - get datalist by path" + path);
    return null as any;
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
}

const NOT_FOUND_TEMPLATE = (name: string): FlowTypes.Template => ({
  flow_name: "Template_not_found",
  flow_type: "template",
  rows: [
    { type: "title", value: `Template "${name}" not found`, name: "title", _nested_name: "title" },
  ],
  status: "released",
});
