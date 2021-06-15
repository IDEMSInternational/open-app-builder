import { Injectable } from "@angular/core";
import { LocalStorageService } from "src/app/shared/services/local-storage/local-storage.service";
import { FlowTypes } from "../models";

const objectContructor = {}.constructor;
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

  constructor(private localStorageService: LocalStorageService) {
    this.app_language = localStorageService.getString(APP_LANGUAGE_FIELD) || DEFAULT_LANGUAGE;
  }

  /** Set the local storage variable that tracks the app language */
  setLanguage(code: string) {
    this.localStorageService.setString(APP_LANGUAGE_FIELD, code);
    this.app_language = code;
  }

  /**
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
   */
  translateRow(row: FlowTypes.TemplateRow) {
    const { value } = row;
    if (value && value.constructor === objectContructor && value._translate) {
      if (!value.hasOwnProperty(this.app_language)) {
        console.warn("[Translation missing]", `[${this.app_language}] ${row.value.eng}`, row);
      }
      return { ...row, value: value[this.app_language] };
    }
    return row;
  }
}
