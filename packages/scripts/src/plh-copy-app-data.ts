import * as path from "path";
import * as fs from "fs-extra";
import chalk from "chalk";
import { capitalizeFirstLetter, recursiveFindByExtension } from "./utils";

// Setup folders
const DATA_INPUT_FOLDER = path.join(__dirname, "./plh-data-convert/output");
const ASSETS_INPUT_FOLDER = path.join(__dirname, "./gdrive-download/output/plh_assets");
const APP_DATA_DIR = `../../src/data`;
const APP_PLH_ASSETS_DIR = "../../src/assets/plh_assets";

/** A simple script to copy data exported from gdrive and processed for plh into the app data folder */
export function main(doAssetFolderCheck = true) {
  fs.ensureDirSync(APP_DATA_DIR);
  fs.emptyDirSync(APP_DATA_DIR);
  if (doAssetFolderCheck) {
    fs.ensureDirSync(APP_PLH_ASSETS_DIR);
    fs.emptyDirSync(APP_PLH_ASSETS_DIR);
  }
  console.log(chalk.yellow("Copying Data To App"));
  const localTsFiles = recursiveFindByExtension(DATA_INPUT_FOLDER, "ts");
  for (const filepath of localTsFiles) {
    const localTsFile = fs.readFileSync(filepath, { encoding: "utf8" });
    const outputPath = path.join(APP_DATA_DIR, path.relative(DATA_INPUT_FOLDER, filepath));
    const appOutputTs = generateAppTsOutput(localTsFile);
    const outputDir = path.dirname(outputPath);
    fs.ensureDirSync(outputDir);
    fs.writeFileSync(outputPath, appOutputTs);
  }
  if (fs.existsSync(ASSETS_INPUT_FOLDER)) {
    fs.copySync(ASSETS_INPUT_FOLDER, APP_PLH_ASSETS_DIR);
  }
  generateAppDataIndexFiles();
  console.log(chalk.green("Data Copied to App"));
}

if (process.argv[1] && process.argv[1].indexOf("sync-single") < 0) {
  main();
}

/**
 * When copying to the app simply replace the path to local typings imported to
 * the path imported from within the app
 */
function generateAppTsOutput(ts: string) {
  return ts.replace("../../../../types", "src/app/shared/model/flowTypes");
}

/**
 * Create a default index.ts file in each data folder to export all other local
 * data files (and produce a singular import)
 */
function generateAppDataIndexFiles() {
  const dataDirs = fs.readdirSync(APP_DATA_DIR);
  for (const folderName of dataDirs) {
    const dirPath = `${APP_DATA_DIR}/${folderName}`;
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
    fs.appendFileSync(
      indexFilePath,
      `import { FlowTypes } from "src/app/shared/model/flowTypes";\r\n`
    );
    fs.appendFileSync(indexFilePath, `${importStatements.join("\r\n")};\r\n`);
    fs.appendFileSync(
      indexFilePath,
      `export const ${folderName}:FlowTypes.${capitalizeFirstLetter(
        folderName
      )}[] = [].concat(${exportStatements.join(",")})`
    );
  }
}
