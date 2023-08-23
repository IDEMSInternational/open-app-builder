#!/usr/bin/env node

import { Command } from "commander";
import { WorkflowRunner } from "./run";

const program = new Command("workflow");

/***************************************************************************************
 * Run
 * @example
 *************************************************************************************/
interface IProgramOptions {
  parent?: string;
}
program
  .command("run")
  .description("Run a workflow")
  .argument("[name]", "Name of workflow to run")
  .allowUnknownOption()
  .helpOption("--helpIgnored", "will show help from child workflow instead of this")
  .option("-p --parent <string>", "Name of parent workflow triggered by")
  .action(async (name, opts: IProgramOptions) => {
    // pass any additional args after [name] positional argument
    const args = program.args.slice(1);
    const runner = WorkflowRunner;
    await runner.init();
    return runner.run({ ...opts, name, args });
  });

// Run if called directly from Node
// if (require.main === module) {
//   if (!process.argv.slice(2).length) {
//     logProgramHelp(program);
//   }

//   program.parseAsync(process.argv);
// }

export default program;

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
