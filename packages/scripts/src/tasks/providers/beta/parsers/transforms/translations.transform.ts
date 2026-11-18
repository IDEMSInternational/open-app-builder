import { getTranslation, ITranslationStrings } from "../../translations/po";

/**
 * Translations (beta sync) - work in progress
 *
 * Each flow can set the language of its authored text with a `language` column in the
 * `==content_list==`. A column can override this with a language suffix, e.g. `title::eng`.
 * The suffix is removed from the column name, and each column's text is recorded by language
 * in the row's `_translatedFields`, e.g. `{ title: { eng: "Hello", spa: "Hola" } }`, along with
 * any translations from the external `app_data/translations/translated/<language>/*.po` files
 *
 * TODO - next steps:
 * - decide which other unsuffixed columns are translatable (e.g. data list text columns)
 * - `_list` columns are parsed after this transform, so `_translatedFields` holds the
 *   unparsed list strings
 * - select the language at runtime from `_translatedFields`
 */

/** Language of unsuffixed columns when a flow does not set `language` */
export const DEFAULT_LANGUAGE = "eng";

/**
 * Column name ending in a language code, e.g. `title::eng` or `title::kw_ar`. The code must be
 * short, so other uses of `::` (e.g. `fields::favourite`) are not treated as languages
 */
const LANGUAGE_SUFFIX_PATTERN = /^(.+)::([a-z]{2,3}(?:_[a-z]{2,3})?)$/;

/** Text of each translated column, by language code */
export type ITranslatedFields = { [field: string]: { [language: string]: any } };

export interface IAssignTranslatedFieldsOptions {
  /** Translated strings to add for each language, see `loadTranslationStrings` */
  translations?: ITranslationStrings;
  /** flow_type of the row, used to match the `msgctxt` of translated strings */
  context?: string;
  /** Unsuffixed columns to translate, e.g. `value` of a template row */
  translatableFields?: string[];
}

/**
 * The language of a flow's unsuffixed columns, from its `language` content list column.
 * Not yet part of the flow typings, as it is only used by the beta sync
 */
export function getFlowLanguage(flow: object) {
  const { language } = flow as { language?: unknown };
  const trimmed = typeof language === "string" ? language.trim() : "";
  return trimmed || DEFAULT_LANGUAGE;
}

/** Split a column name with a language suffix, e.g. `title::eng` => `{ field: "title", language: "eng" }` */
export function splitLanguageSuffix(column: string) {
  const match = LANGUAGE_SUFFIX_PATTERN.exec(column);
  if (!match) return undefined;
  const [, field, language] = match;
  return { field, language };
}

/** Checkbox and text values of TRUE from sheets, e.g. `include_in_translation` */
export function isTrue(value: any) {
  return value === true || (typeof value === "string" && value.trim().toLowerCase() === "true");
}

/**
 * Remove language suffixes from column names, and record the text of translatable columns by
 * language in `_translatedFields`. The column keeps the text in the flow language, or if there
 * is none, the first language given
 * - an unsuffixed column is in the flow language (`defaultLanguage`)
 * - a suffixed column for the flow language replaces the unsuffixed one
 * - empty suffixed columns are ignored
 * - translations are added for languages without authored text, matching any authored text
 *   of the column (see `getTranslation`)
 */
export function assignTranslatedFields<T extends Record<string, any>>(
  row: T,
  defaultLanguage = DEFAULT_LANGUAGE,
  options: IAssignTranslatedFieldsOptions = {}
): T {
  const { translations, context = "", translatableFields = [] } = options;
  const byField: ITranslatedFields = {};
  // Rebuilt in column order, so a suffixed column keeps its position under the base name
  const parsed: Record<string, any> = {};
  let hasSuffixedColumns = false;
  for (const [column, value] of Object.entries(row)) {
    const suffix = splitLanguageSuffix(column);
    if (!suffix) {
      parsed[column] = value;
      continue;
    }
    hasSuffixedColumns = true;
    const { field, language } = suffix;
    if (!(field in parsed)) parsed[field] = row[field];
    if (isEmpty(value)) continue;
    byField[field] = { ...byField[field], [language]: value };
  }
  for (const field of translatableFields) {
    if (!isEmpty(row[field])) byField[field] ??= {};
  }
  if (!hasSuffixedColumns && !hasKeys(byField)) return row;

  for (const [field, byLanguage] of Object.entries(byField)) {
    if (!isEmpty(row[field])) byLanguage[defaultLanguage] ??= row[field];
    parsed[field] = byLanguage[defaultLanguage] ?? Object.values(byLanguage)[0];
    addTranslations(byLanguage, translations, context);
  }
  // Remove fields that only had empty suffixed columns
  for (const [field, value] of Object.entries(parsed)) {
    if (value === undefined) delete parsed[field];
  }
  if (hasKeys(byField)) {
    parsed._translatedFields = { ...row._translatedFields, ...byField };
  }
  return parsed as T;
}

/** Add the translation of a column's authored text for each language that has none */
function addTranslations(
  byLanguage: { [language: string]: any },
  translations: ITranslationStrings | undefined,
  context: string
) {
  if (!translations) return;
  const sources = Object.values(byLanguage).filter((v): v is string => typeof v === "string");
  for (const language of Object.keys(translations)) {
    if (language in byLanguage) continue;
    for (const source of sources) {
      const translated = getTranslation(translations, language, context, source);
      if (translated !== undefined) {
        byLanguage[language] = translated;
        break;
      }
    }
  }
}

function isEmpty(value: any) {
  return value === undefined || value === null || value === "";
}

function hasKeys(obj: object) {
  return Object.keys(obj).length > 0;
}
