import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { APP_CONSTANTS } from "src/app/data";
import { AppDataService } from "src/app/shared/services/data/app-data.service";
import { LocalStorageService } from "src/app/shared/services/local-storage/local-storage.service";
import { FlowTypes } from "../models";

const { APP_FIELDS, APP_LANGUAGES } = APP_CONSTANTS;

@Injectable({ providedIn: "root" })
/**
 * The template translate service handles changing template row values dependent on language.
 * It is assumed the only translatable column is the value column, and that all translations
 * are already pre-populated in the column (so just a case to return the current language field)
 */
export class TemplateTranslateService {
  /**
   * Provide an observable so services can subscribe and respond to language changes
   * Formatted as country-language code, e.g. za-en
   **/
  app_language$ = new BehaviorSubject<string>(null);

  translation_strings = {};

  private translatorModeEnabled: boolean;

  constructor(
    private localStorageService: LocalStorageService,
    private appDataService: AppDataService
  ) {
    this.translatorModeEnabled = this.isTranslatorModeEnabled();
  }

  public async init() {
    const currentLanguage = this.localStorageService.getString(APP_FIELDS.APP_LANGUAGE);
    if (currentLanguage) {
      await this.setLanguage(currentLanguage, false);
    } else {
      await this.setLanguage(APP_LANGUAGES.default, true);
    }
  }

  get app_language() {
    return this.app_language$.value;
  }

  /** Set the local storage variable that tracks the app language */
  async setLanguage(code: string, updateDB = true) {
    if (code) {
      if (updateDB) {
        this.localStorageService.setString(APP_FIELDS.APP_LANGUAGE, code);
      }
      const translationStrings = await this.appDataService.getTranslationStrings(code);
      this.translation_strings = translationStrings || {};
      // update observable for subscribers
      this.app_language$.next(code);
      console.log("[Language Set]", code);
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
    const shouldShowTranslatorModeText = this.shouldShowTranslatorModeText(row);

    const translated = { ...row };

    if (shouldShowTranslatorModeText) {
      (translated as any)._translation_before = `${row.value}`;
    }

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

    // Alter translated value in translator mode (before/after just for logging)
    if (shouldShowTranslatorModeText) {
      translated.value = this.getTranslatorModeText(translated);
      (translated as any)._translation_after = `${translated.value}`;
    }
    return translated;
  }

  public toggleTranslatorMode() {
    this.localStorageService.setString(
      APP_FIELDS.TRANSLATOR_MODE_ENABLED,
      `${!this.translatorModeEnabled}`
    );
    location.reload();
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
    if (typeof value === "string" && this.translation_strings.hasOwnProperty(value)) {
      return this.translation_strings[value];
    } else {
      return value;
    }
  }

  /***********************************************************************
   *            Translator Mode
   * TODO - implementation doesn't work very well only translates display rows
   * (not from global set, set_field etc.)
   **********************************************************************/

  /** Show translator mode text when enabled for select display components */
  private shouldShowTranslatorModeText(row: FlowTypes.TemplateRow) {
    if (!this.translatorModeEnabled) return false;
    if (row.exclude_from_translation) return false;
    if (row._dynamicFields?.value) return false;
    return ["button", "text", "title", "subtitle"].includes(row.type);
    // const displayComponent = TEMPLATE_COMPONENT_MAPPING[row.type];
    // return displayComponent ? true : false;
  }

  private isTranslatorModeEnabled() {
    const translatorMode = this.localStorageService.getString(APP_FIELDS.TRANSLATOR_MODE_ENABLED);
    return translatorMode === "true";
  }

  private getTranslatorModeText(row: FlowTypes.TemplateRow) {
    const { value } = row;
    // ignore empty strings
    if (!value) return value;
    // avoid retranslation
    if (value.includes("⦁")) return value;
    let translation = this.translation_strings[value];
    if (!translation) {
      // console.warn("[Translation missing]", value);
      translation = "(none)";
    }
    return `${translation} ⦁ \n${value}`;
  }
}
