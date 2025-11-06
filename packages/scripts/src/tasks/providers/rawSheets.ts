import path from "path";
import { RawSheetsSyncer } from "../../commands/app-data/sync-raw";
import { AppDataFromRawConverter } from "../../commands/app-data/convert-from-raw";
import { WorkflowRunner } from "../../commands/workflow/run";

/** Sync raw sheet data from Google Sheets to simple JSON format (Step 1) */
const syncRaw = async (options: { inputFolders: string[]; outputFolder?: string }) => {
  const { _workspace_path } = WorkflowRunner.config;

  const { inputFolders, outputFolder: customOutputFolder } = options;
  const outputFolder =
    customOutputFolder || path.resolve(_workspace_path, "tasks", "raw-sync", "outputs");
  const syncer = new RawSheetsSyncer({ inputFolders, outputFolder });
  await syncer.run();
  return outputFolder;
};

/** Convert raw JSON format to processed app data (Step 2) */
const processRaw = async (options: { inputFolders: string[]; outputFolder?: string }) => {
  const { _workspace_path } = WorkflowRunner.config;

  const { inputFolders, outputFolder: customOutputFolder } = options;
  // Always use a temporary processing folder, never output directly to final destination
  const outputFolder =
    customOutputFolder || path.resolve(_workspace_path, "tasks", "raw-process", "outputs");
  const cacheFolder = path.resolve(_workspace_path, "tasks", "raw-process", "cache");
  const skipCache = false;
  const converter = new AppDataFromRawConverter({
    inputFolders,
    outputFolder,
    cacheFolder,
    skipCache,
  });
  await converter.run();
  return outputFolder;
};

export default { syncRaw, processRaw };
