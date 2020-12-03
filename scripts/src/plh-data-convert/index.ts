import * as fs from "fs-extra";
import * as xlsx from "xlsx";
import * as path from "path";
import chalk from "chalk";
import { ConversationParser, DefaultParser } from "./parsers";
import { groupJsonByKey, recursiveFindByExtension } from "../utils";
import { IContentFlow, IContentList } from "./types";
import { IFlowType } from "./types";

const INPUT_FOLDER = path.join(__dirname, "../gdrive-download/output");
const OUTPUT_FOLDER = `${__dirname}/output`;

/**
 * Reads xlsx files from gdrive-download output and converts to json
 * objects representing sheet names and data values
 */
async function main() {
  console.log(chalk.yellow("Converting PLH Data"));
  fs.ensureDirSync(INPUT_FOLDER);
  fs.ensureDirSync(OUTPUT_FOLDER);
  fs.emptyDirSync(OUTPUT_FOLDER);
  const xlsxFiles = listFilesForConversion(INPUT_FOLDER);
  const combined: { json: any; xlsxPath: string }[] = [];
  for (let xlsxPath of xlsxFiles) {
    const json = convertXLSXSheetsToJson(xlsxPath);
    combined.push({ json, xlsxPath });
  }
  // merge and collage plh data
  const merged = mergePLHData(combined);
  const dataByFlowType = groupJsonByKey(merged, "Flow_Type");
  const convertedData = applyDataParsers(dataByFlowType as any);
  // write to output files
  Object.entries(convertedData).forEach(([key, value]) => {
    const outputJson = JSON.stringify(value, null, 2);
    fs.writeFileSync(`${OUTPUT_FOLDER}/${key}.json`, outputJson);
  });
  console.log(chalk.yellow("Conversion Complete"));
}
main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .then(() => console.log(chalk.green("PLH Data Converted")));

function applyDataParsers(dataByFlowType: { [type in IFlowType]: IContentFlow[] }) {
  const parsers: { [flowType: string]: DefaultParser } = {
    Conversation: new ConversationParser(),
  };
  const convertedData = {};
  Object.entries(dataByFlowType).forEach(([key, contentFlows]) => {
    if (parsers.hasOwnProperty(key)) {
      console.log(chalk.gray("converting:", key));
      convertedData[key] = contentFlows.map((flow) => parsers[key].convert(flow));
    } else {
      console.log(chalk.gray("no conversion required:", key));
      convertedData[key] = contentFlows;
    }
  });
  return convertedData;
}

/**
 * PLH sheets contain contents page with metadata that can be merged into regular data
 * Merge and collate with other existing data, warning in case of overwrites
 * @returns - array of all merged sheets (no grouping or collating)
 */
function mergePLHData(jsons: { json: any; xlsxPath: string }[]) {
  const merged: { [Flow_Name: string]: IContentFlow } = {};
  const releasedSummary = {};
  for (let el of jsons) {
    const { json, xlsxPath } = el;
    const contentList = json["==Content_List=="] as IContentList[];
    if (contentList) {
      for (const contents of contentList) {
        const { Flow_Name, status, Flow_Type, Module } = contents;
        // only include flows marked as released in the contents
        if (status === "released") {
          releasedSummary[Flow_Name] = { status, Flow_Type, Module };
          if (json.hasOwnProperty(Flow_Name)) {
            if (merged.hasOwnProperty(Flow_Name)) {
              console.log(chalk.yellow("duplicate flow:", Flow_Name));
            }
            // console.log(chalk.green("+", Flow_Name));
            merged[Flow_Name] = { ...contents, data: json[Flow_Name] };
          } else {
            console.log(chalk.red("no contents:", Flow_Name, xlsxPath));
          }
        } else {
          // skip drafts
          // console.log(chalk.gray("-", Flow_Name));
        }
      }
    }
  }
  console.log(chalk.yellow("App Data"));
  console.table(releasedSummary);
  return Object.values(merged);
}

/**
 * Parses an xlsx file, returning an object with sheet names as keys
 * and a corresponding array of key-value pairs to represent the sheet data
 * (assumes header provided in top row)
 */
function convertXLSXSheetsToJson(xlsxFilePath: string) {
  const json = {};
  const workbook = xlsx.readFile(xlsxFilePath);
  const { Sheets } = workbook;
  Object.entries(Sheets).forEach(([sheetName, worksheet]) => {
    json[sheetName] = xlsx.utils.sheet_to_json(worksheet);
  });
  return json;
}

/**
 * Read all xlsx files in the function xlsx folder (ignoring temp files and anything in an 'old' directory)
 * @returns filenames of xlsx files in given folder
 */
function listFilesForConversion(folderPath: string) {
  return recursiveFindByExtension(folderPath, "xlsx").filter(
    (f) =>
      // ignore temp files and anything in an 'old' directory
      !f.startsWith("~$") &&
      !f
        .split(path.sep)
        .map((p) => p.toLowerCase())
        .includes("old")
  );
}
