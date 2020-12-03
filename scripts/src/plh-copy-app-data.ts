import * as path from "path";
import * as fs from "fs-extra";
import chalk from "chalk";

const INPUT_FOLDER = path.join(__dirname, "./plh-data-convert/output");
const APP_DATA_DIR = `../src/data`;

/** A simple script to copy data exported from gdrive and processed for plh into the app data folder */
function main() {
  console.log(chalk.yellow("Copying Data To App"));
  fs.emptyDirSync(APP_DATA_DIR);
  const jsons = fs.readdirSync(INPUT_FOLDER);
  for (const jsonPath of jsons) {
    const json = fs.readFileSync(`${INPUT_FOLDER}/${jsonPath}`);
    const outputTs = `export default ${json}`;
    const dataType = path.basename(jsonPath, ".json");
    fs.writeFileSync(`${APP_DATA_DIR}/${dataType}.ts`, outputTs);
  }
  console.log(chalk.green("Data Copied to App"));
}
main();
