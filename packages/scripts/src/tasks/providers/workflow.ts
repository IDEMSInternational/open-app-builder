import { spawnSync } from "child_process";
import { IWorkflowContext } from "data-models";

/**
 * Call another workflow to run.
 * NOTE - the new workflow will run in an isolated environment, independent to other steps
 */
const runWorkflow = async (options: {
  name: string;
  parent: IWorkflowContext;
  args?: string[];
}) => {
  const { name, args, parent } = options;
  let cmd = `yarn start workflow run ${name} --parent ${parent.name}`;
  if (args) {
    cmd += ` ${args.join(" ")}`;
  }
  spawnSync(cmd, { stdio: "inherit", shell: true });
};

export default { runWorkflow };
