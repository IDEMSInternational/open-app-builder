import fs from "fs";
import parser from "subtitles-parser-vtt";

// Takes an input .vtt file and saves a translated version
// in the appropriate folder (must then be manually added to google drive)
const translateVtt = async (vttPath, languageCode) => {
  const subtitlesJson = await vttToJson(vttPath);
  const translatedJson = await translateSubtitlesJson(subtitlesJson, languageCode);
  await jsonToVtt(translatedJson, languageCode);
};

// Converts an input .vtt to file to json, and saves a .json
// in a given driectory – for translation
const subtitlesFileToJson = async (options: { vttPath: string; outputFolder: string }) => {
  const subtitlesJsonString = JSON.stringify(await vttToJson(options.vttPath));
  saveJson(subtitlesJsonString, options.outputFolder);
};

// Without access to the translate service from within these workflows,
// this hack applies the translations to a subtitles json specifically
const translateSubtitlesJson = async (data, languageCode) => {
  const path = `/Users/Johnny/Documents/IDEMS-parenting-app/parenting-app-ui/packages/app-data/translations/${languageCode}/strings.json`;
  const strings = JSON.parse(fs.readFileSync(path).toString());
  for (const cue of data) {
    cue.text = strings[cue.text];
  }
  return data;
};

const vttToJson = async (path: string) => {
  const srt = fs.readFileSync(path).toString();
  const data = parser.fromVtt(srt);
  return data;
};

const saveJson = async (data: string, outputFolder: string) => {
  fs.writeFileSync(outputFolder + "/lets_slow_down_subtitles.json", data);
};

const jsonToVtt = async (data, languageCode) => {
  const path = `/Users/Johnny/Documents/IDEMS-parenting-app/parenting-app-ui/packages/app-data/assets/${languageCode}/plh_video/lets_slow_down.vtt`;
  const vtt = parser.toVtt(data);
  console.log("vtt: ", vtt);
  fs.writeFileSync(path, vtt);
};

export default {
  translateVtt,
  subtitlesFileToJson,
  translateSubtitlesJson,
  vttToJson,
  saveJson,
  jsonToVtt,
};
