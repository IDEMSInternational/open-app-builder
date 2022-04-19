import { spawnSync } from "child_process";
import path from "path";
import { WorkflowRunner } from "../../commands/workflow/run";
import { AUTH_TOKEN_PATH, CREDENTIALS_PATH } from "../../paths";

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

  const dlArgs = `--folder-id ${folderId} --output-path "${outputPath}" --log-name ${folderId}.log"`;

  const gdriveToolsExec = `yarn workspace @idemsInternational/gdrive-tools start`;

  const cmd = `${gdriveToolsExec} download ${commonArgs} ${dlArgs}`;

  spawnSync(cmd, { stdio: "inherit", shell: true });
  return outputPath;
};

export default { download };
