import path from "path";
import fs from "fs-extra";
import chalk from "chalk";
import { spawnSync } from "child_process";
import { logError, recursiveFindByExtension } from "../../utils";
import { getActiveDeployment } from "../deployment/get";
import { Command } from "commander";

/***************************************************************************************
 * CLI
 * @example yarn
 *************************************************************************************/
const program = new Command("translate");

interface IProgramOptions {
  inputFolder: string;
}
export default program
  .description("translate")
  .option("-i --input-folder <string>", "Sheets Input Folder")
  .action(async (options: IProgramOptions) => {
    const { app_data } = getActiveDeployment();
    const inputFolder =
      options.inputFolder || path.resolve(app_data.converter_cache_path, "merged");
    compileTranslationFiles(inputFolder);
    copyContentForTranslators(inputFolder);
  });

/***************************************************************************************
 * Main Methods
 *************************************************************************************/
/**
 * Call translation scripts to also process compiled translations
 **/
function compileTranslationFiles(sheetsInputFolder: string) {
  const { filter_language_codes, output_cache_path, translated_strings_path } =
    getActiveDeployment().translations;

  let cmd = `yarn workspace translations start compile -i ${sheetsInputFolder} -t ${translated_strings_path} -o ${output_cache_path}`;

  // apply language filter if exists
  if (filter_language_codes) {
    cmd += ` -f ${filter_language_codes.join(",")}`;
  }

  console.log(chalk.gray(cmd));
  const { status, stderr } = spawnSync(cmd, {
    stdio: ["inherit", "inherit", "inherit"],
    shell: true,
  });
  if (status === 1) {
    logError({ msg1: "Translations failed", msg2: stderr.toString() });
  }
  return output_cache_path;
}

function copyContentForTranslators(sheetsInputFolder: string) {
  const { source_strings_path } = getActiveDeployment().translations;
  const inputFiles = recursiveFindByExtension(sheetsInputFolder, "json");
  for (const filepath of inputFiles) {
    const filename = path.basename(filepath);
    fs.copyFileSync(filepath, `${source_strings_path}/${filename}`);
  }
}
