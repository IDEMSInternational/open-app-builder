import fs from "fs-extra";
import path from "path";
import { logWarning, recursiveFindByExtension } from "../../../../utils";

/** A translated string from a `.po` file */
export interface IPoEntry {
  /** `msgctxt`, the flow_type of the string. Empty if not given */
  context: string;
  msgid: string;
  msgstr: string;
}

/**
 * Translated strings by language code, then context (flow_type), then source text.
 * Strings from `.po` files without a `msgctxt` are listed under an empty context
 */
export type ITranslationStrings = {
  [language: string]: { [context: string]: { [source: string]: string } };
};

/** Folder of translated `.po` files in an external deployment, with a subfolder per language */
export function getTranslatedFolder(externalSourcePath: string) {
  return path.resolve(externalSourcePath, "app_data", "translations", "translated");
}

/**
 * Load the translated strings of each language from `.po` files in `<folder>/<language>/`
 * (including subfolders). Untranslated (empty) and fuzzy strings are skipped
 */
export function loadTranslationStrings(folder?: string): ITranslationStrings {
  // Keys come from translated files, so use maps without a prototype (e.g. `__proto__` context)
  const strings: ITranslationStrings = Object.create(null);
  if (!folder || !fs.existsSync(folder)) return strings;
  for (const language of fs.readdirSync(folder)) {
    const languageFolder = path.resolve(folder, language);
    if (!fs.statSync(languageFolder).isDirectory()) continue;
    for (const filePath of recursiveFindByExtension(languageFolder, "po")) {
      for (const { context, msgid, msgstr } of parsePo(fs.readFileSync(filePath, "utf8"))) {
        strings[language] ??= Object.create(null);
        strings[language][context] ??= Object.create(null);
        strings[language][context][msgid] = msgstr;
      }
    }
  }
  return strings;
}

/**
 * The translation of a source string, matching its context (flow_type) if the `.po` file
 * gave one, or else any string without a context
 */
export function getTranslation(
  strings: ITranslationStrings | undefined,
  language: string,
  context: string,
  source: string
): string | undefined {
  const byContext = ownValue(strings, language);
  if (!byContext) return undefined;
  return (
    ownValue(ownValue(byContext, context), source) ?? ownValue(ownValue(byContext, ""), source)
  );
}

/** A value only if set on the object itself, so inherited properties (e.g. `toString`) are ignored */
function ownValue<T>(obj: { [key: string]: T } | undefined, key: string): T | undefined {
  return obj && Object.prototype.hasOwnProperty.call(obj, key) ? obj[key] : undefined;
}

/**
 * Parse the entries of a `.po` file. The header (empty msgid), untranslated, fuzzy and obsolete
 * (`#~`) entries are skipped. Plurals are not supported, only `msgstr[0]` is read
 */
export function parsePo(content: string): IPoEntry[] {
  const entries: IPoEntry[] = [];
  let entry: Partial<Record<"msgctxt" | "msgid" | "msgstr", string>> = {};
  let fuzzy = false;
  let field: "msgctxt" | "msgid" | "msgstr" | undefined;

  const finish = () => {
    const { msgctxt = "", msgid, msgstr } = entry;
    if (msgid && msgstr && !fuzzy) entries.push({ context: msgctxt, msgid, msgstr });
    entry = {};
    fuzzy = false;
    field = undefined;
  };

  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (line === "") {
      finish();
      continue;
    }
    if (line.startsWith("#")) {
      // A comment after the strings starts the next entry
      if (entry.msgid !== undefined) finish();
      if (line.startsWith("#,") && line.includes("fuzzy")) fuzzy = true;
      continue;
    }
    const keyword = /^(msgctxt|msgid_plural|msgid|msgstr(?:\[(\d+)\])?)\s+(".*")$/.exec(line);
    if (keyword) {
      const [, key, pluralIndex, quoted] = keyword;
      // A new entry can start without a blank line, with or without a msgctxt
      if (key === "msgctxt" && entry.msgid !== undefined) finish();
      if (key === "msgid" && entry.msgstr !== undefined) finish();
      if (key === "msgid_plural" || (pluralIndex !== undefined && pluralIndex !== "0")) {
        field = undefined;
        continue;
      }
      field = key.startsWith("msgstr") ? "msgstr" : (key as "msgctxt" | "msgid");
      entry[field] = unquote(quoted);
      continue;
    }
    if (line.startsWith('"') && field) {
      entry[field] += unquote(line);
      continue;
    }
    logWarning({ msg1: "Unrecognised line in po file, skipping", msg2: line });
  }
  finish();
  return entries;
}

/** Remove the quotes of a po string and replace escape sequences */
function unquote(quoted: string) {
  const inner = quoted.slice(1, -1);
  return inner.replace(/\\(.)/g, (_, char: string) => PO_ESCAPES[char] ?? char);
}

const PO_ESCAPES: Record<string, string> = { n: "\n", t: "\t", r: "\r", '"': '"', "\\": "\\" };
