import { IWorkflowContext } from "data-models/workflows";
import { parseCommand } from "../../commands";

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
  let cmd = `workflow run ${name} --parent ${parent.name}`;
  if (args) {
    cmd += ` ${args.join(" ")}`;
  }
  parseCommand(cmd);
};

export default { runWorkflow };
