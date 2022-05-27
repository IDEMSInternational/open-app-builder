import { spawnSync } from "child_process";
import type { IWorkflowContext } from "data-models";

/**
 * Call another workflow to run.
 * NOTE - the new workflow will run in an isolated environment, independent to other steps
 */
const runWorkflow = async (options: { name: string; parent: IWorkflowContext }) => {
  const cmd = `yarn start workflow run ${options.name} --parent ${options.parent.name}`;
  spawnSync(cmd, { stdio: "inherit", shell: true });
};

export default { runWorkflow };
