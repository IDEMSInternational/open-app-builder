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
  /**
   * added variables const downloadAResult
   * original line: 'gdriveExec("download", dlArgs);'
   * to ensure that we can track the return of this:  
      const result = gdriveExec("download", dlArgs);
      console.log(chalk.red(result)); 
  // the error given is:
  /**
   *  ERROR! An error was encountered while executing
      Error: ENOENT: no such file or directory, open '/Users/jodygyekye/idems/parenting-app-ui/.idems_app/deployments/debug/app_data/assets/contents.json'
          at Object.openSync (node:fs:601:3)
          at Object.writeFileSync (node:fs:2249:35)
          at AssetsPostProcessor.writeAssetsContentsFiles (/Users/jodygyekye/idems/parenting-app-ui/packages/scripts/src/commands/app-data/postProcess/assets.ts:99:8)
          at AssetsPostProcessor.run (/Users/jodygyekye/idems/parenting-app-ui/packages/scripts/src/commands/app-data/postProcess/assets.ts:82:10)
          at Command.<anonymous> (/Users/jodygyekye/idems/parenting-app-ui/packages/scripts/src/commands/app-data/postProcess/assets.ts:48:38)
          at Generator.next (<anonymous>)
          at asyncGeneratorStep (/Users/jodygyekye/idems/parenting-app-ui/packages/scripts/src/commands/app-data/postProcess/assets.ts:23:28)
          at _next (/Users/jodygyekye/idems/parenting-app-ui/packages/scripts/src/commands/app-data/postProcess/assets.ts:41:17)
          at /Users/jodygyekye/idems/parenting-app-ui/packages/scripts/src/commands/app-data/postProcess/assets.ts:46:13
          at new Promise (<anonymous>) {
        errno: -2,
        syscall: 'open',
        code: 'ENOENT',
        path: '/Users/jodygyekye/idems/parenting-app-ui/.idems_app/deployments/debug/app_data/assets/contents.json'
      }
      Cleaning up.
      Exiting with error.
  * To show the output path after running 'yarn workflow sync'
  * One thing I noticed is that the error stems from being unable to generate a file or directory that would be accessed to be used
  * At the time of testing, it was apparent that when 'yarn workflow sync' is executed, it fails to create a file that should be run:
  *   - that way to resolve, i will use the fs-extra module to detect if the file exists or not, which is what i will work on tomorrow.
  *   - shouldn't be too long. Was trying to use resources such as: 
  *     - (https://stackoverflow.com/questions/71777616/enoent-no-such-file-or-directory-open-filename)
  *     - (https://github.com/sindresorhus/load-json-file/issues/9)
  *     - (https://github.com/dashersw/brain-bits/issues/3)
  */

  /**
   * now to implement the fix, this is where the fix will be implemented
   * we need to check if the file actually exists
   * now attempt to perform a try-catch
   * using accessSync is used to check the accessibility of a file, for this, we are going to check if outputPath is real
   * if (existsSync(outputPath)) {
    console.log("File exists.");
    return outputPath;
  } else {
    throw new Error("File does not exist.");
  }
   */

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
  // ALSO COULD TRY TO MAKE CHECKS IN THIS FILE FOR ANY ERRORS DURING THE SYNC;
  // could be done by writing 'const process = sync', and then printing the process ( console.log("process", process))
  const process = sync
    ? spawnSync(fullCommand, { stdio: "inherit", shell: true })
    : spawn(fullCommand, { stdio: "inherit", shell: true });
  console.log("process", process); // debugging
  return process;
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
