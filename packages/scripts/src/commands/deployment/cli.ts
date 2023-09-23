#!/usr/bin/env node
import { Command } from "commander";

import { createDeployment } from "./lib/create";
import { importRepo } from "./lib/import";

import { Logger, logOutput } from "shared";
import { ActiveDeployment } from "../../models";

const program = new Command("deployment").description("Manage active deployment workspace");

program
  .command("get")
  .description("Get active deployment")
  .action(() => {
    const deployment = ActiveDeployment.get();
    logOutput({ msg1: deployment.name });
  });

program
  .command("create")
  .description("Create new deployment")
  .action(async () => {
    await createDeployment();
  });

program
  .command("import")
  .description("Import remote git repo")
  .requiredOption("-r --remote-repo <string>")
  .action(async (options: { remoteRepo: string }) => {
    await importRepo(options.remoteRepo);
  });

interface ISetOptions {
  /** Temp method to check if called from workflow or directly via scripts (prefer workflow) */
  workflow?: string;
}
program
  .command("set")
  .description("Set active deployment")
  .option("-w --workflow", "Specify if script invoked from workflow")
  .action(async (options: ISetOptions) => {
    if (!options.workflow) {
      Logger.warning({
        msg1: "[Deprecated] - Set via workflow instead",
        msg2: "yarn workflow deployment set",
      });
      return;
    }
    let [deploymentName] = program.args;
    await ActiveDeployment.set(deploymentName);
  });

export default program;
