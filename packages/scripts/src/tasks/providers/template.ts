import { spawnSync } from "child_process";
import path from "path";
import { WorkflowRunner } from "../../commands/workflow/run";

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

export default { process };
