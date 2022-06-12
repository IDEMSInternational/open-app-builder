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
const download = (options: { folderId: string; filterFn?: any }) => {
  const { folderId, filterFn } = options;
  const { config } = WorkflowRunner;
  const { _workspace_path } = config;
  const { auth_token_path } = config.google_drive;
  const authTokenPath = auth_token_path
    ? path.resolve(_workspace_path, auth_token_path)
    : AUTH_TOKEN_PATH;

  // Can also check if really need folder ID (or just pass deployment config)... probably do for sheets vs assets

  const outputPath = path.resolve(_workspace_path, "tasks", "gdrive", "outputs", folderId);

  const commonArgs = `--credentials-path "${CREDENTIALS_PATH}" --auth-token-path "${authTokenPath}"`;

  let dlArgs = `--folder-id ${folderId} --output-path "${outputPath}" --log-name "${folderId}.log"`;

  if (filterFn) {
    const filterFnBase64 = Buffer.from(filterFn.toString()).toString("base64");
    dlArgs += ` --filter-function-64 "${filterFnBase64}"`;
  }

  const gdriveToolsExec = `yarn workspace @idemsInternational/gdrive-tools start`;

  const cmd = `${gdriveToolsExec} download ${commonArgs} ${dlArgs}`;

  spawnSync(cmd, { stdio: "inherit", shell: true });
  return outputPath;
};

export default { download };
