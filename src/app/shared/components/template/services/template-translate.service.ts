import { Injectable } from "@angular/core";
import { IAppConfig } from "data-models";
import { BehaviorSubject } from "rxjs";
import { AppConfigService } from "src/app/shared/services/app-config/app-config.service";
import { AsyncServiceBase } from "src/app/shared/services/asyncService.base";
import { AppDataService } from "src/app/shared/services/data/app-data.service";
import { LocalStorageService } from "src/app/shared/services/local-storage/local-storage.service";
import { FlowTypes } from "../models";

@Injectable({ providedIn: "root" })
/**
 * The template translate service handles changing template row values dependent on language.
 * It is assumed the only translatable column is the value column, and that all translations
 * are already pre-populated in the column (so just a case to return the current language field)
 */
export class TemplateTranslateService extends AsyncServiceBase {
  /**
   * Provide an observable so services can subscribe and respond to language changes
   * Formatted as country-language code, e.g. za-en
   **/
  app_language$ = new BehaviorSubject<string>(null);
  appFields: IAppConfig["APP_FIELDS"];
  appLanguages: IAppConfig["APP_LANGUAGES"];
  translation_strings = {};

  constructor(
    private localStorageService: LocalStorageService,
    private appDataService: AppDataService,
    private appConfigService: AppConfigService
  ) {
    super("Template Translate");
    this.registerInitFunction(this.init);
  }

  private async init() {
    this.ensureSyncServicesReady([
      this.localStorageService,
      this.appDataService,
      this.appConfigService,
    ]);
    this.subscribeToAppConfigChanges();
    const currentLanguage = this.localStorageService.getString(this.appFields.APP_LANGUAGE);
    if (currentLanguage) {
      await this.setLanguage(currentLanguage, false);
    } else {
      await this.setLanguage(this.appLanguages.default, true);
    }
  }

  get app_language() {
    return this.app_language$.value;
  }

  /** Set the local storage variable that tracks the app language */
  async setLanguage(code: string, updateDB = true) {
    if (code) {
      if (updateDB) {
        this.localStorageService.setString(this.appFields.APP_LANGUAGE, code);
      }
      const translationStrings = await this.appDataService.getTranslationStrings(code);
      this.translation_strings = translationStrings || {};
      // update observable for subscribers
      this.app_language$.next(code);
      // console.log("[Language Set]", code);
    }
  }

  /**
   * TODO - CC 2021-07-09 Update description following system updates
   * Take a template and return with value assigned to correct language translation
   * @param row template row where translatable value field formatted as:
   * ```
   * {
   *   value:{
   *     _translate: true,
   *     eng: 'Text in English',
   *     spa: 'Texto en Español',
   *     ...
   *   }
   * }
   * ```
   * Note - for improved efficiency rows with translatable data will usually have
   * a `translatedFields` property that lists keys for translation
   */
  translateRow(row: FlowTypes.TemplateRow = {} as any) {
    const translated = { ...row };
    // Case 1 - row with translate fields identified (e.g. template row)
    if (row._translations) {
      Object.keys(row._translations).forEach((field) => {
        translated[field] = this.translateValue(row[field]);
      });
      // Also assign as the base string for any fields that will be parsed dynamically
      if (row._dynamicFields) {
        translated._dynamicFields = this.translateDynamicFields(row._dynamicFields);
      }
    }
    // Case 2 - row value assigned from data list with translate fields
    const { value } = row;
    if (value && value._translations) {
      translated.value = this.translateRow(value);
    }
    // Note - there is a third case when row value assigned from calculation (e.g. data list child field)
    // but this is currently manually handled in the template-variables service as required
    return translated;
  }

  /**
   * As dynamic fields keep reference to initial full expressions that are used as part of evaluation,
   * also replace these references with translated ones
   */
  private translateDynamicFields(fields: FlowTypes.IDynamicField) {
    const translatedFields: FlowTypes.IDynamicField = {};
    // There are 2 cases to handle dependingt on whether the dynamic field represents
    // an array of dynamic evaluators or a further-nested dynamic field
    Object.entries(fields).forEach(([field, value]) => {
      if (Array.isArray(value)) {
        const dynamicRowEvaluators = value as FlowTypes.TemplateRowDynamicEvaluator[];
        translatedFields[field] = dynamicRowEvaluators.map((evaluator) => {
          evaluator.fullExpression = this.translateValue(evaluator.fullExpression);
          return evaluator;
        });
      } else {
        const nestedDynamic = value as FlowTypes.IDynamicField;
        translatedFields[field] = this.translateDynamicFields(nestedDynamic);
      }
    });
    return translatedFields;
  }

  public translateValue(value: any) {
    let translated = value;
    if (typeof value === "string" && this.translation_strings.hasOwnProperty(value)) {
      translated = this.translation_strings[value];
    } else {
      // console.warn("[Translation missing]", `[${this.app_language}] ${fieldTranslations.eng}`);
    }
    return translated;
  }

  subscribeToAppConfigChanges() {
    this.appConfigService.appConfig$.subscribe((appConfig: IAppConfig) => {
      this.appFields = appConfig.APP_FIELDS;
      this.appLanguages = appConfig.APP_LANGUAGES;
    });
  }
}
