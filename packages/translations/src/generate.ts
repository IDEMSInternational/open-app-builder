import boxen from "boxen";
import chalk from "chalk";
import fs from "fs-extra";
import path from "path";
import { recursiveFindByExtension } from "./utils";

let INPUT_DIR: string;
let OUTPUT_DIR: string;

/** Process files for translation from input folder and output to given directory **/
export function generateTranslations(inDir: string, outDir: string) {
  INPUT_DIR = inDir;
  OUTPUT_DIR = outDir;
  checkFolderPaths();
  copyTranslationFiles();
  outputCompleteMessage();
}

/**
 * Recursively copy all json files from translation directory to output folder,
 * flattening folder paths
 **/
function copyTranslationFiles() {
  const inputFiles = recursiveFindByExtension(INPUT_DIR, "json");
  for (const filepath of inputFiles) {
    const filename = path.basename(filepath);
    fs.copyFileSync(filepath, `${OUTPUT_DIR}/${filename}`);
  }
}

function checkFolderPaths() {
  if (!fs.existsSync(INPUT_DIR)) {
    console.error(chalk.red("Input files do not exist"));
    process.exit(1);
  }
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }
  fs.emptyDirSync(OUTPUT_DIR);
}

function outputCompleteMessage() {
  console.log(
    boxen(
      `
${chalk.blueBright("Translation Files Generated")}
        
${chalk.cyanBright(OUTPUT_DIR)}
        `,
      { padding: 1, borderColor: "blueBright" }
    )
  );
}
