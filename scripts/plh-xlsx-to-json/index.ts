import * as fs from "fs-extra";
import * as xlsx from "xlsx";
import * as path from "path";
import chalk from "chalk";

const XLSX_DIR = `${__dirname}/xlsx`;
const JSON_DIR = `${__dirname}/json`;
const APP_DATA_DIR = `src/data`;

/**
 * Reads xlsx files in local './xlsx' folder recursively and converts to a json
 * objects representing sheet names and data values
 */
async function main() {
  fs.ensureDirSync(XLSX_DIR);
  fs.ensureDirSync(JSON_DIR);
  fs.emptyDirSync(JSON_DIR);
  const xlsxFiles = listFilesForConversion(XLSX_DIR);
  const combined: { json: any; xlsxPath: string }[] = [];
  for (let xlsxPath of xlsxFiles) {
    const json = convertXLSXSheetsToJson(xlsxPath);
    combined.push({ json, xlsxPath });
  }
  // merge and collage plh data
  const merged = mergePLHData(combined);
  const dataByFlowType = _groupJsonByKey(merged, "Flow_Type");
  // write to output files
  Object.entries(dataByFlowType).forEach(([key, value]) => {
    const outputJson = JSON.stringify(value, null, 2);
    const outputTs = `export default ${outputJson}`;
    fs.writeFileSync(`${JSON_DIR}/${key}.json`, outputJson);
    fs.writeFileSync(`${APP_DATA_DIR}/${key}.ts`, outputTs);
  });
}
main();

/**
 * PLH sheets contain contents page with metadata that can be merged into regular data
 * Merge and collate with other existing data, warning in case of overwrites
 * @returns - array of all merged sheets (no grouping or collating)
 */
function mergePLHData(jsons: { json: any; xlsxPath: string }[]) {
  const merged = {};
  for (let el of jsons) {
    const { json, xlsxPath } = el;
    const contentList = json["==Content_List=="] as IContentList[];
    if (contentList) {
      for (const contents of contentList) {
        const { Flow_Name, status } = contents;
        // only include flows marked as released in the contents
        if (status === "released" || status === "preview") {
          if (json.hasOwnProperty(Flow_Name)) {
            if (merged.hasOwnProperty(Flow_Name)) {
              console.log(chalk.yellow("duplicate flow:", Flow_Name));
            }
            console.log(chalk.green("+", Flow_Name));
            merged[Flow_Name] = { ...contents, data: json[Flow_Name] };
          } else {
            console.log(chalk.red("no contents:", Flow_Name, xlsxPath));
          }
        } else {
          console.log(chalk.gray("-", Flow_Name));
        }
      }
    }
  }
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
  return _recursiveFindByExtension(folderPath, "xlsx").filter(
    (f) =>
      // ignore temp files and anything in an 'old' directory
      !f.startsWith("~$") &&
      !f
        .split(path.sep)
        .map((p) => p.toLowerCase())
        .includes("old")
  );
}

/**
 * find files by a given extension recursively, returning full paths
 * @param ext - file extension (without '.'), e.g. 'xlsx' or 'json'
 */
function _recursiveFindByExtension(base: string, ext: string, files?: string[], result?: string[]) {
  files = files || fs.readdirSync(base);
  result = result || [];
  for (const file of files) {
    const newbase = path.join(base, file);
    if (fs.statSync(newbase).isDirectory()) {
      const newFiles = fs.readdirSync(newbase);
      result = _recursiveFindByExtension(newbase, ext, newFiles, result);
    } else {
      if (file.split(".").pop() === ext) {
        result.push(newbase);
      }
    }
  }
  return result;
}

/**
 * Take an array of json object and return grouped by specific key
 * @param json array of objects containing key field
 * @param key lookup field for grouping
 */
function _groupJsonByKey<T>(json: T[], key: string) {
  const byKey: { [keyValue: string]: T[] } = {};
  json.forEach((el) => {
    if (el.hasOwnProperty(key)) {
      const keyValue = el[key];
      if (!byKey.hasOwnProperty(keyValue)) {
        byKey[keyValue] = [];
      }
      byKey[keyValue].push(el);
    }
  });
  return byKey;
}

/**
 * Take the target xlsx input path and write output to corresponding json folder
 * DEPRECATED 2020-11-24 - Now  merged data is written to file combined file and app instead
 * could still call after convertXLSXSheetsToJson script if wanted
 */
function writeOutputToFolder(xlsxPath: string, outputJson: any) {
  // organise input and output filenames and folders
  const relativePath = path.relative(XLSX_DIR, xlsxPath);
  const targetDir = path.join(JSON_DIR, path.dirname(relativePath));
  const targetPath = `${JSON_DIR}/${relativePath.replace(".xlsx", ".json")}`;
  fs.ensureDirSync(targetDir);
  // write to file, using stringify with spacing (2) to format more nicely
  fs.writeFileSync(targetPath, JSON.stringify(outputJson, null, 2));
}

interface IContentList {
  Flow_Type: string;
  Module: string;
  Flow_Name: string;
  status: "draft" | "released" | "preview";
  [key: string]: string;
}
