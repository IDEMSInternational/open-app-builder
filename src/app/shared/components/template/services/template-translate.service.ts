import { Injectable, WritableSignal, effect, signal } from "@angular/core";
import { IAppConfig } from "data-models";
import { BehaviorSubject } from "rxjs";
import { AppConfigService } from "src/app/shared/services/app-config/app-config.service";
import { AsyncServiceBase } from "src/app/shared/services/asyncService.base";
import { AppDataService } from "src/app/shared/services/data/app-data.service";
import { LocalStorageService } from "src/app/shared/services/local-storage/local-storage.service";
import { FlowTypes } from "../models";
import { isObjectLiteral } from "packages/shared/src/utils/object-utils";

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
  appLanguages: IAppConfig["APP_LANGUAGES"];
  appLanguagesMeta: IAppConfig["APP_LANGUAGES_META"];
  languageDirection: WritableSignal<"ltr" | "rtl"> = signal("ltr");
  translation_strings = {};

  constructor(
    private localStorageService: LocalStorageService,
    private appDataService: AppDataService,
    private appConfigService: AppConfigService
  ) {
    super("Template Translate");
    this.registerInitFunction(this.init);

    effect(() => {
      // persist language direction to authoring field
      this.localStorageService.setProtected("APP_LANGUAGE_DIRECTION", this.languageDirection());
    });
  }

  private async init() {
    this.ensureSyncServicesReady([
      this.localStorageService,
      this.appDataService,
      this.appConfigService,
    ]);
    this.subscribeToAppConfigChanges();
    const currentLanguage = this.localStorageService.getProtected("APP_LANGUAGE");
    if (currentLanguage) {
      await this.setLanguage(currentLanguage, false);
    } else {
      await this.setLanguage(this.appLanguages.default, true);
    }
  }

  get app_language() {
    return this.app_language$.value;
  }

  /**
   * Extracts the two-letter language code from a given country language string.
   * Two-letter ISO 639-1 Codes: https://www.loc.gov/standards/iso639-2/php/code_list.php
   * @param {string} languageCode Country language code from in `xx_yy` format, where `yy` is the two-letter language code
   * @returns {string} The extracted two-letter language code, e.g. `yy`, or the original country language code if the format is invalid
   */
  get app_language_code() {
    const parts = this.app_language.split("_");
    if (parts.length === 2 && parts[1].length === 2) {
      return parts[1];
    }
    // Return original language code if the format is invalid
    return this.app_language;
  }

  /** Set the local storage variable that tracks the app language */
  async setLanguage(code: string, updateDB = true) {
    if (code) {
      console.log("[SET LANGUAGE]", code);
      if (updateDB) {
        this.localStorageService.setProtected("APP_LANGUAGE", code);
      }
      const translationStrings = await this.appDataService.getTranslationStrings(code);
      this.translation_strings = translationStrings || {};
      // update observable for subscribers
      this.app_language$.next(code);
      // update language direction signal
      this.languageDirection.set(this.appLanguagesMeta?.[code]?.rtl ? "rtl" : "ltr");
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
  translateRow(row: FlowTypes.TemplateRow = {} as any): FlowTypes.TemplateRow {
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
    if (value && isObjectLiteral(value) && (value as any)._translations) {
      translated.value = this.translateRow(value as any) as any;
    }
    // Note - there is a third case when row value assigned from calculation (e.g. data list child field)
    // but this is currently manually handled in the template-variables service as required
    return translated;
  }

  /**
   * Translate all rows from a data_list. Uses `_translatedFields` metadata to determine which columns
   * require translation, extracted from names with suffix `::eng`
   *
   * NOTE - this method is currently only used by data-items as regular processor translates after parsing
   * into template, where translateRow method can be used
   */
  public translateDataListRows(rows: FlowTypes.Data_listRow[] = []) {
    if (rows.length === 0) return rows;
    // use first row to identify list of fields for translation
    const [{ _translatedFields }] = rows;
    if (!_translatedFields) return rows;
    const translateKeys = Object.keys(_translatedFields);
    // translate rows
    return rows.map((row) => {
      for (const key of translateKeys) {
        const sourceText = row[key];
        // TODO - confirm whether potential cases that list includes non-text entries
        if (typeof sourceText === "string" && sourceText in this.translation_strings) {
          row[key] = this.translation_strings[sourceText];
        }
      }
      return row;
    });
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
    if (typeof value === "string" && this.translation_strings?.hasOwnProperty(value)) {
      translated = this.translation_strings[value];
    } else {
      // console.warn("[Translation missing]", `[${this.app_language}] ${fieldTranslations.eng}`);
    }
    return translated;
  }

  /**
   * Translate a value to a target language, not necessarily the app language.
   * @param value - The value to translate.
   * @param targetLanguageCode - The language code for the target language.
   * @param currentLanguageCode - The language code for the current language, used for reverse lookup if target language is default.
   * @returns The translated value.
   */
  public async translateValueToLanguage(value: any, languageCode: string) {
    if (typeof value !== "string") return value;
    const translationStrings = await this.appDataService.getTranslationStrings(languageCode);
    if (!translationStrings) {
      console.error(`[TRANSLATE] - No translations found for ${languageCode}`);
      return value;
    }
    return translationStrings.hasOwnProperty(value) ? translationStrings[value] : value;
  }

  private subscribeToAppConfigChanges() {
    this.appConfigService.appConfig$.subscribe((appConfig: IAppConfig) => {
      this.appLanguages = appConfig.APP_LANGUAGES;
      this.appLanguagesMeta = appConfig.APP_LANGUAGES_META;
    });
  }
}
