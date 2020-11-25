import * as fs from "fs-extra";
import * as xlsx from "xlsx";
import * as path from "path";
import chalk from "chalk";

const XLSX_DIR = `${__dirname}/xlsx`;
const JSON_DIR = `${__dirname}/json`;

/**
 * Reads xlsx files in local './xlsx' folder recursively and converts to a json
 * objects representing sheet names and data values
 */
async function main() {
  fs.ensureDirSync(XLSX_DIR);
  fs.ensureDirSync(JSON_DIR);
  fs.emptyDirSync(JSON_DIR);
  const xlsxFiles = listFilesForConversion(XLSX_DIR);
  const combined = [];
  for (let xlsxPath of xlsxFiles) {
    // organise input and output filenames and folders
    const relativePath = path.relative(XLSX_DIR, xlsxPath);
    const targetDir = path.join(JSON_DIR, path.dirname(relativePath));
    const targetPath = `${JSON_DIR}/${relativePath.replace(".xlsx", ".json")}`;
    fs.ensureDirSync(targetDir);
    // perform the main conversion
    const json = convertXLSXSheetsToJson(xlsxPath);
    // write to file, using stringify with spacing (2) to format more nicely
    fs.writeFileSync(targetPath, JSON.stringify(json, null, 2));
    combined.push(json);
  }
  const merged = mergePLHData(combined);
  fs.writeFileSync(`${__dirname}/json/_merged.json`, JSON.stringify(merged, null, 2));
  return combined;
}
main();

/**
 * PLH sheets contain contents page with metadata that can be merged into regular data
 * Merge and collate with other existing data, warning in case of overwrites
 */
function mergePLHData(jsons: any[]) {
  const merged = {};
  for (let json of jsons) {
    const contentList = json["==Content_List=="];
    if (contentList) {
      for (const contents of contentList) {
        const { Flow_Name } = contents;
        if (json.hasOwnProperty(Flow_Name)) {
          if (merged.hasOwnProperty(Flow_Name)) {
            console.log(chalk.yellow("duplicate flow:", Flow_Name));
          }
          merged[Flow_Name] = { ...contents, flow: json[Flow_Name] };
        } else {
          console.log(chalk.red("no contents:", Flow_Name));
        }
      }
    }
  }
  return merged;
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
