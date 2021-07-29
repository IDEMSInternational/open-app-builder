import * as path from "path";
import * as fs from "fs-extra";
import chalk from "chalk";
import { capitalizeFirstLetter, recursiveFindByExtension } from "./utils";
import { spawnSync } from "child_process";
import { PLH_ASSETS_PATH, PLH_DATA_PATH, ROOT_DIR } from "./paths";

// Setup folders
const DATA_INPUT_FOLDER = path.join(__dirname, "./plh-data-convert/output");
const ASSETS_INPUT_FOLDER = path.join(__dirname, "./gdrive-download/output/plh_assets");

/** A simple script to copy data exported from gdrive and processed for plh into the app data folder */
export function main(doAssetFolderCheck = true) {
  fs.ensureDirSync(PLH_DATA_PATH);
  fs.emptyDirSync(PLH_DATA_PATH);
  if (doAssetFolderCheck) {
    fs.ensureDirSync(PLH_ASSETS_PATH);
    fs.emptyDirSync(PLH_ASSETS_PATH);
  }
  console.log(chalk.yellow("Copying Data To App"));
  const localTsFiles = recursiveFindByExtension(DATA_INPUT_FOLDER, "json");

  for (const filepath of localTsFiles) {
    const fileJson = fs.readJSONSync(filepath);
    // files are organised by flow_type, so get name of parent folder for type
    const flow_type = path.dirname(filepath).split(path.sep).pop();
    // create output ts from json
    const appOutputTs = generateLocalTsOutput(fileJson, flow_type);
    const outputPath = path.join(PLH_DATA_PATH, path.relative(DATA_INPUT_FOLDER, filepath));
    const outputDir = path.dirname(outputPath);
    const outputName = path.basename(filepath).replace(".json", ".ts");

    fs.ensureDirSync(outputDir);
    fs.writeFileSync(path.resolve(outputDir, outputName), appOutputTs);
  }
  if (fs.existsSync(ASSETS_INPUT_FOLDER)) {
    fs.copySync(ASSETS_INPUT_FOLDER, PLH_ASSETS_PATH);
  }
  generateAppDataIndexFiles();
  console.log(chalk.yellow("Cleaning Output Files"));
  cleanAppTsOutput();
  console.log(chalk.yellow("Generating translation files"));
  generateTranslationFiles();
  console.log(chalk.yellow("Compiling translations"));
  compileTranslationFiles();
  console.log(chalk.green("Copy Complete"));
  // generateTranslationIndexFiles();
}

if (process.argv[1] && process.argv[1].indexOf("sync-single") < 0) {
  main();
}

/**
 * Create a ts file of json export, importing what would be the relevant local
 * typings to allow checking against data (and disabling unwanted additional linting)
 *
 * When copying to the app simply replace the path to local typings imported to
 * the path imported from within the app
 */
function generateLocalTsOutput(json: any, flow_type: string) {
  const typeName = capitalizeFirstLetter(flow_type);
  return `/* eslint-disable */
  import { FlowTypes } from "../../model/flowTypes";
  const ${flow_type}: FlowTypes.${typeName}[] = ${JSON.stringify(json, null, 2)};
  export default ${flow_type}
  `;
}

function cleanAppTsOutput() {
  const cmd = `npx prettier --config ${ROOT_DIR}/.prettierrc --write ${PLH_DATA_PATH}/**/*.ts --loglevel error`;
  return spawnSync(cmd, { stdio: ["inherit", "inherit", "inherit"], shell: true });
}

/**
 * Call translation scripts to also add a copy of files to translations
 * TODO - ideally this and all above scripts should be called from within plh-data workspace instead
 * TODO - could also install as node_module and run as bin
 * */
function generateTranslationFiles() {
  const cmd = `yarn workspace translations start generate -i ../scripts/src/plh-data-convert/output -o ../plh-data/translations/source`;
  return spawnSync(cmd, { stdio: ["inherit", "inherit", "inherit"], shell: true });
}

/**
 * Call translation scripts to also process compiled translations
 * TODO - ideally this and all above scripts should be called from within plh-data workspace instead
 **/
function compileTranslationFiles() {
  const cmd = `yarn workspace translations start compile -i ../plh-data/translations/source -t ../plh-data/translations/translations -o ../plh-data/translations/compiled`;
  return spawnSync(cmd, { stdio: ["inherit", "inherit", "inherit"], shell: true });
  // TODO - convert jsons, generate index (make nice script, e.g.)
}
function convertJsonToTs(
  filepaths: string[],
  config: {
    generateIndex?: boolean;
    exportDataType?: string;
    outputDir?: string;
    importStatements?: string[];
    exportName?: string;
  }
) {}

/**
 * Create a default index.ts file in each data folder to export all other local
 * data files (and produce a singular import)
 */
function generateAppDataIndexFiles() {
  const dataDirs = fs.readdirSync(PLH_DATA_PATH);
  for (const folderName of dataDirs) {
    const dirPath = `${PLH_DATA_PATH}/${folderName}`;
    const dataFiles = fs.readdirSync(dirPath);
    const importStatements = [];
    const exportStatements = [];
    dataFiles.forEach((filePath, i) => {
      const importPath = path.basename(filePath, ".ts");
      let importName = importPath.replace(".", "_");
      if (importName === folderName) {
        importName += `_${i}`;
      }
      importStatements.push(`import ${importName} from "./${importPath}"`);
      exportStatements.push(importName);
    });
    const indexFilePath = `${dirPath}/index.ts`;
    fs.createFileSync(indexFilePath);
    fs.appendFileSync(indexFilePath, `import { FlowTypes } from "../../model/flowTypes";\r\n`);
    fs.appendFileSync(indexFilePath, `${importStatements.join("\r\n")};\r\n`);
    fs.appendFileSync(
      indexFilePath,
      `export const ${folderName}:FlowTypes.${capitalizeFirstLetter(
        folderName
      )}[] = [].concat(${exportStatements.join(",")})`
    );
  }
}
