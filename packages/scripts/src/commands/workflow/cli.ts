#!/usr/bin/env node

import { Command } from "commander";
import { IWorkflowRunOptions, WorkflowRunner } from "./run";

const program = new Command("run");
/***************************************************************************************
 * CLI
 * @example
 *************************************************************************************/
export default program
  .description("Run a workflow")
  .argument("[name]", "Name of workflow to run")
  .allowUnknownOption()
  .helpOption("--helpIgnored", "will show help from child workflow instead of this")
  .option("-p --parent <string>", "Name of parent workflow triggered by")
  .action(async (name, opts: IWorkflowRunOptions) => {
    // pass any additional args after [name] positional argument
    const args = program.args.slice(1);
    const runner = WorkflowRunner;
    await runner.init();
    return runner.run({ ...opts, name, args });
  });
