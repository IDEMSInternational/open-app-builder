import { IWorkflowContext } from "workflows";
import { WorkflowRunner } from "../../commands/workflow/run";

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
  const runner = WorkflowRunner;
  await runner.init();
  const parentName = parent ? Object.values(parent)[0].name : null;
  return runner.run({ name, args: args || [], parent: parentName });
};

export default { runWorkflow };
