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
import { google } from "googleapis";
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
  // Use Google Sheets authorization to get expanded permissions
  return authorizeGoogleSheets(getCommonOptions());
};

const createSheet = async (options: any) => {
  return createGoogleSheet({
    ...getCommonOptions(),
    ...options,
  });
};

const readSheet = async (options: any) => {
  return readGoogleSheet({
    ...getCommonOptions(),
    ...options,
  });
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

const getSheetsFromFolder = async (folderId: string) => {
  const { drive } = await authorize();

  const getFiles = async (currentFolderId: string): Promise<any[]> => {
    let files: any[] = [];
    let pageToken: string | undefined = undefined;

    do {
      const res = await drive.files.list({
        q: `'${currentFolderId}' in parents and (mimeType = 'application/vnd.google-apps.spreadsheet' or mimeType = 'application/vnd.google-apps.folder') and trashed = false`,
        fields: "nextPageToken, files(id, name, mimeType)",
        pageToken: pageToken,
      });

      const resultFiles = res.data.files || [];

      for (const file of resultFiles) {
        if (file.mimeType === "application/vnd.google-apps.folder") {
          if (file.id) {
            const subFiles = await getFiles(file.id);
            files = files.concat(subFiles);
          }
        } else {
          files.push(file);
        }
      }

      pageToken = res.data.nextPageToken || undefined;
    } while (pageToken);

    return files;
  };

  return getFiles(folderId);
};

export default {
  authorize,
  download,
  liveReload,
  getOutputFolder,
  createSheet,
  readSheet,
  getSheetsFromFolder,
};
