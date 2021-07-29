import { Injectable } from "@angular/core";
import { TRANSLATION_STRINGS } from "plh-data";
import { LocalStorageService } from "src/app/shared/services/local-storage/local-storage.service";
import { FlowTypes } from "../models";

// assign a local storage field that also matches lookup for use in @fields._app_language
// (might be changed in future to better indicate read-only field)
const APP_LANGUAGE_FIELD = "rp-contact-field._app_language";
const DEFAULT_LANGUAGE = "eng";

@Injectable({ providedIn: "root" })
/**
 * The template translate service handles changing template row values dependent on language.
 * It is assumed the only translatable column is the value column, and that all translations
 * are already pre-populated in the column (so just a case to return the current language field)
 */
export class TemplateTranslateService {
  app_language: string;
  translation_strings = {};

  constructor(private localStorageService: LocalStorageService) {
    const currentLanguage = localStorageService.getString(APP_LANGUAGE_FIELD);
    if (currentLanguage) {
      this.setLanguage(currentLanguage, false);
    } else {
      this.setLanguage(DEFAULT_LANGUAGE, true);
    }
  }

  /** Set the local storage variable that tracks the app language */
  setLanguage(code: string, updateDB = true) {
    if (code) {
      if (updateDB) {
        this.localStorageService.setString(APP_LANGUAGE_FIELD, code);
      }
      this.app_language = code;
      this.translation_strings = TRANSLATION_STRINGS[code] || {};
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
    const translated = { ...row };
    // Case 1 - row with translate fields identified (e.g. template row)
    if (row._translations) {
      Object.keys(row._translations).forEach((field) => {
        translated[field] = this.translateValue(row[field]);
      });
    }
    // Case 2 - row value assigned from data list with translate fields
    // TODO - confirm if working for new implementation
    const { value } = row;
    if (value && value._translatedFields) {
      console.warn("[Translations] - requires implementation", value);
      // Object.keys(value._translatedFields).forEach((field) => {
      //   translated.value[field] = this.translateValue(row.value._translatedFields[field]);
      // });
    }
    // Note - there is a third case when row value assigned from calculation (e.g. data list child field)
    // but this is currently manually handled in the template-variables service as required
    return translated;
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
}
