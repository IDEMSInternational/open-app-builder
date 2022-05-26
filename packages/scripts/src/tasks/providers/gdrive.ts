import { spawnSync } from "child_process";
import path from "path";
import { WorkflowRunner } from "../../commands/workflow/run";
import { AUTH_TOKEN_PATH, CREDENTIALS_PATH } from "../../paths";

const gdriveToolsExec = `yarn workspace @idemsInternational/gdrive-tools start`;

/**
 *
 * @param options
 * @returns path to output files
 * }
 */
const download = (options: { folderId: string }) => {
  const { folderId } = options;
  const { config } = WorkflowRunner;
  const { _workspace_path } = config;
  const { auth_token_path } = config.google_drive;
  const authTokenPath = auth_token_path
    ? path.resolve(_workspace_path, auth_token_path)
    : AUTH_TOKEN_PATH;

  const outputPath = path.resolve(_workspace_path, "tasks", "gdrive", "outputs", folderId);

  const commonArgs = `--credentials-path "${CREDENTIALS_PATH}" --auth-token-path "${authTokenPath}"`;

  const dlArgs = `--folder-id ${folderId} --output-path "${outputPath}" --log-name "${folderId}.log"`;

  const cmd = `${gdriveToolsExec} download ${commonArgs} ${dlArgs}`;

  spawnSync(cmd, { stdio: "inherit", shell: true });
  return outputPath;
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
  onUpdate?: () => void;
  customCommands?: IWatchCommand[];
}) => {
  const cmd = `${gdriveToolsExec} watch --folder-id ${options.folderId} `;
  spawnSync(cmd, { stdio: "inherit", shell: true });
  // WiP - allow manual intervention to force actions

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
};

interface IWatchCommand {
  keybinding: string;
  name: string;
  command: () => Promise<void>;
}

export default { download, liveReload };
