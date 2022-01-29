#!/usr/bin/env node

import chalk from "chalk";
import path from "path";
import { Command } from "commander";
import { IDeploymentWorkflows, IWorkflow } from "data-models";
import ALL_TASKS from "../../tasks";
import { logError, promptOptions } from "../../utils";
import { getActiveDeployment } from "../deployment/get";
import { IDeploymentConfigJson } from "../deployment/set";

const program = new Command("run");

/***************************************************************************************
 * CLI
 * @example
 *************************************************************************************/
export default program
  .description("Run a workflow")
  // options for compare
  .argument("[name]", "Name of workflow to run")
  .action(async (name) => {
    const runner = WorkflowRunner;
    await runner.init();
    return runner.run(name);
  });

/***************************************************************************
 *  Main Methods
 **************************************************************************/

class WorkflowRunnerCore {
  tasks = ALL_TASKS;
  workflows: IDeploymentWorkflows = {};
  config: IDeploymentConfigJson;
  activeWorkflow = {};

  constructor() {
    this.config = getActiveDeployment();
  }

  /**
   *
   */
  public async init() {
    const { workflows: workflowPaths, _workspace_path } = this.config;
    for (const workflowPath of workflowPaths) {
      const ts: IDeploymentWorkflows = await import(path.resolve(_workspace_path, workflowPath));
      const workflows: IDeploymentWorkflows = ts?.default as any;

      if (workflows) {
        Object.entries(workflows).forEach(([name, workflow]) => {
          this.workflows[name] = workflow;
        });
      }
    }
  }

  /**
   *
   * @param name
   */
  public async run(name?: string) {
    if (!name) {
      name = await this.promptWorkflowSelect();
      console.log(chalk.yellow(`yarn scripts workflow run ${name}`));
    }

    const workflow = this.prepareWorkflow(name);

    return this.executeWorkflow(workflow);
  }

  /** Ensure task */
  private prepareWorkflow(name: string) {
    const workflow = this.workflows[name];
    // Ensure workflow exists
    if (!workflow) {
      const available = Object.keys(this.workflows).join(", ");
      const msg1 = `Workflow not found: ${name}`;
      const msg2 = `Available workflows: ${available}`;
      logError({ msg1, msg2 });
    }
    return workflow;
  }

  private async executeWorkflow(workflow: IWorkflow) {
    this.activeWorkflow = {};
    for (const step of workflow.steps) {
      this.activeWorkflow[step.name] = step;
      console.log(step.name);
      const context = { config: this.config, workflow: this.activeWorkflow, tasks: this.tasks };
      const output = await step.function(context);
      this.activeWorkflow[step.name].output = output;
    }
    console.log("complete", this.activeWorkflow);
  }

  private async promptWorkflowSelect() {
    const options = Object.entries(this.workflows).map(([id, workflow]) => ({
      name: workflow.label,
      value: id,
    }));
    const name = await promptOptions(options, "Select a workflow to run");
    return name;
  }
}

/** Create single instance that can be shared (for dependency injection) */
export const WorkflowRunner = new WorkflowRunnerCore();

/***************************************************************************
 *  Logging and Error Handling
 **************************************************************************/
const cleanup = () => {
  console.log("Cleaning up.");
};
const handleExit = () => {
  cleanup();
  console.log("Exiting without error.");
  process.exit();
};
const handleError = (e) => {
  console.error("ERROR! An error was encountered while executing");
  console.error(e);
  cleanup();
  console.log("Exiting with error.");
  process.exit(1);
};
process.on("SIGINT", handleExit);
process.on("uncaughtException", handleError);

/***************************************************************************
 *  Main Methods
 **************************************************************************/
