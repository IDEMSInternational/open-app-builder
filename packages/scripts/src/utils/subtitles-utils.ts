import fs from "fs";
import parser from "subtitles-parser-vtt";

// take srt to file to json, put json in translate folder

// after translations applied, take json and recompile into vtt in appropriate folder, ready to be referenced as subtitles src

export async function srtToJson(path: string) {
  const srt = fs.readFileSync(path).toString();
  const data = parser.fromVtt(srt);
  return data;
}
export async function formatSubtitlesJsonForTranslation(data) {
  return data;
}
