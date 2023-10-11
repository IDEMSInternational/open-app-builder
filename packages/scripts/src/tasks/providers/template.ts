import path from "path";
import { AppDataConverter } from "../../commands/app-data/convert";
import { WorkflowRunner } from "../../commands/workflow/run";

/** Process all templates within a folder */
const process = async (options: { inputFolders: string[] }) => {
  const { _workspace_path } = WorkflowRunner.config;

  const { inputFolders } = options;
  const outputFolder = path.resolve(_workspace_path, "tasks", "template", "outputs");
  const cacheFolder = path.resolve(_workspace_path, "tasks", "template", "cache");
  const skipCache = false;
  const converter = new AppDataConverter({ inputFolders, outputFolder, cacheFolder, skipCache });
  await converter.run();
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
