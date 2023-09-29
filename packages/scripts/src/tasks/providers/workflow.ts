import { IWorkflowContext } from "workflows";
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
  const { name, parent, args } = options;
  const parentName = parent ? Object.values(parent)[0].name : null;
  let cmd = `workflow run ${name}`;
  if (parentName) {
    cmd += ` --parent ${parentName}`;
  }
  if (args) {
    cmd += ` ${args.join(" ")}`;
  }
  await parseCommand(cmd);
};

export default { runWorkflow };
