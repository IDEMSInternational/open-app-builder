import { FlowTypes } from "data-models";
import {
  getFlowLanguage,
  isTrue,
  METADATA_ROW_ID,
  splitLanguageSuffix,
} from "../parsers/transforms";
import type { IFlowsByType } from "../processFlows";

/** File that strings from flows without a `flow_subtype` are written to */
export const MAIN_TRANSLATION_FILE = "main";

/** A source string to translate */
export interface ITranslationEntry {
  /** Language code of the source text, e.g. `eng` */
  language: string;
  /** Name of the file the string is written to, without extension, e.g. `main` */
  file: string;
  /** flow_type the string comes from, written as the gettext `msgctxt` */
  context: string;
  text: string;
}

export interface IExtractOptions {
  /**
   * Write strings from flows with a `flow_subtype` to a file named after the subtype, instead
   * of `main`
   */
  splitBySubtype?: boolean;
}

/**
 * Extract the source strings to translate from flows
 * - global: `value` of rows where `exclude_from_translation` is not true
 * - data_list: every column with a language suffix, e.g. `title::eng`
 * - template: `value` of rows where `include_in_translation` is true
 *
 * The language of a string is its column suffix (e.g. `value::spa`), or the flow `language`
 * (see `getFlowLanguage`). Only non-empty string values are extracted, and each string is
 * listed once per language, file and flow_type
 */
export function extractTranslationEntries(
  flowsByType: IFlowsByType,
  options: IExtractOptions = {}
): ITranslationEntry[] {
  const entries: ITranslationEntry[] = [];
  const seen = new Set<string>();
  const add = (entry: ITranslationEntry) => {
    if (!isTranslatableText(entry.text)) return;
    const key = JSON.stringify([entry.language, entry.file, entry.context, entry.text]);
    if (seen.has(key)) return;
    seen.add(key);
    entries.push(entry);
  };

  for (const flowType of ["data_list", "global", "template"] as const) {
    for (const flow of flowsByType[flowType] || []) {
      const file = getTranslationFile(flow, options);
      const language = getFlowLanguage(flow);
      for (const row of flow.rows || []) {
        for (const { column, text } of getRowStrings(flowType, row)) {
          const columnLanguage = splitLanguageSuffix(column)?.language ?? language;
          add({ language: columnLanguage, file, context: flowType, text });
        }
      }
    }
  }
  return entries;
}

/** The translation file for a flow's strings, see `IExtractOptions.splitBySubtype` */
export function getTranslationFile(flow: FlowTypes.FlowTypeBase, options: IExtractOptions = {}) {
  const subtype = typeof flow.flow_subtype === "string" ? flow.flow_subtype.trim() : "";
  if (!options.splitBySubtype || !subtype) return MAIN_TRANSLATION_FILE;
  return toSafeFileName(subtype);
}

/** Replace characters that are not safe in file and folder names, e.g. `a/b` => `a_b` */
export function toSafeFileName(name: string) {
  const safe = name.replace(/[\\/:*?"<>|]/g, "_");
  return safe === "." || safe === ".." ? "_" : safe;
}

/** Columns of a row to translate, with their text */
function getRowStrings(flowType: keyof IFlowsByType, row: Record<string, any>) {
  const strings: { column: string; text: any }[] = [];
  const valueColumns = () =>
    Object.keys(row).filter(
      (column) => column === "value" || splitLanguageSuffix(column)?.field === "value"
    );

  if (flowType === "global") {
    if (isTrue(row.exclude_from_translation)) return strings;
    for (const column of valueColumns()) strings.push({ column, text: row[column] });
  }
  if (flowType === "template") {
    if (!isTrue(row.include_in_translation)) return strings;
    for (const column of valueColumns()) strings.push({ column, text: row[column] });
  }
  if (flowType === "data_list") {
    if (row.id === METADATA_ROW_ID) return strings;
    for (const column of Object.keys(row)) {
      if (splitLanguageSuffix(column)) strings.push({ column, text: row[column] });
    }
  }
  return strings;
}

/** Only text containing more than placeholders (e.g. `@global.app_name`) is translated */
function isTranslatableText(text: any): text is string {
  if (typeof text !== "string") return false;
  return LETTER_OR_NUMBER_PATTERN.test(removePlaceholders(text));
}

/** Any letter or digit in any script. Built at runtime as the workflows tsconfig targets es5 */
const LETTER_OR_NUMBER_PATTERN = new RegExp("[\\p{L}\\p{N}]", "u");

/**
 * Parts of the text that should not be translated: references such as `@global.app_name` or
 * `@fields.name`, and template expressions such as `${local.name}`
 */
export function getPlaceholders(text: string): string[] {
  return text.match(PLACEHOLDER_PATTERN) || [];
}

const PLACEHOLDER_PATTERN = /@[A-Za-z_]\w*(?:\.\w+)*|\$\{[^}]*\}/g;

function removePlaceholders(text: string) {
  return text.replace(PLACEHOLDER_PATTERN, "");
}
