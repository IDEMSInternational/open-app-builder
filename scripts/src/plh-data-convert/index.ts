import * as fs from "fs-extra";
import * as xlsx from "xlsx";
import * as path from "path";
import chalk from "chalk";
import { ConversationParser, DefaultParser } from "./parsers";
import { groupJsonByKey, recursiveFindByExtension, capitalizeFirstLetter } from "../utils";
import { FlowTypes } from "../../types";
import { AbstractParser } from "./parsers/abstract.parser";

const INPUT_FOLDER = path.join(__dirname, "../gdrive-download/output");
const INTERMEDIATES_FOLDER = `${__dirname}/intermediates`;
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
  const dataByFlowType = groupJsonByKey(merged, "flow_type");
  const convertedData = applyDataParsers(dataByFlowType as any);
  // write some extra files for logging/debugging purposes
  fs.writeFileSync(`${INTERMEDIATES_FOLDER}/merged.json`, JSON.stringify(merged, null, 2));
  fs.writeFileSync(`${INTERMEDIATES_FOLDER}/dataByFlowType.json`, JSON.stringify(merged, null, 2));
  fs.writeFileSync(`${INTERMEDIATES_FOLDER}/convertedData.json`, JSON.stringify(merged, null, 2));
  // write to output files
  Object.entries(convertedData).forEach(([key, value]) => {
    const outputJson = JSON.stringify(value, null, 2);
    const outputTs = generateLocalTsOutput(outputJson, key as any);
    fs.writeFileSync(`${OUTPUT_FOLDER}/${key}.ts`, outputTs);
  });
  console.log(chalk.yellow("Conversion Complete"));
}
main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .then(() => console.log(chalk.green("PLH Data Converted")));

function applyDataParsers(
  dataByFlowType: { [type in FlowTypes.FlowType]: FlowTypes.FlowTypeWithData[] }
) {
  const parsers: { [flowType in FlowTypes.FlowType]?: AbstractParser } = {
    conversation: new ConversationParser(),
    module_page: new DefaultParser(),
    tips: new DefaultParser(),
  };
  console.log(chalk.blue(`Parsers applied to flow_types: ${Object.keys(parsers).join(", ")}`));
  const parsedData = {};
  Object.entries(dataByFlowType).forEach(([key, contentFlows]) => {
    if (parsers.hasOwnProperty(key)) {
      // add intermediate parsed flow for logging/debugging
      fs.ensureDir(`${INTERMEDIATES_FOLDER}/${key}`);
      // parse all flows through the parser
      parsedData[key] = contentFlows.map((flow) => {
        const parsed = parsers[key].run(flow);
        const INTERMEDIATE_PATH = `${INTERMEDIATES_FOLDER}/${key}/${flow.flow_name}.json`;
        fs.writeFileSync(INTERMEDIATE_PATH, JSON.stringify(parsed, null, 2));
        return parsed;
      });
    } else {
      parsedData[key] = contentFlows;
    }
  });
  return parsedData;
}

/**
 * PLH sheets contain contents page with metadata that can be merged into regular data
 * Merge and collate with other existing data, warning in case of overwrites
 * @returns - array of all merged sheets (no grouping or collating)
 */
function mergePLHData(jsons: { json: any; xlsxPath: string }[]) {
  const merged: { [flow_name: string]: FlowTypes.FlowTypeWithData } = {};
  const releasedSummary = {};
  const skippedSummary = {};
  for (let el of jsons) {
    const { json, xlsxPath } = el;
    const contentList = json["==content_list=="] as FlowTypes.FlowTypeWithData[];
    if (contentList) {
      for (const contents of contentList) {
        const { flow_name, status, flow_type, module } = contents;
        const filename = path.basename(xlsxPath, ".xlsx");
        // only include flows marked as released in the contents
        if (flow_name && status === "released") {
          releasedSummary[flow_name] = { status, flow_type, module, filename };
          if (json.hasOwnProperty(flow_name)) {
            if (merged.hasOwnProperty(flow_name)) {
              console.log(chalk.yellow("duplicate flow:", flow_name));
            }
            // console.log(chalk.green("+", flow_name));
            merged[flow_name] = { ...contents, rows: json[flow_name] };
          } else {
            console.log(chalk.red("No Contents:", flow_name));
          }
        } else {
          skippedSummary[flow_name] = { status, flow_type, module, filename };
        }
      }
    } else {
      console.log(chalk.red(`No Content List: ${path.basename(xlsxPath)}`));
    }
  }
  console.log(chalk.blue("Skipped"));
  console.table(skippedSummary);
  console.log(chalk.blue("App Data"));
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
  Object.entries(Sheets).forEach(([sheet_name, worksheet]) => {
    json[sheet_name] = xlsx.utils.sheet_to_json(worksheet);
  });
  return json;
}

/**
 * Create a ts file of json export, importing what would be the relevant local
 * typings to allow checking against data (and disabling unwanted additional linting)
 */
function generateLocalTsOutput(json: any, flow_type: FlowTypes.FlowType) {
  const typeName = capitalizeFirstLetter(flow_type);
  return `/* tslint:disable */
  import { FlowTypes } from "../../../types";
  export const ${flow_type}: FlowTypes.${typeName}[] = ${json}`;
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
