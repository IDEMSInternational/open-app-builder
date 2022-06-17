import fs from "fs";
import * as path from "path";
import parser from "subtitles-parser-vtt";
import { ROOT_DIR } from "../../paths";
import { recursiveFindByExtension, logError } from "../../utils";

// Looks in assets folder for .vtt files, translates to target language,
// and saves translated .vtt
const translateAllVttFilesAndSave = async (
  languageCode: string,
  translationsPath: string,
  assetsFolder: string,
  subpath?: string
) => {
  const vttFilepaths = findVttFiles(assetsFolder, subpath);
  for (const vttFile of vttFilepaths) {
    translateVtt(vttFile, languageCode, translationsPath);
  }
};

const findVttFiles = (assetsFolder: string, subpath?: string) => {
  const folderPath = subpath ? path.join(assetsFolder, subpath) : assetsFolder;
  const result = recursiveFindByExtension(folderPath, "vtt");
  if (!result.length) {
    logError({
      msg1: "No files found",
      msg2: "No VTT files found in target folder",
    });
  }
  return result;
};

// Takes an input .vtt file and saves a translated version
// in the appropriate folder (must then be manually added to google drive)
const translateVtt = async (vttPath, languageCode, translationsPath) => {
  const subtitlesJson = await vttToJson(vttPath);
  const translatedJson = await translateSubtitlesJson(
    subtitlesJson,
    languageCode,
    translationsPath
  );
  await jsonToVtt(translatedJson, languageCode);
};

// Without access to the translate service from within these workflows,
// this hack applies the translations to a subtitles json specifically
const translateSubtitlesJson = async (data, languageCode, translationsPath) => {
  const translationStringsPath = path.join(translationsPath, languageCode, "strings.json");
  const translationStrings = JSON.parse(fs.readFileSync(translationStringsPath).toString());
  for (const cue of data) {
    cue.text = translationStrings[cue.text];
  }
  return data;
};

const vttToJson = async (sourcePath: string) => {
  const srt = fs.readFileSync(sourcePath).toString();
  const data = parser.fromVtt(srt);
  return data;
};

const jsonToVtt = async (data, languageCode) => {
  const destinationPath = path.join(
    ROOT_DIR,
    "packages/app-data/assets",
    languageCode,
    "plh_video/lets_slow_down.vtt"
  );
  const vtt = parser.toVtt(data);
  console.log("vtt: ", vtt);
  fs.writeFileSync(destinationPath, vtt);
};

const copyVttFilesForTranslation = async (
  assetsFolder,
  assetsSubpath,
  translationSourceStringsPath
) => {
  const vttFilepaths = findVttFiles(assetsFolder, assetsSubpath);
  for (const vttFile of vttFilepaths) {
    await vttFileToJson(vttFile, translationSourceStringsPath);
  }
};
// Converts an input .vtt to file to json, and saves a .json
// in a given driectory – for translation
const vttFileToJson = async (vttPath: string, outputFolder: string) => {
  const filename = path.basename(vttPath, path.extname(vttPath));
  const subtitlesJsonString = JSON.stringify(await vttToJson(vttPath));
  fs.writeFileSync(path.join(outputFolder + `${filename}.json`), subtitlesJsonString);
};

export default {
  translateAllVttFilesAndSave,
  copyVttFilesForTranslation,
  // translateVtt,
  // vttFileToJson,
  // translateSubtitlesJson,
  // vttToJson,
  // saveJson,
  // jsonToVtt,
  // findVttFiles
};
