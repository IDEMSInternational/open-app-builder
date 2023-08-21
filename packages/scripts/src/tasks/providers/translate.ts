import path from "path";
import { spawnSync } from "child_process";
import { WorkflowRunner } from "../../commands/workflow/run";
import { Logger } from "../../utils";

/**
 * Apply translations to sheets
 * @param options.inputFolder source folder of processed jsons to apply translations to
 * @returns output folder of translated jsons
 */
const apply = (options: { inputFolder: string }) => {
  const { _workspace_path, translations } = WorkflowRunner.config;
  const { filter_language_codes, translated_strings_path } = translations;

  const outputFolder = path.resolve(_workspace_path, "tasks", "translate", "outputs");

  let cmd = `yarn workspace translations start compile -i ${options.inputFolder} -t ${translated_strings_path} -o ${outputFolder}`;
  // apply language filter if exists
  if (filter_language_codes) {
    cmd += ` -f ${filter_language_codes.join(",")}`;
  }

  const { status, stderr } = spawnSync(cmd, {
    stdio: ["inherit", "inherit", "inherit"],
    shell: true,
  });
  if (status === 1) {
    Logger.error({ msg1: "Translations failed", msg2: stderr.toString() });
  }
  // Returns path to both compiled strings and translated sheets
  return {
    strings: path.join(outputFolder, "strings"),
    sheets: path.join(outputFolder, "sheets"),
  };
};

export default {
  apply,
};
