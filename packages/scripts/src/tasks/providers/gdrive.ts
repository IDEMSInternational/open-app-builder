import {
  GDriveDownloader,
  IDownloadOptions,
  authorizeGDrive,
  GDriveWatcher,
  IGdriveEntry,
  createGoogleSheet,
  readGoogleSheet,
  authorizeGoogleSheets,
} from "@idemsInternational/gdrive-tools";
import chokidar from "chokidar";
import { existsSync, removeSync } from "fs-extra";
import path from "path";

import { WorkflowRunner } from "../../commands/workflow/run";
import { AUTH_TOKEN_PATH, CREDENTIALS_PATH } from "../../paths";

const getCommonOptions = () => {
  const authTokenPath = getAuthTokenPath();
  return { authTokenPath, credentialsPath: CREDENTIALS_PATH };
};

const authorize = async () => {
  // remove any pre-existing auth token
  const authTokenPath = getAuthTokenPath();
  if (existsSync(authTokenPath)) {
    removeSync(authTokenPath);
  }
  // Use Google Sheets authorization to get expanded permissions
  return authorizeGoogleSheets(getCommonOptions());
};

/**
 *
 * @param options
 * @returns path to output files
 * }
 */
const download = async (options: {
  type: "sheets" | "assets";
  folderId: string;
  folderName?: string;
  filterFn?: (entry: IGdriveEntry) => boolean;
}) => {
  const { type, folderId, folderName, filterFn } = options;
  const outputPath = getOutputFolder(type, folderId, folderName);
  const dlOptions: IDownloadOptions = {
    ...getCommonOptions(),
    folderId,
    logPrefix: folderName,
    outputPath,
    filterFn,
  };
  const gdriveDownloader = new GDriveDownloader(dlOptions);
  await gdriveDownloader.downloadFolder(options.folderId);
  return outputPath;
};

const getOutputFolder = (type: "sheets" | "assets", folderId: string, folderName?: string) => {
  const { _workspace_path } = WorkflowRunner.config;
  return path.resolve(_workspace_path, "tasks", "gdrive", "outputs", type, folderName || folderId);
};

const getAuthTokenPath = () => {
  const { config } = WorkflowRunner;
  const { _workspace_path } = config;
  const { auth_token_path } = config.google_drive;
  const authTokenPath = auth_token_path
    ? path.resolve(_workspace_path, auth_token_path)
    : AUTH_TOKEN_PATH;
  return authTokenPath;
};

/**
 * Present options for configuring google drive liveReload
 * This can automatically watch for changes to folders and pass back to listener
 * @param options.folderId Google Drive folder id to watch for changes
 * @param options.onUpdate Handler to respond to file updates
 * @param optons.customCommands Additional commands to make available to CLI
 */
const liveReload = async (options: {
  type: "sheets" | "assets";
  folderId: string;
  folderName?: string;
  onUpdate?: (filepath: string) => void;
  customCommands?: IWatchCommand[];
}) => {
  const { folderId, folderName } = options;
  const outputPath = getOutputFolder("sheets", folderId, folderName);
  const logName = `${folderId}.log`;

  const gdriveWatcher = new GDriveWatcher({
    ...getCommonOptions(),
    folderId,
    logName,
    outputPath,
  });
  gdriveWatcher.start();

  // As it's not easy to communicate directly with spawned child, instead
  // set-up a file watcher for locally updated files

  // TODO - now using non-cli version so should be fine to communicate direct

  const fileWatcher = chokidar
    .watch(outputPath, { ignoreInitial: true, awaitWriteFinish: true })
    .on("change", (e, stats) => {
      options.onUpdate(e);
    });
  process.on("SIGINT", () => {
    gdriveWatcher.stop();
    fileWatcher.close().then(() => process.exit(0));
  });
};

// WiP - allow manual intervention to force actions
function addUserInputCommands() {
  // const watchCommands: IWatchCommand[] = [
  //   ...(options.customCommands || []),
  //   {
  //     keybinding: "w",
  //     name: "Toggle Sheets Watch",
  //     command: async () => null,
  //   },
  //   {
  //     keybinding: "q",
  //     name: "Quit",
  //     command: async () => process.exit(0),
  //   },
  // ];
  // const prompts = watchCommands.map((v) => ({ name: v.name, value: v }));
  // const selected = await promptOptions<IWatchCommand>(prompts, "Sync Options");
  // await selected.command();
}

interface IWatchCommand {
  keybinding: string;
  name: string;
  command: () => Promise<void>;
}

/**
 * Create a Google Sheet with authentication using existing gdrive credentials
 */
const createSheet = async (options: {
  title: string;
  data: { [sheetName: string]: string[][] };
}) => {
  const { title, data } = options;

  const result = await createGoogleSheet({
    ...getCommonOptions(),
    title,
    data,
  });

  console.log(`Google Sheet created: ${result.sheetUrl}`);
  return result;
};

/**
 * Read data from an existing Google Sheet
 */
const readSheet = async (options: { spreadsheetId: string; ranges?: string[] }) => {
  const { spreadsheetId, ranges = [] } = options;

  return await readGoogleSheet({
    ...getCommonOptions(),
    spreadsheetId,
    ranges,
  });
};

export default { authorize, download, liveReload, getOutputFolder, createSheet, readSheet };
