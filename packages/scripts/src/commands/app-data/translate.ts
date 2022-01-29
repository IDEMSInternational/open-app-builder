import chalk from "chalk";
import { spawnSync } from "child_process";
import { logError } from "../../utils";
import { getActiveDeployment } from "../deployment/get";

/**
 * Call translation scripts to also process compiled translations
 **/
export function compileTranslationFiles(sourceFolder: string) {
  const { filter_language_codes, output_cache_path, translated_strings_path } =
    getActiveDeployment().translations;

  let cmd = `yarn workspace translations start compile -i ${sourceFolder} -t ${translated_strings_path} -o ${output_cache_path}`;

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

/**
 * Call translation scripts to also add a copy of files to translations
 **/
export function generateTranslationFiles(sheetsInputFolder: string) {
  const { source_strings_path } = getActiveDeployment().translations;
  const cmd = `yarn workspace translations start generate -i ${sheetsInputFolder} -o ${source_strings_path}`;
  return spawnSync(cmd, { stdio: ["inherit", "inherit", "inherit"], shell: true });
}
