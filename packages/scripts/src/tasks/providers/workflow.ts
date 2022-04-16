import { spawnSync } from "child_process";

/**
 * Call another workflow to run.
 * NOTE - the new workflow will run in an isolated environment, independent to other steps
 */
const runWorkflow = async (options: { name: string }) => {
  const cmd = `yarn start workflow run ${options.name}`;
  spawnSync(cmd, { stdio: "inherit", shell: true });
};

export default { runWorkflow };
