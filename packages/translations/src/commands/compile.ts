import { Command } from "commander";
import fs from "fs-extra";
import path from "path";
import { FlowTypes } from "data-models";
import { checkInputOutputDirs, outputErrorMessage, recursiveFindByExtension } from "../utils";

const program = new Command("compile");

export default program
  .description("Generate files for translation")
  .requiredOption(
    "-i, --input <input>",
    "Source folder for input json files, relative to translations folder. Default ./examples/source",
    (v) => path.resolve(process.cwd(), v),
    path.resolve(process.cwd(), "./examples/source")
  )
  .requiredOption(
    "-o, --output [output]",
    "Target folder for compiled json files, relative to translations folder. Default ./examples/compiled",
    (v) => path.resolve(process.cwd(), v),
    path.resolve(process.cwd(), "./examples/compiled")
  )
  .requiredOption(
    "-t, --translations [translations]",
    "Target folder containing translated sourceText json files, relative to translations folder. Default ./examples/translations",
    (v) => path.resolve(process.cwd(), v),
    path.resolve(process.cwd(), "./examples/translations")
  )
  .action((opts) => {
    compileTranslations(opts.input, opts.translations, opts.output);
  });

/**
 * Main function - Compile a masterlist of all translation strings and used to
 * replace text from input files
 **/
function compileTranslations(inDir: string, translationsDir: string, outDir: string) {
  checkInputOutputDirs(inDir, path.resolve(outDir, "strings"));
  checkInputOutputDirs(translationsDir, path.resolve(outDir, "jsons"));
  const { translationsByCode } = compileTranslationStrings(translationsDir, outDir);
  populateTranslations(inDir, outDir, translationsByCode);
  // outputCompleteMessage("Translations Compiled", outDir);
}

/**
 * Takes a list of all translation entry jsons and compiles into single list of strings
 * @returns translationsByCode - json object with strings by lang code
 * ```
 * {
 *  "esp":{
 *    "How are you feeling today?": "¿Cómo te sientes hoy?"
 *  },
 * "eng":{
 *    "How are you feeling today?": "How are you feeling today?"
 *  }
 * }
 * ```
 * @returns translationsCombined - json object with translations by sourceText
 * ```
 * {
 *   "How are you feeling today?":{
 *      "eng": "How are you feeling today?",
 *      "esp": "¿Cómo te sientes hoy?"
 *    }
 * }
 * ```
 **/
function compileTranslationStrings(translationsDir: string, outDir: string) {
  // Create masterlist of all translations strings
  const translationsCombined: ITranslationsCombined = {};
  const translationsByCode: ITranslationsByCode = {};
  const translationsFiles = recursiveFindByExtension(translationsDir, "json");
  for (const filepath of translationsFiles) {
    const [, langCode] = path.basename(filepath, ".json").split(".");
    if (!langCode) {
      outputErrorMessage(
        "Translations file does not have language code in filename (e.g. translated.esp.json)",
        filepath
      );
    }
    if (!translationsByCode[langCode]) {
      translationsByCode[langCode] = {};
    }

    const translationsEntries: ITranslationEntry[] = fs.readJSONSync(filepath);
    translationsEntries.forEach((entry) => {
      const { SourceText, text } = entry;
      translationsByCode[langCode][SourceText] = text;
      if (!translationsCombined[SourceText]) {
        translationsCombined[SourceText] = {};
      }
      translationsCombined[SourceText][langCode] = text;
    });
  }
  // Handle output files
  // const indexOutput = path.resolve(outDir, "index.ts");
  // fs.createFileSync(indexOutput);
  for (const [langCode, strings] of Object.entries(translationsByCode)) {
    const stringsOutput = path.resolve(outDir, "strings", `${langCode}.json`);
    fs.writeFileSync(stringsOutput, JSON.stringify(strings, null, 2));
    // fs.appendFileSync(indexOutput, `import ${langCode} from "./strings/${langCode}";\r\n`);
  }
  const combinedOutput = path.resolve(outDir, "strings", `_combined.json`);
  fs.writeFileSync(combinedOutput, JSON.stringify(translationsCombined, null, 2));
  // fs.appendFileSync(
  //   indexOutput,
  //   `export const TRANSLATION_STRINGS = {${Object.keys(translationsByCode).join(",")}} `
  // );
  return { translationsCombined, translationsByCode };
}

/**
 *
 */
function populateTranslations(inDir: string, outDir: string, strings: ITranslationsByCode) {
  const inputFiles = recursiveFindByExtension(inDir, "json");
  for (const filepath of inputFiles) {
    const inputEntries: IInputEntry[] = fs.readJSONSync(filepath);
    const translatedEntries: IInputEntry[] = [];
    for (let entry of inputEntries) {
      const { flow_type, rows } = entry;
      // Handle text replacements. For data_lists this can be any column, otherwise assume
      // only value column to replace recursively within rows.
      const translatedFields = getTranslatedFields(flow_type, rows);
      if (translatedFields.length > 0) {
        entry = applyStringTranslations(entry, translatedFields, strings);
      }
      translatedEntries.push(entry);
    }
    const relativePath = path.relative(inDir, filepath);
    const outputFilepath = path.resolve(outDir, "jsons", relativePath);
    fs.ensureDirSync(path.dirname(outputFilepath));
    fs.writeFileSync(outputFilepath, JSON.stringify(translatedEntries, null, 2));
  }
}

function applyStringTranslations(
  row: any,
  translatedFields: string[],
  translationsByCode: ITranslationsByCode
) {
  let translated: any = {};
  const hasChildRows = row.hasOwnProperty("rows");
  const langCodes = Object.keys(translationsByCode);
  Object.entries(row).forEach(([field, value]) => {
    // default keep original
    translated[field] = row[field];
    // handle translations from list
    if (field === "rows" && Array.isArray(value)) {
      translated[field] = value.map((v) =>
        applyStringTranslations(v, translatedFields, translationsByCode)
      );
    } else {
      // handle all other fields
      // (although skip if parent row.rows exists as likely top-level or no translation required)
      if (translatedFields.includes(field) && typeof value === "string" && !hasChildRows) {
        if (!translated.hasOwnProperty("_translations")) {
          translated["_translations"] = {};
        }
        translated["_translations"][field] = {};
        // mark which translations exist for the string
        langCodes.forEach((code) => {
          const hasTranslation = translationsByCode[code][value] ? true : false;
          if (hasTranslation) {
            translated["_translations"][field][code] = hasTranslation;
          }
        });
      }
    }
  });
  return translated;
}

/** Get a list of columns to translate depending on flow_type */
function getTranslatedFields(flow_type: FlowTypes.FlowType, rows: any[] = []) {
  switch (flow_type) {
    case "template":
      return ["value"];
    case "global":
      return ["value"];
    case "tour":
      return ["title", "message_text"];
    // data_lists have to iterate through all data rows to check for fields previously
    // marked for translation during parsing. This is a bit inefficient, but necessary as jsons will
    // omit empty columns and so translatable fields will be missing from a row if empty
    case "data_list":
      let translatedFields: any = {};
      rows.forEach((row) => {
        const markedFields = Object.keys(row._translatedFields || {});
        markedFields.forEach((field) => {
          translatedFields[field] = true;
        });
      });
      return Object.keys(translatedFields);
    // skip translations for other types
    default:
      return [];
  }
}

interface ITranslationEntry {
  SourceText: string;
  text: string;
  type: string;
}

type ITranslationsByCode = { [langCode: string]: { [sourceText: string]: string } };
type ITranslationsCombined = { [sourceText: string]: { [langCode: string]: string } };

/** Input entries are the same as data flows, with a `flow_type` and child `rows` */
type IInputEntry = FlowTypes.FlowTypeWithData;
