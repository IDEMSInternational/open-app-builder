#!/usr/bin/env node

import boxen from "boxen";
import chalk from "chalk";
import path from "path";
import { Command } from "commander";
import { IDeploymentWorkflows, IWorkflow, WORKFLOW_DEFAULTS } from "data-models";
import ALL_TASKS from "../../tasks";
import { logError, logProgramHelp, pad, promptOptions } from "../../utils";
import { getActiveDeployment } from "../deployment/get";
import { IDeploymentConfigJson } from "../deployment/set";

const program = new Command("run");

interface IProgramOptions {
  parent?: string;
  contentWatch?: boolean;
}

/***************************************************************************************
 * CLI
 * @example
 *************************************************************************************/
export default program
  .description("Run a workflow")
  // options for compare
  .argument("[name]", "Name of workflow to run")
  .allowUnknownOption()
  .helpOption("--helpIgnored", "will show help from child workflow instead of this")
  .option("-p --parent <string>", "Name of parent workflow triggered by")
  .action(async (name: string, options: IProgramOptions) => {
    const runner = WorkflowRunner;
    await runner.init();
    return runner.run(name, options.parent, []);
  });

/***************************************************************************
 *  Main Methods
 **************************************************************************/

export class WorkflowRunnerClass {
  tasks = ALL_TASKS;
  workflows: IDeploymentWorkflows = {};
  config: IDeploymentConfigJson;
  activeWorkflow = {};
  activeWorkflowOptions: { [name: string]: string | boolean } = {};

  /**
   *
   */
  public async init() {
    // load default workflows
    this.workflows = WORKFLOW_DEFAULTS;
    // load custom workflows
    this.config = getActiveDeployment();
    const { workflow, _workspace_path } = this.config as any;
    const customWorkflowFiles = [];
    if (workflow) {
      for (const workflowPath of customWorkflowFiles) {
        const ts: IDeploymentWorkflows = await import(path.resolve(_workspace_path, workflowPath));
        const workflows: IDeploymentWorkflows = ts?.default as any;
        if (workflows) {
          Object.entries(workflows).forEach(([name, workflow]) => {
            this.workflows[name] = workflow;
          });
        }
      }
    }
  }

  /**
   *
   * @param name
   */
  public async run(name?: string, parent?: string, args?: string[]) {
    if (!parent) {
      const heading = chalk.yellow(`${this.config.name}`);
      console.log(boxen(heading, { padding: 1, borderColor: "yellow" }));
    }
    if (!name) {
      name = await this.promptWorkflowSelect();
      console.log(chalk.yellow(`yarn scripts workflow run ${name}`));
    }

    const workflow = this.prepareWorkflow(name);
    this.activeWorkflowOptions = this.parseWorkflowOptions(workflow);
    return this.executeWorkflow(workflow);
  }

  /** Ensure task */
  private prepareWorkflow(name: string) {
    // include manual help logging as default ignored (so can pass to child command)
    if (["--help", "-h"].includes(name)) {
      logProgramHelp(program);
    }
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

  /**
   * Generate a child commander instance that can dynamically parse options as defined
   * within a workflow
   */
  private parseWorkflowOptions(workflow: IWorkflow) {
    let parsedOptions: { [name: string]: string | boolean } = {};
    if (workflow.options) {
      const subProgram = new Command().allowUnknownOption();
      for (const option of workflow.options) {
        const { flags, description, defaultValue } = option;
        subProgram.option(flags, description, defaultValue);
      }
      subProgram.action((options) => {
        parsedOptions = options;
      });
      if (process.argv.find((arg) => ["--help", "h"].includes(arg))) {
        logProgramHelp(subProgram);
      }
      subProgram.parse(process.argv);
    }
    return parsedOptions;
  }

  private async executeWorkflow(workflow: IWorkflow) {
    this.activeWorkflow = {};
    for (const step of workflow.steps) {
      this.activeWorkflow[step.name] = step;
      console.log(chalk.yellow(`========== ${step.name} ==========`));
      const context = {
        config: this.config,
        workflow: this.activeWorkflow,
        tasks: this.tasks,
        options: this.activeWorkflowOptions,
      };
      let shouldProcess = true;
      if (step.condition) {
        shouldProcess = await step.condition(context);
      }
      if (shouldProcess) {
        const output = await step.function(context);
        this.activeWorkflow[step.name].output = output;
      } else {
        console.log(chalk.gray("skipped"));
      }
    }
  }

  private async promptWorkflowSelect() {
    const options = Object.entries(this.workflows).map(([id, workflow]) => ({
      name: `${chalk.blueBright(pad(id, 15))} ${workflow.label}`,
      value: id,
    }));
    const name = await promptOptions(options, "Select a workflow to run");
    return name;
  }
}

/** Create single instance that can be shared (for dependency injection) */
export const WorkflowRunner = new WorkflowRunnerClass();

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
