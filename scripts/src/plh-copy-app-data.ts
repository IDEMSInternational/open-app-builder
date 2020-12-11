import * as path from "path";
import * as fs from "fs-extra";
import chalk from "chalk";

// Setup folders
const DATA_INPUT_FOLDER = path.join(__dirname, "./plh-data-convert/output");
const ASSETS_INPUT_FOLDER = path.join(__dirname, "./gdrive-download/output/plh_assets");
const APP_DATA_DIR = `../src/data`;
const APP_PLH_ASSETS_DIR = "../src/assets/plh_assets";
fs.ensureDirSync(APP_DATA_DIR);
fs.emptyDirSync(APP_DATA_DIR);
fs.ensureDirSync(APP_PLH_ASSETS_DIR);
fs.emptyDirSync(APP_PLH_ASSETS_DIR);

/** A simple script to copy data exported from gdrive and processed for plh into the app data folder */
function main() {
  console.log(chalk.yellow("Copying Data To App"));
  const localTsFiles = fs.readdirSync(DATA_INPUT_FOLDER);
  for (const filepath of localTsFiles) {
    const localTsFile = fs.readFileSync(`${DATA_INPUT_FOLDER}/${filepath}`, { encoding: "utf8" });
    const flow_type = path.basename(filepath, ".ts");
    const appOutputTs = generateAppTsOutput(localTsFile);
    fs.writeFileSync(`${APP_DATA_DIR}/${flow_type}.ts`, appOutputTs);
  }
  fs.copySync(ASSETS_INPUT_FOLDER, APP_PLH_ASSETS_DIR);
  console.log(chalk.green("Data Copied to App"));
}
main();

/**
 * When copying to the app simply replace the path to local typings imported to
 * the path imported from within the app
 */
function generateAppTsOutput(ts: string) {
  return ts.replace("../../../types", "src/app/shared/model/flowTypes");
}
