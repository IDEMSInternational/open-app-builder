import * as fs from "fs-extra";
import * as xlsx from "xlsx";
import * as path from "path";
import boxen from "boxen";
import chalk from "chalk";
import * as Parsers from "./parsers";
import { recursiveFindByExtension, arrayToHashmap, groupJsonByKey } from "../utils";
import { FlowTypes } from "../../types";

const INPUT_FOLDER = path.join(__dirname, "../gdrive-download/output");
const INTERMEDIATES_FOLDER = `${__dirname}/intermediates`;
const OUTPUT_FOLDER = `${__dirname}/output`;

/**
 * Reads xlsx files from gdrive-download output and converts to json
 * objects representing sheet names and data values
 */
export async function main() {
  console.log(chalk.yellow("Converting APP Data"));
  fs.ensureDirSync(INPUT_FOLDER);
  fs.ensureDirSync(INTERMEDIATES_FOLDER);
  fs.emptyDirSync(INTERMEDIATES_FOLDER);
  fs.ensureDirSync(OUTPUT_FOLDER);
  fs.emptyDirSync(OUTPUT_FOLDER);
  const xlsxFiles = listFilesForConversion(INPUT_FOLDER);

  const combined: { json: any; xlsxPath: string }[] = [];
  for (let xlsxPath of xlsxFiles) {
    const json = convertXLSXSheetsToJson(xlsxPath);
    combined.push({ json, xlsxPath });
  }
  // merge and collate app data, write some extra files for logging/debugging purposes
  const merged = mergeAppData(combined);
  fs.writeFileSync(`${INTERMEDIATES_FOLDER}/merged.json`, JSON.stringify(merged, null, 2));
  const dataByFlowType = groupJsonByKey(merged, "flow_type");
  fs.writeFileSync(
    `${INTERMEDIATES_FOLDER}/dataByFlowType.json`,
    JSON.stringify(dataByFlowType, null, 2)
  );
  const convertedData = applyDataParsers(dataByFlowType as any);
  fs.writeFileSync(
    `${INTERMEDIATES_FOLDER}/convertedData.json`,
    JSON.stringify(convertedData, null, 2)
  );
  // write to output files, named by flow_type and flow_subtype (if exists)
  Object.entries(convertedData).forEach(([key, value]) => {
    const convertedDataBySubtype = groupJsonByKey(value as any, "flow_subtype", "_default");
    Object.entries(convertedDataBySubtype).forEach(([subkey, subvalue]) => {
      const outputJson = JSON.stringify(subvalue, null, 2);
      let outputName = key;
      if (subkey !== "_default") {
        outputName = `${key}.${subkey}`;
      }
      fs.ensureDirSync(`${OUTPUT_FOLDER}/${key}`);
      fs.writeFileSync(`${OUTPUT_FOLDER}/${key}/${outputName}.json`, outputJson);
    });
  });
  console.log(chalk.yellow("Conversion Complete"));
}

if (process.argv[1] && process.argv[1].indexOf("sync-single") < 0) {
  main()
    .catch((err) => {
      console.error(err);
      process.exit(1);
    })
    .then(() => console.log(chalk.green("App Data Converted")));
}

function applyDataParsers(dataByFlowType: {
  [type in FlowTypes.FlowType]: FlowTypes.FlowTypeWithData[];
}) {
  // All flow types will be processed by the default parser unless otherwise specified here

  // generate a list of all tasks required by the taskListParser (merging rows from all task_list types)
  const allTasksById = arrayToHashmap(
    (dataByFlowType.task_list || []).reduce((a, b) => [...a, ...b.rows], []),
    "id"
  );
  const customParsers: { [flowType in FlowTypes.FlowType]?: Parsers.AbstractParser } = {
    conversation: new Parsers.ConversationParser(),
    task_list: new Parsers.TaskListParser(dataByFlowType, allTasksById),
    template: new Parsers.TemplateParser(),
    data_list: new Parsers.DataListParser(),
  };
  const parsedData = {};
  Object.entries(dataByFlowType).forEach(([key, contentFlows]) => {
    const parser = customParsers[key] ? customParsers[key] : new Parsers.DefaultParser();
    // add intermediate parsed flow for logging/debugging
    fs.ensureDirSync(`${INTERMEDIATES_FOLDER}/${key}`);
    // parse all flows through the parser
    parsedData[key] = contentFlows.map((flow) => {
      try {
        const parsed = parser.run(flow);
        const INTERMEDIATE_PATH = `${INTERMEDIATES_FOLDER}/${key}/${flow.flow_name}.json`;
        fs.writeFileSync(INTERMEDIATE_PATH, JSON.stringify(parsed, null, 2));
        return parsed;
      } catch (error) {
        throwTemplateParseError(error, flow);
      }
    });
  });
  return parsedData;
}

/**
 * App data sheets contain contents page with metadata that can be merged into regular data
 * Merge and collate with other existing data, warning in case of overwrites
 * @returns - array of all merged sheets (no grouping or collating)
 */
function mergeAppData(jsons: { json: any; xlsxPath: string }[]) {
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
            // Ensure all paths use / to match HTTP style paths
            const _xlsxPath = path.relative(INPUT_FOLDER, xlsxPath).replace(/\\/g, "/");
            merged[flow_name] = { ...contents, rows: json[flow_name], _xlsxPath };
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
    /* If bold or italics, include HTML in cell value */
    Object.keys(worksheet).forEach((cellId) => {
      let html = worksheet[cellId]?.h;
      if (
        html !== undefined &&
        typeof html === "string" &&
        (html.indexOf("<b>") > -1 || html.indexOf("<em>") > -1 || html.indexOf("<i>") > -1)
      ) {
        html = html.replace(/<span[^>]*>/g, "<span>"); // Remove span style
        worksheet[cellId].v = html;
      }
    });

    json[sheet_name] = xlsx.utils.sheet_to_json(worksheet);
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

/**
 * Debug info to log and exit when a template parsing error occurs
 */
function throwTemplateParseError(error: Error, flow: FlowTypes.FlowTypeWithData) {
  console.log(
    boxen(
      `
        ${chalk.red("Template Parse Error")}
        
        ${chalk.yellow(flow.flow_name)}
        
        ${flow._xlsxPath}

        This is likely an authoring error, see full stacktrace below
        `,
      { padding: 1, borderColor: "red" }
    )
  );
  console.error(error);
  process.exit(1);
}
