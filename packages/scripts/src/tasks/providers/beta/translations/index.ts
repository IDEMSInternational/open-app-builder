import fs from "fs-extra";
import path from "path";
import { logOutput, recursiveFindByExtension } from "../../../../utils";
import { readExternalSourcePath } from "../deploymentConfig";
import { readFlowFiles } from "../processFlows";
import {
  extractTranslationEntries,
  IExtractOptions,
  ITranslationEntry,
  toSafeFileName,
} from "./extract";
import { toPot } from "./pot";

export * from "./extract";
export * from "./pot";
export * from "./po";

interface IUpdateTranslationsOptions extends IExtractOptions {
  /** External deployment folder. Defaults to the imported external source */
  externalSourcePath?: string;
  verbose?: boolean;
}

/**
 * Extract the strings to translate from the external deployment flows (`app_data/sheets`) and
 * write them as gettext templates to `app_data/translations/source/<language>/<file>.pot`,
 * replacing any previous output. See `extractTranslationEntries` for which strings are included
 * @returns the paths of the files written
 */
export function updateTranslations(options: IUpdateTranslationsOptions = {}) {
  const { verbose = false } = options;
  const externalSourcePath = options.externalSourcePath ?? readExternalSourcePath();
  const sheetsFolder = path.resolve(externalSourcePath, "app_data", "sheets");
  if (!fs.existsSync(sheetsFolder)) {
    throw new Error(`Flows folder not found in source path: ${sheetsFolder}`);
  }
  const { flowsByType } = readFlowFiles(recursiveFindByExtension(sheetsFolder, "json"), verbose);
  const entries = extractTranslationEntries(flowsByType, options);

  const targetFolder = path.resolve(externalSourcePath, "app_data", "translations", "source");
  fs.emptyDirSync(targetFolder);
  const written: string[] = [];
  for (const [language, files] of Object.entries(groupEntries(entries))) {
    for (const [file, fileEntries] of Object.entries(files)) {
      const filePath = path.resolve(targetFolder, toSafeFileName(language), `${file}.pot`);
      fs.outputFileSync(filePath, toPot(fileEntries));
      written.push(filePath);
      if (verbose)
        logOutput({ msg1: `${language}/${file}.pot`, msg2: `${fileEntries.length} strings` });
    }
  }
  logOutput({
    msg1: `Updated translation sources: ${entries.length} strings, ${written.length} files`,
    msg2: targetFolder,
  });
  return written;
}

/** Group entries by language then file */
function groupEntries(entries: ITranslationEntry[]) {
  const grouped: { [language: string]: { [file: string]: ITranslationEntry[] } } = {};
  for (const entry of entries) {
    grouped[entry.language] ??= {};
    grouped[entry.language][entry.file] ??= [];
    grouped[entry.language][entry.file].push(entry);
  }
  return grouped;
}
