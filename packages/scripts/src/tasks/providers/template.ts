import { spawnSync } from "child_process";
import fs from "fs-extra";
import path from "path";
import { WorkflowRunner } from "../../commands/workflow/run";
import { createTemporaryFolder } from "../../utils";

/** Process all templates within a folder */
const process = (options: { inputFolder: string }) => {
  const { _workspace_path } = WorkflowRunner.config;

  const { inputFolder } = options;
  const outputFolder = path.resolve(_workspace_path, "tasks", "template", "outputs");
  const cacheFolder = path.resolve(_workspace_path, "tasks", "template", "cache");

  const processExec = `yarn start app-data convert`;

  const args = `--input-folder ${inputFolder} --output-folder ${outputFolder} --cache-folder ${cacheFolder}`;

  const cmd = `${processExec} ${args}`;

  spawnSync(cmd, { stdio: "inherit", shell: true });
  return outputFolder;
};

/** WiP - allow processing of just a single template file */
const processIndividualFile = (options: { inputFile: string }) => {
  // const { inputFile } = options;
  // const inputFolder = createTemporaryFolder();
  // // TODO - want to check against cache and detect what sheet actually changed
  // const targetFilePath = path.resolve(inputFolder, path.basename(inputFile));
  // fs.copyFileSync(inputFile, targetFilePath);
  // return process({ inputFolder });
};

export default { process, processIndividualFile };
