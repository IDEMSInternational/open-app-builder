import * as fs from "fs-extra";
import * as xlsx from "xlsx";

const XLSX_DIR = `${__dirname}/xlsx`;
const JSON_DIR = `${__dirname}/json`;

/**
 * Reads script folder xlsx files and converts to a json object representing sheet names
 * and data values
 */
async function main() {
  fs.ensureDirSync(XLSX_DIR);
  fs.ensureDirSync(JSON_DIR);
  fs.emptyDirSync(JSON_DIR);
  const xlsxFiles = listFilesForConversion(XLSX_DIR);
  for (let filename of xlsxFiles) {
    const json = convertXLSXSheetsToJson(`${XLSX_DIR}/${filename}`);
    // when writing json use stringify with spacing (2) to format more nicely
    fs.writeFileSync(`${JSON_DIR}/${filename}.json`, JSON.stringify(json, null, 2));
  }
}
main();

/**
 * Parses an xlsx file, returning an object with sheet names as keys
 * and a corresponding array of key-value pairs to represent the sheet data
 * (assumes header provided in top row)
 */
function convertXLSXSheetsToJson(xlsxFilePath: string) {
  const json = {};
  const csv = {};
  const workbook = xlsx.readFile(xlsxFilePath);
  const { Sheets } = workbook;
  Object.entries(Sheets).forEach(([sheetName, worksheet]) => {
    json[sheetName] = xlsx.utils.sheet_to_json(worksheet);
  });
  return json;
}

/**
 * Read all xlsx files in the function xlsx folder (ignoring temp files)
 * @returns filenames of xlsx files in given folder
 */
function listFilesForConversion(folderPath: string) {
  return fs.readdirSync(folderPath).filter((f) => f.endsWith(".xlsx") && !f.startsWith("~$"));
}
