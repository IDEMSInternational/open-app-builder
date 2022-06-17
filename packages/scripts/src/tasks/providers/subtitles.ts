import fs from "fs";
import * as path from "path";
import parser from "subtitles-parser-vtt";
import { ROOT_DIR } from "../../paths";
import { recursiveFindByExtension, logError, logOutput, promptOptions } from "../../utils";
import { TRANSLATIONS_CONTENT_LIST } from "../../../../app-data/translations";

// This is an interim solution for manually generating translated .vtt files,
// to be used pending reworking the translations repo/pipeline to handle assets more generally
// Generated files must be manually added to Google Drive
const translateAllVttFilesAndSave = async (
  translationsPath: string,
  assetsFolder: string,
  assetsSubpath?: string,
  languageCode?: string
) => {
  const allLanguageCodes = await Object.keys(TRANSLATIONS_CONTENT_LIST);
  if (!languageCode) {
    languageCode = await promptOptions(
      allLanguageCodes,
      "Select a target language for which the translated strings exist"
    );
  }
  const vttFilepaths = findVttFiles(assetsFolder, assetsSubpath);
  const outputFiles = [];
  for (const vttFilepath of vttFilepaths) {
    const vttJson = await vttToJson(vttFilepath);
    const translatedJson = await translateJson(vttJson, languageCode, translationsPath);
    const outputPath = await saveJsonToVtt(vttFilepath, translatedJson, languageCode, assetsFolder);
    outputFiles.push(outputPath);
  }
  if (outputFiles.length) {
    logOutput({
      msg1: "Translated .vtt files generated",
      msg2: "Translated files can be found at the path(s) below. Please manually add to Google Drive in the respective folder(s)",
    });
    console.log(outputFiles);
  } else {
    logError({
      msg1: "No files generated",
    });
  }
};

// Looks in assets folder for .vtt files, converts them to json
// and saves the result in the translationSourcesStrings path,
// ready to be sent to the translation system
const copyVttFilesForTranslation = async (
  assetsFolder: string,
  assetsSubpath: string,
  translationSourceStringsPath: string
) => {
  const vttFilepaths = findVttFiles(assetsFolder, assetsSubpath);
  for (const vttFile of vttFilepaths) {
    await vttToJsonFile(vttFile, translationSourceStringsPath);
  }
};

const findVttFiles = (sourceFolder, subpath?: string) => {
  const folderPath = subpath ? path.join(sourceFolder, subpath) : sourceFolder;
  const result = recursiveFindByExtension(folderPath, "vtt");
  if (!result.length) {
    logError({
      msg1: "No files found",
      msg2: "No VTT files found in target folder",
    });
  }
  return result;
};

const vttToJson = async (sourcePath: string) => {
  const vtt = fs.readFileSync(sourcePath).toString();
  const data = parser.fromVtt(vtt);
  return data;
};

// Without access to the translate service from within these workflows,
// this hack applies the translations to a subtitles json specifically
const translateJson = async (data, languageCode, translationsPath) => {
  const translationStringsPath = path.join(translationsPath, languageCode, "strings.json");
  const translationStrings = JSON.parse(fs.readFileSync(translationStringsPath).toString());
  for (const cue of data) {
    const translatedString = translationStrings[cue.text];
    if (translatedString === undefined) {
      return logError({
        msg1: "Unable to translate",
        msg2: `Translations could not be applied. Please make sure "${languageCode}" is a valid language code for which translations exist for all strings in this .vtt file.`,
      });
    }
    cue.text = translatedString;
  }
  return data;
};

const saveJsonToVtt = async (vttFilepath, data, languageCode, assetsFolder) => {
  const filename = path.basename(vttFilepath);
  const enclosingFolder = path.basename(path.dirname(vttFilepath));
  const destinationPath = path.join(assetsFolder, languageCode, enclosingFolder, filename);
  const vtt = parser.toVtt(data);
  const vttWithHeader = "WEBVTT\n\n" + vtt;
  fs.writeFileSync(destinationPath, vttWithHeader);
  return destinationPath;
};

const vttToJsonFile = async (vttPath: string, outputFolder: string) => {
  const fullPath = path.resolve(ROOT_DIR, vttPath);
  const filename = path.basename(fullPath, path.extname(fullPath));
  const vttJson = <any[]>await vttToJson(fullPath);
  // change "text" key to "value" to match what is expected by the translation repo
  for (const cue of vttJson) {
    cue.value = cue.text;
    delete cue.text;
  }
  fs.writeFileSync(path.join(outputFolder, `${filename}.json`), JSON.stringify(vttJson));
};

export default {
  translateAllVttFilesAndSave,
  copyVttFilesForTranslation,
};
