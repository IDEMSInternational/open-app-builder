import chalk from "chalk";
import { spawn, spawnSync } from "child_process";
import chokidar from "chokidar";
import { existsSync, removeSync } from "fs-extra";
import path from "path";

import { WorkflowRunner } from "../../commands/workflow/run";
import { AUTH_TOKEN_PATH, CREDENTIALS_PATH } from "../../paths";

const authorize = () => {
  // remove any pre-existing auth token
  const authTokenPath = getAuthTokenPath();
  if (existsSync(authTokenPath)) {
    removeSync(authTokenPath);
  }
  gdriveExec("authorize");
};

/**
 *
 * @param options
 * @returns path to output files
 * }
 */
const download = (options: { folderId: string; filterFn?: any }) => {
  const { folderId, filterFn } = options;
  const outputPath = getOutputFolder(folderId);
  let dlArgs = `--folder-id ${folderId} --output-path "${outputPath}" --log-name "${folderId}.log"`;
  if (filterFn) {
    const filterFnBase64 = Buffer.from(filterFn.toString()).toString("base64");
    dlArgs += ` --filter-function-64 "${filterFnBase64}"`;
  }
  gdriveExec("download", dlArgs);
  return outputPath;
};

/**
 * Execute a google drive workspace command
 * Populates common args such as auth and credential token paths
 */
const gdriveExec = (cmd: string, args: string = "", sync = true) => {
  const authTokenPath = getAuthTokenPath();
  // Can also check if really need folder ID (or just pass deployment config)... probably do for sheets vs assets
  const commonArgs = `--credentials-path "${CREDENTIALS_PATH}" --auth-token-path "${authTokenPath}"`;
  const gdriveToolsBin = `yarn workspace @idemsInternational/gdrive-tools start`;
  const fullCommand = `${gdriveToolsBin} ${cmd} ${commonArgs} ${args}`;
  console.log(chalk.gray(fullCommand));
  return sync
    ? spawnSync(fullCommand, { stdio: "inherit", shell: true })
    : spawn(fullCommand, { stdio: "inherit", shell: true });
};

const getOutputFolder = (folderId: string) => {
  const { _workspace_path } = WorkflowRunner.config;
  return path.resolve(_workspace_path, "tasks", "gdrive", "outputs", folderId);
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
  folderId: string;
  onUpdate?: (filepath: string) => void;
  customCommands?: IWatchCommand[];
}) => {
  const { folderId } = options;
  const outputPath = getOutputFolder(folderId);
  const dlArgs = `--folder-id ${folderId} --output-path "${outputPath}" --log-name "${folderId}.log"`;
  const child = gdriveExec("watch", dlArgs, false);

  // As it's not easy to communicate directly with spawned child, instead
  // set-up a file watcher for locally updated files
  const watcher = chokidar
    .watch(outputPath, { ignoreInitial: true, awaitWriteFinish: true })
    .on("change", (e, stats) => {
      options.onUpdate(e);
    });
  process.on("SIGINT", () => watcher.close().then(() => process.exit(0)));
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

export default { authorize, download, liveReload, getOutputFolder };
