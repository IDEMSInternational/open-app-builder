import * as path from "path";
import * as fs from "fs-extra";
import chalk from "chalk";
import { capitalizeFirstLetter, recursiveFindByExtension, convertJsonToTs } from "./utils";
import { spawnSync } from "child_process";
import { PLH_ASSETS_PATH, PLH_DATA_PATH, ROOT_DIR } from "./paths";

// Setup folders
const DATA_INPUT_FOLDER = path.join(__dirname, "./plh-data-convert/output");
const ASSETS_INPUT_FOLDER = path.join(__dirname, "./gdrive-download/output/plh_assets");

/**
 * A simple script to copy data exported from gdrive and processed for plh into the app data folder
 * @param doAssetFolderCheck whether to copy assets across (e.g. ignored when syncing single files)
 **/
export function main(doAssetFolderCheck = true) {
  // Translations Compilation
  console.log(chalk.yellow("Compiling existing translations"));
  const TRANSLATIONS_FOLDER = path.resolve(PLH_DATA_PATH, "../translations/from_translators");
  const TRANSLATIONS_OUTPUT_FOLDER = path.resolve(PLH_DATA_PATH, "../translations/compiled");
  compileTranslationFiles(DATA_INPUT_FOLDER, TRANSLATIONS_OUTPUT_FOLDER, TRANSLATIONS_FOLDER);

  // App files
  console.log(chalk.yellow("Writing app files"));
  writeAppTsFiles(path.resolve(TRANSLATIONS_OUTPUT_FOLDER, "jsons"), PLH_DATA_PATH);
  if (doAssetFolderCheck) {
    copyAppAssetFiles(ASSETS_INPUT_FOLDER, PLH_ASSETS_PATH);
  }
  generateAppDataIndexFiles();
  writeTranslationTsFiles(
    path.resolve(TRANSLATIONS_OUTPUT_FOLDER, "strings"),
    path.resolve(PLH_DATA_PATH, "translation_strings")
  );
  console.log(chalk.yellow("Cleaning Output Files"));
  cleanAppTsOutput(PLH_DATA_PATH);

  // New translations output
  console.log(chalk.yellow("Generating new translation files"));
  generateTranslationFiles(
    "../scripts/src/plh-data-convert/output",
    "../plh-data/translations/to_translate"
  );
  console.log(chalk.green("Copy Complete"));
}

if (process.argv[1] && process.argv[1].indexOf("sync-single") < 0) {
  main();
}

function writeTranslationTsFiles(sourceFolder: string, targetFolder: string) {
  fs.ensureDirSync(targetFolder);
  fs.emptyDirSync(targetFolder);
  fs.removeSync(path.resolve(PLH_DATA_PATH, "translation_strings", "_combined.json"));
  // convert all individual strings to ts, but ignore combined
  const sourceFiles = recursiveFindByExtension(sourceFolder, "json").filter(
    (filepath) => path.basename(filepath) !== "_combined.json"
  );
  convertJsonToTs(sourceFiles, {
    outputDir: targetFolder,
    indexFile: { namedExport: "TRANSLATION_STRINGS" },
  });
}

function copyAppAssetFiles(sourceFolder: string, targetFolder: string) {
  fs.ensureDirSync(targetFolder);
  fs.emptyDirSync(targetFolder);
  if (fs.existsSync(sourceFolder)) {
    fs.copySync(sourceFolder, targetFolder);
  }
}

function writeAppTsFiles(sourceFolder: string, targetFolder: string) {
  fs.ensureDirSync(targetFolder);
  fs.emptyDirSync(targetFolder);
  console.log(chalk.yellow("Copying Data To App"));
  const localTsFiles = recursiveFindByExtension(sourceFolder, "json");
  for (const filepath of localTsFiles) {
    const fileJson = fs.readJSONSync(filepath);
    // files are organised by flow_type, so get name of parent folder for type
    const flow_type = path.dirname(filepath).split(path.sep).pop();
    // create output ts from json
    const appOutputTs = generateLocalTsOutput(fileJson, flow_type);
    const outputPath = path.join(targetFolder, path.relative(sourceFolder, filepath));
    const outputDir = path.dirname(outputPath);
    const outputName = path.basename(filepath).replace(".json", ".ts");
    // write outputs
    fs.ensureDirSync(outputDir);
    fs.writeFileSync(path.resolve(outputDir, outputName), appOutputTs);
  }
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
  import { FlowTypes } from "data-models"
  const ${flow_type}: FlowTypes.${typeName}[] = ${JSON.stringify(json, null, 2)};
  export default ${flow_type}
  `;
}

function cleanAppTsOutput(outputFolder: string) {
  const cmd = `npx prettier --config ${ROOT_DIR}/.prettierrc --write ${outputFolder}/**/*.ts --loglevel error`;
  return spawnSync(cmd, { stdio: ["inherit", "inherit", "inherit"], shell: true });
}

/**
 * Call translation scripts to also add a copy of files to translations
 * TODO - ideally this and all above scripts should be called from within plh-data workspace instead
 * TODO - could also install as node_module and run as bin
 * */
function generateTranslationFiles(inputFolder: string, outputFolder: string) {
  const cmd = `yarn workspace translations start generate -i ${inputFolder} -o ${outputFolder}`;
  return spawnSync(cmd, { stdio: ["inherit", "inherit", "inherit"], shell: true });
}

/**
 * Call translation scripts to also process compiled translations
 * TODO - ideally this and all above scripts should be called from within plh-data workspace instead
 **/
function compileTranslationFiles(
  sourceFolder: string,
  outputFolder: string,
  translationsFolder: string
) {
  const cmd = `yarn workspace translations start compile -i ${sourceFolder} -t ${translationsFolder} -o ${outputFolder}`;
  return spawnSync(cmd, { stdio: ["inherit", "inherit", "inherit"], shell: true });
}

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
    fs.appendFileSync(indexFilePath, `import { FlowTypes } from "data-models";\r\n`);
    fs.appendFileSync(indexFilePath, `${importStatements.join("\r\n")};\r\n`);
    fs.appendFileSync(
      indexFilePath,
      `export const ${folderName}:FlowTypes.${capitalizeFirstLetter(
        folderName
      )}[] = [].concat(${exportStatements.join(",")})`
    );
  }
}
