import { Injectable } from "@angular/core";
import { LocalStorageService } from "src/app/shared/services/local-storage/local-storage.service";
import { GLOBAL, PLHDataService, TEMPLATE } from "src/app/shared/services/data/data.service";
import { DbService } from "src/app/shared/services/db/db.service";
import { FlowTypes } from "src/app/shared/model";
import { booleanStringToBoolean, getNestedProperty } from "src/app/shared/utils";
import { BehaviorSubject } from "rxjs";
import { ModalController } from "@ionic/angular";
import { TemplatePopupComponent } from "../components/layout/popup";
import { TemplateTranslateService } from "./template-translate.service";
import { IFlowEvent } from "packages/data-models/db.model";

@Injectable({
  providedIn: "root",
})
export class TemplateService {
  globals: { [name: string]: FlowTypes.GlobalRow } = {};
  private themeValue = new BehaviorSubject("passive");
  currentTheme = this.themeValue.asObservable();
  constructor(
    private localStorageService: LocalStorageService,
    private dataService: PLHDataService,
    private dbService: DbService,
    private modalCtrl: ModalController,
    private translateService: TemplateTranslateService
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
              this.setField(row.name, row.value);
            }
            break;
          case "declare_global_constant":
            const translatedGlobal = this.translateService.translateRow(row as any);
            this.setGlobal(translatedGlobal as any);
            break;
          default:
            console.warn(`[${row.type}] row type not supported in global template`);
            break;
        }
      });
    });
  }

  public getTemplateByName(templateName: string): FlowTypes.Template {
    const foundTemplate: FlowTypes.Template = TEMPLATE.find((t) => t.flow_name === templateName);
    if (foundTemplate) {
      // create a deep clone of the object to prevent accidental reference changes
      // assign a name (in case top-level template) and store breadcrumb path for nested
      // (NOTE - would no longer be required if reading in json objects instead of ts import)
      const template = JSON.parse(JSON.stringify(foundTemplate));
      return template;
    }
    // Template not found
    else {
      console.error(`[Template] - Not Found -`, templateName);
      return NOT_FOUND_TEMPLATE(templateName);
    }
  }

  /**
   * Retrieve fields from localstorage. These are automatically prefixed with 'rp-contact-field'
   * and will be returned as string or boolean
   * TODO - ideally showWarnings should be linked to some sort of debug mode
   */
  getField(key: string, showWarnings = true) {
    let val: any = this.localStorageService.getString("rp-contact-field." + key);
    // provide a fallback if the target variable does not exist in local storage
    if (val === null && showWarnings) {
      // console.warn("field value not found for key:", key);
      val = undefined;
    }
    // convert boolean strings if required
    val = booleanStringToBoolean(val);
    // convert undefined string to undefined type
    if (val === "undefined") val = undefined;
    // console.log("[Field Retrieved]", key, val);
    return val;
  }

  /**
   * Store a contact field in localstorage and create a backup also in the database
   *
   * @remark whilst writing to the db is an async event, the data will be immediately
   * available in local storage so does not require await for further processing
   * */
  setField(key: string, value: string) {
    if (typeof value === "object") {
      console.warn("Warning - expected string field but received", { key, value });
      try {
        value = JSON.stringify(value);
      } catch (error) {
        console.warn("string conversion failed", error);
      }
    }
    // write to local storage - this will cast to string
    this.localStorageService.setString("rp-contact-field." + key, value);

    // write to db - note this can handle more data formats but only string/number will be available to queries
    if (typeof value === "boolean") value = "value";
    const evt: IFlowEvent = {
      ...this.dbService.generateDBMeta(),
      event: "set",
      value,
      name: key,
      type: "contact_field" as any,
    };
    return this.dbService.table("data_events").add(evt);
  }

  getGlobal(key: string): string {
    // provide a fallback if the target global variable has never been set
    if (!this.globals.hasOwnProperty(key)) {
      console.warn("global value not found for key:", key);
      return undefined;
    }
    let global = this.globals[key];
    // HACK - ensure global value is translated (if exists)
    // (could possibly be handled better from within translate service)
    return this.translateService.translateValue(global.value);
  }

  private setGlobal(row: FlowTypes.GlobalRow) {
    this.globals[row.name] = row;
  }

  /** Get the value of a data_list item as defined within templates */
  getDataListByPath(path: string) {
    const data = getNestedProperty(this.dataService.dataLists, path);
    return data;
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
